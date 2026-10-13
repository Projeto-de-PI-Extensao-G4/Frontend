import api from './api';

export async function listarFormasPagamento() {
  const { data } = await api.get('/formas-pagamento');
  return data;
}
