import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import { BotaoBuscaHeader } from '../../components/Header';
import CampoBusca from '../../components/CampoBusca';
import Chip, { LinhaChips } from '../../components/Chip';
import { BadgeStatus } from '../../components/Badge';
import BotaoFlutuante from '../../components/BotaoFlutuante';
import { icones } from '../../components/icones';
import calendario from '../../assets/icons/calendario.svg';
import styles from './Vendas.module.css';

const VENDAS = [
  { id: 94821, clienteNome: 'Ricardo Oliveira Almeida', dataVenda: '2023-10-24T14:32:10', valorTotal: 1240, status: 'PAGA', parcelasPagas: 1, qtdParcelas: 1 },
  { id: 94819, clienteNome: 'Mariana Costa Silva', dataVenda: '2023-10-24T10:05:41', valorTotal: 450.2, status: 'PENDENTE', parcelasPagas: 1, qtdParcelas: 3 },
  { id: 94815, clienteNome: 'Paulo Henrique Souza', dataVenda: '2023-10-23T17:48:03', valorTotal: 8900, status: 'PAGA', parcelasPagas: 4, qtdParcelas: 4 },
  { id: 94810, clienteNome: 'Fernanda Gomes de Souza', dataVenda: '2023-10-23T09:12:59', valorTotal: 112, status: 'CANCELADA', parcelasPagas: 0, qtdParcelas: 2 },
  { id: 94802, clienteNome: 'Ana Beatriz Silva', dataVenda: '2023-10-22T16:20:00', valorTotal: 1250, status: 'PENDENTE', parcelasPagas: 1, qtdParcelas: 3 },
  { id: 94797, clienteNome: 'Carlos Eduardo Lima', dataVenda: '2023-10-21T11:37:22', valorTotal: 329.9, status: 'PAGA', parcelasPagas: 2, qtdParcelas: 2 },
  { id: 94790, clienteNome: 'Juliana Martins', dataVenda: '2023-10-20T15:01:48', valorTotal: 780, status: 'PENDENTE', parcelasPagas: 0, qtdParcelas: 5 },
  { id: 94781, clienteNome: 'Roberto Nascimento', dataVenda: '2023-10-19T08:55:16', valorTotal: 96.5, status: 'CANCELADA', parcelasPagas: 0, qtdParcelas: 1 },
];

const ABAS = [
  { rotulo: 'Todas', status: null },
  { rotulo: 'Pendentes', status: 'PENDENTE' },
  { rotulo: 'Pagas', status: 'PAGA' },
  { rotulo: 'Canceladas', status: 'CANCELADA' },
];

const RESUMO = [
  { rotulo: 'Total Mensal', valor: 'R$ 12.450,00' },
  { rotulo: 'Vendas Hoje', valor: '24', detalhe: 'Média: 18/dia' },
  { rotulo: 'Ticket Médio', valor: 'R$ 518,75' },
];

const POR_PAGINA = 4;
const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const moeda = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const semAcento = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// Formata sem passar por Date: evita o deslocamento de fuso (spec §3.1).
function formatarData(iso) {
  const [ano, mes, dia] = iso.slice(0, 10).split('-');
  return `${dia} ${MESES[Number(mes) - 1]}, ${ano}`;
}

function combina(venda, termo) {
  if (!termo) return true;
  const digitos = termo.replace(/\D/g, '');
  return semAcento(venda.clienteNome).includes(termo) || (digitos !== '' && String(venda.id).includes(digitos));
}

export default function Vendas() {
  const [busca, setBusca] = useState('');
  const [aba, setAba] = useState(ABAS[0].rotulo);
  const [visiveis, setVisiveis] = useState(POR_PAGINA);

  const status = ABAS.find((a) => a.rotulo === aba).status;
  const termo = semAcento(busca.trim());
  const filtradas = VENDAS.filter((v) => (!status || v.status === status) && combina(v, termo));
  const exibidas = filtradas.slice(0, visiveis);

  const escolherAba = (rotulo) => {
    setAba(rotulo);
    setVisiveis(POR_PAGINA);
  };
  const mudarBusca = (valor) => {
    setBusca(valor);
    setVisiveis(POR_PAGINA);
  };

  return (
    <AppLayout
      cabecalho={{ titulo: 'Cris Utilidades', esquerda: 'menu', direita: <BotaoBuscaHeader /> }}
      flutuante={<BotaoFlutuante rotulo="Nova venda" para="/vendas/nova" />}
    >
      <div className={styles.filtros}>
        <CampoBusca placeholder="Buscar vendas por cliente ou ID..." valor={busca} onChange={mudarBusca} />
        <LinhaChips rotulo="Filtrar por situação">
          {ABAS.map((a) => (
            <Chip key={a.rotulo} ativo={a.rotulo === aba} onClick={() => escolherAba(a.rotulo)}>
              {a.rotulo}
            </Chip>
          ))}
        </LinhaChips>
      </div>

      <section className={styles.resumo} aria-label="Resumo de vendas">
        {RESUMO.map((r) => (
          <div key={r.rotulo} className={styles.cartaoResumo}>
            <span className={styles.resumoRotulo}>{r.rotulo}</span>
            <strong className={styles.resumoValor}>{r.valor}</strong>
            {r.detalhe && <span className={styles.resumoDetalhe}>{r.detalhe}</span>}
          </div>
        ))}
      </section>

      <section className={styles.lista}>
        <div className={styles.cabecalhoLista}>
          <h2 className={styles.tituloLista}>Lista de Vendas</h2>
          <span className="rotulo-secao">
            {filtradas.length} {filtradas.length === 1 ? 'resultado' : 'resultados'}
          </span>
        </div>

        {exibidas.length === 0 && <p className={`texto-apoio ${styles.vazio}`}>Nenhuma venda encontrada.</p>}

        {exibidas.map((v) => (
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
                <BadgeStatus status={v.status} />
              </div>
            </div>
            <div className={styles.vendaRodape}>
              <span className="rotulo-secao">
                {v.parcelasPagas}/{v.qtdParcelas} pagas
              </span>
              <span className={styles.verDetalhes}>
                Ver Detalhes do Pagamento
                <img src={icones.chevronDireita} width={5.55} height={9} alt="" />
              </span>
            </div>
          </Link>
        ))}

        {visiveis < filtradas.length && (
          <div className={styles.carregarMais}>
            <button type="button" className={styles.botaoMais} onClick={() => setVisiveis((n) => n + POR_PAGINA)}>
              Carregar mais vendas
              <img src={icones.chevronBaixo} width={12} height={7.4} alt="" />
            </button>
          </div>
        )}
      </section>
    </AppLayout>
  );
}
