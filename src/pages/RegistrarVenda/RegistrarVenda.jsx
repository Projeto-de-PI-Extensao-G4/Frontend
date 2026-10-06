import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import Campo from '../../components/Campo';
import Botao from '../../components/Botao';
import { icones } from '../../components/icones';
import styles from './RegistrarVenda.module.css';

const CLIENTES = [
  { id: 1, nome: 'Ana Souza', cpf: '529.982.247-25', telefone: '(11) 91234-5678' },
  { id: 2, nome: 'Ana Souza', cpf: '111.444.777-35', telefone: '(11) 99988-7766' },
  { id: 3, nome: 'Mariana Alves Prado', cpf: '390.533.447-05', telefone: '(11) 95544-3322' },
];

const ITENS_INICIAIS = [
  { id: 1, nome: 'Jogo de Lençol', categoria: 'Roupas', quantidade: 1, preco: 50 },
  { id: 2, nome: 'Toalha de Banho', categoria: 'Banho', quantidade: 1, preco: 30 },
];

const FORMAS_PAGAMENTO = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito', 'PIX', 'Boleto', 'Cheque'];

const moeda = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const digitos = (t) => t.replace(/\D/g, '');

// yyyy-MM-dd da data local daqui a um mês (toISOString usaria UTC e poderia voltar um dia).
function daquiUmMes() {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  const dois = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${dois(d.getMonth() + 1)}-${dois(d.getDate())}`;
}

export default function RegistrarVenda() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');
  const [cliente, setCliente] = useState(null);
  const [itens, setItens] = useState(ITENS_INICIAIS);
  const [forma, setForma] = useState('');
  const [parcelas, setParcelas] = useState(5);
  const [vencimento, setVencimento] = useState(daquiUmMes);
  const [comprovante, setComprovante] = useState(null);
  const [erroComprovante, setErroComprovante] = useState('');

  const termo = busca.trim().toLowerCase();
  const termoDigitos = digitos(busca);
  const resultados = termo
    ? CLIENTES.filter(
        (c) =>
          c.nome.toLowerCase().includes(termo) ||
          (termoDigitos && digitos(c.telefone).includes(termoDigitos)),
      )
    : [];

  const total = itens.reduce((soma, i) => soma + i.preco * i.quantidade, 0);
  const categorias = [...new Set(itens.map((i) => i.categoria))];

  const escolherComprovante = (e) => {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;
    const tipos = ['image/png', 'image/jpeg', 'application/pdf'];
    if (!tipos.includes(arquivo.type) || arquivo.size > 5 * 1024 * 1024) {
      setErroComprovante('Use PNG, JPG ou PDF de até 5 MB.');
      return;
    }
    setErroComprovante('');
    setComprovante(arquivo.name);
  };

  const confirmar = (e) => {
    e.preventDefault();
    navigate('/vendas/2934');
  };

  return (
    <AppLayout cabecalho={{ titulo: 'Registrar Venda', esquerda: 'voltar' }}>
      <form className={styles.formulario} onSubmit={confirmar}>
        <section className={styles.secao}>
          <h2 className="rotulo-secao">1. Cliente</h2>
          {cliente ? (
            <div className={styles.clienteEscolhido}>
              <div className={styles.clienteDados}>
                <p className={styles.clienteNome}>{cliente.nome}</p>
                <p className="texto-apoio">CPF {cliente.cpf}</p>
                <p className="texto-apoio">{cliente.telefone}</p>
              </div>
              <button
                type="button"
                className={styles.trocar}
                onClick={() => {
                  setCliente(null);
                  setBusca('');
                }}
              >
                Trocar
              </button>
            </div>
          ) : (
            <>
              <Campo id="venda-cliente">
                <img src={icones.buscaCampo} width={18} height={24} alt="" />
                <input
                  id="venda-cliente"
                  type="search"
                  inputMode="search"
                  autoComplete="off"
                  placeholder="Buscar por nome ou telefone..."
                  aria-label="Buscar cliente"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </Campo>
              {termo ? (
                <ul className={styles.resultados}>
                  {resultados.length === 0 && <li className={styles.vazio}>Nenhum cliente encontrado</li>}
                  {resultados.map((c) => (
                    <li key={c.id}>
                      <button type="button" className={styles.resultado} onClick={() => setCliente(c)}>
                        <span className={styles.clienteNome}>{c.nome}</span>
                        <span className={styles.clienteApoio}>
                          CPF {c.cpf} · {c.telefone}
                        </span>
                      </button>
                    </li>
                  ))}
                  <li>
                    <Link to="/clientes/novo" className={styles.cadastrar}>
                      + Cadastrar novo cliente
                    </Link>
                  </li>
                </ul>
              ) : (
                <p className="texto-apoio">
                  Digite parte do nome ou do telefone. O CPF aparece no resultado para diferenciar nomes iguais.
                </p>
              )}
            </>
          )}
        </section>

        <section className={styles.secao}>
          <div className={styles.cabecaSecao}>
            <h2 className="rotulo-secao">2. Produtos / Itens</h2>
            <Link to="/vendas/nova/itens" className={styles.adicionar}>
              <img src={icones.maisPequeno} width={10.5} height={10.5} alt="" />
              ADICIONAR
            </Link>
          </div>
          <ul className={styles.itens}>
            {itens.map((i) => (
              <li key={i.id} className={styles.item}>
                <div className={styles.itemTexto}>
                  <p className={styles.itemNome}>{i.nome}</p>
                  <p className={styles.itemDetalhe}>
                    {i.categoria} · {i.quantidade}x
                  </p>
                </div>
                <p className={styles.itemPreco}>{moeda(i.preco * i.quantidade)}</p>
                <button
                  type="button"
                  className={styles.remover}
                  aria-label={`Remover ${i.nome}`}
                  onClick={() => setItens((lista) => lista.filter((x) => x.id !== i.id))}
                >
                  <img src={icones.lixeira} width={16} height={18} alt="" />
                </button>
              </li>
            ))}
            {itens.length === 0 && <li className={styles.vazio}>Nenhum item adicionado.</li>}
          </ul>
          <div className={styles.total}>
            <span>Total da Venda</span>
            <strong>{moeda(total)}</strong>
          </div>
          {categorias.length > 0 && (
            <p className="texto-apoio">
              Categorias da venda: {categorias.join(', ')} — vêm dos itens adicionados.
            </p>
          )}
        </section>

        <section className={styles.secao}>
          <h2 className="rotulo-secao">3. Forma de pagamento</h2>
          <Campo id="venda-forma" seletor>
            <select
              id="venda-forma"
              aria-label="Forma de pagamento"
              value={forma}
              onChange={(e) => setForma(e.target.value)}
              required
            >
              <option value="" disabled>
                Selecione
              </option>
              {FORMAS_PAGAMENTO.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </Campo>
        </section>

        <section className={styles.secao}>
          <h2 className="rotulo-secao">4. Parcelamento</h2>
          <div className={styles.parcelamento}>
            <Campo id="venda-parcelas" rotulo="Parcelas" seletor>
              <select id="venda-parcelas" value={parcelas} onChange={(e) => setParcelas(Number(e.target.value))}>
                {Array.from({ length: 12 }, (_, k) => k + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}x de {moeda(total / n)}
                  </option>
                ))}
              </select>
            </Campo>
            {parcelas > 1 && (
              <Campo
                id="venda-vencimento"
                rotulo="1º vencimento"
                type="date"
                value={vencimento}
                onChange={(e) => setVencimento(e.target.value)}
                required
              />
            )}
          </div>
          <p className="texto-apoio">
            Vencimentos mensais a partir dessa data. 1x = à vista. A última parcela absorve os centavos.
          </p>
        </section>

        <section className={styles.secao}>
          <h2 className="rotulo-secao">5. Comprovante (opcional)</h2>
          <label className={styles.anexo}>
            <input
              type="file"
              accept="image/png,image/jpeg,application/pdf"
              className="sr-only"
              onChange={escolherComprovante}
            />
            <img src={icones.clipe} width={14.41} height={24} alt="" />
            <span className={styles.anexoTitulo}>{comprovante ?? 'Clique para anexar arquivo'}</span>
            <span className="texto-apoio">PNG, JPG ou PDF (Máx. 5MB)</span>
          </label>
          {erroComprovante && <p className={styles.erro}>{erroComprovante}</p>}
        </section>

        <Botao type="submit">Confirmar venda</Botao>
      </form>
    </AppLayout>
  );
}
