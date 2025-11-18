/**
 * @component GiftCardPersonalization
 * @description Form for personalizing gift card with sender/recipient details and message
 */

import React, { useState } from 'react';
import { User, Mail, Phone, MessageSquare, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

interface GiftCardPersonalizationProps {
  senderName: string;
  onSenderNameChange: (name: string) => void;
  recipientName: string;
  onRecipientNameChange: (name: string) => void;
  recipientEmail: string;
  onRecipientEmailChange: (email: string) => void;
  recipientPhone: string;
  onRecipientPhoneChange: (phone: string) => void;
  personalMessage: string;
  onPersonalMessageChange: (message: string) => void;
  deliveryMethod: 'email' | 'sms' | 'both';
  onDeliveryMethodChange: (method: 'email' | 'sms' | 'both') => void;
  uploadedImage: File | null;
  onImageUpload: (file: File | null) => void;
}

const MAX_MESSAGE_LENGTH = 200;
const MAX_IMAGE_SIZE_MB = 2;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export default function GiftCardPersonalization({
  senderName,
  onSenderNameChange,
  recipientName,
  onRecipientNameChange,
  recipientEmail,
  onRecipientEmailChange,
  recipientPhone,
  onRecipientPhoneChange,
  personalMessage,
  onPersonalMessageChange,
  deliveryMethod,
  onDeliveryMethodChange,
  uploadedImage,
  onImageUpload,
}: GiftCardPersonalizationProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Email validation
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation
  const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[\d\s-()]{10,}$/;
    return phoneRegex.test(phone);
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error('Please upload a JPG or PNG image');
      return;
    }

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_IMAGE_SIZE_MB) {
      toast.error(`Image size must be less than ${MAX_IMAGE_SIZE_MB}MB`);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    onImageUpload(file);
    toast.success('Image uploaded successfully');
  };

  // Remove image
  const handleRemoveImage = () => {
    setImagePreview(null);
    onImageUpload(null);
  };

  // Get remaining characters for message
  const remainingChars = MAX_MESSAGE_LENGTH - personalMessage.length;

  return (
    <div className="space-y-6">
      {/* Sender Details */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">From (Sender Details)</h3>

        <div className="space-y-4">
          {/* Sender Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={senderName}
                onChange={(e) => onSenderNameChange(e.target.value)}
                placeholder="Enter your name"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#B76E79] focus:ring-2 focus:ring-[#E0BFB8] outline-none transition-all"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recipient Details */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">To (Recipient Details)</h3>

        <div className="space-y-4">
          {/* Recipient Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Recipient Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={recipientName}
                onChange={(e) => onRecipientNameChange(e.target.value)}
                placeholder="Enter recipient's name"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#B76E79] focus:ring-2 focus:ring-[#E0BFB8] outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Recipient Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Recipient Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => onRecipientEmailChange(e.target.value)}
                placeholder="recipient@example.com"
                className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg outline-none transition-all ${
                  recipientEmail && !isValidEmail(recipientEmail)
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-300 focus:border-[#B76E79] focus:ring-2 focus:ring-[#E0BFB8]'
                }`}
                required
              />
            </div>
            {recipientEmail && !isValidEmail(recipientEmail) && (
              <p className="text-xs text-red-500 mt-1">Please enter a valid email address</p>
            )}
          </div>

          {/* Recipient Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Recipient Phone <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={recipientPhone}
                onChange={(e) => onRecipientPhoneChange(e.target.value)}
                placeholder="+91 98765 43210"
                className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg outline-none transition-all ${
                  recipientPhone && !isValidPhone(recipientPhone)
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-300 focus:border-[#B76E79] focus:ring-2 focus:ring-[#E0BFB8]'
                }`}
                required
              />
            </div>
            {recipientPhone && !isValidPhone(recipientPhone) && (
              <p className="text-xs text-red-500 mt-1">Please enter a valid phone number</p>
            )}
          </div>
        </div>
      </div>

      {/* Delivery Method */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Delivery Method</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => onDeliveryMethodChange('email')}
            className={`p-4 rounded-xl border-2 font-semibold transition-all duration-300 ${
              deliveryMethod === 'email'
                ? 'border-[#B76E79] bg-[#E0BFB8]/20 text-[#B76E79]'
                : 'border-gray-200 text-gray-700 hover:border-[#E0BFB8]'
            }`}
          >
            <Mail className="w-6 h-6 mx-auto mb-2" />
            Email Only
          </button>

          <button
            onClick={() => onDeliveryMethodChange('sms')}
            className={`p-4 rounded-xl border-2 font-semibold transition-all duration-300 ${
              deliveryMethod === 'sms'
                ? 'border-[#B76E79] bg-[#E0BFB8]/20 text-[#B76E79]'
                : 'border-gray-200 text-gray-700 hover:border-[#E0BFB8]'
            }`}
          >
            <Phone className="w-6 h-6 mx-auto mb-2" />
            SMS Only
          </button>

          <button
            onClick={() => onDeliveryMethodChange('both')}
            className={`p-4 rounded-xl border-2 font-semibold transition-all duration-300 ${
              deliveryMethod === 'both'
                ? 'border-[#B76E79] bg-[#E0BFB8]/20 text-[#B76E79]'
                : 'border-gray-200 text-gray-700 hover:border-[#E0BFB8]'
            }`}
          >
            <div className="flex items-center justify-center gap-1 mb-2">
              <Mail className="w-5 h-5" />
              <span>+</span>
              <Phone className="w-5 h-5" />
            </div>
            Both
          </button>
        </div>
      </div>

      {/* Personal Message */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Personal Message (Optional)</h3>

        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <textarea
            value={personalMessage}
            onChange={(e) => {
              if (e.target.value.length <= MAX_MESSAGE_LENGTH) {
                onPersonalMessageChange(e.target.value);
              }
            }}
            placeholder="Add a heartfelt message to your gift card..."
            rows={4}
            className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#B76E79] focus:ring-2 focus:ring-[#E0BFB8] outline-none transition-all resize-none"
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">
              Make it special with a personal touch
            </p>
            <p className={`text-xs font-semibold ${
              remainingChars < 20 ? 'text-orange-500' : 'text-gray-500'
            }`}>
              {remainingChars} characters remaining
            </p>
          </div>
        </div>
      </div>

      {/* Image Upload (Optional) */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Add Photo (Optional)</h3>

        {!imagePreview ? (
          <label className="block cursor-pointer">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#E0BFB8] hover:bg-gray-50 transition-all">
              <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p className="text-gray-700 font-semibold mb-1">Click to upload image</p>
              <p className="text-xs text-gray-500">JPG or PNG, max {MAX_IMAGE_SIZE_MB}MB</p>
              <p className="text-xs text-gray-400 mt-2">Image will appear as a small photo in the corner</p>
            </div>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        ) : (
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Uploaded preview"
              className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
