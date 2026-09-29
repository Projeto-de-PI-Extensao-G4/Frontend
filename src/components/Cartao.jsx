import styles from './Cartao.module.css';

// Superfície branca com borda cinza e canto de 12px, o cartão padrão do Figma.
// `as` troca a tag (ex.: 'button' ou um <Link>), para o cartão inteiro ser clicável.
export default function Cartao({ as: Tag = 'div', className = '', children, ...resto }) {
  return (
    <Tag className={`${styles.cartao} ${className}`} {...resto}>
      {children}
    </Tag>
  );
}
