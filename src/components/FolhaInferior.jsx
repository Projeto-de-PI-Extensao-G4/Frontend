import { useEffect } from 'react';
import styles from './FolhaInferior.module.css';

// Folha que sobe de baixo (bottom sheet), usada para seletores e confirmações.
export default function FolhaInferior({ aberta, onFechar, titulo, acaoTopo = null, children }) {
  useEffect(() => {
    if (!aberta) return undefined;
    const fecharNoEsc = (e) => e.key === 'Escape' && onFechar?.();
    window.addEventListener('keydown', fecharNoEsc);
    return () => window.removeEventListener('keydown', fecharNoEsc);
  }, [aberta, onFechar]);

  if (!aberta) return null;

  return (
    <div className={styles.fundo} onClick={onFechar}>
      <section
        className={styles.folha}
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.alca} aria-hidden="true" />
        {(titulo || acaoTopo) && (
          <div className={styles.topo}>
            <h2 className={styles.titulo}>{titulo}</h2>
            {acaoTopo}
          </div>
        )}
        {children}
      </section>
    </div>
  );
}
