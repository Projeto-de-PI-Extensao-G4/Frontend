import api from './api';

export async function listarProdutos({ busca = '', status, categoriaId, pagina = 0, tamanho = 20 } = {}) {
  const params = { pagina, tamanho };
  if (busca.trim()) params.busca = busca.trim();
  if (status && status !== 'todos') params.status = status.toUpperCase(); // ATIVO ou INATIVO
  if (categoriaId) params.categoriaId = categoriaId;
  
  const { data } = await api.get('/produtos', { params });
  return data;
}

export async function buscarProduto(id) {
  const { data } = await api.get(`/produtos/${id}`);
  return data;
}

export async function cadastrarProduto(payload) {
  const { data } = await api.post('/produtos', payload);
  return data;
}

export async function atualizarProduto(id, payload) {
  const { data } = await api.put(`/produtos/${id}`, payload);
  return data;
}

export async function alterarStatusProduto(id, status) {
  const { data } = await api.patch(`/produtos/${id}/status`, { status });
  return data;
}

export async function listarCategorias() {
  const { data } = await api.get('/categorias');
  return data;
}

export function formatarMoeda(valor) {
  return Number(valor ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
