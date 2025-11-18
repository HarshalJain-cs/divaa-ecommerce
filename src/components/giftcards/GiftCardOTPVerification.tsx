/**
 * @component GiftCardOTPVerification
 * @description OTP verification component for gift card operations
 */

import React, { useState, useEffect, useRef } from 'react';
import { Shield, Mail, Phone, RefreshCw, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { OTP_CONFIG } from '@/constants/giftcards';

interface GiftCardOTPVerificationProps {
  email: string;
  phone?: string;
  purpose: 'purchase' | 'redemption' | 'balance_check';
  onVerificationSuccess: (otpId: string) => void;
  onVerificationError: (error: string) => void;
}

export default function GiftCardOTPVerification({
  email,
  phone,
  purpose,
  onVerificationSuccess,
  onVerificationError,
}: GiftCardOTPVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [otpId, setOtpId] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(OTP_CONFIG.EXPIRY_MINUTES * 60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-send OTP on mount
  useEffect(() => {
    sendOTP();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Format time remaining
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Send OTP
  const sendOTP = async () => {
    setIsSending(true);

    try {
      // Generate 6-digit OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

      // Save OTP to database
      const { data, error } = await supabase
        .from('otp_verifications')
        .insert({
          email,
          phone: phone || null,
          otp_code: otpCode,
          purpose,
          expires_at: new Date(Date.now() + OTP_CONFIG.EXPIRY_MINUTES * 60 * 1000).toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving OTP:', error);
        toast.error('Failed to send OTP. Please try again.');
        return;
      }

      setOtpId(data.id);

      // TODO: Send OTP via email/SMS
      // For Phase 1, we'll just show it in console (development only)
      console.log('OTP Code (Phase 1 - Dev Only):', otpCode);
      console.log('Send to:', email, phone);

      toast.success(`OTP sent to ${email}${phone ? ` and ${phone}` : ''}`);

      // Reset timer
      setTimeRemaining(OTP_CONFIG.EXPIRY_MINUTES * 60);
      setCanResend(false);
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Failed to send OTP');
    } finally {
      setIsSending(false);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all 6 digits entered
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      verifyOTP(newOtp.join(''));
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Verify OTP
  const verifyOTP = async (otpCode: string) => {
    if (!otpId) {
      toast.error('No OTP session found. Please request a new OTP.');
      return;
    }

    setIsVerifying(true);

    try {
      // Fetch OTP record
      const { data, error } = await supabase
        .from('otp_verifications')
        .select('*')
        .eq('id', otpId)
        .single();

      if (error) {
        console.error('Error fetching OTP:', error);
        toast.error('Invalid OTP. Please try again.');
        setIsVerifying(false);
        return;
      }

      // Check if OTP is expired
      if (new Date(data.expires_at) < new Date()) {
        toast.error('OTP has expired. Please request a new one.');
        setCanResend(true);
        setIsVerifying(false);
        return;
      }

      // Check if OTP is already verified
      if (data.is_verified) {
        toast.error('This OTP has already been used. Please request a new one.');
        setCanResend(true);
        setIsVerifying(false);
        return;
      }

      // Verify OTP code
      if (data.otp_code !== otpCode) {
        toast.error('Invalid OTP. Please check and try again.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
        setIsVerifying(false);
        return;
      }

      // Mark OTP as verified
      const { error: updateError } = await supabase
        .from('otp_verifications')
        .update({
          is_verified: true,
          verified_at: new Date().toISOString(),
        })
        .eq('id', otpId);

      if (updateError) {
        console.error('Error updating OTP:', updateError);
        toast.error('Verification failed. Please try again.');
        setIsVerifying(false);
        return;
      }

      toast.success('OTP verified successfully!');
      onVerificationSuccess(otpId);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Verification failed. Please try again.');
      onVerificationError('OTP verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle manual verify button
  const handleManualVerify = () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      toast.error('Please enter all 6 digits');
      return;
    }
    verifyOTP(otpCode);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 text-center">
        {/* Icon */}
        <div className="w-16 h-16 bg-[#E0BFB8]/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-[#B76E79]" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify OTP</h2>
        <p className="text-gray-600 mb-6">
          We've sent a 6-digit code to
        </p>

        {/* Contact Info */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
            <Mail className="w-4 h-4" />
            <span className="font-semibold">{email}</span>
          </div>
          {phone && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
              <Phone className="w-4 h-4" />
              <span className="font-semibold">{phone}</span>
            </div>
          )}
        </div>

        {/* OTP Input */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleOtpChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              disabled={isVerifying}
              className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-[#B76E79] focus:ring-2 focus:ring-[#E0BFB8] outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          ))}
        </div>

        {/* Timer */}
        {!canResend && (
          <p className="text-sm text-gray-600 mb-4">
            Code expires in{' '}
            <span className="font-bold text-[#B76E79]">{formatTime(timeRemaining)}</span>
          </p>
        )}

        {/* Verify Button */}
        <button
          onClick={handleManualVerify}
          disabled={otp.some(d => !d) || isVerifying}
          className="w-full py-3 bg-[#B76E79] text-white font-semibold rounded-lg hover:bg-[#DE5D83] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mb-4"
        >
          {isVerifying ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              Verify OTP
            </>
          )}
        </button>

        {/* Resend OTP */}
        <div className="text-sm text-gray-600">
          Didn't receive the code?{' '}
          {canResend ? (
            <button
              onClick={sendOTP}
              disabled={isSending}
              className="text-[#B76E79] font-semibold hover:underline disabled:opacity-50"
            >
              {isSending ? (
                <span className="inline-flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Sending...
                </span>
              ) : (
                <span className="inline-flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" />
                  Resend OTP
                </span>
              )}
            </button>
          ) : (
            <span className="text-gray-400">
              Resend available in {formatTime(timeRemaining)}
            </span>
          )}
        </div>

        {/* Phase 1 Dev Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-700">
            <strong>Phase 1 Note:</strong> OTP is logged to console in development.
            Email/SMS integration pending.
          </p>
        </div>
      </div>
    </div>
  );
}
