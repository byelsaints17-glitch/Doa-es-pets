import React from 'react';
import { Heart, ShieldCheck, ArrowUp } from 'lucide-react';
import { APP_CONFIG } from '../config';

interface FooterProps {
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
  onOpenDonate: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTerms,
  onOpenPrivacy,
  onOpenDonate,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-neutral-950 font-bold text-sm">
                🐾
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                {APP_CONFIG.ongName}
              </span>
            </div>
            <p className="text-neutral-300 text-xs max-w-sm">
              {APP_CONFIG.slogan}. Cada contribuição é um ato direto de amor e proteção.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-medium text-neutral-300 text-xs">
            <button
              onClick={() => scrollToSection('sobre')}
              className="hover:text-amber-400 transition-colors"
            >
              Sobre a ONG
            </button>
            <button
              onClick={() => scrollToSection('como-ajudamos')}
              className="hover:text-amber-400 transition-colors"
            >
              Como ajudamos
            </button>
            <button
              onClick={() => scrollToSection('transparencia')}
              className="hover:text-amber-400 transition-colors"
            >
              Transparência
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className="hover:text-amber-400 transition-colors"
            >
              Contato
            </button>
            <button
              onClick={onOpenPrivacy}
              className="hover:text-amber-400 transition-colors"
            >
              Política de Privacidade
            </button>
            <button
              onClick={onOpenTerms}
              className="hover:text-amber-400 transition-colors"
            >
              Termos de Uso
            </button>
          </div>

          {/* Action & Scroll to top */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDonate}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md uppercase cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-neutral-950" />
              <span>Doar Agora</span>
            </button>

            <button
              onClick={scrollToTop}
              title="Voltar ao topo"
              className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-xl border border-neutral-800 transition-colors cursor-pointer"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-neutral-400">
          <p>
            © {new Date().getFullYear()} {APP_CONFIG.ongName}. Todos os direitos reservados.
            Iniciativa independente e voluntária focada em acolhimento e proteção de animais de rua.
          </p>
          <div className="flex items-center gap-2 text-neutral-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Doações Seguras via Pix & Mercado Pago</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
