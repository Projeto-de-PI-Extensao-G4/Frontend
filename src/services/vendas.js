import api from './api';

export async function listarVendas({ busca = '', pagina = 0, tamanho = 20 } = {}) {
  const params = { pagina, tamanho };
  if (busca.trim()) params.busca = busca.trim();
  const { data } = await api.get('/vendas', { params });
  return data;
}

export async function buscarVenda(id) {
  const { data } = await api.get(`/vendas/${id}`);
  return data;
}

export async function cadastrarVenda(payload) {
  const { data } = await api.post('/vendas', payload);
  return data;
}

export async function pagarParcela(vendaId, parcelaId, formaPagamentoId) {
  const { data } = await api.post(`/vendas/${vendaId}/parcelas/${parcelaId}/pagar`, { formaPagamentoId });
  return data;
}

export async function quitarVenda(vendaId, formaPagamentoId) {
  const { data } = await api.post(`/vendas/${vendaId}/quitar`, { formaPagamentoId });
  return data;
}

export async function cancelarVenda(id, motivo) {
  const { data } = await api.post(`/vendas/${id}/cancelar`, { motivo });
  return data;
}

export async function resumoVendas() {
  const { data } = await api.get('/vendas/resumo');
  return data;
}

export async function buscarComprovante(id) {
  const { data } = await api.get(`/vendas/${id}/comprovante`);
  return data;
}
