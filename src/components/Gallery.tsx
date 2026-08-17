import React, { useState } from 'react';
import { Heart, Sparkles, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface AnimalPhoto {
  id: string;
  title: string;
  species: 'Cão' | 'Gato' | 'Cão & Gato';
  status: string;
  description: string;
  image: string;
  story: string;
  tag: string;
}

const RESCUE_PHOTOS: AnimalPhoto[] = [
  {
    id: 'resgate-1',
    title: 'Thor & Mel',
    species: 'Cão & Gato',
    status: 'Acolhidos e Alimentados',
    description: 'Inseparáveis após o resgate, agora recebem alimentação diária e vacinas.',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=1600&auto=format&fit=crop',
    story: 'Encontrados juntos buscando abrigo da chuva. Hoje vivem protegidos com ração garantida pelas doações.',
    tag: 'Amizade & Cuidado',
  },
  {
    id: 'resgate-2',
    title: 'Bob (Caramelo)',
    species: 'Cão',
    status: 'Tratamento Concluído',
    description: 'Resgatado com desnutrição severa, hoje saudável e cheio de energia.',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1600&auto=format&fit=crop',
    story: 'Passou por tratamento veterinário completo contra sarna e desnutrição com apoio das doações voluntárias.',
    tag: 'Superação Canina',
  },
  {
    id: 'resgate-3',
    title: 'Luna & Filhotes',
    species: 'Gato',
    status: 'Abrigo e Cuidados',
    description: 'Mamãe gata resgatada de um terreno baldio com 4 filhotinhos recém-nascidos.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1600&auto=format&fit=crop',
    story: 'Todos vermifugados, vacinados e recebendo alimentação úmida especial para a fase de crescimento.',
    tag: 'Família Felina Protegida',
  },
  {
    id: 'resgate-4',
    title: 'Max',
    species: 'Cão',
    status: 'Em Reabilitação',
    description: 'Cão idoso acolhido após anos de abandono. Hoje recebe medicação para as articulações.',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1600&auto=format&fit=crop',
    story: 'Graças às doações, Max tem ração sênior, vitaminas diárias e uma caminha quente.',
    tag: 'Cuidado Especial',
  },
  {
    id: 'resgate-5',
    title: 'Oliver',
    species: 'Gato',
    status: 'Castrado e Vacinado',
    description: 'Gatinho resgatado com ferimentos nas orelhas, totalmente curado após assistência médica.',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1600&auto=format&fit=crop',
    story: 'Recebeu curativos diários e castração segura para não voltar a sofrer nas ruas.',
    tag: 'Saúde Felina',
  },
  {
    id: 'resgate-6',
    title: 'Pipoca & Amigos',
    species: 'Cão',
    status: 'Ponto de Ração Comunitário',
    description: 'Alimentação diária nos comedouros comunitários monitorados por voluntários.',
    image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=1600&auto=format&fit=crop',
    story: 'Mais de 15 animais de rua se alimentam diariamente neste ponto abastecido pelas doações.',
    tag: 'Ração Comunitária',
  },
];

interface GalleryProps {
  onDonateClick: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onDonateClick }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<AnimalPhoto | null>(null);
  const [filter, setFilter] = useState<'Todos' | 'Cães' | 'Gatos'>('Todos');

  const filteredPhotos = RESCUE_PHOTOS.filter((photo) => {
    if (filter === 'Todos') return true;
    if (filter === 'Cães') return photo.species === 'Cão' || photo.species === 'Cão & Gato';
    if (filter === 'Gatos') return photo.species === 'Gato' || photo.species === 'Cão & Gato';
    return true;
  });

  const currentIndex = selectedPhoto
    ? RESCUE_PHOTOS.findIndex((p) => p.id === selectedPhoto.id)
    : -1;

  const handleNext = () => {
    if (currentIndex >= 0) {
      const next = (currentIndex + 1) % RESCUE_PHOTOS.length;
      setSelectedPhoto(RESCUE_PHOTOS[next]);
    }
  };

  const handlePrev = () => {
    if (currentIndex >= 0) {
      const prev = (currentIndex - 1 + RESCUE_PHOTOS.length) % RESCUE_PHOTOS.length;
      setSelectedPhoto(RESCUE_PHOTOS[prev]);
    }
  };

  return (
    <section
      id="galeria"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950 relative border-t border-neutral-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Galeria de Fotos dos Animais</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            VIDAS QUE VOCÊ <span className="text-amber-400">AJUDA A SALVAR</span>
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg mt-3 leading-relaxed">
            Veja as fotos em tamanho grande dos cães e gatos que recebem alimentação,
            atendimento veterinário e abrigo através do apoio das doações voluntárias.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {(['Todos', 'Cães', 'Gatos'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  filter === tab
                    ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20 scale-105'
                    : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {tab === 'Todos' ? '🐾 Todos os Animais' : tab === 'Cães' ? '🐶 Cães Resgatados' : '🐱 Gatos Acolhidos'}
              </button>
            ))}
          </div>
        </div>

        {/* Large Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((item) => (
            <div
              key={item.id}
              id={`card-foto-${item.id}`}
              onClick={() => setSelectedPhoto(item)}
              className="group bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col"
            >
              {/* Grand Picture Container */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-950">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Species & Status Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-lg bg-neutral-950/80 backdrop-blur-md text-amber-400 text-xs font-black uppercase border border-amber-500/30">
                    {item.species === 'Cão' ? '🐶 Cão' : item.species === 'Gato' ? '🐱 Gato' : '🐾 Cão & Gato'}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-xs font-semibold uppercase border border-emerald-500/30">
                    {item.status}
                  </span>
                </div>

                {/* Zoom Icon Button */}
                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 shadow-lg">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight">
                      {item.title}
                    </h3>
                    <span className="text-[11px] font-bold text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <p className="text-xs text-neutral-400 italic bg-neutral-950/60 p-3 rounded-xl border border-neutral-800/80">
                    "{item.story}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-amber-400" /> Doação Ativa
                  </span>
                  <span className="text-neutral-400 group-hover:text-neutral-200 transition-colors">
                    Clique para ampliar 🔍
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action callout banner */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-amber-500/15 via-neutral-900 to-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Sua doação transforma essas fotos em realidade
            </h3>
            <p className="text-sm text-neutral-300 mt-1.5 leading-relaxed">
              Cada contribuição garante ração fresca, remédios para dor, vacinas e cuidados para animais como estes.
            </p>
          </div>
          <button
            type="button"
            onClick={onDonateClick}
            className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-neutral-950 font-extrabold text-sm sm:text-base rounded-2xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2.5 transition-transform hover:-translate-y-0.5 cursor-pointer uppercase tracking-wider shrink-0"
          >
            <Heart className="w-5 h-5 fill-neutral-950" />
            <span>Fazer Doação Agora</span>
          </button>
        </div>
      </div>

      {/* Lightbox / Big Modal Zoom View */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-neutral-900 border border-neutral-700 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 p-2.5 bg-neutral-950/80 hover:bg-neutral-950 text-white rounded-full border border-neutral-700 transition-colors cursor-pointer"
              aria-label="Fechar visualização"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-neutral-950/80 hover:bg-amber-500 hover:text-neutral-950 text-white rounded-full border border-neutral-700 transition-colors cursor-pointer"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-neutral-950/80 hover:bg-amber-500 hover:text-neutral-950 text-white rounded-full border border-neutral-700 transition-colors cursor-pointer"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Big High-Res Image */}
            <div className="relative max-h-[65vh] w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full max-h-[65vh] object-cover sm:object-contain"
              />
            </div>

            {/* Modal Photo Details */}
            <div className="p-6 sm:p-8 bg-neutral-900 border-t border-neutral-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-bold uppercase border border-amber-500/30">
                      {selectedPhoto.species}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase border border-emerald-500/30">
                      {selectedPhoto.status}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-neutral-300 text-sm sm:text-base mt-2 leading-relaxed">
                    {selectedPhoto.description}
                  </p>
                  <p className="text-neutral-400 text-xs sm:text-sm italic mt-1">
                    "{selectedPhoto.story}"
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedPhoto(null);
                    onDonateClick();
                  }}
                  className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-sm uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 shrink-0 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-neutral-950" />
                  <span>Apoiar este animal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
