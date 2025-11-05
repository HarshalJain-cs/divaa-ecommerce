/**
 * @page LoginPage
 * @description Login page
 */
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark to-gray-800 flex items-center justify-center py-12 px-4">
      <div className="w-full">
        <Link to="/" className="flex justify-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-white">
            DIVA Jewel Cart
          </h1>
        </Link>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
