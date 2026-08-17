import React, { useState, useEffect } from 'react';
import {
  X,
  CreditCard,
  QrCode,
  Copy,
  Check,
  ShieldCheck,
  AlertCircle,
  Clock,
  Sparkles,
  RefreshCw,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Lock,
  ArrowRight,
  Info,
} from 'lucide-react';
import { APP_CONFIG } from '../config';
import { generatePixPayload, generateTransactionId } from '../utils/pix';

export interface PaymentDetails {
  amount: number;
  donorName?: string;
  donorEmail?: string;
  method: 'pix' | 'mercadopago';
  txId: string;
  date: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  donorName?: string;
  donorEmail?: string;
  onPaymentConfirmed: (details: PaymentDetails) => void;
  onOpenConfig?: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  donorName,
  donorEmail,
  onPaymentConfirmed,
  onOpenConfig,
}) => {
  // Tab state: 'pix' ou 'card'
  const [activeTab, setActiveTab] = useState<'pix' | 'card'>('pix');

  // Pix states
  const [copiedPixKey, setCopiedPixKey] = useState<boolean>(false);
  const [copiedPixPayload, setCopiedPixPayload] = useState<boolean>(false);
  const [pixPayload, setPixPayload] = useState<string>('');
  const [pixTxId, setPixTxId] = useState<string>('');

  // Mercado Pago / Card states
  const [isLoadingMp, setIsLoadingMp] = useState<boolean>(false);
  const [mpPreferenceUrl, setMpPreferenceUrl] = useState<string | null>(null);
  const [mpPreferenceId, setMpPreferenceId] = useState<string | null>(null);
  const [mpErrorMessage, setMpErrorMessage] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [iframeLoaded, setIframeLoaded] = useState<boolean>(false);

  // Generate Pix payload when modal opens or amount changes
  useEffect(() => {
    if (!isOpen) return;

    const txId = generateTransactionId();
    setPixTxId(txId);

    const payload = generatePixPayload({
      pixKey: APP_CONFIG.pix.key,
      beneficiaryName: APP_CONFIG.pix.beneficiaryName,
      beneficiaryCity: APP_CONFIG.pix.city,
      amount: amount,
      txId: txId,
      description: 'Doacao UNAHG PET',
    });

    setPixPayload(payload);
    setCopiedPixKey(false);
    setCopiedPixPayload(false);
  }, [isOpen, amount]);

  // Load Mercado Pago checkout preference when Cartão tab is active
  useEffect(() => {
    if (!isOpen) {
      setMpPreferenceUrl(null);
      setMpPreferenceId(null);
      setMpErrorMessage(null);
      setIsLoadingMp(false);
      setIframeLoaded(false);
      return;
    }

    if (activeTab === 'card' && !mpPreferenceUrl && !isLoadingMp) {
      let isMounted = true;

      const fetchPreference = async () => {
        setIsLoadingMp(true);
        setMpErrorMessage(null);
        setIframeLoaded(false);

        try {
          const response = await fetch('/api/create-preference', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount,
              donorName: donorName || 'Apoiador Voluntário',
              donorEmail: donorEmail || APP_CONFIG.contact.email,
            }),
          });

          const data = await response.json();

          if (!isMounted) return;

          if (response.ok && (data.init_point || data.sandbox_init_point)) {
            const checkoutUrl = data.init_point || data.sandbox_init_point;
            setMpPreferenceUrl(checkoutUrl);
            setMpPreferenceId(data.id);
          } else {
            throw new Error(data.details || data.error || 'Erro ao inicializar checkout do Mercado Pago.');
          }
        } catch (err: any) {
          if (!isMounted) return;
          console.error('Erro no checkout Mercado Pago:', err);
          setMpErrorMessage(
            err.message || 'Falha ao conectar com o Mercado Pago. Tente novamente ou use a opção Pix.'
          );
        } finally {
          if (isMounted) {
            setIsLoadingMp(false);
          }
        }
      };

      fetchPreference();

      return () => {
        isMounted = false;
      };
    }
  }, [isOpen, activeTab, amount, donorName, donorEmail, mpPreferenceUrl, isLoadingMp]);

  if (!isOpen) return null;

  // Copy helper
  const handleCopy = (text: string, type: 'key' | 'payload') => {
    navigator.clipboard.writeText(text);
    if (type === 'key') {
      setCopiedPixKey(true);
      setTimeout(() => setCopiedPixKey(false), 2500);
    } else {
      setCopiedPixPayload(true);
      setTimeout(() => setCopiedPixPayload(false), 2500);
    }
  };

  const handleConfirmPix = () => {
    const details: PaymentDetails = {
      amount,
      donorName,
      donorEmail,
      method: 'pix',
      txId: `PIX-${pixTxId || Date.now()}`,
      date: new Date().toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    onClose();
    onPaymentConfirmed(details);
  };

  const handleConfirmCard = () => {
    const details: PaymentDetails = {
      amount,
      donorName,
      donorEmail,
      method: 'mercadopago',
      txId: mpPreferenceId ? `MP-${mpPreferenceId.slice(-8)}` : `MP-${Date.now()}`,
      date: new Date().toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    onClose();
    onPaymentConfirmed(details);
  };

  const handleSameWindowRedirect = () => {
    if (mpPreferenceUrl) {
      window.location.href = mpPreferenceUrl;
    }
  };

  // QR Code URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    pixPayload || APP_CONFIG.pix.key
  )}&margin=10&color=000000&bgcolor=ffffff`;

  return (
    <div
      id="payment-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="payment-modal-content"
        className={`bg-neutral-900 border border-neutral-800 rounded-3xl w-full shadow-2xl overflow-hidden my-4 relative flex flex-col transition-all duration-300 ${
          isExpanded && activeTab === 'card'
            ? 'max-w-6xl h-[94vh]'
            : 'max-w-2xl max-h-[92vh]'
        }`}
      >
        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/90 sticky top-0 z-20">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                Doação Solidária UNAHG PET
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <Lock className="w-2.5 h-2.5" />
                Seguro & Auditado
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2 mt-0.5">
              <span>Valor:</span>
              <span className="text-amber-400 font-black">
                R$ {amount.toFixed(2).replace('.', ',')}
              </span>
            </h3>
          </div>

          <div className="flex items-center gap-1.5">
            {activeTab === 'card' && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors hidden sm:inline-flex cursor-pointer"
                title={isExpanded ? 'Reduzir tamanho' : 'Expandir tela cheia'}
                aria-label="Expandir modal"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            )}

            <button
              id="btn-close-payment-modal"
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Fechar janela"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2 Navigation Tabs: Pix vs Cartão */}
        <div className="px-5 sm:px-6 pt-4 pb-2 bg-neutral-950/50 border-b border-neutral-800/80">
          <div className="grid grid-cols-2 gap-2 bg-neutral-950 p-1.5 rounded-2xl border border-neutral-800">
            {/* Tab 1: Pix */}
            <button
              type="button"
              id="tab-pix"
              onClick={() => setActiveTab('pix')}
              className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'pix'
                  ? 'bg-emerald-500 text-neutral-950 shadow-md shadow-emerald-500/25'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>1. PIX INSTANTÂNEO</span>
            </button>

            {/* Tab 2: Cartão de Crédito */}
            <button
              type="button"
              id="tab-cartao"
              onClick={() => setActiveTab('card')}
              className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'card'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>2. CARTÃO DE CRÉDITO</span>
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 flex flex-col">
          {/* TAB 1: PIX */}
          {activeTab === 'pix' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Beneficiary Header Box */}
              <div className="p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="text-neutral-400 block text-[11px]">Favorecido / Destino:</span>
                  <span className="font-bold text-white text-sm">{APP_CONFIG.pix.beneficiaryName}</span>
                </div>
                <div className="text-right space-y-0.5">
                  <span className="text-neutral-400 block text-[11px]">Chave Oficial:</span>
                  <span className="font-semibold text-emerald-400 text-xs font-mono">{APP_CONFIG.pix.key}</span>
                </div>
              </div>

              {/* QR Code and Instructions Container */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                {/* QR Code Visual Box */}
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-neutral-200 shadow-inner">
                  <img
                    src={qrCodeUrl}
                    alt="QR Code Pix UNAHG PET"
                    className="w-44 h-44 object-contain"
                  />
                  <span className="text-[11px] font-bold text-neutral-800 mt-2 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    Aponte a câmera no app do seu banco
                  </span>
                </div>

                {/* Instructions List */}
                <div className="space-y-3 text-xs text-neutral-300">
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                    <p className="font-bold text-neutral-100 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px]">
                        1
                      </span>
                      Abra o aplicativo do seu banco
                    </p>
                    <p className="font-bold text-neutral-100 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px]">
                        2
                      </span>
                      Escolha <strong>Pix Copia e Cola</strong> ou <strong>Chave E-mail</strong>
                    </p>
                    <p className="font-bold text-neutral-100 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px]">
                        3
                      </span>
                      Confirme o valor de <strong>R$ {amount.toFixed(2).replace('.', ',')}</strong>
                    </p>
                  </div>

                  {/* Copy Chave E-mail */}
                  <div className="space-y-1">
                    <span className="text-[11px] text-neutral-400 font-medium">Chave Pix (E-mail):</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={APP_CONFIG.pix.key}
                        className="flex-1 px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs font-mono text-white select-all"
                      />
                      <button
                        type="button"
                        id="btn-copiar-chave-pix"
                        onClick={() => handleCopy(APP_CONFIG.pix.key, 'key')}
                        className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 border border-neutral-700 transition-colors cursor-pointer shrink-0"
                      >
                        {copiedPixKey ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar Chave</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pix Copia e Cola Box */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-300 font-semibold flex items-center gap-1.5">
                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                    Código Pix Copia e Cola (EMV):
                  </span>
                  {copiedPixPayload && (
                    <span className="text-xs text-emerald-400 font-bold animate-pulse">
                      Código Pix copiado!
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={pixPayload}
                    className="flex-1 px-3 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-xs font-mono text-neutral-300 truncate select-all"
                  />
                  <button
                    type="button"
                    id="btn-copiar-payload-pix"
                    onClick={() => handleCopy(pixPayload, 'payload')}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-neutral-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer uppercase shrink-0"
                  >
                    {copiedPixPayload ? (
                      <>
                        <Check className="w-4 h-4 text-neutral-950" />
                        <span>COPIADO</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>COPIAR CÓDIGO PIX</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Pix Simulation Button */}
              <div className="pt-2">
                <button
                  type="button"
                  id="btn-confirmar-pix"
                  onClick={handleConfirmPix}
                  className="w-full py-3.5 bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 text-neutral-100 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 border border-neutral-700 transition-colors cursor-pointer shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Já realizei a transferência (Confirmar Doação Pix)</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: CARTÃO DE CRÉDITO (MERCADO PAGO) */}
          {activeTab === 'card' && (
            <div className="space-y-3 flex-1 flex flex-col animate-fadeIn">
              {/* Loading State */}
              {isLoadingMp && (
                <div className="py-16 flex flex-col items-center justify-center text-center space-y-4 flex-1">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full border-4 border-sky-500/20 border-t-sky-400 animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-sky-400 animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-bold text-white">Carregando Checkout Mercado Pago...</p>
                    <p className="text-xs text-neutral-400 max-w-sm">
                      Preparando o formulário oficial de cartão em ambiente seguro e criptografado.
                    </p>
                  </div>
                </div>
              )}

              {/* Error State */}
              {mpErrorMessage && !isLoadingMp && (
                <div className="p-5 rounded-2xl bg-red-950/40 border border-red-800/60 text-red-200 text-xs sm:text-sm space-y-3 my-auto">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold text-red-300">Falha ao conectar com o Mercado Pago</p>
                      <p className="text-xs text-neutral-300">{mpErrorMessage}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setMpPreferenceUrl(null);
                        setIsLoadingMp(false);
                      }}
                      className="px-4 py-2 bg-red-900/60 hover:bg-red-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 border border-red-700 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Tentar Novamente</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('pix')}
                      className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Doar via Pix
                    </button>
                  </div>
                </div>
              )}

              {/* Mercado Pago Checkout Frame */}
              {mpPreferenceUrl && !isLoadingMp && (
                <div className="space-y-3 flex-1 flex flex-col">
                  {/* Security bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs text-neutral-300">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-sky-400" />
                      <span>
                        Mercado Pago Oficial &bull; Cartão até 12x &bull; <strong>{APP_CONFIG.ongName}</strong>
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-semibold">SSL 256-bit</span>
                  </div>

                  {/* Embedded Iframe Container */}
                  <div className="relative rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden flex-1 min-h-[480px]">
                    {!iframeLoaded && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950/90 z-10 space-y-3">
                        <Clock className="w-8 h-8 text-sky-400 animate-spin" />
                        <span className="text-xs text-neutral-400 font-medium">
                          Carregando painel do Mercado Pago...
                        </span>
                      </div>
                    )}

                    <iframe
                      id="mercadopago-checkout-iframe"
                      src={mpPreferenceUrl}
                      title="Checkout Mercado Pago Cartão"
                      allow="payment *; clipboard-write *"
                      onLoad={() => setIframeLoaded(true)}
                      className="w-full h-full min-h-[500px] sm:min-h-[560px] border-0"
                    />
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <button
                      type="button"
                      id="btn-confirmar-cartao"
                      onClick={handleConfirmCard}
                      className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer uppercase tracking-wide"
                    >
                      <CheckCircle2 className="w-4 h-4 fill-neutral-950 stroke-emerald-500" />
                      <span>Já paguei / Gerar Recibo</span>
                    </button>

                    <button
                      type="button"
                      id="btn-tela-cheia-cartao"
                      onClick={handleSameWindowRedirect}
                      className="py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-neutral-700 transition-colors cursor-pointer"
                    >
                      <span>Abrir na Mesma Janela</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-3.5 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Transação 100% Segura & Auditada
          </span>
          <span>UNAHG PET &bull; Proteção Animal</span>
        </div>
      </div>
    </div>
  );
};
