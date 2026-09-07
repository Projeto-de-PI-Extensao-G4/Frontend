import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;
  const tabs = [
    { name: 'Painel', path: '/painel', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={currentRoute === '/painel' ? "2.5" : "2"} viewBox="0 0 24 24">
        <rect height="7" width="7" x="3" y="3" rx="1.5"></rect>
        <rect height="7" width="7" x="14" y="3" rx="1.5"></rect>
        <rect height="7" width="7" x="14" y="14" rx="1.5"></rect>
        <rect height="7" width="7" x="3" y="14" rx="1.5"></rect>
      </svg>
    )},
    { name: 'Clientes', path: '/clientes', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={currentRoute === '/clientes' ? "2.5" : "2"} viewBox="0 0 24 24">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    )},
    { name: 'Produtos', path: '/produtos', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={currentRoute === '/produtos' ? "2.5" : "2"} viewBox="0 0 24 24">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    )},
    { name: 'Vendas', path: '/vendas', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={currentRoute === '/vendas' || currentRoute.startsWith('/vendas') ? "2.5" : "2"} viewBox="0 0 24 24">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    )},
    { name: 'Pagamentos', path: '/pagamentos', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={currentRoute === '/pagamentos' ? "2.5" : "2"} viewBox="0 0 24 24">
        <rect height="14" rx="2" width="20" x="2" y="5"></rect>
        <line x1="2" x2="22" y1="10" y2="10"></line>
      </svg>
    )},
    { name: 'Mais', path: '/mais', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={currentRoute === '/mais' ? "2.5" : "2"} viewBox="0 0 24 24">
        <circle cx="5" cy="12" r="1.5"></circle>
        <circle cx="12" cy="12" r="1.5"></circle>
        <circle cx="19" cy="12" r="1.5"></circle>
      </svg>
    )}
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 py-2 px-3 flex justify-between items-center z-40 select-none pb-[env(safe-area-inset-bottom,16px)]">
      {tabs.map((tab) => {
        const isActive = currentRoute === tab.path || (tab.path !== '/' && currentRoute.startsWith(tab.path));
        return (
          <button
            key={tab.name}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center justify-center flex-1 transition-colors ${
              isActive ? 'text-black' : 'text-gray-600 hover:text-black'
            }`}
          >
            <div className={`p-1 ${isActive ? 'text-black' : ''}`}>
              {tab.icon}
            </div>
            <span className={`text-xs mt-0.5 leading-tight ${isActive ? 'font-extrabold border-b-[3px] border-black pb-0.5' : 'font-semibold'}`}>
              {tab.name}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
