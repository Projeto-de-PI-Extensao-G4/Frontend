import { useNavigate } from "react-router-dom";
import React from "react";
import BottomNavigation from "./components/BottomNavigation";

export default function ListaVendas() {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-md bg-gray-50 min-h-screen flex flex-col relative shadow-xl pb-24 border-x border-gray-200">
      {/* TopBar */}
      <header className="sticky top-0 z-30 bg-gray-50/90 backdrop-blur-md px-5 pt-4 pb-3 flex items-center gap-3">
        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gray-200 bg-gray-200 flex-shrink-0">
          <img alt="Cris Utilidades" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrhAFCxTxhvuG3jcHR-gFt7g4VV7ydHwXJ4tKBEmNuOR1IXu-N_hCeyb9YH89-GszEQlH7WC7nVE_9VJ-aZSVAy-S4Ua1UiE6Oy_NleR20u0oVBHgtqt7iVFSpox2qKsTjnZN0OFgN9cHMM5tCRSByQqKRJvas68BO3IVQmEuKjtsc3mV4fih_KRDOL0VSdaRi9BlnCGQlenuZS_9RCg28myF4YTVQodfmfliAJ-1AaeQe-04lXQiN1Q"/>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-gray-900">Cris Utilidades</h1>
      </header>

      {/* MainContent */}
      <main className="px-5 space-y-4 flex-1">
        {/* Search Input Container */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          </div>
          <input className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-300 rounded-xl text-base text-gray-900 placeholder-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all shadow-sm" placeholder="Buscar por cliente ou ID..." type="text"/>
        </div>

        {/* Horizontal Filter Chips */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1 -mx-5 px-5">
          <button className="bg-gray-900 text-white font-bold text-sm sm:text-base px-5 py-2.5 rounded-full whitespace-nowrap shadow-sm hover:bg-black transition-colors">Todas</button>
          <button className="bg-gray-200 text-gray-800 font-bold text-sm sm:text-base px-5 py-2.5 rounded-full whitespace-nowrap hover:bg-gray-300 transition-colors">Pendentes</button>
          <button className="bg-gray-200 text-gray-800 font-bold text-sm sm:text-base px-5 py-2.5 rounded-full whitespace-nowrap hover:bg-gray-300 transition-colors">Pagas</button>
          <button className="bg-gray-200 text-gray-800 font-bold text-sm sm:text-base px-5 py-2.5 rounded-full whitespace-nowrap hover:bg-gray-300 transition-colors">Canceladas</button>
        </div>

        {/* Section Title & Action Button */}
        <div className="flex items-center justify-between pt-3 pb-2">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">Lista de Vendas</h2>
            <p className="text-sm text-gray-600 font-medium mt-1">Exibindo 24 vendas recentes</p>
          </div>
          <button onClick={() => navigate('/vendas/nova')} className="flex items-center gap-2 bg-black hover:bg-gray-800 active:scale-95 transition-all text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 4.5v15m7.5-7.5h-15" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            <span>Nova</span>
          </button>
        </div>

        {/* Sales Cards List */}
        <div className="space-y-4">
          {/* Card PAGA */}
          <article className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-500">ID #89234</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 uppercase tracking-wide">PAGA</span>
            </div>
            <div><h3 className="font-extrabold text-gray-900 text-lg leading-snug">Ricardo Almeida dos Santos</h3></div>
            <div className="flex justify-between items-end pt-1">
              <div>
                <span className="text-xs uppercase font-bold text-gray-500 tracking-wider block">VALOR TOTAL</span>
                <span className="text-2xl font-extrabold text-gray-900 tracking-tight">R$ 1.450,00</span>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase font-bold text-gray-500 tracking-wider block">DATA</span>
                <span className="text-sm font-bold text-gray-800">12 Out, 2023</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
              <button onClick={() => navigate('/vendas/parcelamento')} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-sm py-2.5 rounded-xl transition-colors">Detalhes</button>
              <button aria-label="Compartilhar" className="w-12 h-11 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" strokeLinecap="round" strokeLinejoin="round"></path></svg></button>
            </div>
          </article>
          
          {/* Card PENDENTE */}
          <article className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-500">ID #89233</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-700 uppercase tracking-wide">PENDENTE</span>
            </div>
            <div><h3 className="font-extrabold text-gray-900 text-lg leading-snug">Maria Oliveira Fernandes</h3></div>
            <div className="flex justify-between items-end pt-1">
              <div>
                <span className="text-xs uppercase font-bold text-gray-500 tracking-wider block">VALOR TOTAL</span>
                <span className="text-2xl font-extrabold text-gray-900 tracking-tight">R$ 845,20</span>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase font-bold text-gray-500 tracking-wider block">DATA</span>
                <span className="text-sm font-bold text-gray-800">12 Out, 2023</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
              <button onClick={() => navigate('/vendas/parcelamento')} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-sm py-2.5 rounded-xl transition-colors">Detalhes</button>
              <button aria-label="Visualizar Recibo" className="w-12 h-11 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg></button>
            </div>
          </article>
        </div>

        {/* Load More Button */}
        <div className="pt-3 pb-8">
          <button className="w-full border-2 border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-bold text-base py-3.5 rounded-xl transition-all shadow-sm">Carregar mais vendas</button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
