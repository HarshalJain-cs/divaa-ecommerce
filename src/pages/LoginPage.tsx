/**
 * @page LoginPage
 * @description Login page with styled auth form
 */
import { Link } from 'react-router-dom';
import StyledAuthForm from '@/components/auth/StyledAuthForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark to-gray-800 flex items-center justify-center py-12 px-4">
      <div className="w-full flex flex-col items-center">
        <Link to="/" className="flex justify-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-white">
            DIVA Jewel Cart
          </h1>
        </Link>

        <StyledAuthForm mode="login" />

        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand-gold hover:underline font-semibold">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-gray-400 hover:text-white text-sm">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
