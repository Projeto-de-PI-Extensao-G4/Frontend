import { useNavigate } from "react-router-dom";
import React from "react";
import BottomNavigation from "./components/BottomNavigation";

export default function ProdutosDestaque() {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-md bg-gray-50 min-h-screen pb-28 relative shadow-2xl border-x border-gray-200 flex flex-col">
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3.5 border-b border-gray-200 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="relative w-11 h-11 rounded-full ring-2 ring-gray-200 overflow-hidden shrink-0 bg-gray-100 flex items-center justify-center">
            <img alt="Foto de perfil de Cris Utilidades" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBljv3A_PuUB732zREaqgzFi0vIjAgLtplmrrxMOshgI65tDVYSibKuA5rJFTaIHJWYwtqaJQ1Sjpi-UoTBNd1lrFssq-2hJqt50czyUAQQbkm7Gqzm5SaxEg7aPEG-kyhbBIMtXWZzb0LOaVExOAxXhYIUvNJDA4sG817VWpsgbp7nCv1nxo5mcjzBfVHBOdCujSrJ9W-3eKX3o8ScwEhOzl0YFE0-ABFpt0nj1jiAKv8BgL6wjD2Iqw"/>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-gray-900 leading-none">Cris Utilidades</span>
            <span className="text-xs font-semibold text-gray-500 mt-1">Gestão de Catálogo</span>
          </div>
        </div>
        <button aria-label="Abrir menu lateral" className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all text-gray-700" type="button">
          <svg className="w-6 h-6 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </header>

      <section className="px-4 pt-4 pb-2 space-y-3.5 bg-gray-50">
        <div className="relative flex items-center">
          <div className="absolute left-4 pointer-events-none flex items-center justify-center text-gray-500">
            <svg className="w-5 h-5 stroke-[2.4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input aria-label="Buscar produtos no estoque" className="w-full h-12 pl-12 pr-4 bg-white rounded-full border border-gray-300 text-gray-900 placeholder-gray-500 font-medium text-base focus:outline-none focus:ring-2 focus:ring-black focus:border-black shadow-sm transition duration-150" placeholder="Buscar produtos..." type="search"/>
        </div>

        <div aria-label="Categorias de produtos" className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1 text-sm font-semibold tracking-wide">
          <button aria-selected="true" className="h-10 px-6 rounded-full bg-black text-white shrink-0 flex items-center justify-center shadow-sm font-bold text-sm tracking-wide focus:ring-2 focus:ring-black focus:ring-offset-2 transition" type="button">
            Todos
          </button>
          <button aria-selected="false" className="h-10 px-5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 shrink-0 flex items-center justify-center font-semibold text-sm transition active:scale-95" type="button">Cama</button>
          <button aria-selected="false" className="h-10 px-5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 shrink-0 flex items-center justify-center font-semibold text-sm transition active:scale-95" type="button">Mesa</button>
          <button aria-selected="false" className="h-10 px-5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 shrink-0 flex items-center justify-center font-semibold text-sm transition active:scale-95" type="button">Banho</button>
          <button aria-selected="false" className="h-10 px-5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 shrink-0 flex items-center justify-center font-semibold text-sm transition active:scale-95" type="button">Cozinha</button>
        </div>
      </section>

      <section className="px-4 py-2 space-y-4">
        {/* Product Card 1 */}
        <article className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col">
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700 border border-green-200">ATIVO</span>
          </div>
          <div className="w-full h-56 bg-gray-50 rounded-xl flex items-center justify-center p-3 mb-4 overflow-hidden border border-gray-100">
            <img alt="Frigideira" className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-200" loading="lazy" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAphvXP-2LsYOL2R7oCdNY40g8gv9N6_rdV63wygB9d3lifW92xjpEViMHKkWrZcRLcN8T9knCYtn5yEkAUSFCcEEO1bc2jylcXuy9YBidZD_FsKAb77QVGVZwBD4z3n82j1ncKHrtEFGoMKbcCm-qx3DBhn2VLtTzZVWwT4X7RF-cjI66tCQBt5OTmHSd-r1z2qZ0_LP69j2fFcwy2I2g1ASMCCJFwt5bwwGF66c2xkE2EmWI4x1VQgg"/>
          </div>
          <div className="flex flex-col flex-1 justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight leading-snug">Frigideira Antiaderente Premium 24cm</h2>
              <p className="text-sm font-semibold text-gray-500 mt-1">Código: <span className="font-mono text-gray-700 tracking-wider">#KITCH-001</span></p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Preço de Venda</span>
                <span className="text-2xl font-black text-gray-950">R$ 89,90</span>
              </div>
              <div className="inline-flex items-center bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold tracking-tight border border-gray-200">Estoque: 24 un</div>
            </div>
          </div>
        </article>

        {/* Product Card 2 */}
        <article className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col">
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700 border border-green-200">ATIVO</span>
          </div>
          <div className="w-full h-56 bg-gray-50 rounded-xl flex items-center justify-center p-3 mb-4 overflow-hidden border border-gray-100">
            <img alt="Toalha" className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-200" loading="lazy" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcrJqhar0YlgemEqheZiyQbvC4lKl_M0yQk4frnfxTNjP6e-A-qlnZvGsv5cre6L-IUI2l6AOKOabgSgkIvqw4AIjauVRBI6iqfg3XM2K30IqtR25lybUcF7DnaAqUNUoGt7YL0gb4BZRraIIkaa1064KdCncZE93qXQtNSFynPjTKEgNCumeDEIvjUJm57A-qEOysV9kPqg4M07lFRrv27V-MFblTBlPVCPOpntuhoJSzL--ME32hsQ"/>
          </div>
          <div className="flex flex-col flex-1 justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight leading-snug">Toalha de Banho Algodão Egípcio</h2>
              <p className="text-sm font-semibold text-gray-500 mt-1">Código: <span className="font-mono text-gray-700 tracking-wider">#BATH-202</span></p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Preço de Venda</span>
                <span className="text-2xl font-black text-gray-950">R$ 59,90</span>
              </div>
              <div className="inline-flex items-center bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold tracking-tight border border-gray-200">Estoque: 50 un</div>
            </div>
          </div>
        </article>
      </section>

      <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto z-30 pointer-events-none flex justify-end px-5">
        <button 
          onClick={() => navigate("/produtos/novo")}
          aria-label="Cadastrar novo produto" 
          className="w-13 h-13 p-3.5 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 active:scale-95 transition-transform flex items-center justify-center pointer-events-auto" 
          type="button"
        >
          <svg className="w-6 h-6 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
}
