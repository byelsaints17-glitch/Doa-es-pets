import React, { useEffect } from 'react';
import { CheckCircle2, Heart, Download, Share2, ArrowLeft, ShieldCheck, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PaymentDetails } from './PaymentModal';
import { APP_CONFIG } from '../config';

interface ConfirmationModalProps {
  details: PaymentDetails | null;
  onClose: () => void;
  onNewDonation: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  details,
  onClose,
  onNewDonation,
}) => {
  useEffect(() => {
    if (details) {
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#10B981', '#FBBF24', '#FFFFFF'],
        });
      } catch (e) {
        console.error('Confetti error', e);
      }
    }
  }, [details]);

  if (!details) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="confirmation-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
    >
      <div
        id="confirmation-modal-content"
        className="bg-neutral-900 border border-emerald-500/40 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden my-8 relative flex flex-col"
      >
        {/* Top celebratory banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 p-6 text-center text-neutral-950">
          <div className="w-16 h-16 rounded-full bg-neutral-950 text-emerald-400 mx-auto flex items-center justify-center shadow-lg mb-3">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 fill-amber-400 stroke-amber-400 text-amber-400 inline" />
            DOAÇÃO CONFIRMADA!
          </h2>
          <p className="text-emerald-950 font-bold text-sm sm:text-base mt-1">
            Muito obrigado por ajudar os animais.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Heartfelt gratitude message */}
          <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-center space-y-2">
            <p className="text-neutral-200 text-sm leading-relaxed">
              {details.donorName ? (
                <>
                  Gratidão, <strong className="text-white">{details.donorName}</strong>!
                </>
              ) : (
                'Gratidão por sua generosidade!'
              )}{' '}
              Sua contribuição foi registrada com sucesso e será destinada
              integralmente ao cuidado, alimentação e socorro de animais
              abandonados.
            </p>
          </div>

          {/* Receipt Details Card */}
          <div
            id="donation-receipt-card"
            className="bg-neutral-950 rounded-2xl border border-neutral-800/90 p-5 space-y-3.5 text-xs sm:text-sm text-neutral-300"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-neutral-400 font-medium">Beneficiário</span>
              <span className="font-bold text-white text-right">{APP_CONFIG.ongName}</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-neutral-400 font-medium">Valor Contribuído</span>
              <span className="text-lg font-black text-amber-400">
                R$ {details.amount.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-neutral-400 font-medium">Método de Pagamento</span>
              <span className="font-bold text-neutral-100 uppercase">
                {details.method === 'pix' ? 'Pix Instantâneo' : 'Cartão de Crédito (Mercado Pago)'}
              </span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-neutral-400 font-medium">Data e Hora</span>
              <span className="text-neutral-200 font-medium">{details.date}</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-neutral-400 font-medium">Status</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Confirmado / Aprovado
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-1 text-[11px] text-neutral-400 gap-1">
              <span>ID da Transação:</span>
              <span className="font-mono text-neutral-300 select-all font-semibold">
                {details.txId}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              id="btn-print-receipt"
              onClick={handlePrint}
              className="py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-neutral-700 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Imprimir Recibo</span>
            </button>

            <button
              type="button"
              id="btn-nova-doacao"
              onClick={onNewDonation}
              className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer uppercase"
            >
              <Heart className="w-4 h-4 fill-neutral-950" />
              <span>Fazer Nova Doação</span>
            </button>
          </div>

          {/* Close button */}
          <div className="text-center pt-2">
            <button
              type="button"
              id="btn-fechar-confirmacao"
              onClick={onClose}
              className="text-xs text-neutral-400 hover:text-white transition-colors underline"
            >
              Fechar e voltar ao início
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
