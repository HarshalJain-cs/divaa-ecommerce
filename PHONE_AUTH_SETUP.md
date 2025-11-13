# Phone Authentication Setup Guide

This guide will help you complete the phone authentication implementation for your e-commerce app.

## ✅ Completed

The following have been successfully implemented:

1. **Gold Price Widget** - Updated circular element colors (off-white background, rose-gold text)
2. **Dependencies** - Installed `libphonenumber-js`
3. **Utilities**:
   - `src/utils/phoneValidation.ts` - Phone number validation
   - `src/utils/phoneFormatter.ts` - Phone number formatting
4. **Types** - `src/types/auth.ts` - Complete type definitions
5. **Components**:
   - `src/components/auth/CountryCodeSelect.tsx` - Country code dropdown
   - `src/components/auth/PhoneAuthModal.tsx` - Phone auth modal with OTP

## 🔧 Manual Updates Required

Due to file watching conflicts with the dev server, the following files need manual updates:

### 1. Update `src/hooks/useAuth.ts`

Add these functions before the `isAdmin` constant (around line 240):

```typescript
  /**
   * Send OTP to phone number
   */
  const sendPhoneOTP = async (phoneNumber: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const { data, error } = await supabase.auth.signInWithOtp({
        phone: phoneNumber,
      });

      if (error) throw error;

      setState(prev => ({ ...prev, isLoading: false }));

      return { data, error: null };
    } catch (error) {
      const authError = error as AuthError;
      setState(prev => ({
        ...prev,
        error: authError,
        isLoading: false,
      }));
      return { data: null, error: authError };
    }
  };

  /**
   * Verify phone OTP
   */
  const verifyPhoneOTP = async (phoneNumber: string, token: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const { data, error } = await supabase.auth.verifyOtp({
        phone: phoneNumber,
        token,
        type: 'sms',
      });

      if (error) throw error;

      setState(prev => ({
        ...prev,
        user: data.user,
        isLoading: false,
      }));

      if (data.user) {
        await fetchProfile(data.user.id);
      }

      return { data, error: null };
    } catch (error) {
      const authError = error as AuthError;
      setState(prev => ({
        ...prev,
        error: authError,
        isLoading: false,
      }));
      return { data: null, error: authError };
    }
  };

  /**
   * Sign in with phone number
   */
  const signInWithPhone = async (phoneNumber: string, token: string) => {
    return verifyPhoneOTP(phoneNumber, token);
  };

  /**
   * Sign up with phone number
   */
  const signUpWithPhone = async (
    phoneNumber: string,
    token: string,
    profileData?: {
      full_name?: string;
      email?: string;
      country_code?: string;
      phone?: string;
    }
  ) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const { data: authData, error: authError } = await supabase.auth.verifyOtp({
        phone: phoneNumber,
        token,
        type: 'sms',
      });

      if (authError) throw authError;

      if (authData.user && profileData) {
        await supabase
          .from('profiles')
          .update({
            ...profileData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', authData.user.id);
      }

      setState(prev => ({
        ...prev,
        user: authData.user,
        isLoading: false,
      }));

      if (authData.user) {
        await fetchProfile(authData.user.id);
      }

      return { data: authData, error: null };
    } catch (error) {
      const authError = error as AuthError;
      setState(prev => ({
        ...prev,
        error: authError,
        isLoading: false,
      }));
      return { data: null, error: authError };
    }
  };

  /**
   * Check if phone number exists
   */
  const checkPhoneExists = async (phoneNumber: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('phone', phoneNumber)
        .limit(1);

      if (error) throw error;

      return data && data.length > 0;
    } catch (error) {
      return false;
    }
  };
```

Then update the return statement to include these new functions:

```typescript
  return {
    user: state.user,
    profile: state.profile,
    isLoading: state.isLoading,
    error: state.error,
    isAdmin,
    signUp,
    signIn,
    signOut,
    updateProfile,
    sendPhoneOTP,           // Add this
    verifyPhoneOTP,         // Add this
    signInWithPhone,        // Add this
    signUpWithPhone,        // Add this
    checkPhoneExists,       // Add this
    refetchProfile: () => state.user && fetchProfile(state.user.id),
  };
```

### 2. Update `src/components/auth/StyledAuthForm.tsx`

**Add imports:**

```typescript
import { Phone } from 'lucide-react';
import PhoneAuthModal from './PhoneAuthModal';
import { PhoneAuthSuccessData } from '@/types/auth';
```

**Add state (after line 20):**

```typescript
const [showPhoneModal, setShowPhoneModal] = useState(false);
```

**Replace the GitHub button (lines 102-107) with Phone button:**

```typescript
<button type="button" className="oauthButton" onClick={() => setShowPhoneModal(true)}>
  <Phone className="icon" />
  Continue with Phone
</button>
```

**Add phone auth handlers (after handleGithubLogin):**

