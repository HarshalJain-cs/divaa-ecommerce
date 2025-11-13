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
    refetchProfile: () => state.user ? fetchProfile(state.user.id) : undefined,
    sendPhoneOTP,           // Add this
    verifyPhoneOTP,         // Add this
    signInWithPhone,        // Add this
    signUpWithPhone,        // Add this
    checkPhoneExists,       // Add this
  };
}