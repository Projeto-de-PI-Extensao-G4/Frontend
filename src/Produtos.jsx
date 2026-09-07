import { useNavigate } from "react-router-dom";
import React from "react";
import BottomNavigation from "./components/BottomNavigation";

export default function Produtos() {
  const navigate = useNavigate();
  const categories = ["Todos", "Cama", "Mesa", "Banho", "Outros"];
  
  const products = [
    {
      id: 1,
      name: "Conjunto de Pratos Porcelana",
      price: "R$ 189,90",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZhkpcQV_wBwSIn0OdTlJWNml1VOBtu3bKUQrsmreCS8pPKHPxDKpV22YHidaHgnBKeu4AuRrp4Fn5Hp2baKGTVpUAMmeRo2yXQ9BndqoNdMn9Dbr-eoADae8j3jXZq0ldfdi64R64mBSNt8kdsHc2Tdc3ldJt163eGDAnBenzvKuypGHBdO_wdhR5NN0dbjJ780BCZl6fgZz4HaO3rPEFNOi_5nEqAe6i-Bw_xHIUsttRo2Pb95j7yA"
    },
    {
      id: 2,
      name: "Kit Toalhas Algodão Egípcio",
      price: "R$ 124,50",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-WC9CRbearf5YJcntwhYDW-G2xUARlRwQbVYrGRQ-GzmZC0e2WHwnr1jXLKg_9_Tjy-63TubSyaw_k2p79kU_2u6VGl4NFJNroIvFPVJSHr95BO6FOTG3Qtfblvl-NlAHiflFBHnyPtWyF2ts8VQR8yL9WAZUEUmYIEpxfdmxW7drEv_E7H6oPhDuDfFxk3JngmK83pD8KmwFEr1LQZpljvLUjifJdW3d8GbiqWEuHAc7uhudwgJCdQ"
    },
    {
      id: 3,
      name: "Luminária de Chão Minimalista",
      price: "R$ 342,00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIAeRdJAH7i9XQM7w5YNg5W0yQTHm9JdQdnqInh5Oh9f_CPHBgLgeinB-Wli-BP8QVxH8foFkkwVKQzKckwps9gIRNl5k1niuinF0JUW-QgTKiqXQc4TryAef9VTymiGdV3S1sfOHwkpfHYwxtab8R_Wou6wliehdV6xGuN4pR4BhygvGMm2DTDdttUArkvGH6AEU7kb0OYSkfnYtWMSgn9HYr2xbdkbQxsFJxFGrG5shYk_Rz-cGlyg"
    },
    {
      id: 4,
      name: "Organizador de Gavetas Madeira",
      price: "R$ 89,90",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBM_5ZV1pT_rqZ2n6TcP5oyS8rOxZrb-fpnylFAq9-2Yin3YP42OdcPltxzPXWVI1m0Yk0Ad8YP5vtq9VkGE3YCIeLe6f_xbkLUlPhyeTAtZMAPuFT2DkVr3vz8hbOOzDiZeO-gggKWB3rseCwN4Suk-6gkYgD2gqMz8SK-hPOCNpOgbEi7cDoC4E0JGuiKEUBKGJOq5XtBGbnMnF-gupQkieZM1AKV7X6ubS3M6mr7SnGwZXmqNG57xw"
    }
  ];

  return (
    <main className="w-full max-w-[430px] bg-white min-h-screen flex flex-col justify-between shadow-2xl relative border-x border-gray-200">
      <div className="flex-1 flex flex-col pb-24">
        {/* Header */}
        <header className="px-5 pt-5 pb-3 flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 shrink-0">
            <img alt="Cris Utilidades" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKWbOZFHZSB2NAPS5pQSfieKewo2AWsL9-EaG9HwQvsKoGyjXmjw6T066JAS5JzFf3p-YH15DuP4HpajX8LJ0XkemjVpWcoEk0eyFGetYemr6fBpAWDkPmv3tySCJas6_wJRMNlE_sFiOTfq3gm1obrCFBJmDhh4hEt331AeCL6P5W2Jv3ULlusRINM9xHRgOkxCVB68e0qRNzmFLdFh7eAKMG0ZHJ6x2uEAf5x-ZjwFp_22qwQQ0J-w"/>
          </div>
          <h1 className="text-xl font-extrabold text-black tracking-tight">Cris Utilidades</h1>
        </header>

        {/* SearchBar */}
        <section className="px-5 py-2">
          <div className="relative flex items-center">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-700">
              <svg className="w-5 h-5 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </span>
            <input className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-900 rounded-xl text-base font-semibold text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black transition-colors" placeholder="Buscar produtos..." type="text"/>
          </div>
        </section>

        {/* CategoryTabs */}
        <nav className="px-5 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat, idx) => (
            <button key={idx} className={`px-6 py-2.5 rounded-full text-sm font-bold shrink-0 transition-colors shadow-sm ${idx === 0 ? 'bg-black text-white' : 'bg-gray-200 text-gray-900 border border-gray-400 hover:bg-gray-300'}`} type="button">
              {cat}
            </button>
          ))}
        </nav>

        {/* ProductCatalog */}
        <section className="px-5 pt-3 flex flex-col gap-3">
          {products.map(product => (
            <article key={product.id} className="bg-white border-2 border-gray-300 rounded-2xl p-4 flex gap-4 items-center shadow-sm">
              <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-200">
                <img alt={product.name} className="w-full h-full object-cover" src={product.image}/>
              </div>
              <div className="flex-1 flex flex-col justify-between self-stretch py-0.5">
                <div>
                  <h2 className="text-base font-extrabold text-black leading-tight">{product.name}</h2>
                  <p className="text-lg font-black text-black mt-1">{product.price}</p>
                </div>
                <div className="flex items-center justify-end gap-3 mt-3">
                  <button aria-label="Diminuir quantidade" className="w-11 h-11 rounded-xl border-2 border-gray-900 bg-white flex items-center justify-center text-black active:bg-gray-200 transition-colors shadow-sm" type="button">
                    <svg className="w-5 h-5 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19.5 12h-15" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  </button>
                  <span className="text-xl font-black text-black w-6 text-center">0</span>
                  <button aria-label="Aumentar quantidade" className="w-11 h-11 rounded-xl bg-black border-2 border-black flex items-center justify-center text-white active:bg-gray-800 transition-colors shadow-sm" type="button">
                    <svg className="w-5 h-5 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4.5v15m7.5-7.5h-15" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>

      
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
    </main>
  );
}
