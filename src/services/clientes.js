import api from './api';

export async function listarClientes({ busca = '', pagina = 0, tamanho = 20 } = {}) {
  const params = { pagina, tamanho };
  if (busca.trim()) params.busca = busca.trim();
  const { data } = await api.get('/clientes', { params });
  return data; // { conteudo, pagina, tamanho, totalElementos, totalPaginas, ultima }
}

export async function buscarCliente(id) {
  const { data } = await api.get(`/clientes/${id}`);
  return data;
}

export async function cadastrarCliente({ nomeCompleto, cpf, telefone }) {
  const payload = {
    nomeCompleto: nomeCompleto.trim(),
    cpf: cpf.replace(/\D/g, ''),
    telefones: [{ telefone: telefone.replace(/\D/g, ''), tipoTelefone: 'CELULAR', principal: true }],
    enderecos: [],
  };
  const { data } = await api.post('/clientes', payload);
  return data;
}

// Extrai a mensagem de erro no formato padrao do backend
// ({ mensagem, errosCampo: [{ campo, mensagem }] }).
export function mensagemDeErro(error, fallback = 'Erro inesperado. Tente novamente.') {
  const body = error?.response?.data;
  if (body?.errosCampo?.length) {
    return body.errosCampo.map((e) => e.mensagem).join('\n');
  }
  return body?.mensagem || fallback;
}

export function formatarTelefone(valor = '') {
  const d = String(valor).replace(/\D/g, '');
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return valor;
}

export async function listarVendasDoCliente(id, { pagina = 0, tamanho = 20 } = {}) {
  const { data } = await api.get(`/clientes/${id}/vendas`, { params: { pagina, tamanho } });
  return data;
}

export function formatarCpf(valor = '') {
  const d = String(valor).replace(/\D/g, '');
  return d.length === 11 ? `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}` : valor;
}

export function formatarMoeda(valor) {
  return Number(valor ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatarData(iso) {
  return iso ? new Date(iso).toLocaleDateString('pt-BR') : '';
}

// O PUT do backend SUBSTITUI telefones e enderecos pela lista enviada:
// por isso a edicao sempre manda a lista completa (enderecos vao como vieram).
export async function atualizarCliente(id, { nomeCompleto, cpf, telefones, enderecos }) {
  const payload = {
    nomeCompleto: nomeCompleto.trim(),
    cpf: cpf.replace(/\D/g, ''),
    telefones: telefones.map((t) => ({
      telefone: t.telefone.replace(/\D/g, ''),
      tipoTelefone: t.tipoTelefone || 'CELULAR',
      principal: !!t.principal,
    })),
    enderecos: enderecos.map(({ logradouro, numero, bairro, cidade }) => ({
      logradouro,
      numero,
      bairro,
      cidade,
    })),
  };
  const { data } = await api.put(`/clientes/${id}`, payload);
  return data;
}
