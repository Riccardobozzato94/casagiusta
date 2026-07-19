// Global mocks for expo native modules that don't work in Jest

const mockNativeModule = {
  installModules: () => {},
};

jest.mock('expo-modules-core', () => ({
  NativeModule: {
    installModules: () => {},
  },
  ProxyNativeModule: class {},
  EventEmitter: class {
    addListener() {}
    removeListeners() {}
  },
}));

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
  SECURE_STORE_KEY: 'test',
}));

jest.mock('expo-crypto', () => ({
  digestStringAsync: jest.fn().mockResolvedValue('mock-hash'),
  CryptoDigestAlgorithm: { SHA256: 'SHA-256' },
  randomUUID: jest.fn().mockReturnValue('00000000-0000-0000-0000-000000000000'),
}));

jest.mock('expo-constants', () => ({
  default: {
    expoConfig: { extra: {} },
    manifest: {},
    nativeAppVersion: '1.0.0',
  },
  manifest: {},
  nativeAppVersion: '1.0.0',
}));

jest.mock('expo-linking', () => ({
  createURL: jest.fn().mockReturnValue('https://casagiusta.app/'),
  makeRedirectUri: jest.fn().mockReturnValue('https://casagiusta.app/auth/callback'),
  useURL: jest.fn(),
  useLinkProps: jest.fn(),
}));

jest.mock('expo-status-bar', () => ({
  StatusBar: () => null,
  useStatusBar: () => {},
}));

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn().mockReturnValue({
    auth: {
      signInWithOtp: jest.fn(),
      signInWithOAuth: jest.fn(),
      signInAnonymously: jest.fn(),
      signOut: jest.fn(),
      onAuthStateChange: jest.fn().mockReturnValue({ data: { subscription: { unsubscribe: jest.fn() } } }),
      getSession: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
    },
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: null }),
    }),
    storage: {
      from: jest.fn().mockReturnValue({
        upload: jest.fn(),
        getPublicUrl: jest.fn().mockReturnValue({ data: { publicUrl: '' } }),
      }),
    },
    channel: jest.fn().mockReturnValue({
      on: jest.fn().mockReturnThis(),
      subscribe: jest.fn(),
    }),
  }),
}));
