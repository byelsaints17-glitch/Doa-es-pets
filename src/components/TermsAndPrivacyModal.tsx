import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { APP_CONFIG } from '../config';

interface TermsAndPrivacyModalProps {
  isOpen: boolean;
  type: 'terms' | 'privacy' | null;
  onClose: () => void;
}

export const TermsAndPrivacyModal: React.FC<TermsAndPrivacyModalProps> = ({
  isOpen,
  type,
  onClose,
}) => {
  if (!isOpen || !type) return null;

  return (
    <div
      id="legal-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="legal-modal-content"
        className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-8 relative flex flex-col max-h-[85vh]"
      >
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/90 sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">
              {type === 'terms' ? 'Termos de Uso e Doação' : 'Política de Privacidade'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed flex-1">
          {type === 'terms' ? (
            <>
              <h4 className="font-bold text-white text-base">1. Natureza das Doações</h4>
              <p>
                Todas as doações realizadas através desta plataforma para a {APP_CONFIG.ongName} são de caráter voluntário, irrevogável e espontâneo, destinadas exclusivamente à manutenção e suporte a animais em situação de abandono e vulnerabilidade.
              </p>

              <h4 className="font-bold text-white text-base">2. Meios de Pagamento</h4>
              <p>
                As transações financeiras são processadas por meio de infraestruturas seguras e certificadas (Pix pelo Banco Central do Brasil e Mercado Pago). A {APP_CONFIG.ongName} não armazena dados sensíveis de cartões de crédito.
              </p>

              <h4 className="font-bold text-white text-base">3. Prestação de Contas</h4>
              <p>
                A organização compromete-se a aplicar as contribuições com máxima idoneidade, priorizando alimentação, assistência veterinária, remédios e acolhimento para animais necessitados.
              </p>
            </>
          ) : (
            <>
              <h4 className="font-bold text-white text-base">1. Coleta de Dados</h4>
              <p>
                Coletamos apenas os dados estritamente necessários fornecidos voluntariamente pelos doadores (como nome e e-mail) para a emissão de recibos e eventual contato sobre as atividades da causa animal.
              </p>

              <h4 className="font-bold text-white text-base">2. Segurança e Confidencialidade</h4>
              <p>
                Não compartilhamos, vendemos ou alugamos dados pessoais a terceiros. As informações são tratadas em conformidade com as boas práticas da Lei Geral de Proteção de Dados (LGPD).
              </p>

              <h4 className="font-bold text-white text-base">3. Contato para Privacidade</h4>
              <p>
                Para solicitar esclarecimentos ou remoção de seus dados cadastrais, basta enviar um e-mail para <strong className="text-white">{APP_CONFIG.contact.email}</strong>.
              </p>
            </>
          )}
        </div>

        <div className="px-6 py-3 bg-neutral-950 border-t border-neutral-800 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
