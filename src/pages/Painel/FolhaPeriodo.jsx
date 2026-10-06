import { useState } from 'react';
import FolhaInferior from '../../components/FolhaInferior';
import Botao from '../../components/Botao';
import { MESES, diasNoIntervalo, formatarData, mesmoDia } from './datas';
import styles from './FolhaPeriodo.module.css';

const SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

// Células do mês: null para os vazios antes do dia 1 e depois do último dia.
function celulasDoMes(ano, mes) {
  const vazios = new Date(ano, mes, 1).getDay();
  const total = new Date(ano, mes + 1, 0).getDate();
  const celulas = Array.from({ length: vazios }, () => null);
  for (let d = 1; d <= total; d += 1) celulas.push(new Date(ano, mes, d));
  while (celulas.length % 7 !== 0) celulas.push(null);
  return celulas;
}

export default function FolhaPeriodo({ aberta, onFechar, onAplicar, inicial, hoje }) {
  if (!aberta) return null;
  // Monta só quando aberta: o rascunho sempre recomeça do período aplicado.
  return <Conteudo onFechar={onFechar} onAplicar={onAplicar} inicial={inicial} hoje={hoje} />;
}

function Conteudo({ onFechar, onAplicar, inicial, hoje }) {
  const [inicio, setInicio] = useState(inicial.inicio);
  const [fim, setFim] = useState(inicial.fim);
  const [visivel, setVisivel] = useState({ ano: inicial.inicio.getFullYear(), mes: inicial.inicio.getMonth() });

  const ehMesAtual = visivel.ano === hoje.getFullYear() && visivel.mes === hoje.getMonth();

  const mudarMes = (delta) => {
    const d = new Date(visivel.ano, visivel.mes + delta, 1);
    setVisivel({ ano: d.getFullYear(), mes: d.getMonth() });
  };

  const escolherDia = (dia) => {
    if (dia > hoje) return;
    if (!inicio || fim) {
      setInicio(dia);
      setFim(null);
    } else if (dia < inicio) {
      setFim(inicio);
      setInicio(dia);
    } else {
      setFim(dia);
    }
  };

  const limpar = () => {
    setInicio(null);
    setFim(null);
  };

  const fimEfetivo = fim ?? inicio;
  const dias = inicio ? diasNoIntervalo(inicio, fimEfetivo) : 0;

  return (
    <FolhaInferior
      aberta
      onFechar={onFechar}
      titulo="Escolher período"
      acaoTopo={
        <button type="button" className={styles.limpar} onClick={limpar}>
          Limpar
        </button>
      }
    >
      <div className={styles.datas}>
        <div className={`${styles.data} ${!fim ? styles.dataAtiva : ''}`}>
          <span className={styles.dataRotulo}>INÍCIO</span>
          <span className={styles.dataValor}>{formatarData(inicio)}</span>
        </div>
        <div className={`${styles.data} ${fim ? styles.dataAtiva : ''}`}>
          <span className={styles.dataRotulo}>FIM</span>
          <span className={styles.dataValor}>{formatarData(fim)}</span>
        </div>
      </div>

      <div className={styles.mes}>
        <button type="button" className={styles.seta} aria-label="Mês anterior" onClick={() => mudarMes(-1)}>
          ‹
        </button>
        <span className={styles.mesNome}>{MESES[visivel.mes]} {visivel.ano}</span>
        <button
          type="button"
          className={styles.seta}
          aria-label="Próximo mês"
          disabled={ehMesAtual}
          onClick={() => mudarMes(1)}
        >
          ›
        </button>
      </div>

      <div className={styles.calendario}>
        {SEMANA.map((s, i) => (
          <span key={i} className={styles.diaSemana}>{s}</span>
        ))}
        {celulasDoMes(visivel.ano, visivel.mes).map((dia, i) => {
          if (!dia) return <span key={i} className={styles.dia} />;
          const ehInicio = mesmoDia(dia, inicio);
          const ehFim = mesmoDia(dia, fimEfetivo);
          const faixa = inicio && fimEfetivo && inicio.getTime() !== fimEfetivo.getTime();
          const dentro = faixa && dia >= inicio && dia <= fimEfetivo;
          const classes = [
            styles.dia,
            dentro ? styles.intervalo : '',
            dentro && (ehInicio || dia.getDay() === 0) ? styles.pontaEsq : '',
            dentro && (ehFim || dia.getDay() === 6) ? styles.pontaDir : '',
          ].join(' ');
          return (
            <button
              key={i}
              type="button"
              className={classes}
              disabled={dia > hoje}
              aria-pressed={ehInicio || ehFim}
              aria-label={formatarData(dia)}
              onClick={() => escolherDia(dia)}
            >
              <span className={`${styles.numero} ${ehInicio || ehFim ? styles.selecionado : ''}`}>
                {dia.getDate()}
              </span>
            </button>
          );
        })}
      </div>

      <div className={styles.acoes}>
        <Botao variante="secundario" onClick={onFechar}>Cancelar</Botao>
        <Botao disabled={!inicio} onClick={() => onAplicar({ inicio, fim: fimEfetivo })}>
          {dias ? `Aplicar · ${dias} ${dias === 1 ? 'dia' : 'dias'}` : 'Aplicar'}
        </Botao>
      </div>
    </FolhaInferior>
  );
}
