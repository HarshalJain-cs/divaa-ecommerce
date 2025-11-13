/**
 * @component StyledAuthForm
 * @description Modern authentication form with styled-components
 */
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Phone } from 'lucide-react';
import PhoneAuthModal from './PhoneAuthModal';
import { PhoneAuthSuccessData } from '@/types/auth';

interface StyledAuthFormProps {
  mode: 'login' | 'signup';
}

const StyledAuthForm = ({ mode }: StyledAuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    if (mode === 'signup' && !fullName) {
      toast.error('Please enter your full name');
      return;
    }

    if (!password) {
      toast.error('Please enter your password');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await signIn({ email, password });

        if (error) {
          toast.error(error.message || 'Failed to sign in');
        } else {
          toast.success('Welcome back!');
          navigate('/');
        }
      } else {
        const { error } = await signUp({ email, password, full_name: fullName });

        if (error) {
          toast.error(error.message || 'Failed to sign up');
        } else {
          toast.success('Account created successfully! Please check your email to verify.');
          navigate('/');
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.info('Google OAuth coming soon!');
  };

  const handlePhoneSuccess = async (data: PhoneAuthSuccessData) => {
    if (mode === 'signup' && data.needsProfile) {
      toast.success('Phone verified! Please complete your profile.');
      setShowPhoneModal(false);
      // Pre-fill phone data if available
      // The user will then fill name, email, password in the form
    } else {
      toast.success('Welcome back!');
      navigate('/');
    }
  };

  const handlePhoneError = (error: string) => {
    toast.error(error);
  };

  return (
    <StyledWrapper>
      <form onSubmit={handleEmailSubmit} className="form">
        <p>
          {mode === 'login' ? 'Welcome back' : 'Create account'}
          <span>{mode === 'login' ? 'Sign in to continue' : 'Sign up to get started'}</span>
        </p>

        <button type="button" className="oauthButton" onClick={handleGoogleLogin}>
          <svg className="icon" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Continue with Google
        </button>

        <button type="button" className="oauthButton" onClick={() => setShowPhoneModal(true)}>
          <Phone className="icon" />
          Continue with Phone
        </button>

        <div className="separator">
          <div />
          <span>OR</span>
          <div />
        </div>

        {mode === 'signup' && (
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isLoading}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />

        {mode === 'signup' && (
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        )}

        {mode === 'login' && (
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        )}

        <button type="submit" className="oauthButton" disabled={isLoading}>
          {isLoading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          {!isLoading && (
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 17 5-5-5-5" />
              <path d="m13 17 5-5-5-5" />
            </svg>
          )}
        </button>
      </form>

      <PhoneAuthModal
        isOpen={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
        mode={mode}
        onSuccess={handlePhoneSuccess}
        onError={handlePhoneError}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* DEOXY Was Here */
  .form {
    --background: #d3d3d3;
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --main-color: #323232;
    padding: 20px;
    background: var(--background);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    max-width: 350px;
    width: 100%;
  }

  .form > p {
    font-family: system-ui, -apple-system, sans-serif;
    color: var(--font-color);
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
  }

  .form > p > span {
    font-family: system-ui, -apple-system, sans-serif;
    color: var(--font-color-sub);
    font-weight: 600;
    font-size: 17px;
  }

  .separator {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .separator > div {
    flex: 1;
    height: 3px;
    border-radius: 5px;
    background-color: var(--font-color-sub);
  }

  .separator > span {
    color: var(--font-color);
    font-family: system-ui, -apple-system, sans-serif;
    font-weight: 600;
  }

  .oauthButton {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding: auto 15px 15px auto;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 16px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
    transition: all 250ms;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }

  .oauthButton:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .oauthButton::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    background-color: #212121;
    z-index: -1;
    box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    transition: all 250ms;
  }

  .oauthButton:hover:not(:disabled) {
    color: #e8e8e8;
  }

  .oauthButton:hover:not(:disabled)::before {
    width: 100%;
  }

  .form > input {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  }

  .form > input:focus {
    border-color: var(--input-focus);
  }

  .form > input:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export default StyledAuthForm;
