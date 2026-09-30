const MESES_CURTOS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
export const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

const MS_DIA = 86400000;

export function mesmoDia(a, b) {
  return !!a && !!b && a.getTime() === b.getTime();
}

export function diasNoIntervalo(inicio, fim) {
  return Math.round((fim - inicio) / MS_DIA) + 1;
}

const doisDigitos = (n) => String(n).padStart(2, '0');

export function formatarData(d) {
  if (!d) return '—';
  return `${doisDigitos(d.getDate())}/${doisDigitos(d.getMonth() + 1)}/${d.getFullYear()}`;
}

// "23 Set – 29 Set 2026"
export function formatarIntervalo(inicio, fim) {
  const curto = (d) => `${d.getDate()} ${MESES_CURTOS[d.getMonth()]}`;
  return `${curto(inicio)} – ${curto(fim)} ${fim.getFullYear()}`;
}
