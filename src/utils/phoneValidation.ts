/**
 * Phone validation utilities using libphonenumber-js
 * Provides international phone number validation and formatting
 */

import { parsePhoneNumber, CountryCode, isPossiblePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

export interface PhoneValidationResult {
  isValid: boolean;
  error?: string;
  formatted?: string;
}

/**
 * Validates a phone number for a specific country
 * @param phoneNumber - The phone number to validate (without country code)
 * @param countryCode - ISO 3166-1 alpha-2 country code (e.g., 'IN', 'US')
 * @returns Validation result with formatted number if valid
 */
export const validatePhoneNumber = (
  phoneNumber: string,
  countryCode: string
): PhoneValidationResult => {
  try {
    // Remove all non-digit characters except plus sign
    const cleanedNumber = phoneNumber.replace(/[^\d+]/g, '');

    if (!cleanedNumber) {
      return {
        isValid: false,
        error: 'Phone number is required',
      };
    }

    // Check if it's a possible phone number format
    if (!isPossiblePhoneNumber(cleanedNumber, countryCode as CountryCode)) {
      return {
        isValid: false,
        error: 'Invalid phone number format for this country',
      };
    }

    // Validate the phone number
    if (!isValidPhoneNumber(cleanedNumber, countryCode as CountryCode)) {
      return {
        isValid: false,
        error: 'Invalid phone number',
      };
    }

    // Parse and format the number
    const parsed = parsePhoneNumber(cleanedNumber, countryCode as CountryCode);

    if (!parsed) {
      return {
        isValid: false,
        error: 'Could not parse phone number',
      };
    }

    return {
      isValid: true,
      formatted: parsed.formatInternational(),
    };
  } catch (error) {
    return {
      isValid: false,
      error: 'Invalid phone number',
    };
  }
};

/**
 * Validates phone number length based on country
 * @param phoneNumber - The phone number to check
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns true if length is appropriate
 */
export const isValidPhoneLength = (phoneNumber: string, countryCode: string): boolean => {
  const cleanedNumber = phoneNumber.replace(/[^\d]/g, '');

  // Country-specific length validation
  const lengthRules: Record<string, { min: number; max: number }> = {
    IN: { min: 10, max: 10 }, // India
    US: { min: 10, max: 10 }, // United States
    GB: { min: 10, max: 10 }, // United Kingdom
    AU: { min: 9, max: 9 },   // Australia
    CA: { min: 10, max: 10 }, // Canada
    // Add more countries as needed
  };

  const rule = lengthRules[countryCode];
  if (!rule) {
    // Default validation for unknown countries
    return cleanedNumber.length >= 7 && cleanedNumber.length <= 15;
  }

  return cleanedNumber.length >= rule.min && cleanedNumber.length <= rule.max;
};

/**
 * Real-time validation while user types
 * @param phoneNumber - Current input value
 * @param countryCode - Selected country code
 * @returns Validation message or empty string if valid/incomplete
 */
export const validatePhoneInput = (phoneNumber: string, countryCode: string): string => {
  const cleanedNumber = phoneNumber.replace(/[^\d]/g, '');

  if (!cleanedNumber) {
    return ''; // Empty input is not an error yet
  }

  if (cleanedNumber.length < 7) {
    return ''; // Too short but still typing
  }

  const validation = validatePhoneNumber(phoneNumber, countryCode);

  if (!validation.isValid) {
    return validation.error || 'Invalid phone number';
  }

  return '';
};

/**
 * Format phone number as user types (for input display)
 * @param phoneNumber - Current input value
 * @param countryCode - Selected country code
 * @returns Formatted phone number string
 */
export const formatPhoneAsYouType = (phoneNumber: string, countryCode: string): string => {
  try {
    const cleanedNumber = phoneNumber.replace(/[^\d]/g, '');

    if (!cleanedNumber) {
      return '';
    }

    // Try to parse and format
    const parsed = parsePhoneNumber(cleanedNumber, countryCode as CountryCode);

    if (parsed) {
      return parsed.formatNational();
    }

    return cleanedNumber;
  } catch (error) {
    return phoneNumber;
  }
};

/**
 * Extract national number (without country code)
 * @param phoneNumber - Full phone number
 * @param countryCode - Country code
 * @returns National number only
 */
export const extractNationalNumber = (phoneNumber: string, countryCode: string): string => {
  try {
    const parsed = parsePhoneNumber(phoneNumber, countryCode as CountryCode);

    if (parsed) {
      return parsed.nationalNumber.toString();
    }

    return phoneNumber.replace(/[^\d]/g, '');
  } catch (error) {
    return phoneNumber.replace(/[^\d]/g, '');
  }
};
