import React, { useState } from 'react';
import { MessageCircle, Instagram, Mail, Send, CheckCircle2, Heart } from 'lucide-react';
import { APP_CONFIG } from '../config';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Direct WhatsApp message generation or feedback
    const messageText = `Olá! Meu nome é ${formData.name} (${formData.email}). Mensagem: ${formData.message}`;
    const waUrl = `https://wa.me/${APP_CONFIG.contact.whatsapp}?text=${encodeURIComponent(messageText)}`;
    
    setSentSuccess(true);
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setSentSuccess(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <section
      id="contato"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-900/40 relative border-t border-neutral-900"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Canais Oficiais</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            ENTRE EM <span className="text-amber-400">CONTATO</span>
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg mt-3">
            Fale diretamente com nossa equipe de voluntários. Estamos à disposição para tirar dúvidas.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* WhatsApp Card */}
          <a
            href={`https://wa.me/${APP_CONFIG.contact.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de mais informações sobre as doações para a ONG UNAHG PET.')}`}
            target="_blank"
            rel="noopener noreferrer"
            id="link-contato-whatsapp"
            className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 group shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                WhatsApp Oficial
              </span>
              <h3 className="text-lg font-bold text-white mt-1 group-hover:text-emerald-400 transition-colors">
                {APP_CONFIG.contact.whatsappDisplay}
              </h3>
              <p className="text-xs text-neutral-400 mt-2">
                Atendimento rápido para dúvidas e comprovantes de doação.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-emerald-400 font-bold">
              <span>Enviar Mensagem</span>
              <span>→</span>
            </div>
          </a>

          {/* Instagram Card */}
          <a
            href={APP_CONFIG.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="link-contato-instagram"
            className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-1 group shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Instagram className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Instagram
              </span>
              <h3 className="text-lg font-bold text-white mt-1 group-hover:text-pink-400 transition-colors">
                @{APP_CONFIG.contact.instagram}
              </h3>
              <p className="text-xs text-neutral-400 mt-2">
                Acompanhe o dia a dia e as ações em prol dos animais.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-pink-400 font-bold">
              <span>Seguir Perfil</span>
              <span>→</span>
            </div>
          </a>

          {/* Email Card */}
          <a
            href={`mailto:${APP_CONFIG.contact.email}?subject=Doacao%20UNAHG%20PET`}
            id="link-contato-email"
            className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 group shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                E-mail
              </span>
              <h3 className="text-lg font-bold text-white mt-1 group-hover:text-amber-400 transition-colors break-all">
                {APP_CONFIG.contact.email}
              </h3>
              <p className="text-xs text-neutral-400 mt-2">
                Para parcerias, envio formal de comprovantes e suporte.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-amber-400 font-bold">
              <span>Enviar E-mail</span>
              <span>→</span>
            </div>
          </a>
        </div>

        {/* Quick Message Form */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Send className="w-5 h-5 text-amber-400" />
            Envie uma Mensagem Direta
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mb-6">
            Preencha os campos abaixo e entraremos em contato o mais breve possível.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Seu Nome Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nome"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Seu E-mail
                </label>
                <input
                  type="email"
                  required
                  placeholder="exemplo@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">
                Sua Mensagem
              </label>
              <textarea
                required
                rows={3}
                placeholder="Como podemos te ajudar?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <span className="text-xs text-neutral-400">
                Respondemos em até 24h úteis.
              </span>

              <button
                type="submit"
                id="btn-enviar-contato"
                className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl shadow-md shadow-amber-500/20 text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
              >
                {sentSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Redirecionando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Enviar Mensagem</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
