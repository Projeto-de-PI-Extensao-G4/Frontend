import { icones } from './icones';
import styles from './CampoBusca.module.css';

export default function CampoBusca({ placeholder, valor, onChange, rotulo = placeholder, ...resto }) {
  return (
    <label className={styles.campo}>
      <span className="sr-only">{rotulo}</span>
      <img src={icones.busca} width={18} height={18} alt="" className={styles.icone} />
      <input
        type="search"
        className={styles.input}
        placeholder={placeholder}
        value={valor}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        {...resto}
      />
    </label>
  );
}
