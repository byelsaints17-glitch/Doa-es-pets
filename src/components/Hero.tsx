import React, { useState, useEffect } from 'react';
import { Heart, ShieldCheck, Sparkles, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  onDonateClick: () => void;
}

const HERO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=2000&auto=format&fit=crop',
    title: 'Cães e Gatos Acolhidos',
    caption: 'Companheiros que dependem do nosso amor e cuidado diário',
    type: 'dog-cat',
  },
  {
    url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2000&auto=format&fit=crop',
    title: 'Cães de Rua Resgatados',
    caption: 'Alimentação e assistência veterinária para cães desamparados',
    type: 'dog',
  },
  {
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2000&auto=format&fit=crop',
    title: 'Gatos em Situação de Risco',
    caption: 'Abrigo térmico e cuidados essenciais para felinos abandonados',
    type: 'cat',
  },
  {
    url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2000&auto=format&fit=crop',
    title: 'Vidas Transformadas',
    caption: 'Sua doação garante ração e remédios para salvar vidas',
    type: 'dog',
  },
];

const ANIMAL_CARDS = [
  {
    id: 'banner-dog',
    species: 'Cão Resgatado 🐶',
    name: 'Caramelo & Amigos',
    status: 'Alimentação diária garantida',
    desc: 'Salvo das ruas com desnutrição severa, hoje saudável.',
    img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800&auto=format&fit=crop',
    tag: 'Cães de Rua',
  },
  {
    id: 'banner-cat',
    species: 'Gato Acolhido 🐱',
    name: 'Mimi & Ninhada',
    status: 'Abrigo térmico e vacinas',
    desc: 'Mamãe gata e filhotes protegidos do frio e da fome.',
    img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=800&auto=format&fit=crop',
    tag: 'Gatos de Rua',
  },
];

export const Hero: React.FC<HeroProps> = ({ onDonateClick }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Auto-rotate background image every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-neutral-950 text-white"
    >
      {/* Background Images with smooth fade */}
      <div className="absolute inset-0 z-0">
        {HERO_IMAGES.map((img, idx) => (
          <img
            key={img.url}
            src={img.url}
            alt={img.title}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
              idx === activeImageIndex ? 'opacity-40 scale-100' : 'opacity-0 scale-105'
            }`}
          />
        ))}
        {/* Gradients for high contrast & readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/60" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-neutral-950/40 to-neutral-950" />
      </div>

      {/* Hero Image Navigation Controls */}
      <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-2 bg-neutral-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-neutral-800">
        <button
          type="button"
          onClick={prevImage}
          className="p-1.5 text-neutral-300 hover:text-amber-400 rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex gap-1 px-1">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveImageIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === activeImageIndex ? 'w-5 bg-amber-400' : 'w-2 bg-neutral-600 hover:bg-neutral-400'
              }`}
              aria-label={`Ver foto ${i + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={nextImage}
          className="p-1.5 text-neutral-300 hover:text-amber-400 rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label="Próxima foto"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Cause Badge */}
        <div
          id="hero-cause-badge"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6 backdrop-blur-sm shadow-md"
        >
          <span>🐶 Cães & 🐱 Gatos de Rua</span>
          <span className="w-1 h-1 rounded-full bg-amber-400"></span>
          <span>Doações Voluntárias</span>
        </div>

        {/* Main Title */}
        <h1
          id="hero-main-title"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[1.08] mb-6 drop-shadow-sm"
        >
          AJUDE UM ANIMAL <span className="text-amber-400">HOJE</span>
        </h1>

        {/* Emotional Subtitle */}
        <p
          id="hero-subtitle"
          className="text-lg sm:text-xl md:text-2xl text-neutral-200 font-normal leading-relaxed max-w-2xl mb-8 text-balance"
        >
          Eles não têm voz, mas têm vidas que merecem cuidado, amor e respeito.
          Sua contribuição ajuda a oferecer alimentação, cuidados veterinários,
          medicamentos e proteção.
        </p>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
          <button
            id="btn-hero-doacao"
            onClick={onDonateClick}
            className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-neutral-950 text-base sm:text-lg font-extrabold rounded-2xl shadow-xl shadow-amber-500/25 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer uppercase tracking-wider"
          >
            <Heart className="w-6 h-6 fill-neutral-950 stroke-neutral-950" />
            <span>FAÇA SUA DOAÇÃO</span>
          </button>
        </div>

        {/* Featured Dogs & Cats Photo Showcase in Banner - Grandes Fotos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl text-left mb-8">
          {ANIMAL_CARDS.map((card) => (
            <div
              key={card.id}
              className="bg-neutral-900/95 border border-neutral-800 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 backdrop-blur-md hover:border-amber-500/50 transition-all shadow-xl group hover:-translate-y-1"
            >
              <div className="relative w-full sm:w-36 h-48 sm:h-36 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-500/30">
                <img
                  src={card.img}
                  alt={card.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-2 left-2 text-[10px] font-black uppercase tracking-wider text-amber-300 bg-neutral-950/90 px-2 py-0.5 rounded backdrop-blur-xs border border-amber-500/30">
                  Foto Real
                </span>
              </div>
              <div className="flex-1 min-w-0 w-full flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 inline-block">
                      {card.species}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      {card.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white">{card.name}</h3>
                  <p className="text-xs text-neutral-300 mt-1 leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                  <span className="text-amber-400 font-semibold">100% Salvo por Doação</span>
                  <span>UNAHG PET</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust & Transparency Badges */}
        <div
          id="hero-trust-badges"
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mt-6 pt-6 border-t border-neutral-800/80 w-full max-w-3xl text-left"
        >
          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-xs">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-neutral-400 font-medium">100% Voluntário</p>
              <p className="text-sm font-bold text-white">Direto para cães e gatos</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-xs">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-neutral-400 font-medium">Doação Segura</p>
              <p className="text-sm font-bold text-white">Mercado Pago Oficial</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-xs">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-neutral-400 font-medium">Prestação Aberta</p>
              <p className="text-sm font-bold text-white">Total transparência</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

