/**
 * @file PDF Generator Utility
 * @description Generate PDF gift cards using @react-pdf/renderer
 */

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, pdf } from '@react-pdf/renderer';
import type { GiftCardPDFData } from '@/types/giftcard.types';
import { formatCardNumberForDisplay, maskPIN } from './cardGenerator';

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#FFFFFF',
  },
  container: {
    border: '2px solid #E0BFB8',
    borderRadius: 12,
    padding: 30,
    backgroundColor: '#FAF9F6',
  },
  header: {
    textAlign: 'center',
    marginBottom: 30,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#B76E79',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 25,
    marginBottom: 20,
    border: '1px solid #E0BFB8',
  },
  gradientHeader: {
    backgroundColor: '#E0BFB8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    textAlign: 'center',
  },
  amountText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  currencySymbol: {
    fontSize: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  label: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B76E79',
    letterSpacing: 2,
  },
  pin: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
    fontFamily: 'Courier',
  },
  messageContainer: {
    backgroundColor: '#FFF9F5',
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
    marginBottom: 15,
  },
  messageLabel: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 8,
  },
  messageText: {
    fontSize: 12,
    color: '#4A4A4A',
    lineHeight: 1.5,
    fontStyle: 'italic',
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  qrImage: {
    width: 150,
    height: 150,
  },
  qrLabel: {
    fontSize: 10,
    color: '#666666',
    marginTop: 10,
  },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTop: '1px solid #E0E0E0',
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  instruction: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 5,
    paddingLeft: 15,
  },
  expiryText: {
    fontSize: 10,
    color: '#E74C3C',
    marginTop: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  supportText: {
    fontSize: 9,
    color: '#999999',
    marginTop: 15,
    textAlign: 'center',
  },
  divider: {
    borderBottom: '1px dashed #CCCCCC',
    marginVertical: 15,
  },
});

// Gift Card PDF Document Component
const GiftCardPDF: React.FC<{ data: GiftCardPDFData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>DIVAA JEWELS</Text>
        <Text style={styles.title}>Gift Card</Text>
        <Text style={styles.subtitle}>A Gift of Elegance & Style</Text>
      </View>

      {/* Card Container */}
      <View style={styles.cardContainer}>
        {/* Amount Header */}
        <View style={styles.gradientHeader}>
          <Text style={styles.amountText}>
            <Text style={styles.currencySymbol}>₹</Text>
            {data.amount.toLocaleString('en-IN')}
          </Text>
        </View>

        {/* Recipient & Sender Info */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>To</Text>
            <Text style={styles.value}>{data.recipient_name}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>From</Text>
            <Text style={styles.value}>{data.sender_name}</Text>
          </View>
        </View>

        {/* Personal Message */}
        {data.personal_message && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageLabel}>Personal Message</Text>
            <Text style={styles.messageText}>{data.personal_message}</Text>
          </View>
        )}

        <View style={styles.divider} />

        {/* Card Number */}
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.label}>Card Number</Text>
          <Text style={styles.cardNumber}>{formatCardNumberForDisplay(data.card_number)}</Text>
        </View>

        {/* PIN */}
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.label}>PIN (Scratch to Reveal)</Text>
          <Text style={styles.pin}>{maskPIN(data.card_pin)}</Text>
          <Text style={{ fontSize: 9, color: '#999999', marginTop: 5 }}>
            Note: PIN will be provided separately for security
          </Text>
        </View>

        {/* Expiry Date */}
        <View>
          <Text style={styles.label}>Valid Until</Text>
          <Text style={styles.value}>
            {new Date(data.expiry_date).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </Text>
        </View>

        {/* QR Code */}
        {data.qr_code_data_url && (
          <View style={styles.qrContainer}>
            <Image src={data.qr_code_data_url} style={styles.qrImage} />
            <Text style={styles.qrLabel}>Scan to view card details</Text>
          </View>
        )}
      </View>

      {/* Footer - Instructions */}
      <View style={styles.footer}>
        <Text style={styles.instructionsTitle}>How to Redeem</Text>
        <Text style={styles.instruction}>1. Visit divaa.com and browse our exquisite collection</Text>
        <Text style={styles.instruction}>2. Add your favorite jewelry to the cart</Text>
        <Text style={styles.instruction}>3. At checkout, enter your gift card number and PIN</Text>
        <Text style={styles.instruction}>4. Your gift card balance will be applied instantly</Text>
        <Text style={styles.instruction}>
          5. Any remaining balance stays on your card for future purchases
        </Text>

        <Text style={styles.expiryText}>This gift card expires on {new Date(data.expiry_date).toLocaleDateString('en-IN')}</Text>

        <Text style={styles.supportText}>
          For assistance, contact us at saj.query@gmail.com | +91 1234567890
        </Text>
      </View>
    </Page>
  </Document>
);

/**
 * Generate PDF blob from gift card data
 */
export async function generateGiftCardPDF(data: GiftCardPDFData): Promise<Blob> {
  const pdfDoc = <GiftCardPDF data={data} />;
  const blob = await pdf(pdfDoc).toBlob();
  return blob;
}

/**
 * Generate PDF and download
 */
export async function downloadGiftCardPDF(data: GiftCardPDFData, filename?: string): Promise<void> {
  const blob = await generateGiftCardPDF(data);
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `gift-card-${data.card_number}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/**
 * Generate PDF as base64 string (for email attachments)
 */
export async function generateGiftCardPDFBase64(data: GiftCardPDFData): Promise<string> {
  const blob = await generateGiftCardPDF(data);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      // Remove data URL prefix
      const base64Data = base64.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Generate PDF URL for preview
 */
export async function generateGiftCardPDFURL(data: GiftCardPDFData): Promise<string> {
  const blob = await generateGiftCardPDF(data);
  return URL.createObjectURL(blob);
}
