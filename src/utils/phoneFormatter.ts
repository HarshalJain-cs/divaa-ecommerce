/**
 * Phone number formatting utilities
 * Handles phone number display and storage formatting
 */

import { parsePhoneNumber, CountryCode } from 'libphonenumber-js';

/**
 * Format phone number for display (with country code)
 * @param countryCode - Country dial code (e.g., '+91')
 * @param phoneNumber - National phone number
 * @returns Formatted display string (e.g., '+91 98765 43210')
 */
export const formatPhoneForDisplay = (countryCode: string, phoneNumber: string): string => {
  if (!phoneNumber) return '';

  // Ensure country code starts with +
  const dialCode = countryCode.startsWith('+') ? countryCode : `+${countryCode}`;

  // Clean phone number
  const cleanedNumber = phoneNumber.replace(/[^\d]/g, '');

  try {
    // Try to parse and format nicely
    const fullNumber = `${dialCode}${cleanedNumber}`;
    const parsed = parsePhoneNumber(fullNumber);

    if (parsed) {
      return parsed.formatInternational();
    }

    // Fallback: manual formatting
    return `${dialCode} ${cleanedNumber}`;
  } catch (error) {
    // Fallback: simple concatenation
    return `${dialCode} ${cleanedNumber}`;
  }
};

/**
 * Format phone number for storage (split into country code and number)
 * @param fullPhoneNumber - Complete phone number with country code
 * @returns Object with separated country code and phone number
 */
export const splitPhoneNumber = (
  fullPhoneNumber: string
): { countryCode: string; phoneNumber: string } => {
  try {
    const parsed = parsePhoneNumber(fullPhoneNumber);

    if (parsed) {
      return {
        countryCode: `+${parsed.countryCallingCode}`,
        phoneNumber: parsed.nationalNumber.toString(),
      };
    }

    // Fallback: manual parsing
    const cleaned = fullPhoneNumber.replace(/[^\d+]/g, '');

    if (cleaned.startsWith('+')) {
      // Find where country code ends (usually 1-3 digits after +)
      const match = cleaned.match(/^(\+\d{1,3})(\d+)$/);

      if (match) {
        return {
          countryCode: match[1],
          phoneNumber: match[2],
        };
      }
    }

    // If no + prefix, assume it's just the phone number
    return {
      countryCode: '',
      phoneNumber: cleaned,
    };
  } catch (error) {
    return {
      countryCode: '',
      phoneNumber: fullPhoneNumber.replace(/[^\d]/g, ''),
    };
  }
};

/**
 * Combine country code and phone number
 * @param countryCode - Country dial code
 * @param phoneNumber - National phone number
 * @returns Complete phone number with country code
 */
export const combinePhoneNumber = (countryCode: string, phoneNumber: string): string => {
  const dialCode = countryCode.startsWith('+') ? countryCode : `+${countryCode}`;
  const cleanedNumber = phoneNumber.replace(/[^\d]/g, '');

  return `${dialCode}${cleanedNumber}`;
};

/**
 * Mask phone number for security (show last 4 digits)
 * @param phoneNumber - Phone number to mask
 * @returns Masked number (e.g., '******3210')
 */
export const maskPhoneNumber = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/[^\d]/g, '');

  if (cleaned.length <= 4) {
    return cleaned;
  }

  const lastFour = cleaned.slice(-4);
  const masked = '*'.repeat(cleaned.length - 4);

  return `${masked}${lastFour}`;
};

/**
 * Format phone for international SMS/OTP (E.164 format)
 * @param countryCode - Country dial code
 * @param phoneNumber - National phone number
 * @returns E.164 formatted number (e.g., '+919876543210')
 */
export const formatForSMS = (countryCode: string, phoneNumber: string): string => {
  const dialCode = countryCode.startsWith('+') ? countryCode : `+${countryCode}`;
  const cleanedNumber = phoneNumber.replace(/[^\d]/g, '');

  // E.164 format: +[country code][number] with no spaces or formatting
  return `${dialCode}${cleanedNumber}`;
};

/**
 * Validate and format phone number from input
 * @param input - Raw input from user
 * @param defaultCountryCode - Default country to assume if no code provided
 * @returns Formatted phone object or null if invalid
 */
export const parsePhoneInput = (
  input: string,
  defaultCountryCode: string = 'IN'
): { countryCode: string; phoneNumber: string; formatted: string } | null => {
  try {
    const cleaned = input.replace(/[^\d+]/g, '');

    if (!cleaned) {
      return null;
    }

    // If input starts with +, parse as international
    if (cleaned.startsWith('+')) {
      const parsed = parsePhoneNumber(cleaned);

      if (parsed) {
        return {
          countryCode: `+${parsed.countryCallingCode}`,
          phoneNumber: parsed.nationalNumber.toString(),
          formatted: parsed.formatInternational(),
        };
      }
    } else {
      // Assume default country
      const parsed = parsePhoneNumber(cleaned, defaultCountryCode as CountryCode);

      if (parsed) {
        return {
          countryCode: `+${parsed.countryCallingCode}`,
          phoneNumber: parsed.nationalNumber.toString(),
          formatted: parsed.formatInternational(),
        };
      }
    }

    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Get country code from ISO country code
 * @param isoCode - ISO 3166-1 alpha-2 country code (e.g., 'IN', 'US')
 * @returns Dial code (e.g., '+91', '+1')
 */
export const getDialCodeFromISO = (isoCode: string): string => {
  const dialCodes: Record<string, string> = {
    IN: '+91',   // India
    US: '+1',    // United States
    GB: '+44',   // United Kingdom
    AU: '+61',   // Australia
    CA: '+1',    // Canada
    CN: '+86',   // China
    JP: '+81',   // Japan
    BR: '+55',   // Brazil
    RU: '+7',    // Russia
    DE: '+49',   // Germany
    FR: '+33',   // France
    IT: '+39',   // Italy
    ES: '+34',   // Spain
    MX: '+52',   // Mexico
    AE: '+971',  // UAE
    SG: '+65',   // Singapore
    MY: '+60',   // Malaysia
    TH: '+66',   // Thailand
    PH: '+63',   // Philippines
    ID: '+62',   // Indonesia
    VN: '+84',   // Vietnam
    PK: '+92',   // Pakistan
    BD: '+880',  // Bangladesh
    LK: '+94',   // Sri Lanka
    NP: '+977',  // Nepal
    // Add more as needed
  };

  return dialCodes[isoCode] || '';
};

/**
 * Get ISO code from dial code
 * @param dialCode - Country dial code (e.g., '+91')
 * @returns ISO 3166-1 alpha-2 country code
 */
export const getISOFromDialCode = (dialCode: string): string => {
  const cleaned = dialCode.replace(/[^\d]/g, '');

  const isoCodes: Record<string, string> = {
    '91': 'IN',
    '1': 'US',
    '44': 'GB',
    '61': 'AU',
    '86': 'CN',
    '81': 'JP',
    '55': 'BR',
    '7': 'RU',
    '49': 'DE',
    '33': 'FR',
    '39': 'IT',
    '34': 'ES',
    '52': 'MX',
    '971': 'AE',
    '65': 'SG',
    '60': 'MY',
    '66': 'TH',
    '63': 'PH',
    '62': 'ID',
    '84': 'VN',
    '92': 'PK',
    '880': 'BD',
    '94': 'LK',
    '977': 'NP',
  };

  return isoCodes[cleaned] || '';
};
