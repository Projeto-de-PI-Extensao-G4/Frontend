import api from './api';

export async function buscarPerfil() {
  const { data } = await api.get('/perfil');
  return data;
}

export async function atualizarPerfil({ nomeCompleto, email }) {
  const { data } = await api.put('/perfil', { nomeCompleto, email });
  return data;
}

// Google Agenda. Com CALENDARIO_HABILITADO=false o backend nem registra estes
// endpoints e responde 404: tratado como "indisponivel", nao como erro.
export async function statusAgenda() {
  try {
    const { data } = await api.get('/perfil/calendario');
    return { disponivel: true, conectado: data.conectado };
  } catch (err) {
    if (err?.response?.status === 404) return { disponivel: false, conectado: false };
    throw err;
  }
}

// Devolve a URL da tela de consentimento do Google. Quem decide a conta e a
// propria pessoa, la no Google; o backend recebe o callback e manda o
// navegador de volta para /perfil?status=conectado (ou ?erro=...).
export async function urlConexaoAgenda() {
  const { data } = await api.post('/perfil/calendario/conectar');
  return data.urlAutorizacao;
}

export async function desconectarAgenda() {
  await api.delete('/perfil/calendario');
}
