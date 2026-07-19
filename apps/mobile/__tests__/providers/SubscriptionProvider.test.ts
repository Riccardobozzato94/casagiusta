import { useSubscriptionStore } from '@/providers/SubscriptionProvider';
import { LIMITS } from '@/lib/constants';

describe('SubscriptionProvider', () => {
  beforeEach(() => {
    // Reset the store before each test
    useSubscriptionStore.setState({
      plan: 'free',
      aiQueriesToday: 0,
      isChecking: false,
    });
  });

  it('starts with free plan by default', () => {
    const state = useSubscriptionStore.getState();
    expect(state.plan).toBe('free');
  });

  it('starts with zero AI queries', () => {
    const state = useSubscriptionStore.getState();
    expect(state.aiQueriesToday).toBe(0);
  });

  describe('canMakeAiQuery', () => {
    it('returns true for free plan under daily limit', () => {
      useSubscriptionStore.setState({ plan: 'free', aiQueriesToday: 2 });
      const state = useSubscriptionStore.getState();
      expect(state.canMakeAiQuery()).toBe(true);
    });

    it('returns false for free plan at daily limit', () => {
      useSubscriptionStore.setState({
        plan: 'free',
        aiQueriesToday: LIMITS.FREE.AI_QUERIES_PER_DAY,
      });
      const state = useSubscriptionStore.getState();
      expect(state.canMakeAiQuery()).toBe(false);
    });

    it('returns true for pro plan regardless of count', () => {
      useSubscriptionStore.setState({
        plan: 'pro',
        aiQueriesToday: 500,
      });
      const state = useSubscriptionStore.getState();
      expect(state.canMakeAiQuery()).toBe(true);
    });

    it('returns true when under limit for free plan', () => {
      useSubscriptionStore.setState({
        plan: 'free',
        aiQueriesToday: 0,
      });
      const state = useSubscriptionStore.getState();
      expect(state.canMakeAiQuery()).toBe(true);
    });
  });

  describe('incrementAiQuery', () => {
    it('increments query count by 1', () => {
      useSubscriptionStore.setState({ aiQueriesToday: 3 });
      useSubscriptionStore.getState().incrementAiQuery();
      const state = useSubscriptionStore.getState();
      expect(state.aiQueriesToday).toBe(4);
    });

    it('increments from zero', () => {
      useSubscriptionStore.setState({ aiQueriesToday: 0 });
      useSubscriptionStore.getState().incrementAiQuery();
      const state = useSubscriptionStore.getState();
      expect(state.aiQueriesToday).toBe(1);
    });
  });

  describe('getLimits', () => {
    it('returns free limits for free plan', () => {
      useSubscriptionStore.setState({ plan: 'free' });
      const state = useSubscriptionStore.getState();
      const limits = state.getLimits();
      expect(limits.AI_QUERIES_PER_DAY).toBe(LIMITS.FREE.AI_QUERIES_PER_DAY);
      expect(limits.STORAGE_MB).toBe(LIMITS.FREE.STORAGE_MB);
    });

    it('returns pro limits for pro plan', () => {
      useSubscriptionStore.setState({ plan: 'pro' });
      const state = useSubscriptionStore.getState();
      const limits = state.getLimits();
      expect(limits.AI_QUERIES_PER_DAY).toBe(LIMITS.PRO.AI_QUERIES_PER_DAY);
      expect(limits.STORAGE_MB).toBe(LIMITS.PRO.STORAGE_MB);
    });
  });
});
