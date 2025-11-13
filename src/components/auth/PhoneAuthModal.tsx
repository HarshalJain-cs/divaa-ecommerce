/**
 * @component PhoneAuthModal
 * @description Modal for phone authentication with OTP verification
 * Handles both login and signup flows with phone numbers
 */

import { useState, useEffect, useRef } from 'react';
import { X, Phone, ArrowLeft, Loader2 } from 'lucide-react';
import CountryCodeSelect from './CountryCodeSelect';
import { CountryCodeOption, ALL_COUNTRIES, PhoneAuthModalProps } from '../../types/auth';
import { validatePhoneNumber } from '../../utils/phoneValidation';
import { formatForSMS } from '../../utils/phoneFormatter';
import { useAuth } from '../../hooks/useAuth';

const PhoneAuthModal = ({ isOpen, onClose, mode, onSuccess, onError }: PhoneAuthModalProps) => {
  // Auth hook
  const { sendPhoneOTP, checkPhoneExists, signInWithPhone, signUpWithPhone } = useAuth();

  // Step management
  const [step, setStep] = useState<'phone' | 'otp'>('phone');

  // Phone input state
  const [selectedCountry, setSelectedCountry] = useState<CountryCodeOption>(
    ALL_COUNTRIES[0] // Default to India
  );
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // OTP state
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [otpAttempts, setOtpAttempts] = useState(0);

  // Resend OTP state
  const [canResend, setCanResend] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(30);

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // OTP input refs
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (step === 'otp' && !canResend && resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [step, canResend, resendCountdown]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      resetModal();
    }
  }, [isOpen]);

  const resetModal = () => {
    setStep('phone');
    setPhoneNumber('');
    setPhoneError('');
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
    setOtpAttempts(0);
    setCanResend(false);
    setResendCountdown(30);
    setIsLoading(false);
    setIsVerifying(false);
  };

  const handleClose = () => {
    if (!isLoading && !isVerifying) {
      resetModal();
      onClose();
    }
  };

  // Phone number validation
  const validatePhone = (): boolean => {
    const validation = validatePhoneNumber(phoneNumber, selectedCountry.code);

    if (!validation.isValid) {
      setPhoneError(validation.error || 'Invalid phone number');
      return false;
    }

    setPhoneError('');
    return true;
  };

  // Handle send OTP
  const handleSendOTP = async () => {
    if (!validatePhone()) {
      return;
    }

    setIsLoading(true);
    setPhoneError('');

    try {
      const fullNumber = formatForSMS(selectedCountry.dialCode, phoneNumber);

      // Check if phone exists (for login) or doesn't exist (for signup)
      const phoneExists = await checkPhoneExists(fullNumber);

      if (mode === 'signup' && phoneExists) {
        setPhoneError('Phone number already registered. Please login instead.');
        onError('Phone number already exists');
        setTimeout(() => {
          handleClose();
        }, 2000);
        return;
      }

      if (mode === 'login' && !phoneExists) {
        setPhoneError('Phone number not found. Please sign up first.');
        onError('Phone number not found');
        setTimeout(() => {
          handleClose();
        }, 2000);
        return;
      }

      // Send OTP via Supabase
      const { error } = await sendPhoneOTP(fullNumber);

      if (error) {
        throw new Error(error.message);
      }

      // OTP sent successfully
      setStep('otp');
      setResendCountdown(30);
      setCanResend(false);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send OTP. Please try again.';
      setPhoneError(errorMessage);
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError('');

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits entered
    if (newOtp.every((digit) => digit !== '') && !isVerifying) {
      handleVerifyOTP(newOtp.join(''));
    }
  };

  // Handle OTP backspace
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Handle OTP paste
  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const digits = pastedData.split('').filter((char) => /^\d$/.test(char));

    if (digits.length > 0) {
      const newOtp = [...otp];
      digits.forEach((digit, index) => {
        if (index < 6) {
          newOtp[index] = digit;
        }
      });
      setOtp(newOtp);

      // Focus last filled input or first empty
      const nextEmptyIndex = newOtp.findIndex((digit) => !digit);
      const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
      otpInputRefs.current[focusIndex]?.focus();

      // Auto-verify if complete
      if (newOtp.every((digit) => digit !== '')) {
        handleVerifyOTP(newOtp.join(''));
      }
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = async (otpCode: string) => {
    if (otpAttempts >= 5) {
      setOtpError('Too many failed attempts. Please request a new OTP.');
      return;
    }

    setIsVerifying(true);
    setOtpError('');

    try {
      const fullNumber = formatForSMS(selectedCountry.dialCode, phoneNumber);

      // Verify OTP with Supabase
      let result;
      if (mode === 'login') {
        result = await signInWithPhone(fullNumber, otpCode);
      } else {
        result = await signUpWithPhone(fullNumber, otpCode);
      }

      if (result.error) {
        // OTP verification failed
        setOtpAttempts((prev) => prev + 1);
        const remaining = 5 - (otpAttempts + 1);

        if (remaining === 0) {
          setOtpError('Too many failed attempts. Please request a new OTP.');
          // Reset to phone step
          setTimeout(() => {
            setStep('phone');
            setOtp(['', '', '', '', '', '']);
            setOtpAttempts(0);
          }, 2000);
        } else {
          setOtpError(`Invalid OTP. ${remaining} attempt${remaining > 1 ? 's' : ''} remaining.`);
          setOtp(['', '', '', '', '', '']);
          otpInputRefs.current[0]?.focus();
        }
        return;
      }

      // OTP verified successfully
      onSuccess({
        countryCode: selectedCountry.dialCode,
        phoneNumber,
        verified: true,
        needsProfile: mode === 'signup',
      });

      handleClose();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Verification failed. Please try again.';
      setOtpError(errorMessage);
      setOtp(['', '', '', '', '', '']);
      otpInputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    if (!canResend) return;

    setCanResend(false);
    setResendCountdown(30);
    setOtpAttempts(0);
    setOtp(['', '', '', '', '', '']);
    setOtpError('');

    try {
      const fullNumber = formatForSMS(selectedCountry.dialCode, phoneNumber);
      const { error } = await sendPhoneOTP(fullNumber);

      if (error) {
        throw new Error(error.message);
      }

      // OTP resent successfully - countdown will restart automatically
    } catch (error: unknown) {
      setOtpError('Failed to resend OTP. Please try again.');
      setCanResend(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-md bg-white border-4 border-gray-900 rounded-2xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={isLoading || isVerifying}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            {step === 'otp' && (
              <button
                onClick={() => setStep('phone')}
                disabled={isVerifying}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {step === 'phone' ? (
                  <>
                    <Phone className="inline w-6 h-6 mr-2 mb-1" />
                    {mode === 'login' ? 'Login with Phone' : 'Sign Up with Phone'}
                  </>
                ) : (
                  'Enter OTP'
                )}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {step === 'phone'
                  ? 'Enter your phone number to receive a verification code'
                  : `We've sent a 6-digit code to ${selectedCountry.dialCode} ${phoneNumber}`}
              </p>
            </div>
          </div>

          {/* Phone Input Step */}
          {step === 'phone' && (
            <div className="space-y-4">
              {/* Country Code + Phone Number */}
              <div className="flex gap-2">
                <CountryCodeSelect value={selectedCountry} onChange={setSelectedCountry} />

                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^\d]/g, '');
                    setPhoneNumber(value);
                    setPhoneError('');
                  }}
                  onBlur={() => phoneNumber && validatePhone()}
                  placeholder="Phone number"
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold-dark font-bold text-base disabled:opacity-50 disabled:bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>

              {/* Phone Error */}
              {phoneError && (
                <p className="text-sm text-red-600 font-medium flex items-start gap-2">
                  <span className="text-red-600">⚠</span>
                  {phoneError}
                </p>
              )}

              {/* Send OTP Button */}
              <button
                onClick={handleSendOTP}
                disabled={!phoneNumber || isLoading}
                className="w-full px-6 py-3 bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white font-bold rounded-lg border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
              </button>
            </div>
          )}

          {/* OTP Input Step */}
          {step === 'otp' && (
            <div className="space-y-6">
              {/* OTP Input Grid */}
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpInputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={index === 0 ? handleOtpPaste : undefined}
                    disabled={isVerifying}
                    className={`w-12 h-14 text-center text-2xl font-bold border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold-dark transition-all disabled:opacity-50 disabled:bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                      otpError ? 'border-red-500 bg-red-50' : ''
                    }`}
                  />
                ))}
              </div>

              {/* OTP Error */}
              {otpError && (
                <p className="text-sm text-red-600 font-medium text-center flex items-center justify-center gap-2">
                  <span className="text-red-600">⚠</span>
                  {otpError}
                </p>
              )}

              {/* Verifying Indicator */}
              {isVerifying && (
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="font-medium">Verifying...</span>
                </div>
              )}

              {/* Resend OTP */}
              <div className="text-center">
                {canResend ? (
                  <button
                    onClick={handleResendOTP}
                    className="text-sm font-bold text-rose-gold-dark hover:text-rose-gold transition-colors"
                  >
                    Resend OTP
                  </button>
                ) : (
                  <p className="text-sm text-gray-600">
                    Resend OTP in <span className="font-bold text-gray-900">{resendCountdown}s</span>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneAuthModal;
