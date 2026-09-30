import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import { BotaoBuscaHeader } from '../../components/Header';
import { LinhaChips } from '../../components/Chip';
import BotaoFlutuante from '../../components/BotaoFlutuante';
import FolhaPeriodo from './FolhaPeriodo';
import { formatarIntervalo } from './datas';
import iconeTendencia from '../../assets/icons/tendencia-alta-pequena.svg';
import iconeGrafico from '../../assets/icons/grafico-barras.svg';
import iconeRoupas from '../../assets/icons/categoria-roupas.svg';
import iconeMesa from '../../assets/icons/categoria-mesa.svg';
import iconeBanho from '../../assets/icons/categoria-banho.svg';
import iconeImoveis from '../../assets/icons/categoria-imoveis.svg';
import styles from './Painel.module.css';

// Dados fixos: a tela é estática, sem API.
const HOJE = new Date(2026, 8, 29);

const ATALHOS = [
  { id: '7', rotulo: '7 dias' },
  { id: '30', rotulo: '30 dias' },
  { id: 'mes', rotulo: 'Este mês' },
  { id: 'outro', rotulo: 'Outro' },
];

const CATEGORIAS = [
  { id: 'roupas', rotulo: 'Roupas', icone: iconeRoupas, largura: 16.667, altura: 11.667 },
  { id: 'mesa', rotulo: 'Mesa', icone: iconeMesa, largura: 15, altura: 15 },
  { id: 'banho', rotulo: 'Banho', icone: iconeBanho, largura: 16.667, altura: 16.667 },
  { id: 'imoveis', rotulo: 'Imóveis', icone: iconeImoveis, largura: 16.667, altura: 15 },
];

const METRICAS = [
  { id: 'vendas', rotulo: 'VENDAS', valor: '124', variacao: '+5.2%', legenda: 'pedidos' },
  { id: 'faturamento', rotulo: 'FATURAMENTO', valor: 'R$ 12.450', variacao: '+12.4%', legenda: 'total bruto' },
];

const GRAFICO = [
  { rotulo: 'Seg', altura: 40 },
  { rotulo: 'Ter', altura: 65 },
  { rotulo: 'Qua', altura: 55 },
  { rotulo: 'Qui', altura: 80 },
  { rotulo: 'Sex', altura: 75 },
  { rotulo: 'Sáb', altura: 100, atual: true },
  { rotulo: 'Dom', altura: 70 },
];

const MAIS_VENDIDOS = [
  { nome: 'Jogo de Lençol 400 fios - Premium', categoria: 'Roupas', unidades: 45, valor: 'R$ 8.550' },
  { nome: 'Toalha de Banho Gigante - Fio Penteado', categoria: 'Banho', unidades: 32, valor: 'R$ 2.400' },
  { nome: 'Mesa de Centro Rústica - Madeira Lei', categoria: 'Mesa', unidades: 28, valor: 'R$ 1.540' },
];

function somarDias(data, dias) {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate() + dias);
}

function intervaloDoAtalho(id) {
  if (id === '7') return { inicio: somarDias(HOJE, -6), fim: HOJE };
  if (id === '30') return { inicio: somarDias(HOJE, -29), fim: HOJE };
  return { inicio: new Date(HOJE.getFullYear(), HOJE.getMonth(), 1), fim: HOJE };
}

function Indicador({ variacao, legenda }) {
  return (
    <p className={styles.indicador}>
      <img src={iconeTendencia} width={14} height={6} alt="" />
      <span className={styles.variacao}>{variacao}</span>
      <span className={styles.legenda}>{legenda}</span>
    </p>
  );
}

