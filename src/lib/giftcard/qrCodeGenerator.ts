/**
 * @file QR Code Generator Utility
 * @description Generate QR codes for gift cards
 */

import QRCode from 'qrcode';
import { QR_CODE_CONFIG, GIFT_CARD_VIEW_URL } from '@/constants/giftcards';
import type { QRCodeGenerationOptions } from '@/types/giftcard.types';

/**
 * Generate QR code as data URL (base64 image)
 * QR code contains link to gift card view page
 */
export async function generateQRCode(cardNumber: string): Promise<string> {
  const viewUrl = `${window.location.origin}${GIFT_CARD_VIEW_URL(cardNumber)}`;

  try {
    const dataUrl = await QRCode.toDataURL(viewUrl, {
      errorCorrectionLevel: QR_CODE_CONFIG.ERROR_CORRECTION as 'L' | 'M' | 'Q' | 'H',
      width: QR_CODE_CONFIG.SIZE,
      margin: QR_CODE_CONFIG.MARGIN,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });

    return dataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

/**
 * Generate QR code with custom options
 */
export async function generateCustomQRCode(
  cardNumber: string,
  options: Partial<QRCodeGenerationOptions> = {}
): Promise<string> {
  const viewUrl = `${window.location.origin}${GIFT_CARD_VIEW_URL(cardNumber)}`;

  const qrOptions = {
    errorCorrectionLevel: (options.error_correction || QR_CODE_CONFIG.ERROR_CORRECTION) as 'L' | 'M' | 'Q' | 'H',
    width: options.size || QR_CODE_CONFIG.SIZE,
    margin: QR_CODE_CONFIG.MARGIN,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
  };

  try {
    const dataUrl = await QRCode.toDataURL(viewUrl, qrOptions);
    return dataUrl;
  } catch (error) {
    console.error('Error generating custom QR code:', error);
    throw new Error('Failed to generate custom QR code');
  }
}

/**
 * Generate QR code as PNG buffer (for server-side/email use)
 */
export async function generateQRCodeBuffer(cardNumber: string): Promise<Buffer> {
  const viewUrl = `${GIFT_CARD_VIEW_URL(cardNumber)}`;

  try {
    const buffer = await QRCode.toBuffer(viewUrl, {
      errorCorrectionLevel: QR_CODE_CONFIG.ERROR_CORRECTION as 'L' | 'M' | 'Q' | 'H',
      width: QR_CODE_CONFIG.SIZE,
      margin: QR_CODE_CONFIG.MARGIN,
    });

    return buffer;
  } catch (error) {
    console.error('Error generating QR code buffer:', error);
    throw new Error('Failed to generate QR code buffer');
  }
}

/**
 * Generate QR code as SVG string
 */
export async function generateQRCodeSVG(cardNumber: string): Promise<string> {
  const viewUrl = `${window.location.origin}${GIFT_CARD_VIEW_URL(cardNumber)}`;

  try {
    const svg = await QRCode.toString(viewUrl, {
      type: 'svg',
      errorCorrectionLevel: QR_CODE_CONFIG.ERROR_CORRECTION as 'L' | 'M' | 'Q' | 'H',
      width: QR_CODE_CONFIG.SIZE,
      margin: QR_CODE_CONFIG.MARGIN,
    });

    return svg;
  } catch (error) {
    console.error('Error generating QR code SVG:', error);
    throw new Error('Failed to generate QR code SVG');
  }
}

/**
 * Validate QR code data
 */
export function validateQRCodeData(data: string): boolean {
  try {
    const url = new URL(data);
    return url.pathname.includes('/gift-cards/view/');
  } catch {
    return false;
  }
}

/**
 * Extract card number from QR code URL
 */
export function extractCardNumberFromQR(qrData: string): string | null {
  try {
    const url = new URL(qrData);
    const pathParts = url.pathname.split('/');
    const cardNumber = pathParts[pathParts.length - 1];
    return cardNumber || null;
  } catch {
    return null;
  }
}

/**
 * Download QR code as image
 */
export async function downloadQRCode(cardNumber: string, filename?: string): Promise<void> {
  const dataUrl = await generateQRCode(cardNumber);

  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename || `gift-card-qr-${cardNumber}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
