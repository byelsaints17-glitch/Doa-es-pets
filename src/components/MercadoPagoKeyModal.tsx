import React, { useState } from 'react';
import { X, Key, Shield, Check, Copy, ExternalLink, HelpCircle, Code2, Save } from 'lucide-react';
import { APP_CONFIG, AppConfig } from '../config';

interface MercadoPagoKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveConfig: (updated: Partial<AppConfig>) => void;
}

export const MercadoPagoKeyModal: React.FC<MercadoPagoKeyModalProps> = ({
  isOpen,
  onClose,
  onSaveConfig,
}) => {
  const [publicKey, setPublicKey] = useState(APP_CONFIG.mercadoPago.publicKey);
  const [accessToken, setAccessToken] = useState(APP_CONFIG.mercadoPago.accessToken);
  const [pixKey, setPixKey] = useState(APP_CONFIG.pix.key);
  const [beneficiary, setBeneficiary] = useState(APP_CONFIG.pix.beneficiaryName);
  const [whatsapp, setWhatsapp] = useState(APP_CONFIG.contact.whatsapp);
  const [saved, setSaved] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    APP_CONFIG.mercadoPago.publicKey = publicKey;
    APP_CONFIG.mercadoPago.accessToken = accessToken;
    APP_CONFIG.pix.key = pixKey;
    APP_CONFIG.pix.beneficiaryName = beneficiary;
    APP_CONFIG.contact.whatsapp = whatsapp;

    onSaveConfig({
      mercadoPago: {
        ...APP_CONFIG.mercadoPago,
        publicKey,
        accessToken,
      },
      pix: {
        ...APP_CONFIG.pix,
        key: pixKey,
        beneficiaryName: beneficiary,
      },
      contact: {
        ...APP_CONFIG.contact,
        whatsapp,
      },
    });

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  const sampleBackendCode = `// Exemplo de criação de preferência Mercado Pago no Backend (Node.js / Express):
import { MercadoPagoConfig, Preference } from 'mercadopago';

// 1. Inicialize com seu Access Token do Mercado Pago
const client = new MercadoPagoConfig({ 
  accessToken: '${accessToken || "SEU_ACCESS_TOKEN_AQUI"}' 
});

app.post('/api/create-preference', async (req, res) => {
  const { amount, donorName, donorEmail } = req.body;
  const preference = new Preference(client);

  const response = await preference.create({
    body: {
      items: [
        {
          id: 'doacao-unahg-pet',
          title: 'Doação para animais abandonados - UNAHG PET',
          quantity: 1,
          unit_price: Number(amount),
          currency_id: 'BRL',
        }
      ],
      payer: {
        name: donorName || 'Apoiador Voluntário',
        email: donorEmail || 'doador@unahgpet.org',
      },
      back_urls: {
        success: 'https://unahgpet.org/confirmacao?status=approved',
        failure: 'https://unahgpet.org/?status=failure',
        pending: 'https://unahgpet.org/?status=pending',
      },
      auto_return: 'approved',
      statement_descriptor: 'UNAHG PET',
    }
  });

  res.json({ init_point: response.init_point, id: response.id });
});`;

  const copyBackendCode = async () => {
    try {
      await navigator.clipboard.writeText(sampleBackendCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      id="mp-config-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="mp-config-modal-content"
        className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-8 relative flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/90 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Configuração de Chaves & Integração
              </h3>
              <p className="text-xs text-neutral-400">
                Vincule suas credenciais do Mercado Pago e chave Pix da ONG
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* Help Box on getting MP credentials */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs text-neutral-300">
            <p className="font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-sky-400" />
              Como obter suas chaves no Mercado Pago Developers:
            </p>
            <ol className="list-decimal list-inside space-y-1.5 text-neutral-400 pl-1">
              <li>
                Acesse o portal oficial:{' '}
                <a
                  href="https://www.mercadopago.com.br/developers"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 hover:underline font-medium inline-flex items-center gap-1"
                >
                  mercadopago.com.br/developers <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>Faça login na conta Mercado Pago da ONG.</li>
              <li>Vá em <strong>Suas integrações</strong> &gt; <strong>Criar aplicação</strong>.</li>
              <li>Acesse <strong>Credenciais de Produção</strong> ou <strong>Teste</strong> e copie o <strong>Access Token</strong> e a <strong>Public Key</strong>.</li>
            </ol>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-1.5">
                Mercado Pago - Public Key
              </label>
              <input
                type="text"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                placeholder="TEST-... ou APP_USR-..."
                className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-1.5">
                Mercado Pago - Access Token (Privado/Backend)
              </label>
              <input
                type="password"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                placeholder="TEST-... ou APP_USR-..."
                className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-amber-400"
              />
              <span className="text-[11px] text-neutral-400 mt-1 block">
                Utilizado para gerar as preferências de pagamento seguras.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-1.5">
                  Chave Pix da ONG
                </label>
                <input
                  type="text"
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  placeholder="doacoes@unahgpet.org"
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-1.5">
                  Nome do Titular / Beneficiário Pix
                </label>
                <input
                  type="text"
                  value={beneficiary}
                  onChange={(e) => setBeneficiary(e.target.value)}
                  placeholder="UNAHG PET PROTECAO ANIMAL"
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-1.5">
                WhatsApp de Atendimento (apenas números com DDD)
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="5511998765432"
                className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                {saved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Configurações Salvas!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Salvar Alterações na Aplicação</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Backend Snippet Code Reference */}
          <div className="pt-4 border-t border-neutral-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-amber-400" />
                Código de Integração Backend (Node.js/Express):
              </span>
              <button
                type="button"
                onClick={copyBackendCode}
                className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 cursor-pointer font-semibold"
              >
                {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCode ? 'Copiado!' : 'Copiar Código'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-300 font-mono overflow-x-auto max-h-48">
              {sampleBackendCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
