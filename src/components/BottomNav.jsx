import { NavLink } from 'react-router-dom';
import { iconesNavegacao } from './icones';
import styles from './BottomNav.module.css';

const ABAS = [
  { rotulo: 'Painel', caminho: '/painel', icone: 'painel' },
  { rotulo: 'Clientes', caminho: '/clientes', icone: 'clientes' },
  { rotulo: 'Produtos', caminho: '/produtos', icone: 'produtos' },
  { rotulo: 'Vendas', caminho: '/vendas', icone: 'vendas' },
  { rotulo: 'Pagamentos', caminho: '/pagamentos', icone: 'pagamentos' },
  { rotulo: 'Perfil', caminho: '/perfil', icone: 'perfil' },
];

export default function BottomNav() {
  return (
    <nav className={styles.barra} aria-label="Navegação principal">
      {ABAS.map(({ rotulo, caminho, icone }) => {
        const { src, largura, altura } = iconesNavegacao[icone];
        return (
          <NavLink
            key={caminho}
            to={caminho}
            className={({ isActive }) => `${styles.aba} ${isActive ? styles.ativa : ''}`}
          >
            {/* O SVG vira máscara: a cor segue o texto, e a aba ativa fica preta. */}
            <span
              className={styles.icone}
              // Aspas obrigatórias: o Vite embute SVG pequeno como data URI, com espaços e aspas simples.
              style={{ width: largura, height: altura, maskImage: `url("${src}")`, WebkitMaskImage: `url("${src}")` }}
              aria-hidden="true"
            />
            <span className={styles.rotulo}>{rotulo}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
