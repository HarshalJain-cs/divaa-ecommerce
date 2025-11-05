/**
 * @page ProfilePage
 * @description User profile page (protected)
 */
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/ui/Header';
import EditButton from '@/components/ui/EditButton';
import LogoutButton from '@/components/ui/LogoutButton';
import Loader from '@/components/ui/Loader';

const ProfilePage: React.FC = () => {
  const { user, profile, signOut, isLoading } = useAuth();
  const navigate = useNavigate();

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
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-brand-dark">My Profile</h1>
              <div className="flex gap-4">
                <EditButton onClick={() => alert('Edit profile coming soon!')} />
                <LogoutButton onClick={handleLogout} />
              </div>
            </div>

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
                    ? 'bg-brand-gold text-white'
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
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
