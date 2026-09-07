import { useNavigate } from "react-router-dom";
import React from "react";
import BottomNavigation from "./components/BottomNavigation";

export default function PerfilAjustes() {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-[430px] min-h-screen bg-white flex flex-col justify-between shadow-2xl relative">
      <div className="flex-1 overflow-y-auto pb-28">
        {/* AppHeader */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-5 py-4 border-b border-gray-100 flex items-center gap-3">
          <div aria-hidden="true" className="w-9 h-9 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
            <img alt="Cris Utilidades Logo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzvSKzX_8HDTsDHoFgvlmDQ3quS1INE9T6B1A1giHki4rzUC8rkieJHFY2F8wYrWrIF8BEwu5jIsLC1LAi1VLXVYBZ2yNaiTdw4n9UwPqK5_Y6dnGJFfQ6DT-DE4N4WSh3vpMQAML9qlgFXBAGBO7OOgGvBVNzdWL_ojhM0Cmkxvge-QkxZ5OpCreLjyhVWoL2IYsneAQRxJF2Y-DnFyddrh2AAb_45s1U6Jje2e17RdzDL6ZwPJH2mA"/>
          </div>
          <h1 className="text-lg font-bold text-gray-900 tracking-tight">Cris Utilidades</h1>
        </header>

        {/* UserProfileSection */}
        <section aria-label="Informações do Usuário" className="pt-7 pb-6 px-6 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-200 bg-gray-100 shadow-md">
              <img alt="Foto de perfil de Cristiana" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4_Hge8p-xO-B_S0xxZOiI1zYZxxRo6sQCAdvyF9gm3Wi62DyS391Yi9AarYfhn-6dW4OKHDNJiLEE4GWB91kPivct3Vn_cKshp3vpDwx-KyIqMU46Kgk8Y8Zx7dH65yk8Dvd4cQvEiLQpT8Z_sIKL58WphiOKVgr7zXmxij1-DOMz07pAbHJ2M1NXEPij7Zd76zUqg1oRCpbL-OBmZjCwRbt4S8akACNNW96PlbgeU5gyY35SJlh6sA"/>
            </div>
            <button aria-label="Alterar foto de perfil" className="absolute bottom-1 right-1 w-9 h-9 bg-black text-white rounded-full flex items-center justify-center border-2 border-white shadow-md hover:bg-gray-800 active:scale-95 transition-transform cursor-pointer" type="button">
              <svg className="w-4 h-4 fill-current" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
              </svg>
            </button>
          </div>
          <h2 className="text-2xl font-black text-gray-950 tracking-tight leading-tight">Cristiana</h2>
          <p className="text-base font-semibold text-gray-600 mt-1">Administradora</p>
        </section>

        {/* MenuOptionsSection */}
        <section aria-label="Configurações e Opções da Conta" className="px-5 space-y-3.5">
          {/* Option 1 */}
          <button className="min-h-[58px] w-full px-4 py-3.5 bg-white border-2 border-gray-200 hover:border-gray-900 rounded-2xl flex items-center justify-between shadow-sm transition-colors" type="button">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-900 shrink-0">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"></path></svg>
              </div>
              <span className="text-base font-bold text-gray-900 tracking-tight">Dados Pessoais</span>
            </div>
            <svg className="w-5 h-5 text-gray-400 shrink-0 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          </button>

          {/* Option 2 */}
          <button className="min-h-[58px] w-full px-4 py-3.5 bg-white border-2 border-gray-200 hover:border-gray-900 rounded-2xl flex items-center justify-between shadow-sm transition-colors" type="button">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-900 shrink-0">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path></svg>
              </div>
              <span className="text-base font-bold text-gray-900 tracking-tight">Alterar Senha</span>
            </div>
            <svg className="w-5 h-5 text-gray-400 shrink-0 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          </button>

          {/* Option 3 */}
          <button className="min-h-[58px] w-full px-4 py-3.5 bg-white border-2 border-gray-200 hover:border-gray-900 rounded-2xl flex items-center justify-between shadow-sm transition-colors" type="button">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-900 shrink-0">
                <svg className="w-6 h-6 fill-none stroke-current stroke-[2.2]" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16M8 4v4m8 2v4m-6 4v4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </div>
              <span className="text-base font-bold text-gray-900 tracking-tight">Preferências</span>
            </div>
            <svg className="w-5 h-5 text-gray-400 shrink-0 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          </button>

          {/* Option 4 */}
          <button className="min-h-[58px] w-full px-4 py-3.5 bg-white border-2 border-gray-200 hover:border-gray-900 rounded-2xl flex items-center justify-between shadow-sm transition-colors" type="button">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-900 shrink-0">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.67z"></path></svg>
              </div>
              <span className="text-base font-bold text-gray-900 tracking-tight">Ajuda e Suporte</span>
            </div>
            <svg className="w-5 h-5 text-gray-400 shrink-0 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          </button>

          <div className="pt-2">
            <button onClick={() => navigate('/')} className="min-h-[58px] w-full px-4 py-3.5 bg-red-100/80 hover:bg-red-200/90 border-2 border-red-200 rounded-2xl flex items-center justify-between text-red-700 transition-colors" type="button">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-200/60 flex items-center justify-center text-red-700 shrink-0">
                  <svg className="w-6 h-6 stroke-current stroke-[2.2] fill-none" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </div>
                <span className="text-base font-black text-red-700 tracking-tight">Sair da Conta</span>
              </div>
              <svg className="w-5 h-5 text-red-600 shrink-0 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </button>
          </div>
        </section>
      </div>
      <BottomNavigation />
    </div>
  );
}
