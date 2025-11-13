/**
 * Authentication type definitions
 * Types for phone auth, OTP verification, and user authentication
 */

export interface CountryCodeOption {
  code: string;        // ISO 3166-1 alpha-2 country code (e.g., 'IN', 'US')
  dialCode: string;    // Country dial code (e.g., '+91', '+1')
  name: string;        // Country name
  flag: string;        // Flag emoji
}

export interface PhoneAuthData {
  countryCode: string; // Dial code (e.g., '+91')
  phoneNumber: string; // National number without country code
  fullNumber: string;  // Complete E.164 formatted number
}

export interface OTPVerificationData {
  phoneNumber: string; // E.164 formatted phone number
  otp: string;         // 6-digit OTP code
  sessionId?: string;  // Optional session ID from Supabase
}

export interface PhoneAuthResponse {
  success: boolean;
  message?: string;
  sessionId?: string;
  error?: string;
}

export interface OTPVerificationResponse {
  success: boolean;
  user?: {
    id: string;
    phone: string;
    email?: string;
  };
  needsAdditionalInfo?: boolean; // True for signup flow
  error?: string;
}

export interface PhoneAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onSuccess: (data: PhoneAuthSuccessData) => void;
  onError: (error: string) => void;
}

export interface PhoneAuthSuccessData {
  countryCode: string;
  phoneNumber: string;
  verified: boolean;
  userId?: string;
  needsProfile?: boolean; // For signup flow
}

export interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
}

export interface ResendOTPState {
  canResend: boolean;
  countdown: number;
  attempts: number;
}

export interface PhoneAuthStep {
  step: 'phone' | 'otp';
  data?: Partial<PhoneAuthData>;
}

// Supabase phone auth types
export interface SupabasePhoneSignInResponse {
  session: {
    access_token: string;
    refresh_token: string;
    user: {
      id: string;
      phone: string;
      email?: string;
    };
  } | null;
  error: {
    message: string;
    status: number;
  } | null;
}

export interface SupabasePhoneSignUpResponse {
  user: {
    id: string;
    phone: string;
  } | null;
  session: {
    access_token: string;
  } | null;
  error: {
    message: string;
  } | null;
}

export interface SupabaseOTPVerificationPayload {
  phone: string;
  token: string;
  type: 'sms' | 'phone_change';
}

// User profile types for database
export interface UserProfile {
  id: string;
  email?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  country_code?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileData {
  full_name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  country_code?: string;
  avatar_url?: string;
}

// Form validation types
export interface PhoneFormErrors {
  phoneNumber?: string;
  countryCode?: string;
  otp?: string;
  general?: string;
}

export interface AuthFormData {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phoneNumber?: string;
  countryCode?: string;
}

// Auth state types
export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

// Phone auth error codes
export enum PhoneAuthErrorCode {
  INVALID_PHONE = 'INVALID_PHONE',
  PHONE_EXISTS = 'PHONE_EXISTS',
  PHONE_NOT_FOUND = 'PHONE_NOT_FOUND',
  INVALID_OTP = 'INVALID_OTP',
  OTP_EXPIRED = 'OTP_EXPIRED',
  TOO_MANY_ATTEMPTS = 'TOO_MANY_ATTEMPTS',
  SMS_SEND_FAILED = 'SMS_SEND_FAILED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface PhoneAuthError {
  code: PhoneAuthErrorCode;
  message: string;
  details?: unknown;
}

// Country code data
export const POPULAR_COUNTRIES: CountryCodeOption[] = [
  { code: 'IN', dialCode: '+91', name: 'India', flag: '🇮🇳' },
  { code: 'US', dialCode: '+1', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', dialCode: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'AU', dialCode: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: 'CA', dialCode: '+1', name: 'Canada', flag: '🇨🇦' },
  { code: 'AE', dialCode: '+971', name: 'UAE', flag: '🇦🇪' },
];

export const ALL_COUNTRIES: CountryCodeOption[] = [
  { code: 'IN', dialCode: '+91', name: 'India', flag: '🇮🇳' },
  { code: 'US', dialCode: '+1', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', dialCode: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'AU', dialCode: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: 'CA', dialCode: '+1', name: 'Canada', flag: '🇨🇦' },
  { code: 'CN', dialCode: '+86', name: 'China', flag: '🇨🇳' },
  { code: 'JP', dialCode: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: 'KR', dialCode: '+82', name: 'South Korea', flag: '🇰🇷' },
  { code: 'BR', dialCode: '+55', name: 'Brazil', flag: '🇧🇷' },
  { code: 'RU', dialCode: '+7', name: 'Russia', flag: '🇷🇺' },
  { code: 'DE', dialCode: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', dialCode: '+33', name: 'France', flag: '🇫🇷' },
  { code: 'IT', dialCode: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', dialCode: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: 'MX', dialCode: '+52', name: 'Mexico', flag: '🇲🇽' },
  { code: 'AE', dialCode: '+971', name: 'UAE', flag: '🇦🇪' },
  { code: 'SG', dialCode: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: 'MY', dialCode: '+60', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'TH', dialCode: '+66', name: 'Thailand', flag: '🇹🇭' },
  { code: 'PH', dialCode: '+63', name: 'Philippines', flag: '🇵🇭' },
  { code: 'ID', dialCode: '+62', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'VN', dialCode: '+84', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'PK', dialCode: '+92', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'BD', dialCode: '+880', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'LK', dialCode: '+94', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'NP', dialCode: '+977', name: 'Nepal', flag: '🇳🇵' },
  { code: 'SA', dialCode: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'ZA', dialCode: '+27', name: 'South Africa', flag: '🇿🇦' },
  { code: 'NG', dialCode: '+234', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'EG', dialCode: '+20', name: 'Egypt', flag: '🇪🇬' },
  { code: 'KE', dialCode: '+254', name: 'Kenya', flag: '🇰🇪' },
  { code: 'TR', dialCode: '+90', name: 'Turkey', flag: '🇹🇷' },
  { code: 'AR', dialCode: '+54', name: 'Argentina', flag: '🇦🇷' },
  { code: 'CL', dialCode: '+56', name: 'Chile', flag: '🇨🇱' },
  { code: 'CO', dialCode: '+57', name: 'Colombia', flag: '🇨🇴' },
  { code: 'PE', dialCode: '+51', name: 'Peru', flag: '🇵🇪' },
  { code: 'NZ', dialCode: '+64', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'PL', dialCode: '+48', name: 'Poland', flag: '🇵🇱' },
  { code: 'NL', dialCode: '+31', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'BE', dialCode: '+32', name: 'Belgium', flag: '🇧🇪' },
  { code: 'SE', dialCode: '+46', name: 'Sweden', flag: '🇸🇪' },
  { code: 'NO', dialCode: '+47', name: 'Norway', flag: '🇳🇴' },
  { code: 'DK', dialCode: '+45', name: 'Denmark', flag: '🇩🇰' },
  { code: 'FI', dialCode: '+358', name: 'Finland', flag: '🇫🇮' },
  { code: 'AT', dialCode: '+43', name: 'Austria', flag: '🇦🇹' },
  { code: 'CH', dialCode: '+41', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'PT', dialCode: '+351', name: 'Portugal', flag: '🇵🇹' },
  { code: 'GR', dialCode: '+30', name: 'Greece', flag: '🇬🇷' },
  { code: 'IE', dialCode: '+353', name: 'Ireland', flag: '🇮🇪' },
];
