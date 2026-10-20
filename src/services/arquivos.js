import api from './api';

// POST /arquivos (multipart). Devolve a chave que o produto ou o comprovante
// guarda: "produtos/<uuid>.png". Sem Content-Type manual de proposito — o
// axios monta o multipart/form-data com o boundary a partir do FormData.
export async function enviarArquivo(arquivo, pasta) {
  const corpo = new FormData();
  corpo.append('arquivo', arquivo);
  corpo.append('pasta', pasta);
  const { data } = await api.post('/arquivos', corpo);
  return data.chave;
}

// O GET do produto devolve a URL pronta, nao a chave. O PUT precisa da chave:
// mandar vazio apaga a imagem de quem so editou o nome ou o preco.
export function chaveDaUrl(url) {
  return url?.match(/(produtos|comprovantes)\/[0-9a-f-]{36}\.[a-z0-9]+/i)?.[0] ?? null;
}
