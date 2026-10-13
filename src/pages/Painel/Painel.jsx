import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import { LinhaChips } from '../../components/Chip';
import BotaoFlutuante from '../../components/BotaoFlutuante';
import FolhaPeriodo from './FolhaPeriodo';
import { formatarIntervalo, mesmoDia } from './datas';
import { obterMetricasDashboard } from '../../services/dashboard';
import { listarCategorias, formatarMoeda } from '../../services/produtos';

import iconeTendencia from '../../assets/icons/tendencia-alta-pequena.svg';
import iconeGrafico from '../../assets/icons/grafico-barras.svg';
import iconeRoupas from '../../assets/icons/categoria-roupas.svg';
import iconeMesa from '../../assets/icons/categoria-mesa.svg';
import iconeBanho from '../../assets/icons/categoria-banho.svg';
import iconeImoveis from '../../assets/icons/categoria-imoveis.svg';
import styles from './Painel.module.css';

const HOJE = new Date();

const ATALHOS = [
  { id: '7', rotulo: '7 dias' },
  { id: '30', rotulo: '30 dias' },
  { id: 'mes', rotulo: 'Este mês' },
  { id: 'outro', rotulo: 'Outro' },
];

const ICONES_CATEGORIAS = {
  ROUPAS: { icone: iconeRoupas, largura: 16.667, altura: 11.667 },
  MESA: { icone: iconeMesa, largura: 15, altura: 15 },
  BANHO: { icone: iconeBanho, largura: 16.667, altura: 16.667 },
  IMOVEIS: { icone: iconeImoveis, largura: 16.667, altura: 15 },
};

const CATEGORIAS_PADRAO = [
  { id: 1, nome: 'ROUPAS', rotulo: 'Roupas', icone: iconeRoupas, largura: 16.667, altura: 11.667 },
  { id: 2, nome: 'MESA', rotulo: 'Mesa', icone: iconeMesa, largura: 15, altura: 15 },
  { id: 3, nome: 'BANHO', rotulo: 'Banho', icone: iconeBanho, largura: 16.667, altura: 16.667 },
  { id: 4, nome: 'IMOVEIS', rotulo: 'Imóveis', icone: iconeImoveis, largura: 16.667, altura: 15 },
];

function somarDias(data, dias) {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate() + dias);
}

function intervaloDoAtalho(id, hoje = HOJE) {
  if (id === '7') return { inicio: somarDias(hoje, -6), fim: hoje };
  if (id === '30') return { inicio: somarDias(hoje, -29), fim: hoje };
  return { inicio: new Date(hoje.getFullYear(), hoje.getMonth(), 1), fim: hoje };
}

const DIAS_SEMANA = [
  { index: 1, rotulo: 'Seg', nomeCompleto: 'Segunda-feira' },
  { index: 2, rotulo: 'Ter', nomeCompleto: 'Terça-feira' },
  { index: 3, rotulo: 'Qua', nomeCompleto: 'Quarta-feira' },
  { index: 4, rotulo: 'Qui', nomeCompleto: 'Quinta-feira' },
  { index: 5, rotulo: 'Sex', nomeCompleto: 'Sexta-feira' },
  { index: 6, rotulo: 'Sáb', nomeCompleto: 'Sábado' },
  { index: 0, rotulo: 'Dom', nomeCompleto: 'Domingo' },
];

function agruparPorDiaDaSemana(pontos, hoje) {
  const mapa = {
    1: { total: 0, count: 0 },
    2: { total: 0, count: 0 },
    3: { total: 0, count: 0 },
    4: { total: 0, count: 0 },
    5: { total: 0, count: 0 },
    6: { total: 0, count: 0 },
    0: { total: 0, count: 0 },
  };

  (pontos || []).forEach((p) => {
    if (!p.data) return;
    const [ano, mes, dia] = p.data.split('-').map(Number);
    const dateObj = new Date(ano, mes - 1, dia);
    const dayOfWeek = dateObj.getDay();
    if (mapa[dayOfWeek]) {
      mapa[dayOfWeek].total += Number(p.valor || 0);
      mapa[dayOfWeek].count += 1;
    }
  });

  const hojeIndex = hoje.getDay();
  const barrasBase = DIAS_SEMANA.map((dia) => {
    const dadosDia = mapa[dia.index];
    const total = dadosDia.total;
    const media = dadosDia.count > 0 ? total / dadosDia.count : 0;
    const ehHoje = dia.index === hojeIndex;
    return {
      rotulo: dia.rotulo,
      nomeCompleto: dia.nomeCompleto,
      total,
      media,
      ehHoje,
    };
  });

  const maiorValor = Math.max(...barrasBase.map((b) => b.total), 0);
  const temVenda = maiorValor > 0;

  return barrasBase.map((b) => ({
    ...b,
    altura: temVenda ? Math.max(Math.round((b.total / maiorValor) * 100), b.total > 0 ? 12 : 6) : 6,
    ehCampeao: temVenda && b.total === maiorValor,
  }));
}

