import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';

import CampoBusca from '../../components/CampoBusca';
import Chip, { LinhaChips } from '../../components/Chip';
import { BadgeStatus } from '../../components/Badge';
import BotaoFlutuante from '../../components/BotaoFlutuante';
import { icones } from '../../components/icones';
import calendario from '../../assets/icons/calendario.svg';
import styles from './Vendas.module.css';

import { listarVendas, resumoVendas } from '../../services/vendas';

const ABAS = [
  { rotulo: 'Todas', status: null },
  { rotulo: 'Pendentes', status: 'PENDENTE' },
  { rotulo: 'Pagas', status: 'PAGA' },
  { rotulo: 'Canceladas', status: 'CANCELADA' },
];

const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const moeda = (v) => Number(v || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function formatarData(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  const hoje = new Date();
  if (d.toDateString() === hoje.toDateString()) {
    return `Hoje, ${d.getHours()}h${String(d.getMinutes()).padStart(2, '0')}`;
  }
  return `${d.getDate()} ${MESES[d.getMonth()]} ${d.getFullYear()}`;
}

export default function Vendas() {
  const [busca, setBusca] = useState('');
  const [status, setStatus] = useState(null);
  
  const [vendas, setVendas] = useState([]);
  const [resumo, setResumo] = useState(null);
  const [pagina, setPagina] = useState(0);
  const [temMais, setTemMais] = useState(false);
  
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  // Carrega o resumo uma vez
  useEffect(() => {
    resumoVendas()
      .then(setResumo)
      .catch(() => console.error("Erro ao carregar resumo de vendas"));
  }, []);

  // Carrega a lista quando mudar busca, status ou para a pagina 0
  useEffect(() => {
    const carregar = async () => {
      setCarregando(true);
      setErro('');
      try {
        // Usa o estado local ou query param para filtrar o status na API se for suportado,
        // mas o backend listarVendas() no Controller nao tem param `status`!
        // Wait, I saw `@RequestParam(required = false) String busca`
        // No status filter in the backend!
        // We will fetch ALL and filter locally for now.
        
        const data = await listarVendas({ busca, pagina: 0, tamanho: 100 });
        setVendas(data.conteudo || []);
        setTemMais(!data.ultima);
        setPagina(0);
      } catch (err) {
        setErro('Erro ao carregar vendas.');
      } finally {
        setCarregando(false);
      }
    };
    
    const timeout = setTimeout(carregar, 300);
    return () => clearTimeout(timeout);
  }, [busca]);

  const carregarMais = async () => {
    try {
      const proxima = pagina + 1;
      const data = await listarVendas({ busca, pagina: proxima, tamanho: 100 });
      setVendas(v => [...v, ...(data.conteudo || [])]);
      setTemMais(!data.ultima);
      setPagina(proxima);
    } catch (err) {
      console.error(err);
    }
  };

  const filtradas = status ? vendas.filter(v => v.statusVendaSituacaoSituacao === status) : vendas;

  return (
    <AppLayout
      cabecalho={{ titulo: 'Vendas' }}
      flutuante={<BotaoFlutuante rotulo="Nova venda" para="/vendas/nova" />}
    >
      <div className={styles.filtros}>
        <CampoBusca placeholder="ID, cliente..." valor={busca} onChange={setBusca} />
        <LinhaChips rotulo="Filtro">
          {ABAS.map((a) => (
            <Chip key={a.rotulo} ativo={status === a.status} onClick={() => setStatus(a.status)}>
              {a.rotulo}
            </Chip>
          ))}
        </LinhaChips>
      </div>

      <section className={styles.resumo} aria-label="Resumo de vendas">
        <div className={styles.cartaoResumo}>
          <span className={styles.resumoRotulo}>Total Mensal</span>
          <strong className={styles.resumoValor}>{resumo ? moeda(resumo.totalMes) : '...'}</strong>
        </div>
        <div className={styles.cartaoResumo}>
          <span className={styles.resumoRotulo}>Vendas Hoje</span>
          <strong className={styles.resumoValor}>{resumo ? resumo.vendasHoje : '...'}</strong>
          <span className={styles.resumoDetalhe}>
             {resumo ? `Média: ${Math.round(resumo.mediaDiaria || 0)}/dia` : '...'}
          </span>
        </div>
        <div className={styles.cartaoResumo}>
          <span className={styles.resumoRotulo}>Ticket Médio</span>
          <strong className={styles.resumoValor}>{resumo ? moeda(resumo.ticketMedio) : '...'}</strong>
        </div>
      </section>

      <section className={styles.lista}>
        <div className={styles.cabecalhoLista}>
          <h2 className={styles.tituloLista}>Lista de Vendas</h2>
          <span className="rotulo-secao">
            {filtradas.length} {filtradas.length === 1 ? 'resultado' : 'resultados'}
          </span>
        </div>

        {carregando && <p className={`texto-apoio ${styles.vazio}`}>Carregando...</p>}
        {!carregando && erro && <p className={`texto-apoio ${styles.vazio}`} style={{color: 'red'}}>{erro}</p>}
        {!carregando && !erro && filtradas.length === 0 && <p className={`texto-apoio ${styles.vazio}`}>Nenhuma venda encontrada.</p>}

        {!carregando && !erro && filtradas.map((v) => (
          <Link key={v.id} to={`/vendas/${v.id}`} className={styles.venda}>
            <div className={styles.vendaTopo}>
              <div className={styles.vendaInfo}>
                <span className="rotulo-secao">ID #{v.id}</span>
                <h3 className={styles.cliente}>{v.clienteNome}</h3>
                <span className={styles.data}>
                  <img src={calendario} width={12} height={13.33} alt="" />
                  {formatarData(v.dataVenda)}
                </span>
              </div>
              <div className={styles.vendaValor}>
                <strong className={styles.valor}>{moeda(v.valorTotal)}</strong>
                <BadgeStatus status={v.statusVendaSituacao} />
              </div>
            </div>
            <div className={styles.vendaRodape}>
              <span className="rotulo-secao">
                {v.parcelasPagas || 0}/{v.qtdParcelas} pagas
              </span>
              <span className={styles.verDetalhes}>
                Ver Detalhes do Pagamento
                <img src={icones.chevronDireita} width={5.55} height={9} alt="" />
              </span>
            </div>
          </Link>
        ))}

        {temMais && (
          <div className={styles.carregarMais}>
            <button type="button" className={styles.botaoMais} onClick={carregarMais}>
              Carregar mais vendas
              <img src={icones.chevronBaixo} width={12} height={7.4} alt="" />
            </button>
          </div>
        )}
      </section>
    </AppLayout>
  );
}
