import { useNavigate } from "react-router-dom";
import React from "react";
import BottomNavigation from "./components/BottomNavigation";

export default function NovoProduto() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/produtos/destaque'); // Redirecting to inventory/products
  };

  return (
    <div className="w-full max-w-md min-h-screen bg-white shadow-xl flex flex-col justify-between relative pb-24 border-x border-gray-200">
      <div>
        <header className="sticky top-0 z-30 bg-white border-b border-neutral-200 px-4 py-3.5 flex items-center justify-between">
          <button aria-label="Abrir Menu" className="p-2 -ml-2 rounded-lg text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 focus:outline-none transition-colors flex items-center justify-center" type="button">
            <svg className="w-7 h-7 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          </button>
          <div className="flex items-center justify-center">
            <h1 className="text-lg font-black tracking-wider text-neutral-950 uppercase select-none">CRIS UTILIDADES</h1>
          </div>
          <button aria-label="Ajuda e Suporte" className="p-2 -mr-2 rounded-full text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 focus:outline-none transition-colors flex items-center justify-center" type="button">
            <svg className="w-7 h-7 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M12 18h.01" strokeLinecap="round" strokeLinejoin="round"></path><circle cx="12" cy="12" fill="none" r="9" stroke="currentColor" strokeWidth="2"></circle></svg>
          </button>
        </header>

        <main className="px-5 pt-6 pb-6">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mb-2">Novo Produto</h2>
            <p className="text-base text-neutral-700 leading-relaxed font-medium">Preencha os dados abaixo para cadastrar um novo item ao inventário.</p>
          </div>

          <form className="space-y-5" id="form-novo-produto" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <label className="text-base font-bold text-neutral-900" htmlFor="nome-produto">Nome do Produto</label>
              <input className="w-full h-13 min-h-[52px] px-4 rounded-xl border border-neutral-300 text-neutral-900 text-base placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-0 transition-all shadow-sm" id="nome-produto" name="nome-produto" placeholder="Ex: Panela de Pressão 4.5L" required type="text"/>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-base font-bold text-neutral-900" htmlFor="categoria">Categoria</label>
              <div className="relative">
                <select className="w-full h-13 min-h-[52px] px-4 rounded-xl border border-neutral-300 text-neutral-800 text-base appearance-none bg-white pr-10 focus:border-neutral-950 focus:ring-0 transition-all shadow-sm font-medium" id="categoria" name="categoria" required defaultValue="">
                  <option disabled value="">Selecione uma categoria</option>
                  <option value="cozinha">Cozinha e Utensílios</option>
                  <option value="cama-mesa-banho">Cama, Mesa e Banho</option>
                  <option value="decoracao">Decoração e Organização</option>
                  <option value="limpeza">Limpeza e Utilidades</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-600">
                  <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19.5 8.25l-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-base font-bold text-neutral-900" htmlFor="preco-venda">Preço de Venda</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <span className="text-neutral-900 font-bold text-base">R$</span>
                </div>
                <input className="w-full h-13 min-h-[52px] pl-12 pr-4 rounded-xl border border-neutral-300 text-neutral-900 font-semibold text-base placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-0 transition-all" id="preco-venda" inputMode="decimal" name="preco-venda" placeholder="0,00" type="text"/>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-base font-bold text-neutral-900" htmlFor="codigo-sku">Código (SKU)</label>
              <input className="w-full h-13 min-h-[52px] px-4 rounded-xl border border-neutral-300 text-neutral-900 text-base placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-0 transition-all shadow-sm font-medium" id="codigo-sku" name="codigo-sku" placeholder="0" type="text"/>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-base font-bold text-neutral-900">
                Imagem <span className="text-sm font-normal text-neutral-500">(anexe abaixo)</span>
              </label>
              <label className="w-full h-28 border-2 border-neutral-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-neutral-950 active:bg-neutral-50 transition-all bg-white" htmlFor="upload-imagem" tabIndex="0">
                <input accept="image/*" className="sr-only" id="upload-imagem" name="upload-imagem" type="file"/>
                <svg className="w-9 h-9 text-neutral-500 stroke-[1.8] transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.373L8.559 18.32a1.5 1.5 0 1 1-2.122-2.122L15.375 7.25" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                <span className="sr-only">Selecionar foto do produto</span>
              </label>
            </div>

            <div className="pt-3 space-y-3">
              <button className="w-full min-h-[54px] bg-neutral-950 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2.5 shadow-md active:bg-neutral-800 transition-colors focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2" type="submit">
                <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16.5 3.75V6.75H7.5V3.75M16.5 3.75H6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 6 21.75h12a2.25 2.25 0 0 0 2.25-2.25V7.5l-3.75-3.75ZM9 15.75h6m-6 3h6" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                <span>Salvar Produto</span>
              </button>
              <button onClick={() => navigate('/produtos')} className="w-full min-h-[52px] bg-neutral-200 text-neutral-800 rounded-xl font-semibold text-base flex items-center justify-center hover:bg-neutral-300 active:bg-neutral-400 transition-colors" type="button">
                Cancelar
              </button>
            </div>
          </form>
        </main>
      </div>
      <BottomNavigation />
    </div>
  );
}
