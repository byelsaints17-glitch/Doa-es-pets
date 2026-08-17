import React from 'react';
import { Heart, Compass, ShieldCheck, Users } from 'lucide-react';
import { APP_CONFIG } from '../config';

export const AboutUs: React.FC = () => {
  return (
    <section
      id="sobre"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-900/40 relative border-t border-neutral-900"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-amber-400" />
            <span>Nossa Missão</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            SOBRE A <span className="text-amber-400">UNAHG PET</span>
          </h2>
        </div>

        {/* Narrative Box */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="border-l-4 border-amber-500 pl-4 sm:pl-6 py-1">
            <p className="text-lg sm:text-2xl font-bold text-neutral-100 leading-snug">
              "A UNAHG PET busca apoiar animais abandonados e contribuir para que recebam
              alimentação, cuidados e proteção."
            </p>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed pt-2">
            <p>
              Nas ruas de nossas cidades, inúmeros cães e gatos enfrentam diariamente a fome,
              a solidão, doenças e a indiferença. Nossa iniciativa nasceu da urgência de agir
              em prol daqueles que não podem pedir socorro.
            </p>
            <p>
              Com o apoio de voluntários dedicados e de pessoas generosas como você, viabilizamos
              ações essenciais para amenizar o sofrimento dos animais desamparados, garantindo
              que tenham acesso a ração de qualidade, remédios básicos, atendimento clínico e
              abrigo temporário contra intempéries.
            </p>
          </div>

          {/* Large Photo Banner showing real rescued animals together */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-neutral-800 group">
              <img
                src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=1000&auto=format&fit=crop"
                alt="Cães e gatos resgatados e convivendo em paz"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
              <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-neutral-950/80 px-2.5 py-1 rounded-lg border border-neutral-700 backdrop-blur-xs">
                🐾 Convivência & Cuidado
              </span>
            </div>
            <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-neutral-800 group">
              <img
                src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1000&auto=format&fit=crop"
                alt="Amor e carinho aos animais resgatados"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
              <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-neutral-950/80 px-2.5 py-1 rounded-lg border border-neutral-700 backdrop-blur-xs">
                ❤️ Amor & Dedicação dos Voluntários
              </span>
            </div>
          </div>

          {/* Core Values Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-800">
            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800">
              <div className="flex items-center gap-2 text-amber-400 mb-2 font-bold text-sm">
                <Compass className="w-4 h-4" />
                <span>Propósito Claro</span>
              </div>
              <p className="text-xs text-neutral-400">
                Foco total no bem-estar, respeito à vida e acolhimento dos animais em vulnerabilidade.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800">
              <div className="flex items-center gap-2 text-amber-400 mb-2 font-bold text-sm">
                <Users className="w-4 h-4" />
                <span>Trabalho Voluntário</span>
              </div>
              <p className="text-xs text-neutral-400">
                Rede de apoio movida pelo amor incondicional e dedicação aos animais sem lar.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800">
              <div className="flex items-center gap-2 text-amber-400 mb-2 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Idoneidade</span>
              </div>
              <p className="text-xs text-neutral-400">
                Uso responsável e transparente de todas as contribuições financeiras recebidas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
