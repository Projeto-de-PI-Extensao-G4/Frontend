import { Link } from 'react-router-dom';
import { icones } from './icones';
import styles from './BotaoFlutuante.module.css';

// Botão "+" redondo acima da barra inferior. Passe `para` (rota) ou `onClick`.
export default function BotaoFlutuante({ rotulo, para, onClick }) {
  const conteudo = <img src={icones.mais} width={17.5} height={17.5} alt="" />;

  return (
    <div className={styles.ancora}>
      {para ? (
        <Link to={para} className={styles.botao} aria-label={rotulo}>
          {conteudo}
        </Link>
      ) : (
        <button type="button" className={styles.botao} aria-label={rotulo} onClick={onClick}>
          {conteudo}
        </button>
      )}
    </div>
  );
}
