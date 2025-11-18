/**
 * @page GiftCardBulkPage
 * @description Bulk gift card purchase page via CSV upload
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FileSpreadsheet, CheckCircle, AlertCircle } from 'lucide-react';
import Header from '@/components/ui/Header';
import BulkUploadCSV from '@/components/giftcards/BulkUploadCSV';
import PromoCodeInput from '@/components/giftcards/PromoCodeInput';
import type { BulkOrderCSVRow, PromoCodeValidation } from '@/types/giftcard.types';

export default function GiftCardBulkPage() {
  const navigate = useNavigate();

  const [validRows, setValidRows] = useState<BulkOrderCSVRow[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<PromoCodeValidation | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate totals
  const subtotal = validRows.reduce((sum, row) => sum + row.amount, 0);
  const discount = appliedPromo?.discount_amount || 0;
  const total = subtotal - discount;

  // Handle valid data received from CSV
  const handleValidDataReceived = (rows: BulkOrderCSVRow[]) => {
    setValidRows(rows);
  };

  // Handle bulk order submission
  const handleSubmitBulkOrder = async () => {
    if (validRows.length === 0) {
      toast.error('Please upload and validate a CSV file first');
      return;
    }

    setIsProcessing(true);

    try {
      // TODO: Process bulk order
      // For Phase 1, this is a placeholder
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success(`Bulk order submitted! Processing ${validRows.length} gift cards.`);

      // Navigate to orders page or show success
      navigate('/profile');
    } catch (error) {
      console.error('Error submitting bulk order:', error);
      toast.error('Failed to submit bulk order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] via-white to-[#FAF9F6] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E0BFB8]/20 rounded-full mb-4">
              <FileSpreadsheet className="w-8 h-8 text-[#B76E79]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Bulk Gift Card Orders
            </h1>
            <p className="text-lg text-gray-600">
              Upload a CSV file to order multiple gift cards at once
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 text-center">
              <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Bulk Processing</h3>
              <p className="text-sm text-gray-600">Order up to 100 gift cards in one go</p>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 text-center">
              <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Easy Template</h3>
              <p className="text-sm text-gray-600">Download our CSV template to get started</p>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 text-center">
              <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Instant Delivery</h3>
              <p className="text-sm text-gray-600">All cards delivered via email/SMS</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Upload */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <BulkUploadCSV
                  onValidDataReceived={handleValidDataReceived}
                  isProcessing={isProcessing}
                />
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>

                {validRows.length > 0 ? (
                  <div className="space-y-6">
                    {/* Card Count */}
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Gift Cards</p>
                      <p className="text-3xl font-bold text-[#B76E79]">{validRows.length}</p>
                    </div>

                    {/* Amount Breakdown */}
                    <div className="border-t pt-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold text-gray-800">
                          ₹{subtotal.toLocaleString('en-IN')}
                        </span>
                      </div>

                      {appliedPromo && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Discount ({appliedPromo.code})</span>
                          <span className="font-semibold">
                            -₹{discount.toLocaleString('en-IN')}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between items-baseline pt-3 border-t">
                        <span className="text-lg font-bold text-gray-800">Total</span>
                        <span className="text-2xl font-bold text-[#B76E79]">
                          ₹{total.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Promo Code Section */}
                    <div className="pt-4 border-t">
                      <PromoCodeInput
                        totalAmount={subtotal}
                        onPromoApplied={setAppliedPromo}
                        onPromoRemoved={() => setAppliedPromo(null)}
                        appliedPromo={appliedPromo}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmitBulkOrder}
                      disabled={isProcessing}
                      className="w-full py-4 bg-gradient-to-r from-[#B76E79] to-[#DE5D83] text-white font-bold text-lg rounded-xl hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Proceed to Payment
                        </>
                      )}
                    </button>

                    {/* Design Theme Distribution */}
                    <div className="pt-4 border-t">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Design Distribution</p>
                      <div className="space-y-1 text-xs">
                        {Object.entries(
                          validRows.reduce((acc, row) => {
                            acc[row.design_theme] = (acc[row.design_theme] || 0) + 1;
                            return acc;
                          }, {} as Record<string, number>)
                        ).map(([theme, count]) => (
                          <div key={theme} className="flex justify-between">
                            <span className="text-gray-600 capitalize">{theme}:</span>
                            <span className="font-semibold text-gray-800">{count} cards</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">
                      Upload and validate a CSV file to see order summary
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-8">How Bulk Orders Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#B76E79] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Download Template</h3>
                <p className="text-sm text-gray-600">Get the CSV template with all required fields</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#B76E79] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Fill Details</h3>
                <p className="text-sm text-gray-600">Add recipient details and amounts in the CSV</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#B76E79] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Upload & Validate</h3>
                <p className="text-sm text-gray-600">Upload file and we'll validate all entries</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#B76E79] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  4
                </div>
                <h3 className="font-semibold mb-2">Complete Payment</h3>
                <p className="text-sm text-gray-600">Pay once and all cards are sent automatically</p>
              </div>
            </div>
          </div>

          {/* Back to Single Order */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/gift-cards')}
              className="text-[#B76E79] font-semibold hover:underline"
            >
              ← Back to Single Gift Card Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
