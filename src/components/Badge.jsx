import styles from './Badge.module.css';

// variante: 'escuro' | 'contorno' | 'suave'. Os status da API mapeiam assim:
// PAGA/PAGO → escuro, PENDENTE/ABERTA/AGUARDANDO → contorno, CANCELADA → suave.
export default function Badge({ variante = 'contorno', children }) {
  return <span className={`${styles.badge} ${styles[variante]}`}>{children}</span>;
}

const VARIANTE_POR_STATUS = {
  PAGA: 'escuro',
  PAGO: 'escuro',
  PENDENTE: 'contorno',
  ABERTA: 'contorno',
  AGUARDANDO: 'contorno',
  VENCIDA: 'escuro',
  CANCELADA: 'suave',
  ATIVO: 'escuro',
  INATIVO: 'suave',
};

export function BadgeStatus({ status }) {
  return <Badge variante={VARIANTE_POR_STATUS[status] ?? 'contorno'}>{status}</Badge>;
}
