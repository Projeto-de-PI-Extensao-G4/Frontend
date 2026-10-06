import { useNavigate } from 'react-router-dom';
import { icones } from './icones';
import styles from './Header.module.css';

// esquerda: 'menu' | 'voltar' | null. direita: qualquer nó (ex.: <BotaoBuscaHeader />).
export default function Header({ titulo = 'Cris Utilidades', esquerda = 'menu', direita = null }) {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.inicio}>
        {esquerda === 'menu' && (
          <button type="button" className={styles.botaoIcone} aria-label="Menu">
            <img src={icones.menu} width={18} height={12} alt="" />
          </button>
        )}
        {esquerda === 'voltar' && (
          <button type="button" className={styles.botaoIcone} aria-label="Voltar" onClick={() => navigate(-1)}>
            <span className={styles.seta} aria-hidden="true">←</span>
          </button>
        )}
        <h1 className={styles.titulo}>{titulo}</h1>
      </div>
      {direita}
    </header>
  );
}

export function BotaoBuscaHeader({ onClick }) {
  return (
    <button type="button" className={styles.botaoIcone} aria-label="Buscar" onClick={onClick}>
      <img src={icones.buscaHeader} width={18} height={18} alt="" />
    </button>
  );
}

export function BotaoFiltroHeader({ onClick }) {
  return (
    <button type="button" className={styles.botaoIcone} aria-label="Filtrar" onClick={onClick}>
      <img src={icones.filtroHeader} width={18} height={12} alt="" />
    </button>
  );
}
