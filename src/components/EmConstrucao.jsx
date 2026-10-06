import AppLayout from './AppLayout';

// Página provisória enquanto a tela do Figma não é implementada.
export default function EmConstrucao({ titulo }) {
  return (
    <AppLayout cabecalho={{ titulo }}>
      <p className="texto-apoio">Tela em construção.</p>
    </AppLayout>
  );
}
