/**
 * ============================================================================
 * OBJETO DE CONFIGURAÇÃO CENTRALIZADA - UNAHG PET
 * ============================================================================
 * Todas as informações de contato, chaves de pagamento e credenciais podem
 * ser editadas diretamente neste arquivo ou através do painel de integração.
 */

export interface AppConfig {
  ongName: string;
  slogan: string;
  minimumDonation: number;
  
  // Configurações do Pix
  pix: {
    key: string;               // Chave Pix (E-mail, CPF/CNPJ, Telefone ou Chave Aleatória)
    keyType: 'email' | 'cpf' | 'cnpj' | 'phone' | 'random';
    beneficiaryName: string;   // Nome do Titular / ONG
    city: string;              // Cidade do beneficiário (sem acentos, máx 15 caracteres)
    description: string;       // Descrição padrão no extrato
  };

  // Configurações do Mercado Pago
  mercadoPago: {
    publicKey: string;         // Chave Pública do Mercado Pago (ex: TEST-... ou APP_USR-...)
    accessToken: string;       // Access Token do Mercado Pago (para criação de Preferências via backend)
    webhookUrl: string;        // URL do Webhook/IPN para recebimento de notificações automáticas
    statementDescriptor: string; // Como aparecerá na fatura do cartão
    autoReturn: 'approved' | 'all';
    sandboxMode: boolean;      // true para ambiente de testes, false para produção
  };

  // Contatos & Redes Sociais
  contact: {
    whatsapp: string;          // Formato com DDI e DDD (apenas números, ex: 5511999999999)
    whatsappDisplay: string;   // Formato formatado para exibição visual
    instagram: string;         // Nome de usuário no Instagram (sem o @)
    instagramUrl: string;      // Link direto do perfil
    email: string;             // E-mail oficial de contato
    volunteerEmail: string;    // E-mail para suporte a doadores
  };
}

export const APP_CONFIG: AppConfig = {
  ongName: "UNAHG PET",
  slogan: "Doações para animais abandonados na rua",
  minimumDonation: 30.0,

  pix: {
    key: "byelsaints17@gmail.com",
    keyType: "email",
    beneficiaryName: "UNAHG PET PROTECAO ANIMAL",
    city: "SAO PAULO",
    description: "Doacao Voluntaria Animais Abandonados",
  },

  mercadoPago: {
    // Chave Pública fornecida pelo usuário
    publicKey: "APP_USR-8d78f27f-baf8-4348-bd34-a9259bd71e3b",
    // Access Token oficial do Mercado Pago
    accessToken: "APP_USR-8979991670336209-032116-74c15a38223d96196eda3aaf4cb24124-425264845",
    webhookUrl: "/api/webhooks/mercadopago",
    statementDescriptor: "UNAHG PET",
    autoReturn: "approved",
    sandboxMode: false,
  },

  contact: {
    whatsapp: "5511969192644",
    whatsappDisplay: "(11) 96919-2644",
    instagram: "unahgpet",
    instagramUrl: "https://instagram.com/unahgpet",
    email: "Dantaspereiralimatung@gmail.com",
    volunteerEmail: "Dantaspereiralimatung@gmail.com",
  },
};
