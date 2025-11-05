/**
 * @title useAuth Hook
 * @description Custom hook for authentication management
 *
 * @example
 * ```tsx
 * const { user, signUp, signIn, signOut, isLoading } = useAuth();
 * ```
 */
import { useState, useEffect } from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { Profile } from '@/types/database.types';

interface AuthState {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  error: AuthError | null;
}

interface SignUpData {
  email: string;
  password: string;
  full_name?: string;
}

interface SignInData {
  email: string;
  password: string;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    isLoading: true,
    error: null,
  });

  // Initialize auth state
  useEffect(() => {
    // Set a timeout to ensure loading doesn't hang indefinitely
    const loadingTimeout = setTimeout(() => {
      setState(prev => ({
        ...prev,
        isLoading: false,
      }));
    }, 5000); // 5 second timeout

    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      clearTimeout(loadingTimeout);
      setState(prev => ({
        ...prev,
        user: session?.user ?? null,
        isLoading: false,
      }));

      // Fetch profile if user exists
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    }).catch((error) => {
      console.error('Error getting session:', error);
      clearTimeout(loadingTimeout);
      setState(prev => ({
        ...prev,
        isLoading: false,
      }));
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setState(prev => ({
        ...prev,
        user: session?.user ?? null,
        isLoading: false,
      }));

      // Fetch profile if user exists
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setState(prev => ({ ...prev, profile: null }));
      }
    });

    return () => {
      clearTimeout(loadingTimeout);
      subscription.unsubscribe();
    };
  }, []);

  /**
   * Fetch user profile from database
   */
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      setState(prev => ({ ...prev, profile: data }));
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  /**
   * Sign up new user
   */
  const signUp = async ({ email, password, full_name }: SignUpData) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: full_name || '',
          },
        },
      });

      if (error) throw error;

      setState(prev => ({
        ...prev,
        user: data.user,
        isLoading: false,
      }));

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
   * Sign in existing user
   */
  const signIn = async ({ email, password }: SignInData) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setState(prev => ({
        ...prev,
        user: data.user,
        isLoading: false,
      }));

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
   * Sign out current user
   */
  const signOut = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      setState({
        user: null,
        profile: null,
        isLoading: false,
        error: null,
      });

      return { error: null };
    } catch (error) {
      const authError = error as AuthError;
      setState(prev => ({
        ...prev,
        error: authError,
        isLoading: false,
      }));
      return { error: authError };
    }
  };

  /**
   * Update user profile
   */
  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!state.user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', state.user.id)
        .select()
        .single();

      if (error) throw error;

      setState(prev => ({ ...prev, profile: data }));

      return { data, error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { data: null, error: error as Error };
    }
  };

  /**
   * Check if user is admin
   */
  const isAdmin = state.profile?.role === 'admin';

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
    refetchProfile: () => state.user && fetchProfile(state.user.id),
  };
}
