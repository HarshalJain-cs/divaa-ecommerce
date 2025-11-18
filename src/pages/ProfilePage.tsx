/**
 * @page ProfilePage
 * @description User profile page (protected) with Gift Card Wallet
 */
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { User, Wallet } from 'lucide-react';
import Header from '@/components/ui/Header';
import EditButton from '@/components/ui/EditButton';
import LogoutButton from '@/components/ui/LogoutButton';
import Loader from '@/components/ui/Loader';
import GiftCardWallet from '@/components/giftcards/GiftCardWallet';

type Tab = 'profile' | 'wallet';

const ProfilePage: React.FC = () => {
  const { user, profile, signOut, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] via-white to-[#FAF9F6] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold text-gray-800">My Account</h1>
              <div className="flex gap-4">
                <EditButton onClick={() => alert('Edit profile coming soon!')} />
                <LogoutButton onClick={handleLogout} />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
                  activeTab === 'profile'
                    ? 'text-[#B76E79] border-b-2 border-[#B76E79]'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <User className="w-5 h-5" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab('wallet')}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
                  activeTab === 'wallet'
                    ? 'text-[#B76E79] border-b-2 border-[#B76E79]'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Wallet className="w-5 h-5" />
                Gift Card Wallet
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'profile' ? (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>
                <div className="space-y-6">
                  {/* Profile Info */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <p className="text-lg text-gray-900">
                      {profile?.full_name || 'Not set'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <p className="text-lg text-gray-900">{user?.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      profile?.role === 'admin'
                        ? 'bg-[#B76E79] text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {profile?.role || 'customer'}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Member Since
                    </label>
                    <p className="text-lg text-gray-900">
                      {profile?.created_at
                        ? new Date(profile.created_at).toLocaleDateString()
                        : 'Unknown'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <GiftCardWallet />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
