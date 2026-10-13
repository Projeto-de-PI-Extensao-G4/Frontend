import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';

import CampoBusca from '../../components/CampoBusca';
import Campo from '../../components/Campo';
import Chip, { LinhaChips } from '../../components/Chip';
import Botao from '../../components/Botao';
import FolhaInferior from '../../components/FolhaInferior';
import { iconesNavegacao } from '../../components/icones';
import iconeCalendario from '../../assets/icons/calendario-campo.svg';
import iconePix from '../../assets/icons/forma-pix.svg';
import iconeBoleto from '../../assets/icons/forma-boleto.svg';
import styles from './Extrato.module.css';

import { listarPagamentos, resumoPagamentos } from '../../services/pagamentos';
import { listarFormasPagamento } from '../../services/formasPagamento';

const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const MESES_EXTENSO = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];
const DIA_MS = 24 * 60 * 60 * 1000;

const ICONE_FORMA = {
  PIX: { src: iconePix, largura: 18, altura: 18 },
  Boleto: { src: iconeBoleto, largura: 18, altura: 20 },
};
const ICONE_PADRAO = iconesNavegacao.pagamentos;

const dois = (n) => String(n).padStart(2, '0');
const paraIso = (d) => `${d.getFullYear()}-${dois(d.getMonth() + 1)}-${dois(d.getDate())}`;
const deIso = (iso) => {
  const [a, m, d] = iso.split('-').map(Number);
  return new Date(a, m - 1, d);
};
const somaDias = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const paraBr = (iso) => iso.split('-').reverse().join('/');
const dinheiro = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function periodoPadrao(hoje) {
  return { de: paraIso(somaDias(hoje, -30)), ate: paraIso(hoje) };
}

function rotuloDia(iso, hoje) {
  if (!iso) return 'Data não informada';
  const d = deIso(iso);
  const diff = Math.round((hoje.getTime() - d.getTime()) / DIA_MS);
  const ano = d.getFullYear() !== hoje.getFullYear() ? ` de ${d.getFullYear()}` : '';
  const texto = `${d.getDate()} de ${MESES_EXTENSO[d.getMonth()]}${ano}`;
  if (diff === 0) return `Hoje, ${texto}`;
  if (diff === 1) return `Ontem, ${texto}`;
  return texto;
}

function resumoPeriodo(de, ate, qtd) {
  const a = deIso(de);
  const b = deIso(ate);
  const curto = (d, comAno) => `${dois(d.getDate())} ${MESES[d.getMonth()]}${comAno ? ` ${d.getFullYear()}` : ''}`;
  const mesmoAno = a.getFullYear() === b.getFullYear();
  return `${curto(a, !mesmoAno)} – ${curto(b, true)} · ${qtd} ${qtd === 1 ? 'pagamento' : 'pagamentos'}`;
}

function CampoData({ rotulo, valor, min, max, onChange }) {
  return (
    <label className={styles.data}>
      <img src={iconeCalendario} width={18} height={18} alt="" />
      <span className={styles.dataTexto}>
        <span className={styles.dataRotulo}>{rotulo}</span>
        <span className={styles.dataValor}>{paraBr(valor)}</span>
      </span>
      <input
        type="date"
        className={styles.dataInput}
        value={valor}
        min={min}
        max={max}
        aria-label={rotulo === 'DE' ? 'Período de' : 'Período até'}
        onChange={(e) => e.target.value && onChange(e.target.value)}
        onClick={(e) => e.currentTarget.showPicker?.()}
      />
    </label>
  );
}

