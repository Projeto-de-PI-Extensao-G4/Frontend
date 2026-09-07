import { useNavigate } from "react-router-dom";
import React from "react";
import BottomNavigation from "./components/BottomNavigation";

export default function NovaVenda() {
  const navigate = useNavigate();
  const handleConfirm = (e) => {
    e.preventDefault();
    navigate("/vendas");
  };

  return (
    <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col justify-between shadow-2xl relative border-x border-gray-200">
      {/* TopBar */}
      <header className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-20">
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 border border-gray-300">
          <img alt="Cris Utilidades" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_cWUM2n5HpLclmtQPdlkiEk91XeFk8OCGo80YhVhaotpZ1iKJAAFfCoWTG7Tzq88CuHlSSEjSkzDwhs4b9MDIT4NNipCC4GVSg2SlKswWbQAy-NnTSrc3TYGK0EI2vCQHbBARoDa4iy2PIdbN7UynBHgZ0SeIL3t8to8ip9yYUUL-aR0_6Z5cd-U8X3xQS7QTmJ_EdeZOqRI5qNqRdUqtdPvKEKx4LmwOyRWAvSZfF6Wnh4y_WG1TtQ"/>
        </div>
        <h1 className="text-xl font-black tracking-tight text-gray-900">Nova Venda</h1>
      </header>

      {/* MainContent */}
      <main className="flex-1 px-5 py-4 space-y-6 pb-28">
        <form onSubmit={handleConfirm} className="space-y-6">
          {/* SectionCliente */}
          <section>
            <label className="block text-base font-black tracking-wide text-gray-950 uppercase mb-2.5" htmlFor="cliente-select">
              1. SELECIONAR CLIENTE
            </label>
            <div className="relative">
              <select className="w-full bg-white border-2 border-gray-300 rounded-xl px-4 py-3.5 text-base font-semibold text-gray-900 appearance-none focus:ring-2 focus:ring-black focus:border-black transition" id="cliente-select" required defaultValue="">
                <option disabled value="">Toque para escolher o cliente</option>
                <option value="1">Roberto Almeida</option>
                <option value="2">Maria Oliveira Fernandes</option>
                <option value="3">Ricardo Almeida dos Santos</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </div>
            </div>
          </section>

          {/* SectionCategoria */}
          <section>
            <h2 className="text-base font-black tracking-wide text-gray-950 uppercase mb-3">2. CATEGORIA DA VENDA</h2>
            <div className="grid grid-cols-3 gap-2.5">
              <button className="flex flex-col items-center justify-center py-3.5 px-2 bg-black text-white rounded-xl shadow-sm border-2 border-black" type="button">
                <span className="text-sm font-bold tracking-tight">Cama</span>
              </button>
              <button className="flex flex-col items-center justify-center py-3.5 px-2 bg-white border-2 border-gray-300 text-gray-900 rounded-xl hover:bg-gray-50 transition" type="button">
                <span className="text-sm font-bold tracking-tight">Mesa</span>
              </button>
              <button className="flex flex-col items-center justify-center py-3.5 px-2 bg-white border-2 border-gray-300 text-gray-900 rounded-xl hover:bg-gray-50 transition" type="button">
                <span className="text-sm font-bold tracking-tight">Banho</span>
              </button>
            </div>
          </section>

          {/* SectionProdutos */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-black tracking-wide text-gray-950 uppercase">3. PRODUTOS / ITENS</h2>
              <button className="text-sm font-bold text-black tracking-tight flex items-center hover:opacity-75 transition py-1 px-2 border border-black rounded-lg" type="button">
                + ADICIONAR
              </button>
            </div>
            <div className="divide-y divide-gray-200 border-b border-gray-300">
              <div className="py-3.5 flex items-center justify-between">
                <div>
                  <p className="text-base font-bold text-gray-950 leading-snug">Jogo de Lençol</p>
                  <p className="text-sm font-semibold text-gray-600 mt-0.5">Unidade: 1x</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-base font-extrabold text-gray-950">R$ 50,00</span>
                  <button aria-label="Remover" className="p-2 text-gray-500 hover:text-red-600 transition bg-gray-100 rounded-lg" type="button">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 bg-gray-50 p-3 rounded-xl mt-2 border border-gray-200">
              <span className="text-base font-black text-gray-950">Total da Venda</span>
              <span className="text-2xl font-black text-gray-950">R$ 50,00</span>
            </div>
          </section>

          {/* SectionFormaPagamento */}
          <section>
            <label className="block text-base font-black tracking-wide text-gray-950 uppercase mb-2.5" htmlFor="pagamento-select">
              4. FORMA DE PAGAMENTO
            </label>
            <div className="relative">
              <select className="w-full bg-white border-2 border-gray-300 rounded-xl px-4 py-3.5 text-base font-semibold text-gray-900 appearance-none focus:ring-2 focus:ring-black focus:border-black transition" id="pagamento-select" required defaultValue="">
                <option disabled value="">Selecione</option>
                <option value="pix">PIX</option>
                <option value="cartao">Cartão de Crédito</option>
                <option value="dinheiro">Dinheiro</option>
                <option value="parcelado">Parcelado (Carnê / Promissória)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </div>
            </div>
          </section>

          <div className="pt-2">
            <button className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-4 rounded-xl text-lg shadow-lg transition tracking-wide" type="submit">
              Confirmar venda
            </button>
          </div>
        </form>
      </main>

      <BottomNavigation />
    </div>
  );
}
