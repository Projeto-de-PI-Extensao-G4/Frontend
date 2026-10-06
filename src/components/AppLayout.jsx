import Header from './Header';
import BottomNav from './BottomNav';
import styles from './AppLayout.module.css';

// Moldura das telas logadas: cabeçalho, conteúdo com a margem do Figma e barra inferior.
// cabecalho recebe as props do <Header />; semBarra esconde a barra inferior.
export default function AppLayout({ cabecalho, semBarra = false, flutuante = null, children }) {
  return (
    <div className={styles.app}>
      <Header {...cabecalho} />
      <main className={`${styles.conteudo} ${semBarra ? '' : styles.comBarra}`}>{children}</main>
      {flutuante}
      {!semBarra && <BottomNav />}
    </div>
  );
}
