import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import Campo from '../../components/Campo';
import Botao from '../../components/Botao';
import { icones } from '../../components/icones';
import styles from './RegistrarVenda.module.css';

import { listarClientes, formatarTelefone, formatarCpf } from '../../services/clientes';
import { cadastrarVenda } from '../../services/vendas';
import { useVenda } from '../../contexts/VendaContext';

const FORMAS_PAGAMENTO = [
  { id: 1, nome: 'PIX' },
  { id: 2, nome: 'Cartão de crédito' }
];

const moeda = (v) => Number(v || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function daquiUmMes() {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  const dois = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${dois(d.getMonth() + 1)}-${dois(d.getDate())}`;
}

export default function RegistrarVenda() {
  const navigate = useNavigate();
  const {
    cliente, setCliente,
    itens, adicionarItem,
    formaPagamentoId, setFormaPagamentoId,
    parcelas, setParcelas,
    vencimento, setVencimento,
    limparVenda
  } = useVenda();

  const [busca, setBusca] = useState('');
  const [clientes, setClientes] = useState([]);
  const [comprovante, setComprovante] = useState(null);
  const [erroComprovante, setErroComprovante] = useState('');
  
  const [salvando, setSalvando] = useState(false);
  const [erroSalvar, setErroSalvar] = useState('');

  useEffect(() => {
    if (!vencimento) setVencimento(daquiUmMes());
  }, [vencimento, setVencimento]);

  useEffect(() => {
    if (busca.length < 2) {
      setClientes([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const data = await listarClientes({ busca, tamanho: 5 });
        setClientes(data.conteudo || []);
      } catch (err) {
        console.error('Erro ao buscar clientes', err);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [busca]);

  const total = itens.reduce((soma, i) => soma + i.preco * i.quantidade, 0);
  const categorias = [...new Set(itens.map((i) => i.categoria).filter(Boolean))];

  const escolherComprovante = (e) => {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;
    if (!['image/png', 'image/jpeg', 'application/pdf'].includes(arquivo.type) || arquivo.size > 5 * 1024 * 1024) {
      setErroComprovante('Anexe um arquivo PNG, JPG ou PDF de até 5 MB.');
      return;
    }
    setErroComprovante('');
    setComprovante(arquivo);
  };

  const enviar = async (e) => {
    e.preventDefault();
    setErroSalvar('');

    if (!cliente) {
      alert('Selecione um cliente para a venda.');
      return;
    }
    if (itens.length === 0) {
      alert('Adicione pelo menos um item.');
      return;
    }
    if (!formaPagamentoId) {
      alert('Selecione a forma de pagamento.');
      return;
    }

    setSalvando(true);
    try {
      const payload = {
        clienteId: cliente.id,
        formaPagamentoId: Number(formaPagamentoId),
        qtdParcelas: parcelas,
        itens: itens.map(i => ({ produtoId: i.produtoId, quantidade: i.quantidade })),
        valorTotalConferencia: total,
      };

      if (parcelas > 1) {
        payload.primeiroVencimento = vencimento;
      }
      
      // O comprovante seria upload S3, passamos string vazia por enquanto
      payload.comprovanteChave = '';
      
      // dataVenda nao mandamos, o backend assume o current time

      await cadastrarVenda(payload);
      
      limparVenda();
      navigate('/vendas');
    } catch (err) {
      setErroSalvar(err?.response?.data?.mensagem || 'Erro ao registrar venda.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <AppLayout cabecalho={{ titulo: 'Registrar Venda', esquerda: 'voltar' }} semBarra>
      <form className={styles.form} onSubmit={enviar}>
        {erroSalvar && <div style={{color: 'red', marginBottom: '15px'}}>{erroSalvar}</div>}
        
        <div className={styles.bloco}>
          <div className={styles.intro}>
            <h2 className="rotulo-secao">1. Cliente</h2>
            <Link to="/clientes/novo" className={styles.adicionar}>
              + Adicionar novo
            </Link>
          </div>

          {!cliente ? (
            <div className={styles.seletorCliente}>
              <Campo id="venda-cliente" rotulo="Buscar cliente já cadastrado">
                <input
                  id="venda-cliente"
                  className={styles.busca}
                  placeholder="Nome, CPF ou telefone"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  autoComplete="off"
                />
              </Campo>

              {busca.length > 0 && busca.length < 2 && (
                <p className={styles.avisoBusca}>Digite pelo menos 2 caracteres...</p>
              )}

              {busca.length >= 2 && clientes.length > 0 && (
                <ul className={styles.resultados}>
                  {clientes.map((c) => (
                    <li key={c.id}>
                      <button type="button" className={styles.opcaoCliente} onClick={() => setCliente(c)}>
                        <span className={styles.opcaoNome}>{c.nomeCompleto}</span>
                        <span className={styles.opcaoDocs}>
                          {c.telefonePrincipal ? formatarTelefone(c.telefonePrincipal) : 'Sem telefone'} • {formatarCpf(c.cpf)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {busca.length >= 2 && clientes.length === 0 && (
                <p className={styles.avisoBusca}>Nenhum cliente encontrado.</p>
              )}
            </div>
          ) : (
            <div className={styles.clienteEscolhido}>
              <div className={styles.clienteDados}>
                <span className={styles.clienteNome}>{cliente.nomeCompleto}</span>
                <span className={styles.clienteDocs}>
                  {cliente.telefonePrincipal ? formatarTelefone(cliente.telefonePrincipal) : 'Sem telefone'} • {formatarCpf(cliente.cpf)}
                </span>
              </div>
              <button
                type="button"
                className={styles.trocarCliente}
                onClick={() => {
                  setCliente(null);
                  setBusca('');
                }}
              >
                Trocar
              </button>
            </div>
          )}
        </div>

        <div className={styles.bloco}>
          <div className={styles.intro}>
            <h2 className="rotulo-secao">2. Produtos / Itens</h2>
            <Link to="/vendas/nova/itens" className={styles.adicionar}>
              + Selecionar itens
            </Link>
          </div>
          <ul className={styles.itens}>
            {itens.map((i) => (
              <li key={i.produtoId} className={styles.item}>
                <span className={styles.itemEsquerda}>
                  <span className={styles.itemNome}>{i.nome}</span>
                  <span className={styles.itemQtd}>{i.quantidade}x</span>
                </span>
                <span className={styles.itemDireita}>
                  <span className={styles.itemTotal}>{moeda(i.preco * i.quantidade)}</span>
                  <button
                    type="button"
                    className={styles.removerItem}
                    aria-label={`Remover ${i.nome}`}
                    onClick={() => adicionarItem({ id: i.produtoId }, 0)} // envia qtd 0 para remover
                  >
                    <img src={icones.lixeira} alt="" />
                  </button>
                </span>
              </li>
            ))}
            {itens.length === 0 && <li className={styles.vazio}>Nenhum item adicionado.</li>}
          </ul>
          {itens.length > 0 && categorias.length > 0 && (
            <div className={styles.categorias}>
              Categorias da venda: {categorias.join(', ')}
            </div>
          )}
        </div>

        <div className={styles.bloco}>
          <h2 className="rotulo-secao">3. Pagamento</h2>
          <Campo id="venda-forma" rotulo="Forma de pagamento" seletor>
            <select
              id="venda-forma"
              value={formaPagamentoId}
              onChange={(e) => setFormaPagamentoId(e.target.value)}
              required
            >
              <option value="" disabled>Selecione...</option>
              {FORMAS_PAGAMENTO.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nome}
                </option>
              ))}
            </select>
          </Campo>
          <div className={styles.duasColunas}>
            <Campo id="venda-parcelas" rotulo="Parcelas" seletor>
              <select
                id="venda-parcelas"
                value={parcelas}
                onChange={(e) => setParcelas(Number(e.target.value))}
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                  <option key={n} value={n}>
                    {n}x
                  </option>
                ))}
              </select>
            </Campo>
            
            {parcelas > 1 && (
              <Campo id="venda-vencimento" rotulo="1º Vencimento">
                <input
                  id="venda-vencimento"
                  type="date"
                  value={vencimento}
                  onChange={(e) => setVencimento(e.target.value)}
                  required
                />
              </Campo>
            )}
          </div>
          <Campo id="venda-comprovante" rotulo="Comprovante de pagamento" erro={erroComprovante}>
            <label className={styles.anexo}>
              <input type="file" accept="image/png,image/jpeg,application/pdf" className="sr-only" onChange={escolherComprovante} />
              {comprovante ? (
                <div className={styles.anexado}>
                  <img src={icones.clipe} width={16} height={16} alt="" />
                  <span className={styles.anexadoNome}>{comprovante.name}</span>
                  <button
                    type="button"
                    className={styles.removerAnexo}
                    onClick={(e) => {
                      e.preventDefault();
                      setComprovante(null);
                    }}
                  >
                    Remover
                  </button>
                </div>
              ) : (
                <span className={styles.anexoVazio}>Anexar arquivo (Opcional)</span>
              )}
            </label>
          </Campo>
        </div>

        <div className={styles.totalRodape}>
          <div className={styles.totalEsquerda}>
            <span className={styles.totalRotulo}>Valor Total</span>
            <span className={styles.totalValor}>{moeda(total)}</span>
          </div>
          <Botao type="submit" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Finalizar Venda'}
          </Botao>
        </div>
      </form>
    </AppLayout>
  );
}
