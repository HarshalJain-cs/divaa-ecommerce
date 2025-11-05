/**
 * @component ProtectedRoute
 * @description Route wrapper that requires authentication
 *
 * @props
 * - children {ReactNode} - Component to render if authenticated
 * - requireAdmin {boolean} - Whether route requires admin role
 *
 * @example
 * ```tsx
 * <ProtectedRoute>
 *   <ProfilePage />
 * </ProtectedRoute>
 *
 * <ProtectedRoute requireAdmin>
 *   <AdminDashboard />
 * </ProtectedRoute>
 * ```
 */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Loader from '@/components/ui/Loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
}) => {
  const { user, isAdmin, isLoading } = useAuth();

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to home if admin access required but user is not admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Render children if authenticated (and admin if required)
  return <>{children}</>;
};

export default ProtectedRoute;
