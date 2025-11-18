/**
 * @page GiftCardsPage
 * @description Main gift card purchase page with multi-step flow
 */

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/ui/Header';
import GiftCardSelector from '@/components/giftcards/GiftCardSelector';
import GiftCardPersonalization from '@/components/giftcards/GiftCardPersonalization';
import GiftCardPreview from '@/components/giftcards/GiftCardPreview';
import PromoCodeInput from '@/components/giftcards/PromoCodeInput';
import GiftCardCheckout from '@/components/giftcards/GiftCardCheckout';
import type { GiftCardTheme, GiftCardFormData, PromoCodeValidation, GiftCardType } from '@/types/giftcard.types';

type Step = 'select' | 'personalize' | 'review' | 'checkout';

export default function GiftCardsPage() {
  const navigate = useNavigate();

  // Step management
  const [currentStep, setCurrentStep] = useState<Step>('select');

  // Form data
  const [selectedTheme, setSelectedTheme] = useState<GiftCardTheme | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [selectedCardType, setSelectedCardType] = useState<GiftCardType>('regular');
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'email' | 'sms' | 'both'>('email');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  // Promo code
  const [appliedPromo, setAppliedPromo] = useState<PromoCodeValidation | null>(null);

  // Handle image upload
  const handleImageUpload = (file: File | null) => {
    setUploadedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreviewUrl(null);
    }
  };

  // Validate step
  const canProceedFromSelect = (): boolean => {
    if (!selectedTheme) {
      toast.error('Please select a design theme');
      return false;
    }
    if (!selectedAmount) {
      toast.error('Please select an amount');
      return false;
    }
    return true;
  };

  const canProceedFromPersonalize = (): boolean => {
    if (!senderName || senderName.trim().length < 2) {
      toast.error('Please enter sender name (minimum 2 characters)');
      return false;
    }
    if (!recipientName || recipientName.trim().length < 2) {
      toast.error('Please enter recipient name (minimum 2 characters)');
      return false;
    }
    if (!recipientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
      toast.error('Please enter a valid recipient email');
      return false;
    }
    if (!recipientPhone || !/^[+]?[\d\s-()]{10,}$/.test(recipientPhone)) {
      toast.error('Please enter a valid recipient phone number');
      return false;
    }
    return true;
  };

  // Handle next step
  const handleNext = () => {
    if (currentStep === 'select') {
      if (canProceedFromSelect()) {
        setCurrentStep('personalize');
      }
    } else if (currentStep === 'personalize') {
      if (canProceedFromPersonalize()) {
        setCurrentStep('review');
      }
    } else if (currentStep === 'review') {
      setCurrentStep('checkout');
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep === 'checkout') {
      setCurrentStep('review');
    } else if (currentStep === 'review') {
      setCurrentStep('personalize');
    } else if (currentStep === 'personalize') {
      setCurrentStep('select');
    }
  };

  // Handle checkout completion
  const handleCheckoutComplete = (orderId: string) => {
    toast.success('Gift card purchased successfully!');
    // TODO: Navigate to success page or order details
    console.log('Order completed:', orderId);
    navigate('/profile'); // Navigate to profile to see the card in wallet
  };

  const handleCheckoutError = (error: string) => {
    console.error('Checkout error:', error);
  };

  // Build form data
  const giftCardData: GiftCardFormData = {
    amount: selectedAmount || 0,
    design_theme: selectedTheme || 'general',
    sender_name: senderName,
    recipient_name: recipientName,
    recipient_email: recipientEmail,
    recipient_phone: recipientPhone,
    personal_message: personalMessage,
    card_type: selectedCardType,
    delivery_method: deliveryMethod,
  };

  // Step indicator
  const steps = [
    { key: 'select', label: 'Select Card', number: 1 },
    { key: 'personalize', label: 'Personalize', number: 2 },
    { key: 'review', label: 'Review', number: 3 },
    { key: 'checkout', label: 'Checkout', number: 4 },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === currentStep);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] via-white to-[#FAF9F6] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Gift the Joy of Jewels
            </h1>
            <p className="text-lg text-gray-600">
              Create a personalized gift card for your loved ones
            </p>
          </div>

          {/* Step Indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.key}>
                  {/* Step Circle */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                        index < currentStepIndex
                          ? 'bg-green-500 text-white'
                          : index === currentStepIndex
                          ? 'bg-[#B76E79] text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {index < currentStepIndex ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <p
                      className={`mt-2 text-sm font-semibold hidden sm:block ${
                        index <= currentStepIndex ? 'text-gray-800' : 'text-gray-500'
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 w-16 md:w-24 mx-2 transition-all ${
                        index < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                {/* Step: Select */}
                {currentStep === 'select' && (
                  <GiftCardSelector
                    selectedTheme={selectedTheme}
                    onThemeSelect={setSelectedTheme}
                    selectedAmount={selectedAmount}
                    onAmountSelect={setSelectedAmount}
                    selectedCardType={selectedCardType}
                    onCardTypeSelect={setSelectedCardType}
                  />
                )}

                {/* Step: Personalize */}
                {currentStep === 'personalize' && (
                  <GiftCardPersonalization
                    senderName={senderName}
                    onSenderNameChange={setSenderName}
                    recipientName={recipientName}
                    onRecipientNameChange={setRecipientName}
                    recipientEmail={recipientEmail}
                    onRecipientEmailChange={setRecipientEmail}
                    recipientPhone={recipientPhone}
                    onRecipientPhoneChange={setRecipientPhone}
                    personalMessage={personalMessage}
                    onPersonalMessageChange={setPersonalMessage}
                    deliveryMethod={deliveryMethod}
                    onDeliveryMethodChange={setDeliveryMethod}
                    uploadedImage={uploadedImage}
                    onImageUpload={handleImageUpload}
                  />
                )}

                {/* Step: Review */}
                {currentStep === 'review' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Review Your Order</h2>

                    {/* Order Summary */}
                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Gift Card Details</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <p className="text-gray-600">Design:</p>
                          <p className="font-semibold text-gray-800 capitalize">{selectedTheme}</p>
                          <p className="text-gray-600">Type:</p>
                          <p className="font-semibold text-gray-800 capitalize">{selectedCardType}</p>
                          <p className="text-gray-600">Amount:</p>
                          <p className="font-semibold text-gray-800">₹{selectedAmount?.toLocaleString('en-IN')}</p>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h3 className="font-semibold text-gray-700 mb-2">Sender & Recipient</h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            <p className="text-gray-600">From: <span className="font-semibold text-gray-800">{senderName}</span></p>
                          </div>
                          <div>
                            <p className="text-gray-600">To: <span className="font-semibold text-gray-800">{recipientName}</span></p>
                            <p className="text-gray-600">{recipientEmail}</p>
                            <p className="text-gray-600">{recipientPhone}</p>
                          </div>
                          {personalMessage && (
                            <div>
                              <p className="text-gray-600">Message:</p>
                              <p className="italic text-gray-700">"{personalMessage}"</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h3 className="font-semibold text-gray-700 mb-2">Delivery</h3>
                        <p className="text-sm text-gray-700 capitalize">{deliveryMethod === 'both' ? 'Email & SMS' : deliveryMethod}</p>
                      </div>
                    </div>

                    {/* Promo Code */}
                    <PromoCodeInput
                      totalAmount={selectedAmount || 0}
                      onPromoApplied={setAppliedPromo}
                      onPromoRemoved={() => setAppliedPromo(null)}
                      appliedPromo={appliedPromo}
                    />
                  </div>
                )}

                {/* Step: Checkout */}
                {currentStep === 'checkout' && (
                  <GiftCardCheckout
                    giftCardData={giftCardData}
                    appliedPromo={appliedPromo}
                    onCheckoutComplete={handleCheckoutComplete}
                    onCheckoutError={handleCheckoutError}
                  />
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-8 pt-8 border-t border-gray-200">
                  {currentStep !== 'select' && (
                    <button
                      onClick={handlePrevious}
                      className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Previous
                    </button>
                  )}

                  {currentStep !== 'checkout' && (
                    <button
                      onClick={handleNext}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#B76E79] to-[#DE5D83] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                    >
                      Next
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="lg:col-span-1">
              <GiftCardPreview
                theme={selectedTheme}
                amount={selectedAmount}
                recipientName={recipientName}
                senderName={senderName}
                personalMessage={personalMessage}
                uploadedImage={uploadedImage}
                imagePreviewUrl={imagePreviewUrl || undefined}
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => navigate('/gift-cards/bulk')}
              className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-[#B76E79] transition-all text-center"
            >
              <h3 className="font-bold text-gray-800 mb-2">Bulk Orders</h3>
              <p className="text-sm text-gray-600">Order multiple gift cards via CSV upload</p>
            </button>

            <button
              onClick={() => navigate('/gift-cards/balance')}
              className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-[#B76E79] transition-all text-center"
            >
              <h3 className="font-bold text-gray-800 mb-2">Check Balance</h3>
              <p className="text-sm text-gray-600">Check your gift card balance and status</p>
            </button>

            <button
              onClick={() => navigate('/profile')}
              className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-[#B76E79] transition-all text-center"
            >
              <h3 className="font-bold text-gray-800 mb-2">My Wallet</h3>
              <p className="text-sm text-gray-600">View and manage your gift cards</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
