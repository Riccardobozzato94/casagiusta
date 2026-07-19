// Jest setup for CasaGiusta mobile app tests
// Note: do NOT import @testing-library/jest-native/extend-expect here
// because it needs expect to be defined (not available in setupFiles).
// Import it in individual test files instead.

// Silence specific warnings during tests
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  if (typeof args[0] === 'string' && (
    args[0].includes('React does not recognize') ||
    args[0].includes('Invalid prop') ||
    args[0].includes('Warning:')
  )) return;
  originalConsoleError.call(console, ...args);
};
