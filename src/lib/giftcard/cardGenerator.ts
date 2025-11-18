/**
 * @file Card Generator Utility
 * @description Generate unique gift card numbers and PINs
 */

import { nanoid } from 'nanoid';
import { GIFT_CARD_CODE_CONFIG, CARD_PIN_CONFIG } from '@/constants/giftcards';
import { supabase } from '@/lib/supabase';

/**
 * Generate a random segment of digits
 */
function generateSegment(length: number): string {
  let segment = '';
  for (let i = 0; i < length; i++) {
    segment += Math.floor(Math.random() * 10);
  }
  return segment;
}

/**
 * Generate unique gift card number in format: DIVAA-1234-5678-9012
 * Ensures uniqueness by checking against database
 */
export async function generateCardNumber(): Promise<string> {
  const { prefix, segments, segmentLength, separator } = GIFT_CARD_CODE_CONFIG;

  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    // Generate segments
    const cardSegments: string[] = [];
    for (let i = 0; i < segments; i++) {
      cardSegments.push(generateSegment(segmentLength));
    }

    // Combine with prefix and separator
    const cardNumber = `${prefix}${separator}${cardSegments.join(separator)}`;

    // Check if card number already exists
    const { data, error } = await supabase
      .from('gift_cards')
      .select('card_number')
      .eq('card_number', cardNumber)
      .single();

    // If not found, this card number is unique
    if (error && error.code === 'PGRST116') {
      return cardNumber;
    }

    attempts++;
  }

  // Fallback: use nanoid for guaranteed uniqueness
  const uniqueId = nanoid(12).replace(/[^0-9]/g, '').substring(0, 12);
  return `${prefix}${separator}${uniqueId.substring(0, 4)}${separator}${uniqueId.substring(4, 8)}${separator}${uniqueId.substring(8, 12)}`;
}

/**
 * Generate 6-digit PIN
 */
export function generateCardPIN(): string {
  const { length } = CARD_PIN_CONFIG;
  let pin = '';
  for (let i = 0; i < length; i++) {
    pin += Math.floor(Math.random() * 10);
  }
  return pin;
}

/**
 * Validate card number format
 */
export function validateCardNumber(cardNumber: string): boolean {
  const { prefix, segments, segmentLength, separator } = GIFT_CARD_CODE_CONFIG;

  // Check format: DIVAA-XXXX-XXXX-XXXX
  const parts = cardNumber.split(separator);

  if (parts.length !== segments + 1) {
    return false;
  }

  if (parts[0] !== prefix) {
    return false;
  }

  // Check each segment is correct length and numeric
  for (let i = 1; i < parts.length; i++) {
    if (parts[i].length !== segmentLength) {
      return false;
    }
    if (!/^\d+$/.test(parts[i])) {
      return false;
    }
  }

  return true;
}

/**
 * Validate PIN format
 */
export function validateCardPIN(pin: string): boolean {
  const { length } = CARD_PIN_CONFIG;
  return pin.length === length && /^\d+$/.test(pin);
}

/**
 * Mask card number for display (show only last 4 digits)
 * Example: DIVAA-****-****-9012
 */
export function maskCardNumber(cardNumber: string): string {
  const parts = cardNumber.split('-');
  if (parts.length !== 4) {
    return cardNumber;
  }

  return `${parts[0]}-****-****-${parts[3]}`;
}

/**
 * Mask PIN for display
 * Example: ******
 */
export function maskPIN(pin: string): string {
  return '*'.repeat(pin.length);
}

/**
 * Generate expiry date (6 months from now)
 */
export function generateExpiryDate(): Date {
  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + 6);
  return expiryDate;
}

/**
 * Check if card is expired
 */
export function isCardExpired(expiryDate: string | Date): boolean {
  const expiry = typeof expiryDate === 'string' ? new Date(expiryDate) : expiryDate;
  return expiry < new Date();
}

/**
 * Get days until expiry
 */
export function getDaysUntilExpiry(expiryDate: string | Date): number {
  const expiry = typeof expiryDate === 'string' ? new Date(expiryDate) : expiryDate;
  const now = new Date();
  const diffTime = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Format card number for display with spaces
 * Example: DIVAA 1234 5678 9012
 */
export function formatCardNumberForDisplay(cardNumber: string): string {
  return cardNumber.replace(/-/g, ' ');
}

/**
 * Generate order number in format: GC-2025-00001
 */
export async function generateOrderNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `GC-${year}-`;

  // Get the count of orders this year
  const { count, error } = await supabase
    .from('gift_card_orders')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', `${year}-01-01`)
    .lt('created_at', `${year + 1}-01-01`);

  if (error) {
    // Fallback to timestamp-based number
    return `${prefix}${Date.now().toString().slice(-5)}`;
  }

  const orderNumber = (count || 0) + 1;
  return `${prefix}${orderNumber.toString().padStart(5, '0')}`;
}

/**
 * Batch generate card numbers and PINs
 * Used for bulk orders
 */
export async function generateBatchCards(quantity: number): Promise<Array<{ card_number: string; card_pin: string }>> {
  const cards: Array<{ card_number: string; card_pin: string }> = [];

  for (let i = 0; i < quantity; i++) {
    const cardNumber = await generateCardNumber();
    const cardPIN = generateCardPIN();
    cards.push({ card_number: cardNumber, card_pin: cardPIN });
  }

  return cards;
}
