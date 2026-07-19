import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import * as Crypto from 'expo-crypto';
import { STORAGE_KEYS } from '@/lib/constants';
import { storage } from '@/lib/storage';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAnonymous: boolean;
  anonymousFingerprint: string | null;

  initialize: () => Promise<void>;
  signInWithMagicLink: (email: string) => Promise<void>;
  signInWithApple: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInAnonymously: () => Promise<string>;
  convertAnonymousToUser: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  setSession: (session: Session | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  isLoading: true,
  isAnonymous: false,
  anonymousFingerprint: null,

  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const anonymousFp = storage.getString(STORAGE_KEYS.ANONYMOUS_FINGERPRINT);

      set({
        session,
        user: session?.user ?? null,
        isAnonymous: session?.user?.is_anonymous ?? false,
        anonymousFingerprint: anonymousFp ?? null,
        isLoading: false,
      });

      supabase.auth.onAuthStateChange((_event, session) => {
        set({
          session,
          user: session?.user ?? null,
          isAnonymous: session?.user?.is_anonymous ?? false,
        });
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ isLoading: false });
    }
  },

  signInWithMagicLink: async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'casagiusta://auth/callback',
      },
    });
    if (error) throw error;
  },

  signInWithApple: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: 'casagiusta://auth/callback',
      },
    });
    if (error) throw error;
  },

  signInWithGoogle: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'casagiusta://auth/callback',
      },
    });
    if (error) throw error;
  },

  signInAnonymously: async () => {
    const fingerprint = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      `${Date.now()}-${Math.random()}`,
    );

    storage.set(STORAGE_KEYS.ANONYMOUS_FINGERPRINT, fingerprint);

    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) throw error;

    set({
      user: data.user,
      session: data.session,
      isAnonymous: true,
      anonymousFingerprint: fingerprint,
    });

    return fingerprint;
  },

  convertAnonymousToUser: async (email: string) => {
    const { error } = await supabase.auth.updateUser({ email });
    if (error) throw error;

    set({ isAnonymous: false });
  },

  signOut: async () => {
    await supabase.auth.signOut();
    storage.delete(STORAGE_KEYS.ANONYMOUS_FINGERPRINT);
    set({ user: null, session: null, isAnonymous: false });
  },

  setSession: (session) => {
    set({ session, user: session?.user ?? null });
  },
}));
