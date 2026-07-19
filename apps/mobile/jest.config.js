/** @type {import('jest').Config} */
module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|react-native-mmkv|@tanstack/.*|zustand|@supabase/.*|expo-router|expo-linking|expo-constants|expo-status-bar|expo-crypto|expo-secure-store|expo-document-picker|expo-image-picker|react-native-safe-area-context|react-native-screens|react-native-gesture-handler|react-native-reanimated)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@/lib/storage$': '<rootDir>/__tests__/__mocks__/storage.ts',
    '^react-native-mmkv$': '<rootDir>/__tests__/__mocks__/storage.ts',
  },
  setupFiles: ['<rootDir>/__tests__/jest-setup.ts', '<rootDir>/__tests__/__mocks__/expo-modules.ts'],
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
};
