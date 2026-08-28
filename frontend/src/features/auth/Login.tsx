import { useState } from 'react';

import logoImg from '../../assets/logo.png';
import bgImg from '../../assets/bg-login.png';

export function Login() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="min-h-screen bg-[#FCFAF6] flex flex-col font-sans text-gray-800">
      
      
      <header className="m-4 flex flex-col rounded-xl bg-white shadow-sm border border-gray-100">
        
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            
            <img src={logoImg} alt="Logo Saúde na Rua" className="h-10 w-10 object-contain" />
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500">Projeto Social</p>
              <h1 className="text-xl font-bold uppercase leading-none">Saúde na Rua</h1>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            <button className="rounded-md border border-gray-300 px-4 py-1.5 text-sm font-medium hover:bg-gray-50">Login</button>
            <button className="rounded-md border border-gray-300 px-4 py-1.5 text-sm font-medium hover:bg-gray-50">Home</button>
            <button className="rounded-md border border-gray-300 px-4 py-1.5 text-sm font-medium hover:bg-gray-50">Eventos</button>
            <button className="rounded-md border border-gray-300 px-4 py-1.5 text-sm font-medium hover:bg-gray-50">Sobre</button>
            <button className="rounded-md border border-gray-300 px-4 py-1.5 text-sm font-medium hover:bg-gray-50">Voluntário</button>
            <button className="rounded-md bg-[#EF5B5B] px-4 py-1.5 text-sm font-medium text-white hover:bg-red-500 shadow-sm">Doe agora</button>
          </nav>

          <button 
            onClick={() => setMenuAberto(!menuAberto)}
            className="md:hidden p-2 text-2xl text-gray-600 focus:outline-none"
          >
            ☰
          </button>
        </div>

        {menuAberto && (
          <nav className="md:hidden flex flex-col gap-2 px-6 pb-4 pt-2 border-t border-gray-100 bg-gray-50 rounded-b-xl">
            <button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium bg-white">Login</button>
            <button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium bg-white">Home</button>
            <button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium bg-white">Eventos</button>
            <button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium bg-white">Sobre</button>
            <button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium bg-white">Voluntário</button>
            <button className="rounded-md bg-[#EF5B5B] px-4 py-2 text-sm font-medium text-white shadow-sm mt-2">Doe agora</button>
          </nav>
        )}
      </header>

      
      <main className="flex-1 flex flex-col md:flex-row gap-10 p-4 md:p-8 max-w-7xl mx-auto w-full">
        
        
        <div className="hidden md:flex flex-1 relative rounded-[40px] overflow-hidden flex-col items-center justify-center p-10 min-h-[500px]">
          
          <img src={bgImg} alt="Fundo Estetoscópio" className="absolute inset-0 h-full w-full object-cover opacity-50" />
          
          <div className="relative z-10 text-center text-gray-900">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 inline-block border-b-2 border-gray-900 pb-1">
              Bem-Vindo
            </h2>
            <p className="text-lg md:text-xl font-medium mt-4 max-w-xs mx-auto">
              Faça parte da corrente do Saúde na rua
            </p>
          </div>
        </div>

        
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-sm mt-8 md:mt-0">
            
            <div className="text-center mb-10">
              <h2 className="text-3xl font-semibold inline-block border-b-2 border-gray-900 pb-2 px-8">
                Login
              </h2>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">E-mail:</label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-gray-400 p-3 outline-none focus:border-[#2A8955] focus:ring-1 focus:ring-[#2A8955] bg-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Senha:</label>
                <input
                  type="password"
                  className="w-full rounded-lg border border-gray-400 p-3 outline-none focus:border-[#2A8955] focus:ring-1 focus:ring-[#2A8955] bg-transparent"
                />
              </div>

              <button
                type="button"
                className="w-full rounded-lg bg-[#2A8955] py-3 text-white font-medium hover:bg-green-700 transition-colors shadow-md mt-2"
              >
                Entrar
              </button>

              <div className="flex items-center justify-between text-sm font-medium underline mt-6">
                <a href="#" className="hover:text-gray-600">Esqueceu a senha?</a>
                <a href="#" className="hover:text-gray-600">É novo por aqui?</a>
              </div>
            </form>

          </div>
        </div>

      </main>
    </div>
  );
}