export default function Painel() {
  const [atalho, setAtalho] = useState('7');
  const [periodo, setPeriodo] = useState(() => intervaloDoAtalho('7'));
  const [folhaAberta, setFolhaAberta] = useState(false);
  const [categoria, setCategoria] = useState('roupas');

  const escolherAtalho = (id) => {
    if (id === 'outro') {
      setFolhaAberta(true);
      return;
    }
    setAtalho(id);
    setPeriodo(intervaloDoAtalho(id));
  };

  const aplicar = (novo) => {
    setPeriodo(novo);
    setAtalho('outro');
    setFolhaAberta(false);
  };

  // Uma categoria por vez; tocar na ativa desmarca (= todas), como na spec §6.2.
  const escolherCategoria = (id) => setCategoria((atual) => (atual === id ? null : id));

  return (
    <AppLayout
      cabecalho={{ titulo: 'Cris Utilidades', esquerda: 'menu', direita: <BotaoBuscaHeader /> }}
      flutuante={<BotaoFlutuante rotulo="Registrar venda" para="/vendas/nova" />}
    >
      <div className={styles.pagina}>
        <header>
          <p className="rotulo-secao">Gestão comercial</p>
          <h2 className={styles.titulo}>Painel</h2>
        </header>

        <div className={styles.periodo}>
          <div className={styles.atalhos} role="group" aria-label="Período">
            {ATALHOS.map((a) => (
              <button
                key={a.id}
                type="button"
                aria-pressed={atalho === a.id}
                className={`${styles.atalho} ${atalho === a.id ? styles.atalhoAtivo : ''}`}
                onClick={() => escolherAtalho(a.id)}
              >
                {a.rotulo}
              </button>
            ))}
          </div>
          <button type="button" className={styles.intervalo} onClick={() => setFolhaAberta(true)}>
            <span className={styles.iconeCalendario} aria-hidden="true" />
            <span className={styles.intervaloTexto}>{formatarIntervalo(periodo.inicio, periodo.fim)}</span>
            <span className={styles.alterar}>Alterar</span>
          </button>
        </div>

        <LinhaChips rotulo="Categoria">
          {CATEGORIAS.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={categoria === c.id}
              className={`${styles.chip} ${categoria === c.id ? styles.chipAtivo : ''}`}
              onClick={() => escolherCategoria(c.id)}
            >
              <img src={c.icone} width={c.largura} height={c.altura} alt="" className={styles.chipIcone} />
              {c.rotulo}
            </button>
          ))}
        </LinhaChips>

        <section className={styles.metricas} aria-label="Métricas">
          {METRICAS.map((m) => (
            <div key={m.id} className={styles.metrica}>
              <p className="rotulo-secao">{m.rotulo}</p>
              <div>
                <p className={styles.valor}>{m.valor}</p>
                <Indicador variacao={m.variacao} legenda={m.legenda} />
              </div>
            </div>
          ))}
          <div className={`${styles.metrica} ${styles.metricaLarga}`}>
            <span className={styles.circulo} aria-hidden="true" />
            <div>
              <p className="rotulo-secao">Produtos</p>
              <p className={styles.valor}>342</p>
              <Indicador variacao="+8%" legenda="vendidos" />
            </div>
          </div>
        </section>

        <section className={styles.cartaoGrafico}>
          <h3 className={styles.tituloCartao}>
            <img src={iconeGrafico} width={18} height={18} alt="" />
            Gráfico de vendas
          </h3>
          <div className={styles.grafico}>
            <div className={styles.linhasEscala} aria-hidden="true">
              <span /><span /><span /><span />
            </div>
            {GRAFICO.map((b) => (
              <div
                key={b.rotulo}
                className={`${styles.barra} ${b.atual ? styles.barraAtual : ''}`}
                style={{ height: `${b.altura}%` }}
              >
                <span className={styles.barraRotulo}>{b.rotulo}</span>
              </div>
            ))}
          </div>
          <ul className={styles.legendaGrafico}>
            <li><span className={`${styles.ponto} ${styles.pontoAtual}`} />Atual</li>
            <li><span className={styles.ponto} />Média</li>
          </ul>
        </section>

        <section className={styles.lista}>
          <h3 className={`${styles.tituloCartao} ${styles.tituloLista}`}>Produtos mais vendidos</h3>
          <ol className={styles.itens}>
            {MAIS_VENDIDOS.map((p, i) => (
              <li key={p.nome} className={styles.item}>
                <span className={styles.posicao}>{i + 1}.</span>
                <div className={styles.itemTexto}>
                  <p className={styles.itemNome}>{p.nome}</p>
                  <p className={styles.itemCategoria}>Categoria: {p.categoria}</p>
                </div>
                <div className={styles.itemQtd}>
                  <p className={styles.unidades}>{p.unidades}<br />unid.</p>
                  <p className={styles.itemValor}>{p.valor}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link to="/vendas" className={styles.relatorio}>Ver relatório completo</Link>
        </section>
      </div>

      <FolhaPeriodo
        aberta={folhaAberta}
        onFechar={() => setFolhaAberta(false)}
        onAplicar={aplicar}
        inicial={periodo}
        hoje={HOJE}
      />
    </AppLayout>
  );
}
