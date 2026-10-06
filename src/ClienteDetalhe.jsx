import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import BottomNavigation from "./components/BottomNavigation";
import {
  buscarCliente,
  listarVendasDoCliente,
  mensagemDeErro,
  formatarTelefone,
  formatarCpf,
  formatarMoeda,
  formatarData,
} from "./services/clientes";

export default function ClienteDetalhe() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let cancelado = false;
    (async () => {
      setLoading(true);
      setErro("");
      try {
        const [c, v] = await Promise.all([buscarCliente(id), listarVendasDoCliente(id)]);
        if (!cancelado) {
          setCliente(c);
          setVendas(v.conteudo);
        }
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

  return (
    <div className="w-full max-w-md bg-white min-h-screen flex flex-col relative shadow-xl overflow-hidden border-x border-gray-200">
      <header className="w-full px-5 pt-4 pb-3 flex items-center gap-3 border-b border-gray-100 bg-white sticky top-0 z-20">
        <button onClick={() => navigate("/clientes")} aria-label="Voltar" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700" type="button">
          <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
        <h1 className="text-base font-bold tracking-tight text-gray-900 flex-1">Perfil do Cliente</h1>
        {cliente && (
          <button onClick={() => navigate(`/clientes/${id}/editar`)} className="text-sm font-semibold text-gray-900 underline underline-offset-4" type="button">
            Editar
          </button>
        )}
      </header>

      <main className="flex-1 px-5 pt-6 pb-28 overflow-y-auto">
        {loading && <p className="text-sm text-gray-500 text-center py-6">Carregando...</p>}
        {!loading && erro && <p className="text-sm text-red-600 text-center py-6 whitespace-pre-line">{erro}</p>}

        {!loading && !erro && cliente && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{cliente.nomeCompleto}</h2>
            <p className="text-sm text-gray-600 mt-1">CPF {formatarCpf(cliente.cpf)}</p>

            <section className="grid grid-cols-2 gap-3 mt-5">
              <div className="p-4 border border-gray-200 rounded-xl">
                <p className="text-xs font-semibold text-gray-500">Compras</p>
                <p className="text-xl font-black text-gray-900">{cliente.totalCompras ?? 0}</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-xl">
                <p className="text-xs font-semibold text-gray-500">Total gasto</p>
                <p className="text-xl font-black text-gray-900">{formatarMoeda(cliente.totalGasto)}</p>
              </div>
            </section>

            <section className="mt-6">
              <h3 className="text-sm font-bold text-gray-900 mb-2">Telefones</h3>
              <div className="flex flex-col gap-2">
                {cliente.telefones.map((t) => (
                  <div key={t.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl text-sm text-gray-800">
                    <span>{formatarTelefone(t.telefone)}</span>
                    {t.principal && <span className="text-xs font-semibold text-gray-500">Principal</span>}
                  </div>
                ))}
              </div>
            </section>

            {cliente.enderecos.length > 0 && (
              <section className="mt-6">
                <h3 className="text-sm font-bold text-gray-900 mb-2">Endereços</h3>
                <div className="flex flex-col gap-2">
                  {cliente.enderecos.map((e) => (
                    <div key={e.id} className="p-3 border border-gray-200 rounded-xl text-sm text-gray-800">
                      {e.logradouro}{e.numero ? `, ${e.numero}` : ""}{e.bairro ? ` - ${e.bairro}` : ""} · {e.cidade}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-6">
              <h3 className="text-sm font-bold text-gray-900 mb-2">Histórico de compras</h3>
              {vendas.length === 0 && <p className="text-sm text-gray-500">Nenhuma compra registrada.</p>}
              <div className="flex flex-col gap-2">
                {vendas.map((v) => (
                  <div key={v.vendaId} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                    <div>
                      <p className="text-sm font-bold text-gray-900">Venda #{v.vendaId}</p>
                      <p className="text-xs text-gray-500">{formatarData(v.dataVenda)} · {v.status}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{formatarMoeda(v.valorTotal)}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
