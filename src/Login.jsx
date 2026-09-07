import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ email, password });
    // Navigate to painel on successful login
    navigate("/painel");
  };

  return (
    <main className="w-full max-w-[390px] min-h-[720px] bg-white rounded-[36px] shadow-2xl border border-gray-200/80 p-8 flex flex-col justify-between relative overflow-hidden" data-purpose="login-container">
      {/* Top Spacer / iOS Status Bar Area Simulation */}
      <div className="w-full pt-4"></div>
      
      {/* HeaderSection */}
      <header className="flex flex-col items-center text-center mt-2" data-purpose="header-section">
        {/* Store Icon Badge */}
        <div aria-label="Logo da Cris Utilidades" className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center shadow-md mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3h18v4a3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 01-3 3 3 3 0 01-3-3V3z" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M4 10v10a1 1 0 001 1h14a1 1 0 001-1V10" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M9 21V13h6v8" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
        {/* App Title */}
        <h1 className="text-2xl font-bold tracking-tight text-gray-950 mb-2">
          Cris Utilidades
        </h1>
        {/* Subtitle Description */}
        <p className="text-sm font-normal text-gray-500 max-w-[260px] leading-relaxed">
          Acesse sua conta para gerenciar seu negócio com eficiência.
        </p>
      </header>

      {/* LoginForm */}
      <form onSubmit={handleLogin} className="mt-8 flex flex-col gap-5 flex-1 justify-center" data-purpose="login-form">
        {/* Input Group: Email */}
        <div className="flex flex-col gap-2" data-purpose="email-field">
          <label className="text-sm font-semibold text-gray-800 flex items-center gap-2" htmlFor="email">
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            E-mail de acesso
          </label>
          <div className="relative">
            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-gray-300 text-gray-800 text-sm placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors duration-150" 
              id="email" 
              name="email" 
              placeholder="exemplo@email.com" 
              required 
              type="email"
            />
          </div>
        </div>

        {/* Input Group: Password */}
        <div className="flex flex-col gap-2" data-purpose="password-field">
          <label className="text-sm font-semibold text-gray-800 flex items-center gap-2" htmlFor="password">
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            Sua senha
          </label>
          <div className="relative flex items-center">
            <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 pl-4 pr-12 rounded-xl border border-gray-300 text-gray-800 text-sm placeholder:text-gray-400 tracking-wider focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors duration-150" 
              id="password" 
              name="password" 
              placeholder="••••••••" 
              required 
              type={showPassword ? "text" : "password"}
            />
            {/* Eye toggle button */}
            <button 
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Alternar visualização da senha" 
              className={`absolute right-3.5 focus:outline-none p-1 transition-colors ${showPassword ? 'text-gray-900' : 'text-gray-500 hover:text-gray-800'}`} 
              type="button"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="pt-0.5">
          <a className="inline-block text-xs font-semibold text-gray-900 underline underline-offset-4 hover:text-gray-600 transition-colors" href="#recuperar-senha">
            Esqueceu a senha?
          </a>
        </div>

        {/* Submit Button */}
        <div className="mt-6 mb-2">
          <button className="tap-effect w-full h-14 bg-black text-white font-medium text-base rounded-2xl flex items-center justify-center gap-3 px-6 shadow-md hover:bg-neutral-900 transition-all duration-150" type="submit">
            <span>Entrar no Sistema</span>
            <svg className="w-5 h-5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 16l4-4m0 0l-4-4m4 4H3m6 4h7a2 2 0 002-2V6a2 2 0 00-2-2H9" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>
      </form>

      {/* Bottom Indicator / Safe Area Spacing */}
      <div className="w-full flex justify-center pb-2 pt-4">
        <div className="w-32 h-1 bg-gray-200 rounded-full"></div>
      </div>
    </main>
  );
}