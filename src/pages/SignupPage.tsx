/**
 * @page SignupPage
 * @description Signup page
 */
import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '@/components/auth/SignupForm';

const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark to-gray-800 flex items-center justify-center py-12 px-4">
      <div className="w-full">
        <Link to="/" className="flex justify-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-white">
            DIVA Jewel Cart
          </h1>
        </Link>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