export default function Extrato() {
  const hoje = useMemo(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }, []);
  const hojeIso = paraIso(hoje);

  const [formasPagamento, setFormasPagamento] = useState([]);
  
  const [periodo, setPeriodo] = useState(() => periodoPadrao(hoje));
  const [busca, setBusca] = useState('');
  const [formaId, setFormaId] = useState('');
  const [valorMin, setValorMin] = useState('');
  const [valorMax, setValorMax] = useState('');
  
  const [pagamentos, setPagamentos] = useState([]);
  const [resumo, setResumo] = useState({ valorTotal: 0, quantidade: 0 });
  const [carregando, setCarregando] = useState(true);
  
  const [folha, setFolha] = useState(null); // 'forma' | 'filtros' | null
  const [rascunho, setRascunho] = useState({ min: '', max: '' });

  useEffect(() => {
    listarFormasPagamento().then(setFormasPagamento).catch(console.error);
  }, []);

  const carregarTudo = async () => {
    setCarregando(true);
    try {
      const min = valorMin === '' ? null : Number(valorMin.replace(',', '.'));
      const max = valorMax === '' ? null : Number(valorMax.replace(',', '.'));
      
      const params = {
        inicio: periodo.de,
        fim: periodo.ate,
        tamanho: 100 // Extrato simples pega os últimos 100 para o periodo
      };
      if (busca.trim()) params.clienteNome = busca.trim();
      if (formaId) params.formaPagamentoId = formaId;
      if (min) params.valorMin = min;
      if (max) params.valorMax = max;
      
      const [resLista, resResumo] = await Promise.all([
        listarPagamentos(params),
        resumoPagamentos(params)
      ]);
      
      setPagamentos(resLista.conteudo || []);
      setResumo(resResumo);
    } catch (err) {
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(carregarTudo, 300);
    return () => clearTimeout(timer);
  }, [busca, periodo.de, periodo.ate, formaId, valorMin, valorMax]);

  const mudarData = (lado, iso) => {
    setPeriodo((p) => {
      const novo = { ...p, [lado]: iso };
      return novo.de > novo.ate ? { de: novo.ate, ate: novo.de } : novo;
    });
  };

  const grupos = useMemo(() => {
    const porDia = new Map();
    pagamentos.forEach((p) => {
      const diaIso = p.dataPagamento ? p.dataPagamento.split('T')[0] : '';
      porDia.set(diaIso, [...(porDia.get(diaIso) ?? []), p]);
    });
    // sort maps by date descending
    return [...porDia.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [pagamentos]);

  const comFiltro = Boolean(busca.trim() || formaId || valorMin || valorMax);
  const padrao = periodoPadrao(hoje);
  const periodoEhPadrao = periodo.de === padrao.de && periodo.ate === padrao.ate;

  const limparFiltros = () => {
    setBusca('');
    setFormaId('');
    setValorMin('');
    setValorMax('');
    setPeriodo(periodoPadrao(hoje));
  };

  const abrirFiltros = () => {
    setRascunho({ min: valorMin, max: valorMax });
    setFolha('filtros');
  };

  const aplicarFiltros = () => {
    setValorMin(rascunho.min);
    setValorMax(rascunho.max);
    setFolha(null);
  };

  const getNomeForma = (id) => formasPagamento.find(f => f.id === id)?.nome || 'Todas';

  return (
    <AppLayout cabecalho={{ titulo: 'Extrato', esquerda: 'menu' }}>
      <div className={styles.filtros}>
        <CampoBusca placeholder="Buscar por cliente..." valor={busca} onChange={setBusca} />

        <div className={styles.periodo}>
          <p className={styles.periodoRotulo}>PERÍODO{periodoEhPadrao ? ' · últimos 30 dias' : ''}</p>
          <div className={styles.datas}>
            <CampoData rotulo="DE" valor={periodo.de} max={periodo.ate} onChange={(v) => mudarData('de', v)} />
            <CampoData rotulo="ATÉ" valor={periodo.ate} min={periodo.de} max={hojeIso} onChange={(v) => mudarData('ate', v)} />
          </div>
        </div>

        <LinhaChips rotulo="Filtros">
          <Chip ativo={Boolean(formaId)} onClick={() => setFolha('forma')}>
            {formaId ? getNomeForma(formaId) : 'Forma de pagamento'}
          </Chip>
          <Chip ativo={Boolean(valorMin || valorMax)} onClick={abrirFiltros}>
            {valorMin || valorMax ? 'Valor filtrado' : 'Mais filtros'}
          </Chip>
          {(comFiltro || !periodoEhPadrao) && (
            <Chip onClick={limparFiltros}>Limpar</Chip>
          )}
        </LinhaChips>
      </div>

      <section className={styles.resumo} aria-live="polite">
        <p className={styles.resumoRotulo}>RECEBIDO NO PERÍODO</p>
        <p className={styles.resumoTotal}>{dinheiro(resumo?.valorTotal || 0)}</p>
        <p className={styles.resumoPeriodo}>{resumoPeriodo(periodo.de, periodo.ate, resumo?.quantidade || 0)}</p>
      </section>

      {carregando && <p className="texto-apoio" style={{padding: 20}}>Carregando extrato...</p>}

      {!carregando && pagamentos.length === 0 ? (
        <section className={styles.vazio}>
          <div className={styles.vazioIcone}>
            <img src={iconeCalendario} width={25} height={25} alt="" />
          </div>
          <h2 className={styles.vazioTitulo}>
            {comFiltro ? 'Nenhum pagamento encontrado com esses filtros' : 'Nenhum pagamento recebido neste período'}
          </h2>
          <p className={styles.vazioTexto}>
            {comFiltro
              ? 'Tente outros filtros ou um período maior.'
              : `Entre ${paraBr(periodo.de)} e ${paraBr(periodo.ate)} não entrou nenhuma parcela paga. Tente um período maior.`}
          </p>
          {comFiltro ? (
            <Botao className={styles.vazioBotao} larguraTotal={false} onClick={limparFiltros}>
              Limpar filtros
            </Botao>
          ) : (
            <Botao className={styles.vazioBotao} larguraTotal={false} onClick={() => setPeriodo(periodoPadrao(hoje))}>
              Ver últimos 30 dias
            </Botao>
          )}
        </section>
      ) : !carregando && (
        <div className={styles.lista}>
          {grupos.map(([dia, itens]) => (
            <section key={dia} className={styles.grupo}>
              <h2 className={styles.grupoTitulo}>{rotuloDia(dia, hoje)}</h2>
              {itens.map((p) => {
                const icone = ICONE_FORMA[p.formaPagamentoNome] ?? ICONE_PADRAO;
                return (
                  <Link key={p.parcelamentoId} to={`/vendas/${p.vendaId}`} className={styles.linha}>
                    <span className={styles.linhaIcone}>
                      <img src={icone.src} width={icone.largura} height={icone.altura} alt="" />
                    </span>
                    <span className={styles.linhaInfo}>
                      <span className={styles.linhaCliente}>{p.clienteNome}</span>
                      <span className={styles.linhaDetalhe}>
                        {p.formaPagamentoNome} · Parcela {p.numeroParcela}/{p.qtdParcelas}
                      </span>
                    </span>
                    <span className={styles.linhaValor}>
                      <span className={styles.linhaPreco}>{dinheiro(p.valorParcela)}</span>
                      <span className={styles.selo}>PAGO</span>
                    </span>
                  </Link>
                );
              })}
            </section>
          ))}
        </div>
      )}

      <FolhaInferior aberta={folha === 'forma'} onFechar={() => setFolha(null)} titulo="Forma de pagamento">
        <div className={styles.opcoes} role="radiogroup" aria-label="Forma de pagamento">
          <button
            type="button"
            role="radio"
            aria-checked={formaId === ''}
            className={`${styles.opcao} ${formaId === '' ? styles.opcaoAtiva : ''}`}
            onClick={() => {
              setFormaId('');
              setFolha(null);
            }}
          >
            Todas
          </button>
          {formasPagamento.map((f) => (
            <button
              key={f.id}
              type="button"
              role="radio"
              aria-checked={formaId === f.id}
              className={`${styles.opcao} ${formaId === f.id ? styles.opcaoAtiva : ''}`}
              onClick={() => {
                setFormaId(f.id);
                setFolha(null);
              }}
            >
              {f.nome}
            </button>
          ))}
        </div>
      </FolhaInferior>

      <FolhaInferior aberta={folha === 'filtros'} onFechar={() => setFolha(null)} titulo="Mais filtros">
        <div className={styles.faixa}>
          <Campo
            rotulo="Valor mínimo (R$)"
            id="valor-min"
            inputMode="decimal"
            placeholder="0,00"
            value={rascunho.min}
            onChange={(e) => setRascunho((r) => ({ ...r, min: e.target.value }))}
          />
          <Campo
            rotulo="Valor máximo (R$)"
            id="valor-max"
            inputMode="decimal"
            placeholder="0,00"
            value={rascunho.max}
            onChange={(e) => setRascunho((r) => ({ ...r, max: e.target.value }))}
          />
        </div>
        <Botao onClick={aplicarFiltros}>Aplicar</Botao>
        <Botao
          variante="secundario"
          onClick={() => {
            setValorMin('');
            setValorMax('');
            setFolha(null);
          }}
        >
          Limpar faixa de valor
        </Botao>
      </FolhaInferior>
    </AppLayout>
  );
}
