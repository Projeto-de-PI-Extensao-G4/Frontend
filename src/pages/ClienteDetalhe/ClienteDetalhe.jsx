import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import { BadgeStatus } from '../../components/Badge';
import { icones } from '../../components/icones';
import styles from './ClienteDetalhe.module.css';
import { buscarCliente, listarVendasDoCliente, formatarCpf, formatarTelefone, formatarMoeda, formatarData } from '../../services/clientes';

export default function ClienteDetalhe() {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [vendas, setVendas] = useState([]);
  const [temMais, setTemMais] = useState(false);
  const [paginaVendas, setPaginaVendas] = useState(0);
  
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const carregar = async () => {
      try {
        const dadosCliente = await buscarCliente(id);
        setCliente(dadosCliente);
        
        const dadosVendas = await listarVendasDoCliente(id, { pagina: 0, tamanho: 20 });
        setVendas(dadosVendas.conteudo || []);
        setTemMais(!dadosVendas.ultima);
      } catch (err) {
        setErro('Erro ao carregar os detalhes do cliente.');
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, [id]);

  const carregarMais = async () => {
    try {
      const proxima = paginaVendas + 1;
      const dadosVendas = await listarVendasDoCliente(id, { pagina: proxima, tamanho: 20 });
      setVendas(v => [...v, ...(dadosVendas.conteudo || [])]);
      setTemMais(!dadosVendas.ultima);
      setPaginaVendas(proxima);
    } catch (err) {
      console.error(err);
    }
  };

  if (carregando) {
    return (
      <AppLayout cabecalho={{ titulo: 'Cliente', esquerda: 'voltar' }}>
        <p className="texto-apoio" style={{padding: '20px'}}>Carregando...</p>
      </AppLayout>
    );
  }

  if (erro || !cliente) {
    return (
      <AppLayout cabecalho={{ titulo: 'Cliente', esquerda: 'voltar' }}>
        <p className="texto-apoio" style={{padding: '20px', color: 'red'}}>{erro || 'Cliente não encontrado'}</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout cabecalho={{ titulo: 'Cliente', esquerda: 'voltar' }}>
      <Link to="/clientes" className={styles.voltar}>
        ‹ Clientes
      </Link>

      <section className={styles.dados}>
        <h2 className={styles.nome}>{cliente.nomeCompleto}</h2>
        <p className={styles.cpf}>CPF {formatarCpf(cliente.cpf)}</p>
        <hr className={styles.divisor} />
        {cliente.telefones?.map((t, index) => (
          <p key={index} className={styles.linha}>
            {formatarTelefone(t.telefone)} · {t.tipoTelefone} {t.principal ? '· principal' : ''}
          </p>
        ))}
        {cliente.enderecos?.length === 0 && <p className={styles.linha}>Nenhum endereço cadastrado.</p>}
        {cliente.enderecos?.map((e, index) => (
          <p key={index} className={styles.linha}>
            {e.logradouro}, {e.numero} {e.complemento ? `- ${e.complemento}` : ''} · {e.bairro}, {e.cidade}
          </p>
        ))}
        <div className={styles.acoes}>
          <Link to={`/clientes/${id}/editar`} className={styles.botaoSecundario}>
            Editar
          </Link>
          <Link to="/vendas/nova" className={styles.botaoPrimario}>
            Nova venda
          </Link>
        </div>
      </section>

      <div className={styles.totais}>
        <div className={styles.total}>
          <span className="rotulo-secao">COMPRAS</span>
          <strong>{cliente.totalCompras || vendas.length}</strong>
        </div>
        <div className={styles.total}>
          <span className="rotulo-secao">TOTAL GASTO</span>
          <strong>{formatarMoeda(cliente.totalGasto)}</strong>
        </div>
      </div>

      <h3 className="rotulo-secao">HISTÓRICO DE COMPRAS</h3>

      <ul className={styles.vendas}>
        {vendas.length === 0 && <p className="texto-apoio" style={{margin: '10px 0'}}>Nenhuma venda registrada.</p>}
        {vendas.map((v) => (
          <li key={v.id}>
            <Link to={`/vendas/${v.id}`} className={styles.venda}>
              <span className={styles.esquerda}>
                <span className={styles.vendaNumero}>Venda #{v.id}</span>
                <span className={styles.vendaData}>{formatarData(v.dataCriacao)}</span>
              </span>
              <span className={styles.direita}>
                <span className={styles.vendaValor}>{formatarMoeda(v.totalLiquido)}</span>
                <BadgeStatus status={v.statusVenda} />
              </span>
              <img src={icones.chevronDireita} width={7.4} height={12} alt="" />
            </Link>
          </li>
        ))}
      </ul>

      {temMais && (
        <button type="button" className={styles.botaoSecundario} onClick={carregarMais}>
          Carregar mais compras
        </button>
      )}
    </AppLayout>
  );
}
