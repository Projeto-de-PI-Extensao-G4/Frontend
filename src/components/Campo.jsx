import { icones } from './icones';
import styles from './Campo.module.css';

// Campo de formulário com rótulo acima. Sem `children`, desenha um <input>;
// com `seletor`, mostra a seta de lista do Figma à direita.
export default function Campo({ rotulo, id, seletor = false, erro, children, ...inputProps }) {
  return (
    <div className={styles.grupo}>
      {rotulo && (
        <label htmlFor={id} className={styles.rotulo}>
          {rotulo}
        </label>
      )}
      <div className={`${styles.caixa} ${erro ? styles.comErro : ''}`}>
        {children ?? <input id={id} className={styles.input} {...inputProps} />}
        {seletor && <img src={icones.chevronBaixo} width={12} height={7.4} alt="" className={styles.seta} />}
      </div>
      {erro && <p className={styles.erro}>{erro}</p>}
    </div>
  );
}
