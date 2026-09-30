// Gera o PDF do comprovante e entrega ao usuário. A biblioteca de PDF é pesada, então só é
// carregada aqui, na hora de gerar — não entra no carregamento inicial do app.
export async function gerarComprovantePdf(venda) {
  const [{ pdf }, { default: ComprovantePdf }] = await Promise.all([
    import('@react-pdf/renderer'),
    import('./ComprovantePdf'),
  ]);
  return pdf(<ComprovantePdf venda={venda} />).toBlob();
}

// No celular abre o compartilhamento nativo com o arquivo (WhatsApp aceita PDF como documento).
// Onde não dá para compartilhar arquivo (computador), baixa o PDF.
export async function enviarComprovantePdf(venda) {
  const blob = await gerarComprovantePdf(venda);
  const nome = `comprovante-venda-${venda.id}.pdf`;
  const arquivo = new File([blob], nome, { type: 'application/pdf' });

  if (navigator.canShare?.({ files: [arquivo] })) {
    try {
      await navigator.share({ files: [arquivo], title: `Comprovante da venda #${venda.id}` });
      return 'compartilhado';
    } catch (erro) {
      if (erro.name === 'AbortError') return 'cancelado';
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = nome;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return 'baixado';
}
