import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import { BotaoBuscaHeader } from '../../components/Header';
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

const FORMAS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito', 'PIX', 'Boleto', 'Cheque'];
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
// yyyy-MM-dd da data local (toISOString desloca o dia por causa do fuso).
const paraIso = (d) => `${d.getFullYear()}-${dois(d.getMonth() + 1)}-${dois(d.getDate())}`;
const deIso = (iso) => {
  const [a, m, d] = iso.split('-').map(Number);
  return new Date(a, m - 1, d);
};
const somaDias = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const paraBr = (iso) => iso.split('-').reverse().join('/');
const dinheiro = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Pagamentos de exemplo: dias contados para trás a partir de hoje.
const MOCK = [
  { id: 1, vendaId: 101, cliente: 'João Silva', forma: 'Cartão de crédito', parcela: '2/3', valor: 150, dias: 0 },
  { id: 2, vendaId: 102, cliente: 'Maria Oliveira', forma: 'PIX', parcela: '1/1', valor: 80, dias: 0 },
  { id: 3, vendaId: 103, cliente: 'Carlos Santos', forma: 'Boleto', parcela: '1/2', valor: 420.5, dias: 1 },
  { id: 4, vendaId: 104, cliente: 'Ana Souza', forma: 'Dinheiro', parcela: '1/1', valor: 60, dias: 3 },
  { id: 5, vendaId: 105, cliente: 'Pedro Lima', forma: 'Cartão de débito', parcela: '1/1', valor: 95, dias: 5 },
  { id: 6, vendaId: 101, cliente: 'João Silva', forma: 'Cartão de crédito', parcela: '1/3', valor: 150, dias: 6 },
  { id: 7, vendaId: 106, cliente: 'Luciana Ramos', forma: 'PIX', parcela: '1/2', valor: 210, dias: 9 },
  { id: 8, vendaId: 107, cliente: 'Marcos Pereira', forma: 'Cheque', parcela: '1/1', valor: 300, dias: 12 },
  { id: 9, vendaId: 108, cliente: 'Maria Oliveira', forma: 'PIX', parcela: '1/1', valor: 45.5, dias: 15 },
  { id: 10, vendaId: 109, cliente: 'Carlos Santos', forma: 'Boleto', parcela: '2/2', valor: 120, dias: 18 },
  { id: 11, vendaId: 110, cliente: 'Fernanda Costa', forma: 'Cartão de crédito', parcela: '3/4', valor: 70, dias: 22 },
  { id: 12, vendaId: 111, cliente: 'Ana Souza', forma: 'Dinheiro', parcela: '1/1', valor: 35, dias: 26 },
  { id: 13, vendaId: 112, cliente: 'Pedro Lima', forma: 'PIX', parcela: '1/1', valor: 90, dias: 29 },
  { id: 14, vendaId: 113, cliente: 'Luciana Ramos', forma: 'PIX', parcela: '2/2', valor: 210, dias: 45 },
];

function periodoPadrao(hoje) {
  return { de: paraIso(somaDias(hoje, -30)), ate: paraIso(hoje) };
}