```typescript
const handlePhoneSuccess = async (data: PhoneAuthSuccessData) => {
  if (mode === 'signup' && data.needsProfile) {
    // For signup, just close modal and let user fill form
    // Phone data will be stored after they complete the form
    toast.success('Phone verified! Please complete your profile.');
    setShowPhoneModal(false);
  } else {
    // For login, redirect to home
    toast.success('Welcome back!');
    navigate('/');
  }
};

const handlePhoneError = (error: string) => {
  toast.error(error);
};
```

**Add PhoneAuthModal before closing StyledWrapper (after line 166):**

```typescript
      </form>

      {/* Phone Auth Modal */}
      <PhoneAuthModal
        isOpen={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
        mode={mode}
        onSuccess={handlePhoneSuccess}
        onError={handlePhoneError}
      />

    </StyledWrapper>
```

### 3. Update `.env` file

Add Twilio configuration comments:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Twilio Configuration (for Phone Authentication via Supabase)
# Note: These are configured in Supabase Dashboard > Authentication > Phone Auth
# You don't need to add them to .env, but documenting for reference
# TWILIO_ACCOUNT_SID=your_twilio_account_sid
# TWILIO_AUTH_TOKEN=your_twilio_auth_token
# TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

## 🗄️ Database Migration

### Add Phone Fields to Profiles Table

Run this SQL in your Supabase SQL Editor:

```sql
-- Add phone number fields to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS country_code TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT;

-- Add unique constraint on phone numbers (optional but recommended)
CREATE UNIQUE INDEX IF NOT EXISTS profiles_phone_unique
ON profiles (country_code, phone)
WHERE phone IS NOT NULL;

-- Add index for faster phone lookups
CREATE INDEX IF NOT EXISTS profiles_phone_idx
ON profiles (phone)
WHERE phone IS NOT NULL;
```

## 📱 Supabase Phone Auth Configuration

1. **Go to Supabase Dashboard** → Your Project → Authentication → Providers

2. **Enable Phone Auth**:
   - Toggle "Phone" provider to ON
   - Choose SMS Provider: **Twilio**

3. **Configure Twilio**:
   - Sign up at [Twilio.com](https://www.twilio.com)
   - Get your credentials from Twilio Console:
     - Account SID
     - Auth Token
     - Phone Number (buy a phone number if you don't have one)
   - Enter these in Supabase Phone Auth settings

4. **Configure OTP Settings**:
   - OTP Expiration: 600 seconds (10 minutes)
   - OTP Length: 6 digits

5. **Rate Limiting** (optional):
   - Configure rate limiting to prevent abuse
   - Recommended: 5 attempts per phone number per hour

## 🧪 Testing Phone Authentication

### Test Flow - Signup:
1. Click "Continue with Phone"
2. Select country code (default: India +91)
3. Enter phone number
4. Click "Send OTP"
5. Enter 6-digit OTP received via SMS
6. After verification, complete profile form (name, email, password)
7. Submit form → Account created → Redirect to home

### Test Flow - Login:
1. Click "Continue with Phone"
2. Select country code
3. Enter registered phone number
4. Click "Send OTP"
5. Enter 6-digit OTP
6. Auto-login → Redirect to home

### Error Scenarios:
- **Signup with existing phone** → Error: "Phone already registered" → Redirect to login
- **Login with non-existent phone** → Error: "Phone not found" → Redirect to signup
- **5 failed OTP attempts** → Restart process (request new OTP)
- **OTP expiration** → After 10 minutes, request new OTP

## 🎨 Styling Notes

- All components use **Neobrutalist design** matching your existing forms
- Colors follow your rose-gold theme (#E0BFB8)
- Phone icon is from lucide-react (consistent with existing icons)
- Modal has backdrop blur and smooth animations

## 🚀 Next Steps

1. Apply the manual updates above
2. Run the database migration SQL
3. Configure Twilio in Supabase Dashboard
4. Test phone authentication flows
5. Monitor Twilio usage and costs

## 📝 Additional Notes

- **Security**: Phone auth is handled entirely by Supabase + Twilio (secure)
- **Cost**: Twilio charges per SMS sent (~$0.0075 per SMS in India)
- **International**: Supports all countries via country code dropdown
- **Validation**: Real-time phone validation for selected country
- **Resend OTP**: 30-second cooldown between resends

## 🐛 Troubleshooting

**Modal doesn't open?**
- Check that PhoneAuthModal import path is correct
- Verify `showPhoneModal` state is properly set

**OTP not received?**
- Verify Twilio credentials in Supabase
- Check Twilio phone number is active
- Verify phone number format (E.164: +911234567890)

**Database errors?**
- Ensure migration SQL has been run
- Check RLS policies allow phone field updates

**Type errors?**
- Run `npm install` to ensure all types are available
- Restart TypeScript server in your IDE

---

**Need help?** Check the Supabase Phone Auth docs or Twilio documentation.