function formatarParaIso(data) {
  if (!data) return '';
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function formatarVariacao(v) {
  if (v == null) return null;
  const sinal = v > 0 ? '+' : '';
  return `${sinal}${v.toFixed(1)}%`;
}

function Indicador({ variacao, legenda }) {
  if (!variacao) {
    return (
      <p className={styles.indicador}>
        <span className={styles.legenda}>{legenda}</span>
      </p>
    );
  }
  const ehNegativo = variacao.startsWith('-');
  return (
    <p className={styles.indicador}>
      <img
        src={iconeTendencia}
        width={14}
        height={6}
        alt=""
        style={{ transform: ehNegativo ? 'rotate(180deg)' : 'none' }}
      />
      <span className={ehNegativo ? styles.variacaoNegativa : styles.variacao}>{variacao}</span>
      <span className={styles.legenda}>{legenda}</span>
    </p>
  );
}

export default function Painel() {
  const [atalho, setAtalho] = useState('30');
  const [periodo, setPeriodo] = useState(() => intervaloDoAtalho('30', HOJE));
  const [folhaAberta, setFolhaAberta] = useState(false);
  const [categoriaId, setCategoriaId] = useState(null);
  const [categorias, setCategorias] = useState(CATEGORIAS_PADRAO);

  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Carrega categorias da API
  useEffect(() => {
    listarCategorias()
      .then((lista) => {
        if (Array.isArray(lista) && lista.length > 0) {
          setCategorias(
            lista.map((c) => {
              const nomeUpper = (c.nome || '').toUpperCase();
              const iconInfo = ICONES_CATEGORIAS[nomeUpper] || {
                icone: iconeRoupas,
                largura: 16,
                altura: 16,
              };
              return {
                id: c.id,
                nome: c.nome,
                rotulo: c.nome.charAt(0).toUpperCase() + c.nome.slice(1).toLowerCase(),
                ...iconInfo,
              };
            })
          );
        }
      })
      .catch((err) => console.error('Erro ao buscar categorias:', err));
  }, []);

  // Carrega dados da dashboard do backend
  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    setErro(null);

    const dataInicio = formatarParaIso(periodo.inicio);
    const dataFim = formatarParaIso(periodo.fim);

    obterMetricasDashboard({
      dataInicio,
      dataFim,
      categoriaId: categoriaId || undefined,
    })
      .then((res) => {
        if (ativo) {
          setDados(res);
        }
      })
      .catch((err) => {
        if (ativo) {
          console.error('Erro ao carregar dados do painel:', err);
          setErro('Não foi possível carregar as métricas do painel.');
        }
      })
      .finally(() => {
        if (ativo) {
          setCarregando(false);
        }
      });

    return () => {
      ativo = false;
    };
  }, [periodo, categoriaId]);

  const escolherAtalho = (id) => {
    if (id === 'outro') {
      setFolhaAberta(true);
      return;
    }
    setAtalho(id);
    setPeriodo(intervaloDoAtalho(id, HOJE));
  };

  const aplicar = (novo) => {
    setPeriodo(novo);
    setAtalho('outro');
    setFolhaAberta(false);
  };

  // Uma categoria por vez; tocar na ativa desmarca (= todas)
  const escolherCategoria = (id) => {
    setCategoriaId((atual) => (atual === id ? null : id));
  };

  // Gráfico consolidado por dia da semana (Segunda a Domingo)
  const barras = agruparPorDiaDaSemana(dados?.grafico || [], HOJE);
  const campeao = barras.find((b) => b.ehCampeao);

  // Produtos mais vendidos
  const maisVendidos = dados?.produtosMaisVendidos || [];

  return (
    <AppLayout
      cabecalho={{ titulo: 'Cris Utilidades', esquerda: 'menu' }}
      flutuante={<BotaoFlutuante rotulo="Registrar venda" para="/vendas/nova" />}
    >
      <div className={styles.pagina}>
        <header>
          <p className="rotulo-secao">Gestão comercial</p>
          <h2 className={styles.titulo}>Painel</h2>
        </header>

        {erro && (
          <div className={styles.erroAviso} role="alert">
            <span>{erro}</span>
            <button
              type="button"
              className={styles.alterar}
              onClick={() => setPeriodo({ ...periodo })}
            >
              Tentar novamente
            </button>
          </div>
        )}

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
            <span className={styles.intervaloTexto}>
              {formatarIntervalo(periodo.inicio, periodo.fim)}
            </span>
            <span className={styles.alterar}>Alterar</span>
          </button>
        </div>

        <LinhaChips rotulo="Categoria">
          {categorias.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={categoriaId === c.id}
              className={`${styles.chip} ${categoriaId === c.id ? styles.chipAtivo : ''}`}
              onClick={() => escolherCategoria(c.id)}
            >
              <img
                src={c.icone}
                width={c.largura}
                height={c.altura}
                alt=""
                className={styles.chipIcone}
              />
              {c.rotulo}
            </button>
          ))}
        </LinhaChips>

        <section
          className={styles.metricas}
          aria-label="Métricas"
          style={{ opacity: carregando ? 0.7 : 1, transition: 'opacity 0.2s ease' }}
        >
          <div className={styles.metrica}>
            <p className="rotulo-secao">VENDAS</p>
            <div>
              <p className={styles.valor}>{dados ? (dados.qtdVendas ?? 0).toLocaleString('pt-BR') : '—'}</p>
              <Indicador
                variacao={formatarVariacao(dados?.variacaoVendas)}
                legenda="pedidos"
              />
            </div>
          </div>

          <div className={styles.metrica}>
            <p className="rotulo-secao">FATURAMENTO</p>
            <div>
              <p className={styles.valor}>{dados ? formatarMoeda(dados.faturamento) : '—'}</p>
              <Indicador
                variacao={formatarVariacao(dados?.variacaoFaturamento)}
                legenda="total bruto"
              />
            </div>
          </div>

          <div className={`${styles.metrica} ${styles.metricaLarga}`}>
            <span className={styles.circulo} aria-hidden="true" />
            <div>
              <p className="rotulo-secao">Produtos</p>
              <p className={styles.valor}>{dados ? (dados.produtosVendidos ?? 0).toLocaleString('pt-BR') : '—'}</p>
              <Indicador
                variacao={formatarVariacao(dados?.variacaoProdutosVendidos)}
                legenda="vendidos"
              />
            </div>
          </div>
        </section>

        <section className={styles.cartaoGrafico}>
          <div className={styles.cabecalhoGrafico}>
            <h3 className={styles.tituloCartao}>
              <img src={iconeGrafico} width={18} height={18} alt="" />
              Vendas por dia da semana
            </h3>
            <p className={styles.subtituloGrafico}>
              Total faturado consolidado por dia da semana no período selecionado
            </p>
          </div>

          <div className={styles.grafico}>
            <div className={styles.linhasEscala} aria-hidden="true">
              <span /><span /><span /><span />
            </div>
            {barras.map((b) => (
              <div
                key={b.rotulo}
                className={`${styles.barra} ${b.ehCampeao ? styles.barraCampeao : ''}`}
                style={{ height: `${b.altura}%` }}
                title={`${b.nomeCompleto}: ${formatarMoeda(b.total)}${b.media > 0 ? ` (Média: ${formatarMoeda(b.media)}/dia)` : ''}`}
              >
                <span className={styles.barraRotulo}>{b.rotulo}</span>
              </div>
            ))}
          </div>

          {campeao && campeao.total > 0 && (
            <div className={styles.destaqueCampeao}>
              🏆 <strong>{campeao.nomeCompleto}</strong> lidera as vendas com {formatarMoeda(campeao.total)} faturados no período.
            </div>
          )}

          <ul className={styles.legendaGrafico}>
            <li>
              <span className={`${styles.ponto} ${styles.pontoCampeao}`} />
              Dia mais forte
            </li>
            <li>
              <span className={styles.ponto} />
              Demais dias
            </li>
          </ul>
        </section>

        <section className={styles.lista}>
          <h3 className={`${styles.tituloCartao} ${styles.tituloLista}`}>
            Produtos mais vendidos
          </h3>
          <ol className={styles.itens}>
            {maisVendidos.length === 0 ? (
              <li className={styles.itemVazio}>
                Nenhum produto vendido neste período.
              </li>
            ) : (
              maisVendidos.map((p, i) => (
                <li key={p.produtoId || i} className={styles.item}>
                  <span className={styles.posicao}>{i + 1}.</span>
                  <div className={styles.itemTexto}>
                    <p className={styles.itemNome}>{p.nome}</p>
                    <p className={styles.itemCategoria}>
                      Categoria: {p.categoriaNome || 'Geral'}
                    </p>
                  </div>
                  <div className={styles.itemQtd}>
                    <p className={styles.unidades}>
                      {p.quantidadeVendida}
                      <br />
                      unid.
                    </p>
                    <p className={styles.itemValor}>{formatarMoeda(p.faturamento)}</p>
                  </div>
                </li>
              ))
            )}
          </ol>
          <Link to="/vendas" className={styles.relatorio}>
            Ver relatório completo
          </Link>
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
