import styles from './Badge.module.css';

// Variantes com as cores do Figma (wireframe):
// positivo (verde), alerta (amarelo), perigo (vermelho), neutro (cinza) — etiqueta de canto 4px;
// contorno e apagado — pílula com borda, usada no status do produto.
export default function Badge({ variante = 'neutro', children }) {
  return <span className={`${styles.badge} ${styles[variante]}`}>{children}</span>;
}

const VARIANTE_POR_STATUS = {
  PAGA: 'positivo',
  PAGO: 'positivo',
  PENDENTE: 'alerta',
  CANCELADA: 'perigo',
  VENCIDA: 'perigo',
  ABERTA: 'neutro',
  AGUARDANDO: 'neutro',
  ATIVO: 'contorno',
  INATIVO: 'apagado',
};

export function BadgeStatus({ status }) {
  return <Badge variante={VARIANTE_POR_STATUS[status] ?? 'neutro'}>{status}</Badge>;
}
