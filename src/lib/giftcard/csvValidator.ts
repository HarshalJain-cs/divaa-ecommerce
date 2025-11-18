/**
 * @file CSV Validator Utility
 * @description Validate bulk order CSV files
 */

import {
  BULK_ORDER_CONFIG,
  GIFT_CARD_MIN_AMOUNT,
  GIFT_CARD_MAX_AMOUNT,
} from '@/constants/giftcards';
import type { BulkOrderCSVRow, BulkOrderCSVError, GiftCardTheme } from '@/types/giftcard.types';

/**
 * Parse CSV file content
 */
export function parseCSV(csvContent: string): string[][] {
  const lines = csvContent.trim().split('\n');
  const rows = lines.map(line => {
    // Handle quotes and commas
    const regex = /(?:^|,)("(?:[^"]+)*"|[^,]*)/g;
    const values: string[] = [];
    let match;

    while ((match = regex.exec(line))) {
      let value = match[1];
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1).replace(/""/g, '"');
      }
      values.push(value.trim());
    }

    return values;
  });

  return rows;
}

/**
 * Validate CSV file structure
 */
export function validateCSVStructure(file: File): { valid: boolean; error?: string } {
  // Check file type
  const fileName = file.name.toLowerCase();
  if (!BULK_ORDER_CONFIG.ALLOWED_FILE_TYPES.some(type => fileName.endsWith(type))) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${BULK_ORDER_CONFIG.ALLOWED_FILE_TYPES.join(', ')}`,
    };
  }

  // Check file size
  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > BULK_ORDER_CONFIG.MAX_FILE_SIZE_MB) {
    return {
      valid: false,
      error: `File size exceeds maximum of ${BULK_ORDER_CONFIG.MAX_FILE_SIZE_MB}MB`,
    };
  }

  return { valid: true };
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format (basic validation)
 */
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+]?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate gift card theme
 */
function isValidTheme(theme: string): boolean {
  const validThemes: GiftCardTheme[] = ['birthday', 'diwali', 'general'];
  return validThemes.includes(theme as GiftCardTheme);
}

/**
 * Validate CSV row data
 */
export function validateCSVRow(
  row: string[],
  rowIndex: number,
  headers: string[]
): { valid: boolean; data?: BulkOrderCSVRow; errors: BulkOrderCSVError[] } {
  const errors: BulkOrderCSVError[] = [];

  // Map row data to object
  const rowData: Record<string, string> = {};
  headers.forEach((header, index) => {
    rowData[header.toLowerCase().replace(/\s+/g, '_')] = row[index] || '';
  });

  // Validate recipient_name
  if (!rowData.recipient_name || rowData.recipient_name.length < 2) {
    errors.push({
      row: rowIndex,
      field: 'recipient_name',
      error: 'Recipient name is required (min 2 characters)',
      value: rowData.recipient_name,
    });
  }

  // Validate recipient_email
  if (!rowData.recipient_email || !isValidEmail(rowData.recipient_email)) {
    errors.push({
      row: rowIndex,
      field: 'recipient_email',
      error: 'Valid recipient email is required',
      value: rowData.recipient_email,
    });
  }

  // Validate recipient_phone
  if (!rowData.recipient_phone || !isValidPhone(rowData.recipient_phone)) {
    errors.push({
      row: rowIndex,
      field: 'recipient_phone',
      error: 'Valid recipient phone is required',
      value: rowData.recipient_phone,
    });
  }

  // Validate amount
  const amount = parseFloat(rowData.amount);
  if (isNaN(amount) || amount < GIFT_CARD_MIN_AMOUNT || amount > GIFT_CARD_MAX_AMOUNT) {
    errors.push({
      row: rowIndex,
      field: 'amount',
      error: `Amount must be between ₹${GIFT_CARD_MIN_AMOUNT} and ₹${GIFT_CARD_MAX_AMOUNT}`,
      value: rowData.amount,
    });
  }

  // Validate amount is multiple of 100
  if (amount % 100 !== 0) {
    errors.push({
      row: rowIndex,
      field: 'amount',
      error: 'Amount must be a multiple of 100',
      value: rowData.amount,
    });
  }

  // Validate custom_message (optional, but check length)
  if (rowData.custom_message && rowData.custom_message.length > 200) {
    errors.push({
      row: rowIndex,
      field: 'custom_message',
      error: 'Custom message must be less than 200 characters',
      value: rowData.custom_message,
    });
  }

  // Validate design_theme
  if (!rowData.design_theme || !isValidTheme(rowData.design_theme)) {
    errors.push({
      row: rowIndex,
      field: 'design_theme',
      error: 'Design theme must be one of: birthday, diwali, general',
      value: rowData.design_theme,
    });
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // Create valid row data
  const validData: BulkOrderCSVRow = {
    recipient_name: rowData.recipient_name,
    recipient_email: rowData.recipient_email,
    recipient_phone: rowData.recipient_phone,
    amount: amount,
    custom_message: rowData.custom_message || '',
    design_theme: rowData.design_theme as GiftCardTheme,
  };

  return { valid: true, data: validData, errors: [] };
}

/**
 * Validate entire CSV file
 */
export async function validateCSVFile(file: File): Promise<{
  valid: boolean;
  totalRows: number;
  validRows: BulkOrderCSVRow[];
  errors: BulkOrderCSVError[];
}> {
  // Validate file structure
  const structureValidation = validateCSVStructure(file);
  if (!structureValidation.valid) {
    return {
      valid: false,
      totalRows: 0,
      validRows: [],
      errors: [
        {
          row: 0,
          field: 'file',
          error: structureValidation.error || 'Invalid file',
          value: file.name,
        },
      ],
    };
  }

  // Read file content
  const csvContent = await file.text();
  const rows = parseCSV(csvContent);

  if (rows.length < 2) {
    return {
      valid: false,
      totalRows: 0,
      validRows: [],
      errors: [
        {
          row: 0,
          field: 'file',
          error: 'CSV file must contain headers and at least one data row',
          value: '',
        },
      ],
    };
  }

  // Get headers (first row)
  const headers = rows[0];

  // Check required columns
  const requiredColumns = BULK_ORDER_CONFIG.CSV_COLUMNS;
  const headerNames = headers.map(h => h.toLowerCase().replace(/\s+/g, '_'));

  const missingColumns = requiredColumns.filter(col => !headerNames.includes(col));
  if (missingColumns.length > 0) {
    return {
      valid: false,
      totalRows: 0,
      validRows: [],
      errors: [
        {
          row: 0,
          field: 'headers',
          error: `Missing required columns: ${missingColumns.join(', ')}`,
          value: headers.join(', '),
        },
      ],
    };
  }

  // Check max rows
  const dataRows = rows.slice(1);
  if (dataRows.length > BULK_ORDER_CONFIG.MAX_ROWS) {
    return {
      valid: false,
      totalRows: dataRows.length,
      validRows: [],
      errors: [
        {
          row: 0,
          field: 'file',
          error: `CSV contains ${dataRows.length} rows. Maximum allowed is ${BULK_ORDER_CONFIG.MAX_ROWS}`,
          value: '',
        },
      ],
    };
  }

  // Validate each row
  const validRows: BulkOrderCSVRow[] = [];
  const allErrors: BulkOrderCSVError[] = [];

  dataRows.forEach((row, index) => {
    const rowNumber = index + 2; // +2 because index is 0-based and we skip header
    const validation = validateCSVRow(row, rowNumber, headers);

    if (validation.valid && validation.data) {
      validRows.push(validation.data);
    } else {
      allErrors.push(...validation.errors);
    }
  });

  return {
    valid: allErrors.length === 0,
    totalRows: dataRows.length,
    validRows,
    errors: allErrors,
  };
}

/**
 * Generate sample CSV template
 */
export function generateCSVTemplate(): string {
  const headers = BULK_ORDER_CONFIG.CSV_COLUMNS.join(',');
  const sampleRow = 'John Doe,john@example.com,+919876543210,1000,Happy Birthday!,birthday';

  return `${headers}\n${sampleRow}`;
}

/**
 * Download CSV template
 */
export function downloadCSVTemplate(): void {
  const template = generateCSVTemplate();
  const blob = new Blob([template], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'bulk-gift-cards-template.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/**
 * Format errors for display
 */
export function formatCSVErrors(errors: BulkOrderCSVError[]): string {
  return errors
    .map(error => `Row ${error.row}, ${error.field}: ${error.error}`)
    .join('\n');
}
