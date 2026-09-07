import React from "react";
import BottomNavigation from "./components/BottomNavigation";

export default function PainelVendas() {
  return (
    <main className="w-full max-w-md bg-white min-h-screen flex flex-col shadow-2xl relative pb-24 border-x border-gray-200">
      {/* TopBar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3 border-b border-gray-100 flex items-center gap-3">
        <button aria-label="Menu principal" className="p-1.5 -ml-1 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors" type="button">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="3" x2="21" y1="6" y2="6"></line>
            <line x1="3" x2="21" y1="12" y2="12"></line>
            <line x1="3" x2="21" y1="18" y2="18"></line>
          </svg>
        </button>
        <h1 className="text-base font-bold tracking-tight text-gray-900">Cris Utilidades</h1>
      </header>

      {/* SubHeaderControls */}
      <section className="px-4 pt-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          {/* Title and section badge */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block leading-none">Gestão Comercial</span>
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-1">Painel</h2>
          </div>
          {/* Date Range Inputs */}
          <div className="flex items-center gap-1.5 text-left">
            <div className="border border-gray-300 rounded-md px-2 py-1 bg-white shadow-sm">
              <span className="block text-xs font-bold text-gray-400 uppercase leading-none">Início</span>
              <input className="text-sm font-semibold text-gray-800 p-0 border-0 focus:ring-0 w-16 bg-transparent" readOnly type="text" value="10/20/2023"/>
            </div>
            <div className="border border-gray-300 rounded-md px-2 py-1 bg-white shadow-sm">
              <span className="block text-xs font-bold text-gray-400 uppercase leading-none">Fim</span>
              <input className="text-sm font-semibold text-gray-800 p-0 border-0 focus:ring-0 w-16 bg-transparent" readOnly type="text" value="10/27/2023"/>
            </div>
          </div>
        </div>
        {/* Quick Date Filter Tags */}
        <div className="flex justify-end gap-1.5 mt-2">
          <button className="px-2.5 py-0.5 text-sm font-bold rounded-full bg-black text-white" type="button">7 dias</button>
          <button className="px-2.5 py-0.5 text-sm font-medium rounded-full bg-white text-gray-500 border border-gray-200" type="button">30 dias</button>
        </div>
      </section>

      {/* CategoryPills */}
      <nav aria-label="Categorias de produtos" className="px-4 py-2 overflow-x-auto no-scrollbar flex items-center gap-2">
        {/* Cama (Active) */}
        <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black text-white text-xs font-semibold whitespace-nowrap shadow-sm" type="button">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 7v11m0-4h18m0-7v11M3 10h18M7 10V7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span>Cama</span>
        </button>
        {/* Mesa */}
        <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 whitespace-nowrap" type="button">
          <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span>Mesa</span>
        </button>
        {/* Banho */}
        <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 whitespace-nowrap" type="button">
          <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1zm2-5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v5H6V7z" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span>Banho</span>
        </button>
        {/* Outros / Mais */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 text-xs font-medium whitespace-nowrap" type="button">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </button>
      </nav>

      {/* KeyMetricCards */}
      <section className="px-4 py-3 grid grid-cols-2 gap-3">
        {/* Vendas Card */}
        <article className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Vendas</span>
          <div className="mt-1">
            <span className="text-2xl font-black text-gray-900 leading-tight">124</span>
            <div className="flex items-center gap-1 text-sm font-bold text-emerald-600 mt-0.5">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span>+5.2%</span>
              <span className="text-gray-400 font-normal text-xs">pedidos</span>
            </div>
          </div>
        </article>
        {/* Faturamento Card */}
        <article className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Faturamento</span>
          <div className="mt-1">
            <span className="text-2xl font-black text-gray-900 leading-tight">R$ 12.450</span>
            <div className="flex items-center gap-1 text-sm font-bold text-emerald-600 mt-0.5">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span>+12.4%</span>
              <span className="text-gray-400 font-normal text-xs">total bruto</span>
            </div>
          </div>
        </article>
        {/* Produtos Card */}
        <article className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm relative overflow-hidden flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Produtos</span>
          <div className="mt-1">
            <span className="text-2xl font-black text-gray-900 leading-tight">342</span>
            <div className="flex items-center gap-1 text-sm font-bold text-emerald-600 mt-0.5">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span>+8%</span>
              <span className="text-gray-400 font-normal text-xs">vendidos</span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-gray-100/70 -z-0 pointer-events-none"></div>
        </article>
      </section>

      {/* SalesChartSection */}
      <section className="px-4 py-2">
        <div className="border border-gray-200 rounded-xl p-3 bg-white shadow-sm">
          <div className="flex items-center gap-1.5 text-gray-800 mb-4">
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 3v18h18M7 14l4-4 4 4 5-6" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <h3 className="text-xs font-bold text-gray-900">Gráfico de vendas</h3>
          </div>
          {/* Bar Visualizer */}
          <div className="h-28 w-full flex items-end justify-between gap-1.5 px-2 pb-1 border-b border-gray-100">
            <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end"><div className="w-full bg-gray-200 rounded-t-sm" style={{height: '38%'}}></div></div>
            <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end"><div className="w-full bg-gray-200 rounded-t-sm" style={{height: '48%'}}></div></div>
            <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end"><div className="w-full bg-gray-200 rounded-t-sm" style={{height: '44%'}}></div></div>
            <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end"><div className="w-full bg-gray-200 rounded-t-sm" style={{height: '60%'}}></div></div>
            <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end"><div className="w-full bg-gray-200 rounded-t-sm" style={{height: '52%'}}></div></div>
            <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end"><div className="w-full bg-gray-900 rounded-t-sm" style={{height: '88%'}}></div></div>
            <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end"><div className="w-full bg-gray-200 rounded-t-sm" style={{height: '32%'}}></div></div>
          </div>
          {/* Week Day Labels */}
          <div className="flex justify-between text-xs text-gray-400 font-medium px-2 pt-1.5">
            <span className="flex-1 text-center">Seg</span>
            <span className="flex-1 text-center">Ter</span>
            <span className="flex-1 text-center">Qua</span>
            <span className="flex-1 text-center">Qui</span>
            <span className="flex-1 text-center">Sex</span>
            <span className="flex-1 text-center font-bold text-gray-900">Sáb</span>
            <span className="flex-1 text-center">Dom</span>
          </div>
          {/* Legend */}
          <div className="flex items-center justify-between mt-3 pt-2 text-xs text-gray-500 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gray-900 inline-block"></span>
              <span>Atual</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gray-200 inline-block"></span>
              <span>Média</span>
            </div>
          </div>
        </div>
      </section>

      {/* TopSellingProducts */}
      <section className="px-4 pt-3 pb-6">
        <h3 className="text-xs font-bold text-gray-900 mb-2">Produtos mais vendidos</h3>
        <div className="space-y-2">
          {/* Item 1 */}
          <article className="p-3 bg-white border border-gray-200 rounded-xl flex items-center justify-between">
            <div className="flex items-start gap-2.5">
              <span className="text-xs font-bold text-gray-400 mt-0.5">1.</span>
              <div>
                <h4 className="text-xs font-bold text-gray-900 leading-snug">Jogo de Lençol 400 fios - Premium</h4>
                <p className="text-xs text-gray-400 mt-0.5">Categoria: Cama</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <p className="text-xs font-extrabold text-gray-900 leading-tight">45 <span className="text-xs font-medium text-gray-500">unid.</span></p>
              <p className="text-xs font-bold text-emerald-600 mt-0.5">R$ 3.550</p>
            </div>
          </article>
          {/* Item 2 */}
          <article className="p-3 bg-white border border-gray-200 rounded-xl flex items-center justify-between">
            <div className="flex items-start gap-2.5">
              <span className="text-xs font-bold text-gray-400 mt-0.5">2.</span>
              <div>
                <h4 className="text-xs font-bold text-gray-900 leading-snug">Toalha de Banho Gigante - Fio Penteado</h4>
                <p className="text-xs text-gray-400 mt-0.5">Categoria: Banho</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <p className="text-xs font-extrabold text-gray-900 leading-tight">32 <span className="text-xs font-medium text-gray-500">unid.</span></p>
              <p className="text-xs font-bold text-emerald-600 mt-0.5">R$ 2.400</p>
            </div>
          </article>
          {/* Item 3 */}
          <article className="p-3 bg-white border border-gray-200 rounded-xl flex items-center justify-between">
            <div className="flex items-start gap-2.5">
              <span className="text-xs font-bold text-gray-400 mt-0.5">3.</span>
              <div>
                <h4 className="text-xs font-bold text-gray-900 leading-snug">Mesa de Centro Rústica - Madeira Lei</h4>
                <p className="text-xs text-gray-400 mt-0.5">Categoria: Mesa</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <p className="text-xs font-extrabold text-gray-900 leading-tight">28 <span className="text-xs font-medium text-gray-500">unid.</span></p>
              <p className="text-xs font-bold text-emerald-600 mt-0.5">R$ 2.100</p>
            </div>
          </article>
        </div>
      </section>

      <BottomNavigation />
    </main>
  );
}
