import { useNavigate } from "react-router-dom";
import React from "react";
import BottomNavigation from "./components/BottomNavigation";

export default function Clientes() {
  const navigate = useNavigate();
  const clients = [
    { name: "Antônio Ferreira", phone: "(11) 98765-4321" },
    { name: "Beatriz Souza", phone: "(11) 91234-5678" },
    { name: "Carlos Mendes", phone: "(11) 97766-5544" },
    { name: "Daniela Lima", phone: "(11) 99988-7766" },
    { name: "Eduarda Santos", phone: "(11) 95544-3322" },
  ];

  return (
    <div className="w-full max-w-md bg-white min-h-screen flex flex-col relative shadow-xl overflow-hidden border-x border-gray-200">
      {/* TopHeader */}
      <header className="w-full px-5 pt-4 pb-3 flex items-center gap-3 border-b border-gray-100 bg-white sticky top-0 z-20">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-100">
          <img alt="Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOhUenPSiWZMjHUO3nXwIIE7Feu1_KacAXQ2igZUf3prqA1fOeZdyQx07J2Eh0FuEP7yy0IZzcgPv56zLeSX2EpDmq64yPYjoW9vNecotoOrg-YBt5k0v_Z86Idk-_WeMD1A6U_z5T6fOdmca84CMrS7OrSB0mRXxrnOiRNW9_aisZlc5yh77nvVx6H2MNhPnoQ3ZLK-N5-d5UMPthc8PSPvlvkj1yxIPNUkxutXKFPAmNMnGUJxhxMw"/>
        </div>
        <h1 className="text-base font-bold tracking-tight text-gray-900">Cris Utilidades</h1>
      </header>

      {/* MainContent */}
      <main className="flex-1 px-5 pt-6 pb-28 overflow-y-auto no-scrollbar">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Clientes</h2>
        
        {/* SearchBar */}
        <div className="relative mb-5">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
            <svg className="w-5 h-5 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </span>
          <input className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors shadow-sm" placeholder="Buscar por nome ou telefone..." type="text"/>
        </div>

        {/* CustomerList */}
        <div className="flex flex-col gap-3">
          {clients.map((client, i) => (
            <article key={i} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-shadow">
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-gray-900 leading-tight">{client.name}</h3>
                <div className="flex items-center text-xs text-gray-600 font-medium gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-700 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span>{client.phone}</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer">
                <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
            </article>
          ))}
        </div>
      </main>

      <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto z-30 pointer-events-none flex justify-end px-5">
        <button 
          onClick={() => navigate("/clientes/novo")}
          aria-label="Cadastrar novo cliente" 
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