function rotuloDia(iso, hoje) {
  const d = deIso(iso);
  const diff = Math.round((hoje - d) / DIA_MS);
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

function CampoData({ rotulo, valor, max, onChange }) {
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

  const [periodo, setPeriodo] = useState(() => periodoPadrao(hoje));
  const [busca, setBusca] = useState('');
  const [forma, setForma] = useState('');
  const [valorMin, setValorMin] = useState('');
  const [valorMax, setValorMax] = useState('');
  const [folha, setFolha] = useState(null); // 'forma' | 'filtros' | null
  const [rascunho, setRascunho] = useState({ min: '', max: '' });

  const mudarData = (lado, iso) => {
    setPeriodo((p) => {
      const novo = { ...p, [lado]: iso };
      return novo.de > novo.ate ? { de: novo.ate, ate: novo.de } : novo;
    });
  };

  const pagamentos = useMemo(() => {
    const min = valorMin === '' ? null : Number(valorMin.replace(',', '.'));
    const max = valorMax === '' ? null : Number(valorMax.replace(',', '.'));
    const termo = busca.trim().toLowerCase();
    return MOCK.map((p) => ({ ...p, data: paraIso(somaDias(hoje, -p.dias)) }))
      .filter((p) => p.data >= periodo.de && p.data <= periodo.ate)
      .filter((p) => !termo || p.cliente.toLowerCase().includes(termo))
      .filter((p) => !forma || p.forma === forma)
      .filter((p) => min === null || Number.isNaN(min) || p.valor >= min)
      .filter((p) => max === null || Number.isNaN(max) || p.valor <= max)
      .sort((a, b) => b.data.localeCompare(a.data));
  }, [hoje, periodo, busca, forma, valorMin, valorMax]);

  const total = pagamentos.reduce((soma, p) => soma + p.valor, 0);
  const grupos = useMemo(() => {
    const porDia = new Map();
    pagamentos.forEach((p) => porDia.set(p.data, [...(porDia.get(p.data) ?? []), p]));
    return [...porDia.entries()];
  }, [pagamentos]);

  const comFiltro = Boolean(busca.trim() || forma || valorMin || valorMax);
  const padrao = periodoPadrao(hoje);
  const periodoEhPadrao = periodo.de === padrao.de && periodo.ate === padrao.ate;

  const limparFiltros = () => {
    setBusca('');
    setForma('');
    setValorMin('');
    setValorMax('');
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

  return (
    <AppLayout cabecalho={{ titulo: 'Extrato', esquerda: 'menu', direita: <BotaoBuscaHeader /> }}>
      <div className={styles.filtros}>
        <CampoBusca placeholder="Buscar por cliente..." valor={busca} onChange={setBusca} />

        <div className={styles.periodo}>
          <p className={styles.periodoRotulo}>PERÍODO{periodoEhPadrao ? ' · últimos 30 dias' : ''}</p>
          <div className={styles.datas}>
            <CampoData rotulo="DE" valor={periodo.de} max={hojeIso} onChange={(v) => mudarData('de', v)} />
            <CampoData rotulo="ATÉ" valor={periodo.ate} max={hojeIso} onChange={(v) => mudarData('ate', v)} />
          </div>
        </div>

        <LinhaChips rotulo="Filtros">
          <Chip ativo={Boolean(forma)} onClick={() => setFolha('forma')}>
            {forma || 'Forma de pagamento'}
          </Chip>
          <Chip ativo={Boolean(valorMin || valorMax)} onClick={abrirFiltros}>
            {valorMin || valorMax ? 'Valor filtrado' : 'Mais filtros'}
          </Chip>
        </LinhaChips>
      </div>

      <section className={styles.resumo} aria-live="polite">
        <p className={styles.resumoRotulo}>RECEBIDO NO PERÍODO</p>
        <p className={styles.resumoTotal}>{dinheiro(total)}</p>
        <p className={styles.resumoPeriodo}>{resumoPeriodo(periodo.de, periodo.ate, pagamentos.length)}</p>
      </section>

      {pagamentos.length === 0 ? (
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
      ) : (
        <div className={styles.lista}>
          {grupos.map(([dia, itens]) => (
            <section key={dia} className={styles.grupo}>
              <h2 className={styles.grupoTitulo}>{rotuloDia(dia, hoje)}</h2>
              {itens.map((p) => {
                const icone = ICONE_FORMA[p.forma] ?? ICONE_PADRAO;
                return (
                  <Link key={p.id} to={`/vendas/${p.vendaId}`} className={styles.linha}>
                    <span className={styles.linhaIcone}>
                      <img src={icone.src} width={icone.largura} height={icone.altura} alt="" />
                    </span>
                    <span className={styles.linhaInfo}>
                      <span className={styles.linhaCliente}>{p.cliente}</span>
                      <span className={styles.linhaDetalhe}>
                        {p.forma} · Parcela {p.parcela}
                      </span>
                    </span>
                    <span className={styles.linhaValor}>
                      <span className={styles.linhaPreco}>{dinheiro(p.valor)}</span>
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
          {['', ...FORMAS].map((f) => (
            <button
              key={f || 'todas'}
              type="button"
              role="radio"
              aria-checked={forma === f}
              className={`${styles.opcao} ${forma === f ? styles.opcaoAtiva : ''}`}
              onClick={() => {
                setForma(f);
                setFolha(null);
              }}
            >
              {f || 'Todas'}
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
