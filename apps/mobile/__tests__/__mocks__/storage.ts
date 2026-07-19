// Mock for react-native-mmkv
// Provides a simple in-memory storage for tests

class MemoryStorage {
  private store = new Map<string, string>();

  getString(key: string): string | undefined {
    return this.store.get(key);
  }

  set(key: string, value: string): void {
    this.store.set(key, value);
  }

  getBoolean(key: string): boolean | undefined {
    const val = this.store.get(key);
    if (val === 'true') return true;
    if (val === 'false') return false;
    return undefined;
  }

  delete(key: string): void {
    this.store.delete(key);
  }

  clearAll(): void {
    this.store.clear();
  }

  getAllKeys(): string[] {
    return Array.from(this.store.keys());
  }

  contains(key: string): boolean {
    return this.store.has(key);
  }
}

// Export MMKV as a constructor matching react-native-mmkv's API
export const MMKV = jest.fn().mockImplementation(() => new MemoryStorage());
export const useMMKV = jest.fn().mockImplementation(() => new MemoryStorage());

// Re-export singleton for direct use in tests
export const storage = new MemoryStorage();
