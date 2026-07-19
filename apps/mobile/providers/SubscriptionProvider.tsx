import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { LIMITS, STORAGE_KEYS } from '@/lib/constants';
import { storage } from '@/lib/storage';
import type { SubscriptionPlan } from '@casagiusta/shared/src/types/database';

interface SubscriptionState {
  plan: SubscriptionPlan;
  aiQueriesToday: number;
  isChecking: boolean;

  loadSubscription: () => Promise<void>;
  getLimits: () => typeof LIMITS.FREE | typeof LIMITS.PRO;
  canMakeAiQuery: () => boolean;
  incrementAiQuery: () => void;
  resetAiQueries: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  plan: 'free',
  aiQueriesToday: 0,
  isChecking: true,

  loadSubscription: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        set({ plan: 'free', isChecking: false });
        return;
      }

      const { data } = await supabase
        .from('subscriptions')
        .select('plan')
        .eq('user_id', user.id)
        .single();

      set({
        plan: (data?.plan as SubscriptionPlan) ?? 'free',
        isChecking: false,
      });

      const today = new Date().toISOString().split('T')[0];
      const stored = storage.getString(`${STORAGE_KEYS.AI_QUERY_COUNT}_${today}`);
      if (stored) {
        set({ aiQueriesToday: parseInt(stored, 10) });
      }
    } catch {
      set({ isChecking: false });
    }
  },

  getLimits: () => {
    const { plan } = get();
    return plan === 'free' ? LIMITS.FREE : LIMITS.PRO;
  },

  canMakeAiQuery: () => {
    const { plan, aiQueriesToday } = get();
    const limit = plan === 'free' ? LIMITS.FREE.AI_QUERIES_PER_DAY : LIMITS.PRO.AI_QUERIES_PER_DAY;
    return aiQueriesToday < limit;
  },

  incrementAiQuery: () => {
    const { aiQueriesToday } = get();
    const newCount = aiQueriesToday + 1;
    set({ aiQueriesToday: newCount });

    const today = new Date().toISOString().split('T')[0];
    storage.set(`${STORAGE_KEYS.AI_QUERY_COUNT}_${today}`, newCount.toString());
  },

  resetAiQueries: () => {
    set({ aiQueriesToday: 0 });
  },
}));
