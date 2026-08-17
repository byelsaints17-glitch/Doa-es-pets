/**
 * Utilitário de Geração de Código Pix Copia e Cola (Padrão BACEN / EMVCo BR Code)
 */

function formatField(id: string, value: string): string {
  const len = value.length.toString().padStart(2, '0');
  return `${id}${len}${value}`;
}

function calculateCRC16(payload: string): string {
  let crc = 0xffff;
  const polynomial = 0x1021;

  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ polynomial) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, '0');
}

export interface PixPayloadOptions {
  pixKey: string;
  beneficiaryName: string;
  beneficiaryCity: string;
  amount?: number;
  txId?: string;
  description?: string;
}

/**
 * Gera a string Pix Copia e Cola oficial com base nos parâmetros informados.
 */
export function generatePixPayload(options: PixPayloadOptions): string {
  const {
    pixKey,
    beneficiaryName,
    beneficiaryCity,
    amount,
    txId = '***',
    description = 'Doacao UNAHG PET',
  } = options;

  // Limpa caracteres especiais da cidade e nome (padrão EMVCo)
  const cleanName = beneficiaryName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .slice(0, 25);

  const cleanCity = beneficiaryCity
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .slice(0, 15);

  // 00: Payload Format Indicator
  let payload = formatField('00', '01');

  // 01: Point of Initiation Method (12 = dinâmico / valor único, 11 = estático)
  payload += formatField('01', amount ? '12' : '11');

  // 26: Merchant Account Information - Pix
  let merchantAccount = formatField('00', 'br.gov.bcb.pix');
  merchantAccount += formatField('01', pixKey);
  if (description) {
    merchantAccount += formatField('02', description.slice(0, 40));
  }
  payload += formatField('26', merchantAccount);

  // 52: Merchant Category Code (0000 = Geral)
  payload += formatField('52', '0000');

  // 53: Transaction Currency (986 = Real BRL)
  payload += formatField('53', '986');

  // 54: Transaction Amount
  if (amount && amount > 0) {
    payload += formatField('54', amount.toFixed(2));
  }

  // 58: Country Code
  payload += formatField('58', 'BR');

  // 59: Merchant Name
  payload += formatField('59', cleanName);

  // 60: Merchant City
  payload += formatField('60', cleanCity);

  // 62: Additional Data Field Template (TxID)
  const cleanTxId = txId.replace(/[^a-zA-Z0-9]/g, '').slice(0, 25) || '***';
  const additionalData = formatField('05', cleanTxId);
  payload += formatField('62', additionalData);

  // 63: CRC16 ID e tamanho fixo "04"
  payload += '6304';

  // Adiciona o checksum final
  const checksum = calculateCRC16(payload);
  return `${payload}${checksum}`;
}

/**
 * Gera um ID de transação aleatório amigável
 */
export function generateTransactionId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `UNAHG-${timestamp}-${randomPart}`;
}
