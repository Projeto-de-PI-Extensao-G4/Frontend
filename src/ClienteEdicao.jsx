import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import BottomNavigation from "./components/BottomNavigation";
import {
  buscarCliente,
  atualizarCliente,
  mensagemDeErro,
  formatarTelefone,
  formatarCpf,
} from "./services/clientes";

const inputClass =
  "w-full px-3.5 py-3 text-sm text-gray-900 bg-white rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all shadow-sm";

export default function ClienteEdicao() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefones, setTelefones] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let cancelado = false;
    (async () => {
      try {
        const c = await buscarCliente(id);
        if (cancelado) return;
        setNomeCompleto(c.nomeCompleto);
        setCpf(formatarCpf(c.cpf));
        setTelefones(c.telefones.map((t) => ({ ...t, telefone: formatarTelefone(t.telefone) })));
        setEnderecos(c.enderecos);
      } catch (e) {
        if (!cancelado) setErro(mensagemDeErro(e, "Não foi possível carregar o cliente."));
      } finally {
        if (!cancelado) setLoading(false);
      }
    })();
    return () => {
      cancelado = true;
    };
  }, [id]);

  const alterarTelefone = (i, valor) =>
    setTelefones(telefones.map((t, idx) => (idx === i ? { ...t, telefone: valor } : t)));

  const marcarPrincipal = (i) =>
    setTelefones(telefones.map((t, idx) => ({ ...t, principal: idx === i })));

  const adicionarTelefone = () =>
    setTelefones([...telefones, { telefone: "", tipoTelefone: "CELULAR", principal: telefones.length === 0 }]);

  const removerTelefone = (i) => {
    const restantes = telefones.filter((_, idx) => idx !== i);
    // se removeu o principal, o primeiro que sobrar assume
    if (restantes.length > 0 && !restantes.some((t) => t.principal)) restantes[0] = { ...restantes[0], principal: true };
    setTelefones(restantes);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSalvando(true);
    setErro("");
    try {
      await atualizarCliente(id, { nomeCompleto, cpf, telefones, enderecos });
      navigate(`/clientes/${id}`);
    } catch (err) {
      setErro(mensagemDeErro(err, "Não foi possível salvar as alterações."));
    } finally {
      setSalvando(false);
    }
  };

  return (
    <main className="w-full max-w-md bg-white min-h-screen sm:min-h-[844px] flex flex-col justify-between shadow-2xl relative sm:rounded-[36px] overflow-hidden border border-gray-200">
      <header className="flex items-center gap-3 px-5 pt-4 pb-3 border-b border-gray-100 bg-white sticky top-0 z-20">
        <button onClick={() => navigate(`/clientes/${id}`)} aria-label="Voltar" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700" type="button">
          <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
        <h1 className="text-base font-bold tracking-tight text-gray-900">Editar Cliente</h1>
      </header>

      <div className="flex-1 px-5 pt-5 pb-24 overflow-y-auto">
        {loading && <p className="text-sm text-gray-500 text-center py-6">Carregando...</p>}

        {!loading && (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900" htmlFor="nome-completo">Nome Completo</label>
              <input className={inputClass} id="nome-completo" value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)} type="text" required />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900" htmlFor="cpf">CPF</label>
              <input className={inputClass} id="cpf" inputMode="numeric" value={cpf} onChange={(e) => setCpf(e.target.value)} type="text" required />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-900">Telefones</p>
              {telefones.map((t, i) => (
                <div key={t.id ?? `novo-${i}`} className="flex items-center gap-2">
                  <input className={inputClass} inputMode="tel" value={t.telefone} onChange={(e) => alterarTelefone(i, e.target.value)} placeholder="(00) 00000-0000" type="tel" required aria-label={`Telefone ${i + 1}`} />
                  <label className="flex items-center gap-1 text-xs font-semibold text-gray-600 shrink-0">
                    <input type="radio" name="principal" checked={!!t.principal} onChange={() => marcarPrincipal(i)} />
                    Principal
                  </label>
                  {telefones.length > 1 && (
                    <button onClick={() => removerTelefone(i)} aria-label={`Remover telefone ${i + 1}`} className="w-8 h-8 shrink-0 rounded-full bg-gray-100 text-gray-600" type="button">×</button>
                  )}
                </div>
              ))}
              <button onClick={adicionarTelefone} className="text-sm font-semibold text-gray-900 underline underline-offset-4" type="button">
                + Adicionar telefone
              </button>
            </div>

            {enderecos.length > 0 && (
              <p className="text-xs text-gray-500">
                {enderecos.length} endereço(s) cadastrado(s) serão mantidos como estão.
              </p>
            )}

            {erro && <p className="text-sm text-red-600 whitespace-pre-line" role="alert">{erro}</p>}

            <div className="pt-3 space-y-2.5">
              <button className="w-full py-3.5 px-4 bg-black hover:bg-gray-800 text-white font-medium text-sm rounded-lg transition shadow-sm disabled:opacity-60" type="submit" disabled={salvando}>
                {salvando ? "Salvando..." : "Salvar alterações"}
              </button>
              <button onClick={() => navigate(`/clientes/${id}`)} className="w-full py-3.5 px-4 bg-[#f3f4f6] hover:bg-gray-200 text-gray-700 font-medium text-sm rounded-lg transition text-center" type="button">
                Cancelar
              </button>
            </div>
          </form>
        )}

        {!loading && erro && telefones.length === 0 && nomeCompleto === "" && (
          <p className="text-sm text-red-600 text-center py-6 whitespace-pre-line">{erro}</p>
        )}
      </div>

      <BottomNavigation />
    </main>
  );
}
