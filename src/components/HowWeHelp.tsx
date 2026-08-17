import React from 'react';
import { Heart, Stethoscope, Home, UtensilsCrossed, ShieldAlert } from 'lucide-react';

const IMPACT_AREAS = [
  {
    id: 'alimentacao',
    icon: '🐾',
    iconElement: <UtensilsCrossed className="w-6 h-6 text-amber-400" />,
    title: 'Alimentação',
    description:
      'Ajuda na compra de ração balanceada, suplementos e alimentos adequados para animais resgatados e pontos de apoio.',
    tag: 'Nutrição diária',
  },
  {
    id: 'veterinario',
    icon: '🏥',
    iconElement: <Stethoscope className="w-6 h-6 text-amber-400" />,
    title: 'Cuidados veterinários',
    description:
      'Consultas, exames laboratoriais, vacinação, castrações, medicamentos e tratamentos para salvar vidas.',
    tag: 'Saúde e cura',
  },
  {
    id: 'protecao',
    icon: '🏠',
    iconElement: <Home className="w-6 h-6 text-amber-400" />,
    title: 'Proteção',
    description:
      'Acolhimento, abrigo temporário, caminhas, cobertores e proteção física contra o frio, chuva e perigos da rua.',
    tag: 'Abrigo seguro',
  },
  {
    id: 'resgate',
    icon: '❤️',
    iconElement: <Heart className="w-6 h-6 text-amber-400 fill-amber-400" />,
    title: 'Resgate',
    description:
      'Ações emergenciais de resgate de animais em situação crítica de abandono, maus-tratos ou atropelamento.',
    tag: 'Socorro imediato',
  },
];

interface HowWeHelpProps {
  onDonateClick: () => void;
}

export const HowWeHelp: React.FC<HowWeHelpProps> = ({ onDonateClick }) => {
  return (
    <section
      id="como-ajudamos"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950 relative border-t border-neutral-900"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>🐾 Destinação dos Recursos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            COMO SUA DOAÇÃO <span className="text-amber-400">AJUDA</span>
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg mt-3 leading-relaxed">
            Cada centavo arrecadado é transformado em alívio, cuidado e esperança para
            animais que foram esquecidos e abandonados nas ruas.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {IMPACT_AREAS.map((item) => (
            <div
              key={item.id}
              id={`card-impacto-${item.id}`}
              className="bg-neutral-900 border border-neutral-800/80 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Card Icon & Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold text-amber-400/90 uppercase tracking-wider bg-neutral-950 px-2.5 py-1 rounded-md border border-neutral-800">
                    {item.tag}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight mb-2.5">
                  {item.title}
                </h3>

                {/* Card Description */}
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                <span>Impacto Direto</span>
                <span className="text-amber-400 font-bold">100% Solidário</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/15 via-neutral-900 to-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg sm:text-xl font-black text-white uppercase">
              Quer fazer a diferença agora mesmo?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1">
              Com apenas R$ 30,00 você já garante alimentação e cuidado para um animal vulnerável.
            </p>
          </div>
          <button
            type="button"
            id="btn-how-we-help-donate"
            onClick={onDonateClick}
            className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-neutral-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap cursor-pointer hover:scale-105 transition-all flex items-center gap-2"
          >
            <Heart className="w-4 h-4 fill-neutral-950 stroke-neutral-950" />
            <span>Fazer Doação</span>
          </button>
        </div>
      </div>
    </section>
  );
};
