import api from './api';

export async function listarPagamentos(params = {}) {
  const { data } = await api.get('/pagamentos', { params });
  return data;
}

export async function resumoPagamentos(params = {}) {
  const { data } = await api.get('/pagamentos/resumo', { params });
  return data;
}
