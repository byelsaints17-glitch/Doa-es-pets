import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DonationSection } from './components/DonationSection';
import { HowWeHelp } from './components/HowWeHelp';
import { Gallery } from './components/Gallery';
import { AboutUs } from './components/AboutUs';
import { Transparency } from './components/Transparency';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { PaymentModal, PaymentDetails } from './components/PaymentModal';
import { ConfirmationModal } from './components/ConfirmationModal';
import { MercadoPagoKeyModal } from './components/MercadoPagoKeyModal';
import { TermsAndPrivacyModal } from './components/TermsAndPrivacyModal';
import { APP_CONFIG, AppConfig } from './config';

export default function App() {
  // Modal states
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [donationAmount, setDonationAmount] = useState<number>(50);
  const [donorName, setDonorName] = useState<string | undefined>(undefined);
  const [donorEmail, setDonorEmail] = useState<string | undefined>(undefined);

  // Confirmed payment receipt state
  const [confirmedPayment, setConfirmedPayment] = useState<PaymentDetails | null>(null);

  // Mercado Pago config modal state
  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false);

  // Legal modals state
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);

  // Detect Mercado Pago redirect returns (?status=approved ou collection_status=approved)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const status = params.get('status') || params.get('collection_status');
      const paymentId = params.get('payment_id') || params.get('collection_id');
      const paramAmount = params.get('amount');

      if (status === 'approved') {
        const approvedAmount = paramAmount ? Number(paramAmount) : 50;
        setConfirmedPayment({
          amount: approvedAmount,
          donorName: 'Doador Mercado Pago',
          donorEmail: APP_CONFIG.contact.email,
          method: 'mercadopago',
          txId: paymentId || `MP-${Date.now()}`,
          date: new Date().toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        });

        // Limpa a query string para não reabrir ao atualizar
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (err) {
      console.error('Erro ao verificar parâmetros da URL:', err);
    }
  }, []);

  // Handlers
  const handleOpenDonate = () => {
    const el = document.getElementById('doacao');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProceedToPayment = (amount: number, name?: string, email?: string) => {
    setDonationAmount(amount);
    setDonorName(name);
    setDonorEmail(email);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentConfirmed = (details: PaymentDetails) => {
    setConfirmedPayment(details);
  };

  const handleNewDonation = () => {
    setConfirmedPayment(null);
    handleOpenDonate();
  };

  const handleSaveConfig = (updated: Partial<AppConfig>) => {
    // Config updated in memory/APP_CONFIG
    console.log('Configurações atualizadas:', updated);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-amber-500 selection:text-neutral-950 font-sans">
      {/* 1. Header Fixo */}
      <Header
        onOpenDonate={handleOpenDonate}
        onOpenConfig={() => setIsConfigModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="conteudo-principal">
        {/* 2. Hero Section */}
        <Hero onDonateClick={handleOpenDonate} />

        {/* 3. Seção Principal de Doação */}
        <DonationSection onProceedToPayment={handleProceedToPayment} />

        {/* 6. Como sua doação ajuda (4 cards) */}
        <HowWeHelp onDonateClick={handleOpenDonate} />

        {/* Galeria de Fotos Grandes dos Animais */}
        <Gallery onDonateClick={handleOpenDonate} />

        {/* 7. Sobre a ONG */}
        <AboutUs />

        {/* 8. Transparência */}
        <Transparency />

        {/* 9. Contato */}
        <Contact />
      </main>

      {/* 10. Footer */}
      <Footer
        onOpenTerms={() => setLegalModalType('terms')}
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenDonate={handleOpenDonate}
      />

      {/* 4. Modal de Pagamento (Pix / Mercado Pago) */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={donationAmount}
        donorName={donorName}
        donorEmail={donorEmail}
        onPaymentConfirmed={handlePaymentConfirmed}
        onOpenConfig={() => {
          setIsPaymentModalOpen(false);
          setIsConfigModalOpen(true);
        }}
      />

      {/* 5. Modal de Confirmação de Pagamento */}
      <ConfirmationModal
        details={confirmedPayment}
        onClose={() => setConfirmedPayment(null)}
        onNewDonation={handleNewDonation}
      />

      {/* Modal de Configuração de Chaves (Mercado Pago & Pix) */}
      <MercadoPagoKeyModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        onSaveConfig={handleSaveConfig}
      />

      {/* Modal de Termos & Privacidade */}
      <TermsAndPrivacyModal
        isOpen={legalModalType !== null}
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
