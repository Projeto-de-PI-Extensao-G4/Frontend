import { useNavigate } from "react-router-dom";
import React from "react";
import BottomNavigation from "./components/BottomNavigation";

export default function ClienteCadastro() {
  const navigate = useNavigate();
  const handleSave = (e) => {
    e.preventDefault();
    // Simulate save, then navigate back to list
    navigate("/clientes");
  };

  return (
    <main className="w-full max-w-md bg-white min-h-screen sm:min-h-[844px] flex flex-col justify-between shadow-2xl relative sm:rounded-[36px] overflow-hidden border border-gray-200">
      {/* TopBar */}
      <header className="flex items-center px-5 pt-4 pb-3 border-b border-gray-100 bg-white sticky top-0 z-20">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200 border border-gray-300 flex items-center justify-center shrink-0">
            <img alt="Foto de perfil de Cris" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4wfO4l3hhIks2yhz5XG6SLzyqRwptQwKfcrcnrFtEC-KbMJgCbGALWVIpEoQNswpmOAzefuJU5MqFwYEfge0i7q1QsE63qjRUKcGPNuU15ch3u-JFvGS0-3WiFwqDP3AnBOflhGv0jqhNACIFIAkkKDXUrsOsF18rKOpKPzgN8IVTKB7NbZEiW7YFAzYSdX2pPlBEErxZnnkRaknWq7p2mezmE9XB3QVGC3UUMOUDLZK0-7QuRNua5g"/>
          </div>
          <h1 className="text-base font-bold tracking-tight text-gray-900">Cris Utilidades</h1>
        </div>
      </header>

      {/* MainContentArea */}
      <div className="flex-1 px-5 pt-5 pb-24 overflow-y-auto">
        <section className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Novo Cliente</h2>
          <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
            Preencha as informações essenciais abaixo para cadastrar um novo cliente no sistema.
          </p>
        </section>

        {/* Customer Registration Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="flex items-center text-sm font-semibold text-gray-900 space-x-1.5" htmlFor="nome-completo">
              <svg aria-hidden="true" className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span>Nome Completo</span>
            </label>
            <input className="w-full px-3.5 py-3 text-sm text-gray-900 bg-white rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all shadow-sm" id="nome-completo" name="nomeCompleto" placeholder="Ex: João da Silva" type="text" required />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center text-sm font-semibold text-gray-900 space-x-1.5" htmlFor="cpf">
              <svg aria-hidden="true" className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span>CPF</span>
            </label>
            <input className="w-full px-3.5 py-3 text-sm text-gray-900 bg-white rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all shadow-sm" id="cpf" inputMode="numeric" name="cpf" placeholder="000.000.000-00" type="text" required />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center text-sm font-semibold text-gray-900 space-x-1.5" htmlFor="telefone">
              <svg aria-hidden="true" className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span>Telefone</span>
            </label>
            <input className="w-full px-3.5 py-3 text-sm text-gray-900 bg-white rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all shadow-sm" id="telefone" inputMode="tel" name="telefone" placeholder="(00) 00000-0000" type="tel" required />
          </div>

          <div className="pt-3 space-y-2.5">
            <button className="w-full py-3.5 px-4 bg-black hover:bg-gray-800 active:bg-gray-900 text-white font-medium text-sm rounded-lg flex items-center justify-center space-x-2 transition shadow-sm" type="submit">
              <svg aria-hidden="true" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span>Salvar Cliente</span>
            </button>
            <button 
              onClick={() => navigate("/clientes")}
              className="w-full py-3.5 px-4 bg-[#f3f4f6] hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-medium text-sm rounded-lg transition text-center" 
              type="button"
            >
              Cancelar
            </button>
          </div>
        </form>

        <section className="mt-6 p-4 rounded-xl border border-gray-200 bg-white flex items-start space-x-3">
          <div className="mt-0.5 shrink-0 text-gray-800">
            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
          <div className="text-sm leading-relaxed text-gray-600">
            <p className="font-semibold text-gray-800 text-xs mb-0.5">Acessibilidade Ativada</p>
            <p>Esta tela foi otimizada para leitura fácil e interação simplificada, com áreas de toque ampliadas e alto contraste.</p>
          </div>
        </section>
      </div>

      <BottomNavigation />
    </main>
  );
}