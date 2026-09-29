import styles from './Botao.module.css';

// variante: 'primario' (preto) | 'secundario' (branco com borda) | 'texto' (link sublinhado)
export default function Botao({ variante = 'primario', larguraTotal = true, className = '', children, ...resto }) {
  const classes = [styles.botao, styles[variante], larguraTotal ? styles.larguraTotal : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} {...resto}>
      {children}
    </button>
  );
}
