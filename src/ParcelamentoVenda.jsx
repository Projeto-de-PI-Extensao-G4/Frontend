import { useNavigate } from "react-router-dom";
import React from "react";
import BottomNavigation from "./components/BottomNavigation";

export default function ParcelamentoVenda() {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-md bg-white min-h-screen flex flex-col shadow-xl relative border-x border-gray-200">
      {/* Header */}
      <header className="pt-4 px-5 pb-3 bg-white">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-7 h-7 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center overflow-hidden flex-shrink-0">
            <div className="w-full h-full bg-slate-300"></div>
          </div>
          <span className="font-bold text-[15px] tracking-tight text-neutral-900">Cris Utilidades</span>
        </div>
        <button onClick={() => navigate('/vendas')} className="inline-flex items-center text-sm font-semibold text-neutral-700 hover:text-black transition-colors mb-4">
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          Voltar para Vendas
        </button>
        <div className="mb-4">
          <h1 className="text-2xl leading-tight font-black text-neutral-950 tracking-tight">Parcelamento: Venda #2934</h1>
          <p className="text-sm font-semibold text-neutral-700 mt-1">Cliente: Roberto Almeida</p>
        </div>
        <div className="bg-neutral-950 text-white rounded-2xl p-4 shadow-sm">
          <p className="text-sm tracking-wider uppercase font-bold text-neutral-300">VALOR TOTAL RESTANTE</p>
          <p className="text-3xl font-black tracking-tight mt-1 text-white">R$ 1.450,00</p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-5 pb-24 space-y-4">
        <div className="flex items-center justify-between pt-1">
          <h2 className="text-lg font-bold text-neutral-900">Parcelas</h2>
          <span className="bg-slate-200 text-neutral-800 text-sm font-bold px-3 py-1 rounded-full border border-slate-300">3 de 5 pagas</span>
        </div>
        
        {/* Parcela 1: Aberta */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="text-sm font-bold tracking-wider uppercase text-neutral-500 block leading-tight">PRÓXIMO VENCIMENTO</span>
              <span className="text-xl font-extrabold text-neutral-950 leading-none">15 Out</span>
            </div>
            <span className="bg-black text-white text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wider">ABERTA</span>
          </div>
          <div className="flex items-end justify-between pt-1">
            <div>
              <span className="text-sm font-semibold text-neutral-500 block leading-tight">Valor da Parcela</span>
              <span className="text-2xl font-black text-neutral-950 tracking-tight">R$ 725,00</span>
            </div>
            <button className="bg-neutral-950 active:bg-neutral-800 text-white px-4 py-2 rounded-xl font-bold text-base flex items-center gap-2 shadow-sm transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect height="14" rx="2" width="20" x="2" y="5"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
              <span>PAGAR</span>
            </button>
          </div>
        </div>

        {/* Parcela 2: Aguardando */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-sm font-bold tracking-wider uppercase text-neutral-500 block leading-tight">VENCIMENTO</span>
              <span className="text-xl font-extrabold text-neutral-950 leading-none">15 Nov</span>
            </div>
            <span className="border-2 border-slate-400 text-neutral-800 text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-slate-50">AGUARDANDO</span>
          </div>
          <div className="pt-1">
            <span className="text-sm font-semibold text-neutral-500 block leading-tight">Valor da Parcela</span>
            <span className="text-2xl font-black text-neutral-950 tracking-tight">R$ 725,00</span>
          </div>
        </div>

        {/* Parcela 3: Pago */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-sm font-bold tracking-wider uppercase text-neutral-600 block leading-tight">PAGO EM</span>
              <span className="text-xl font-extrabold text-neutral-600 line-through leading-none">15 Set</span>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-sm font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider border border-emerald-300">
              <svg className="w-4 h-4 text-emerald-700" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd"></path></svg>PAGO
            </span>
          </div>
          <div className="pt-1">
            <span className="text-sm font-semibold text-neutral-600 block leading-tight">Valor Liquidado</span>
            <span className="text-2xl font-black text-neutral-600 tracking-tight">R$ 725,00</span>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
