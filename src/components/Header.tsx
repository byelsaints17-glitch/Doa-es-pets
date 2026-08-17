import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, Shield, PhoneCall } from 'lucide-react';
import { APP_CONFIG } from '../config';

interface HeaderProps {
  onOpenDonate: () => void;
  onOpenConfig?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDonate, onOpenConfig }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      id="header-principal"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-900/95 backdrop-blur-md shadow-lg py-3 border-b border-neutral-800/80 text-white'
          : 'bg-gradient-to-b from-black/85 via-black/60 to-transparent py-4 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Slogan */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('inicio');
            }}
            id="brand-logo-link"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-neutral-950 font-black shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <span className="text-xl">🐾</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                {APP_CONFIG.ongName}
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              </span>
              <span className="text-[11px] sm:text-xs text-neutral-300 tracking-normal font-normal">
                {APP_CONFIG.slogan}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-200">
            <button
              id="nav-link-inicio"
              onClick={() => scrollToSection('inicio')}
              className="hover:text-amber-400 transition-colors focus:outline-none"
            >
              Início
            </button>
            <button
              id="nav-link-sobre"
              onClick={() => scrollToSection('sobre')}
              className="hover:text-amber-400 transition-colors focus:outline-none"
            >
              Sobre a ONG
            </button>
            <button
              id="nav-link-como-ajudamos"
              onClick={() => scrollToSection('como-ajudamos')}
              className="hover:text-amber-400 transition-colors focus:outline-none"
            >
              Como ajudamos
            </button>
            <button
              id="nav-link-galeria"
              onClick={() => scrollToSection('galeria')}
              className="hover:text-amber-400 transition-colors focus:outline-none flex items-center gap-1"
            >
              <span>Fotos</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-400 font-bold px-1.5 py-0.2 rounded">HD</span>
            </button>
            <button
              id="nav-link-transparencia"
              onClick={() => scrollToSection('transparencia')}
              className="hover:text-amber-400 transition-colors focus:outline-none"
            >
              Transparência
            </button>
            <button
              id="nav-link-contato"
              onClick={() => scrollToSection('contato')}
              className="hover:text-amber-400 transition-colors focus:outline-none"
            >
              Contato
            </button>
          </nav>

          {/* CTA & Dev Tool */}
          <div className="hidden sm:flex items-center gap-3">
            {onOpenConfig && (
              <button
                id="btn-open-mp-config"
                onClick={onOpenConfig}
                title="Configurações de Integração Mercado Pago e Pix"
                className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors text-xs flex items-center gap-1.5 border border-neutral-700"
              >
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">Chaves / API</span>
              </button>
            )}

            <button
              id="btn-header-doar-agora"
              onClick={() => {
                scrollToSection('doacao');
                onOpenDonate();
              }}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-neutral-950 font-bold rounded-xl shadow-lg shadow-amber-500/30 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm uppercase tracking-wide cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-neutral-950 stroke-neutral-950" />
              <span>DOAR AGORA</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="btn-header-mobile-doar"
              onClick={() => {
                scrollToSection('doacao');
                onOpenDonate();
              }}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-md uppercase"
            >
              <Heart className="w-3.5 h-3.5 fill-neutral-950 stroke-neutral-950" />
              <span>DOAR</span>
            </button>
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-neutral-800 text-neutral-200 hover:text-white focus:outline-none"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden bg-neutral-900 border-b border-neutral-800 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-2xl animate-fadeIn"
        >
          <div className="flex flex-col space-y-2 text-base font-medium text-neutral-300">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-left px-3 py-2 rounded-lg hover:bg-neutral-800 hover:text-amber-400 transition-colors"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('sobre')}
              className="text-left px-3 py-2 rounded-lg hover:bg-neutral-800 hover:text-amber-400 transition-colors"
            >
              Sobre a ONG
            </button>
            <button
              onClick={() => scrollToSection('como-ajudamos')}
              className="text-left px-3 py-2 rounded-lg hover:bg-neutral-800 hover:text-amber-400 transition-colors"
            >
              Como ajudamos
            </button>
            <button
              onClick={() => scrollToSection('galeria')}
              className="text-left px-3 py-2 rounded-lg hover:bg-neutral-800 hover:text-amber-400 transition-colors flex items-center justify-between"
            >
              <span>Fotos dos Animais</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded">Fotos Grandes</span>
            </button>
            <button
              onClick={() => scrollToSection('transparencia')}
              className="text-left px-3 py-2 rounded-lg hover:bg-neutral-800 hover:text-amber-400 transition-colors"
            >
              Transparência
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className="text-left px-3 py-2 rounded-lg hover:bg-neutral-800 hover:text-amber-400 transition-colors"
            >
              Contato
            </button>
          </div>

          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
            <button
              id="btn-mobile-drawer-doar"
              onClick={() => {
                scrollToSection('doacao');
                onOpenDonate();
              }}
              className="w-full py-3 bg-amber-500 text-neutral-950 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 uppercase text-sm"
            >
              <Heart className="w-4 h-4 fill-neutral-950" />
              <span>DOAR AGORA</span>
            </button>

            {onOpenConfig && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConfig();
                }}
                className="w-full py-2 bg-neutral-800 text-neutral-300 hover:text-white rounded-xl text-xs flex items-center justify-center gap-2 border border-neutral-700"
              >
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>Configurar Chaves Mercado Pago</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
