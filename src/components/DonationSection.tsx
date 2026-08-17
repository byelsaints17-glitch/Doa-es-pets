import React, { useState } from 'react';
import { Heart, AlertCircle, Sparkles, Check, ArrowRight } from 'lucide-react';
import { APP_CONFIG } from '../config';

interface DonationSectionProps {
  onProceedToPayment: (amount: number, donorName?: string, donorEmail?: string) => void;
}

const PRESET_AMOUNTS = [
  { value: 30, label: 'R$ 30', impact: 'Alimentação básica para animais acolhidos' },
  { value: 50, label: 'R$ 50', impact: 'Medicamentos essenciais e vermífugos' },
  { value: 100, label: 'R$ 100', impact: 'Consultas, vacinas e cuidados clínicos' },
  { value: 200, label: 'R$ 200', impact: 'Resgate, exames e reabilitação intensiva' },
];

export const DonationSection: React.FC<DonationSectionProps> = ({ onProceedToPayment }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmountStr, setCustomAmountStr] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSelectPreset = (value: number) => {
    setSelectedAmount(value);
    setIsCustom(false);
    setCustomAmountStr('');
    setErrorMessage(null);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.,]/g, '').replace(',', '.');
    setCustomAmountStr(e.target.value);
    setIsCustom(true);

    const num = parseFloat(val);
    if (!isNaN(num)) {
      setSelectedAmount(num);
      if (num < APP_CONFIG.minimumDonation) {
        setErrorMessage(`O valor mínimo para doação é R$ ${APP_CONFIG.minimumDonation.toFixed(2).replace('.', ',')}.`);
      } else {
        setErrorMessage(null);
      }
    } else {
      setSelectedAmount(0);
      setErrorMessage(`O valor mínimo para doação é R$ ${APP_CONFIG.minimumDonation.toFixed(2).replace('.', ',')}.`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = isCustom ? parseFloat(customAmountStr.replace(',', '.')) : selectedAmount;

    if (isNaN(finalAmount) || finalAmount < APP_CONFIG.minimumDonation) {
      setErrorMessage(`O valor mínimo para doação é R$ ${APP_CONFIG.minimumDonation.toFixed(2).replace('.', ',')}.`);
      return;
    }

    setErrorMessage(null);
    onProceedToPayment(finalAmount, donorName.trim() || undefined, donorEmail.trim() || undefined);
  };

  return (
    <section
      id="doacao"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-900/60 relative"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-amber-400" />
            <span>Contribuição Solidária</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            FAÇA SUA <span className="text-amber-400">DOAÇÃO</span>
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg mt-3 max-w-xl mx-auto">
            Escolha o valor que deseja contribuir. <br className="hidden sm:inline" />
            <span className="font-semibold text-neutral-100">
              Valor mínimo: R$ {APP_CONFIG.minimumDonation.toFixed(2).replace('.', ',')}
            </span>
          </p>
        </div>

        {/* Main Donation Card */}
        <div
          id="donation-card-container"
          className="bg-neutral-900 border border-neutral-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
            {/* Value Selector Buttons */}
            <div>
              <label className="block text-sm font-bold text-neutral-200 uppercase tracking-wide mb-4 flex items-center justify-between">
                <span>1. Escolha o valor da doação</span>
                <span className="text-xs text-amber-400 font-normal normal-case">
                  Mínimo R$ {APP_CONFIG.minimumDonation.toFixed(2).replace('.', ',')}
                </span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {PRESET_AMOUNTS.map((item) => {
                  const isSelected = !isCustom && selectedAmount === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      id={`btn-preset-amount-${item.value}`}
                      onClick={() => handleSelectPreset(item.value)}
                      className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 border-amber-400 text-neutral-950 shadow-lg shadow-amber-500/30 scale-[1.02]'
                          : 'bg-neutral-800/70 hover:bg-neutral-800 border-neutral-700/80 text-white hover:border-neutral-600'
                      }`}
                    >
                      <span className={`text-xl sm:text-2xl font-black ${isSelected ? 'text-neutral-950' : 'text-white'}`}>
                        {item.label}
                      </span>
                      <span className={`text-[11px] leading-tight line-clamp-2 ${isSelected ? 'text-neutral-900 font-medium' : 'text-neutral-400'}`}>
                        {item.impact}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Amount Input */}
            <div className="pt-2">
              <label htmlFor="custom-amount-input" className="block text-xs font-semibold text-neutral-300 uppercase tracking-wide mb-2">
                Ou digite outro valor:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-neutral-400 font-bold text-lg">R$</span>
                </div>
                <input
                  type="text"
                  inputMode="decimal"
                  id="custom-amount-input"
                  placeholder="Ex: 75,00"
                  value={customAmountStr}
                  onChange={handleCustomChange}
                  className={`w-full pl-12 pr-4 py-3.5 bg-neutral-950 border rounded-xl text-white text-lg font-bold placeholder-neutral-500 focus:outline-none transition-all ${
                    isCustom
                      ? 'border-amber-400 ring-2 ring-amber-400/20'
                      : 'border-neutral-700 hover:border-neutral-600'
                  }`}
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div
                id="donation-error-alert"
                className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-sm flex items-center gap-3 animate-shake"
              >
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <span className="font-semibold">{errorMessage}</span>
              </div>
            )}

            {/* Optional Donor Information (for receipt and personalization) */}
            <div className="pt-4 border-t border-neutral-800 space-y-4">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">
                2. Seus dados (opcional para recibo)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="donor-name-input" className="block text-xs text-neutral-400 mb-1 font-medium">
                    Seu Nome ou Apelido
                  </label>
                  <input
                    type="text"
                    id="donor-name-input"
                    placeholder="Ex: Maria Silva"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="donor-email-input" className="block text-xs text-neutral-400 mb-1 font-medium">
                    Seu E-mail
                  </label>
                  <input
                    type="email"
                    id="donor-email-input"
                    placeholder="Ex: maria@email.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Total Summary and Big Action Button */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-neutral-400 block uppercase font-medium">
                  Total da Doação
                </span>
                <span className="text-3xl font-black text-amber-400">
                  R$ {((isCustom ? parseFloat(customAmountStr.replace(',', '.')) : selectedAmount) || 0).toFixed(2).replace('.', ',')}
                </span>
              </div>

              <button
                type="submit"
                id="btn-doar-agora-main"
                className="px-8 py-4 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-neutral-950 font-black text-lg rounded-2xl shadow-xl shadow-amber-500/25 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer uppercase tracking-wider"
              >
                <Heart className="w-5 h-5 fill-neutral-950 stroke-neutral-950" />
                <span>DOAR AGORA</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Guarantee Note */}
          <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400 text-center">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              Pagamento 100% Criptografado
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              Mercado Pago: Cartão, Pix & Saldo
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              Comprovante e Recibo Imediatos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
