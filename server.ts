import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

// Mercado Pago Access Token
const MP_ACCESS_TOKEN =
  process.env.MERCADO_PAGO_ACCESS_TOKEN ||
  'APP_USR-8979991670336209-032116-74c15a38223d96196eda3aaf4cb24124-425264845';

const MP_PUBLIC_KEY =
  process.env.MERCADO_PAGO_PUBLIC_KEY ||
  'APP_USR-8d78f27f-baf8-4348-bd34-a9259bd71e3b';

// Lazy initialize MercadoPago Client
let mpClient: MercadoPagoConfig | null = null;
function getMercadoPagoClient(): MercadoPagoConfig {
  if (!mpClient) {
    mpClient = new MercadoPagoConfig({
      accessToken: MP_ACCESS_TOKEN,
      options: { timeout: 10000 },
    });
  }
  return mpClient;
}

async function startServer() {
  const app = express();

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'UNAHG PET API',
      timestamp: new Date().toISOString(),
    });
  });

  // Mercado Pago Public Config Endpoint
  app.get('/api/mercadopago/config', (req: Request, res: Response) => {
    res.json({
      publicKey: MP_PUBLIC_KEY,
      isConfigured: Boolean(MP_ACCESS_TOKEN && MP_PUBLIC_KEY),
    });
  });

  // Create Mercado Pago Checkout Preference
  app.post('/api/create-preference', async (req: Request, res: Response) => {
    try {
      const { amount, donorName, donorEmail, donorPhone } = req.body;

      const numericAmount = Number(amount);
      if (!numericAmount || numericAmount <= 0) {
        return res.status(400).json({
          error: 'Valor de doação inválido. Forneça um valor positivo.',
        });
      }

      const client = getMercadoPagoClient();
      const preference = new Preference(client);

      // Determine base URL from headers or env
      const host = req.get('host') || 'localhost:3000';
      const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
      const baseUrl = process.env.APP_URL || `${protocol}://${host}`;

      const preferenceData = {
        body: {
          items: [
            {
              id: 'doacao-unahg-pet',
              title: `Doação Solidária UNAHG PET - Proteção Animal (R$ ${numericAmount.toFixed(2).replace('.', ',')})`,
              description: 'Doação voluntária destinada para ração, abrigo e cuidados veterinários de cães e gatos de rua.',
              quantity: 1,
              unit_price: numericAmount,
              currency_id: 'BRL',
            },
          ],
          payer: {
            name: donorName?.trim() || 'Apoiador Voluntário',
            email: donorEmail?.trim() || 'byelsaints17@gmail.com',
            ...(donorPhone ? { phone: { number: donorPhone.replace(/\D/g, '') } } : {}),
          },
          back_urls: {
            success: `${baseUrl}/?status=approved&amount=${numericAmount}`,
            failure: `${baseUrl}/?status=failure`,
            pending: `${baseUrl}/?status=pending&amount=${numericAmount}`,
          },
          auto_return: 'approved',
          statement_descriptor: 'UNAHG PET',
          payment_methods: {
            excluded_payment_types: [],
            installments: 12,
          },
          external_reference: `UNAHG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        },
      };

      const response = await preference.create(preferenceData);

      return res.json({
        id: response.id,
        init_point: response.init_point,
        sandbox_init_point: response.sandbox_init_point,
        external_reference: preferenceData.body.external_reference,
      });
    } catch (error: any) {
      console.error('Erro ao criar preferência no Mercado Pago:', error);
      return res.status(500).json({
        error: 'Erro ao gerar checkout do Mercado Pago',
        details: error?.message || 'Verifique as credenciais ou tente novamente',
      });
    }
  });

  // Mercado Pago Webhook / Notification IPN
  app.post('/api/webhooks/mercadopago', (req: Request, res: Response) => {
    const { type, data, action } = req.body;
    console.log('Notificação Mercado Pago recebida:', { type, data, action });
    // Retorna HTTP 200 para confirmar recebimento ao Mercado Pago
    res.status(200).json({ received: true });
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`UNAHG PET Server running on port ${PORT}`);
  });
}

startServer();
