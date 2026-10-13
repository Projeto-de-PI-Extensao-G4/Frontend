import api from './api';

export async function obterMetricasDashboard({ dataInicio, dataFim, categoriaId } = {}) {
  const params = { dataInicio, dataFim };
  if (categoriaId) {
    params.categoriaId = categoriaId;
  }

  const { data } = await api.get('/dashboard/metricas', { params });
  return data;
}
