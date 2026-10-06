import styles from './Chip.module.css';

export default function Chip({ ativo = false, children, ...resto }) {
  return (
    <button type="button" aria-pressed={ativo} className={`${styles.chip} ${ativo ? styles.ativo : ''}`} {...resto}>
      {children}
    </button>
  );
}

// Linha de chips com rolagem horizontal: não quebra linha em tela estreita.
export function LinhaChips({ children, rotulo }) {
  return (
    <div className={`${styles.linha} sem-barra-rolagem`} role="group" aria-label={rotulo}>
      {children}
    </div>
  );
}
