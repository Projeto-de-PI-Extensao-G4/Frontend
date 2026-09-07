import React from "react";
import BottomNavigation from "./components/BottomNavigation";

export default function Pagamentos() {
  return (
    <div className="w-full max-w-md bg-white min-h-screen flex flex-col shadow-2xl relative pb-24 border-x border-gray-200">
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-200 px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div aria-label="Foto de Cris Utilidades" className="w-9 h-9 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-bold text-sm overflow-hidden shadow-sm">
            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
          </div>
          <span className="font-extrabold text-gray-900 text-lg tracking-tight">Cris Utilidades</span>
        </div>
        <button aria-label="Ajuda e Suporte" className="p-2 rounded-full hover:bg-gray-100 text-gray-600 active:scale-95 transition-transform" type="button">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" x2="12.01" y1="17" y2="17"></line></svg>
        </button>
      </header>

      <main className="flex-1 px-4 pt-5 pb-6">
        <section className="mb-5">
          <h1 className="text-2xl font-black text-gray-950 tracking-tight leading-tight">Histórico de Pagamentos</h1>
          <p className="text-base text-gray-600 font-medium mt-1 leading-snug">Visualize suas transações recentes com clareza total.</p>
        </section>

        <section className="mb-5">
          <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>
            <input className="w-full pl-11 pr-4 py-3.5 bg-white border-2 border-gray-300 rounded-xl text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black shadow-sm font-medium transition-all" placeholder="Buscar por cliente..." type="search"/>
          </form>
        </section>

        <section className="space-y-4">
          {/* Card 1 */}
          <article className="bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-gray-500 tracking-wider uppercase block mb-0.5">CLIENTE</span>
                <h2 className="text-lg font-black text-gray-950 tracking-tight leading-tight">MARIA OLIVEIRA</h2>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-black bg-emerald-100 text-emerald-800 tracking-wide uppercase">RECEBIDO</span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-end justify-between">
              <div className="space-y-1.5">
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">FORMA DE PAGAMENTO</span>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-gray-800 mt-0.5">
                    <svg className="w-4 h-4 text-gray-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect height="12" rx="2" width="20" x="2" y="6"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg>
                    <span>Dinheiro</span>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">DATA</span>
                  <span className="text-sm font-bold text-gray-700">Hoje, 14:30</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">R$ 150,00</span>
              </div>
            </div>
          </article>

          {/* Card 2 */}
          <article className="bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-gray-500 tracking-wider uppercase block mb-0.5">CLIENTE</span>
                <h2 className="text-lg font-black text-gray-950 tracking-tight leading-tight">JOÃO SILVA</h2>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-black bg-emerald-100 text-emerald-800 tracking-wide uppercase">RECEBIDO</span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-end justify-between">
              <div className="space-y-1.5">
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">FORMA DE PAGAMENTO</span>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-gray-800 mt-0.5">
                    <svg className="w-4 h-4 text-gray-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect height="16" rx="2" ry="2" width="22" x="1" y="4"></rect><line x1="1" x2="23" y1="10" y2="10"></line></svg>
                    <span>Cartão de Crédito</span>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">DATA</span>
                  <span className="text-sm font-bold text-gray-700">Ontem, 11:20</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">R$ 489,90</span>
              </div>
            </div>
          </article>

          {/* Card 3 */}
          <article className="bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-gray-500 tracking-wider uppercase block mb-0.5">CLIENTE</span>
                <h2 className="text-lg font-black text-gray-950 tracking-tight leading-tight">ANA SOUZA</h2>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-black bg-blue-100 text-blue-800 tracking-wide uppercase">PIX</span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-end justify-between">
              <div className="space-y-1.5">
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">FORMA DE PAGAMENTO</span>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-gray-800 mt-0.5">
                    <svg className="w-4 h-4 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12.001 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75-4.365-9.75-9.75-9.75zm3.72 13.03l-3.72 2.22-3.72-2.22a.75.75 0 0 1-.365-.643v-4.44c0-.263.138-.507.365-.644l3.72-2.22 3.72 2.22c.227.137.365.381.365.644v4.44a.75.75 0 0 1-.365.643z"></path></svg>
                    <span>Transferência PIX</span>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">DATA</span>
                  <span className="text-sm font-bold text-gray-700">Ontem, 09:15</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">R$ 75,00</span>
              </div>
            </div>
          </article>

          {/* Card 4 */}
          <article className="bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-gray-500 tracking-wider uppercase block mb-0.5">CLIENTE</span>
                <h2 className="text-lg font-black text-gray-950 tracking-tight leading-tight">CARLOS LIMA</h2>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-black bg-amber-100 text-amber-800 tracking-wide uppercase">PENDENTE</span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-end justify-between">
              <div className="space-y-1.5">
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">FORMA DE PAGAMENTO</span>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-gray-800 mt-0.5">
                    <svg className="w-4 h-4 text-gray-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    <span>Produtos a Receber</span>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">DATA</span>
                  <span className="text-sm font-bold text-gray-700">01 Nov, 16:45</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">R$ 1.200,00</span>
              </div>
            </div>
          </article>
        </section>

        <div className="mt-6 mb-2">
          <button className="w-full bg-black hover:bg-gray-800 text-white font-bold text-base py-4 px-6 rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2" type="button">
            <span>Carregar mais transações</span>
          </button>
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
}
