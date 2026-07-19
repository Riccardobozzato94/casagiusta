import '@testing-library/jest-native/extend-expect';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Text, TouchableOpacity } from 'react-native';
import { ThemeProvider, useTheme } from '@/providers/ThemeProvider';

// Test component that consumes the theme context
function TestConsumer() {
  const { isDark, themeMode, setThemeMode, isLowStimulus, toggleLowStimulus } = useTheme();
  return (
    <>
      <Text testID="isDark">{String(isDark)}</Text>
      <Text testID="themeMode">{themeMode}</Text>
      <Text testID="isLowStimulus">{String(isLowStimulus)}</Text>
      <TouchableOpacity
        testID="setLight"
        onPress={() => setThemeMode('light')}
      >
        <Text>Light</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="setDark"
        onPress={() => setThemeMode('dark')}
      >
        <Text>Dark</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="setSystem"
        onPress={() => setThemeMode('system')}
      >
        <Text>System</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="toggleLowStimulus"
        onPress={toggleLowStimulus}
      >
        <Text>Toggle Low Stimulus</Text>
      </TouchableOpacity>
    </>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides default theme mode as system', async () => {
    const { getByTestId } = await render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    expect(getByTestId('themeMode')).toHaveTextContent('system');
  });

  it('provides isLowStimulus default as false', async () => {
    const { getByTestId } = await render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    expect(getByTestId('isLowStimulus')).toHaveTextContent('false');
  });

  it('updates theme mode to light when setThemeMode is called', async () => {
    const { getByTestId } = await render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    fireEvent.press(getByTestId('setLight'));
    await waitFor(() => {
      expect(getByTestId('themeMode')).toHaveTextContent('light');
    });
  });

  it('updates theme mode to dark when setThemeMode is called', async () => {
    const { getByTestId } = await render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    fireEvent.press(getByTestId('setDark'));
    await waitFor(() => {
      expect(getByTestId('themeMode')).toHaveTextContent('dark');
    });
  });

  it('updates isLowStimulus when toggleLowStimulus is called', async () => {
    const { getByTestId } = await render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    fireEvent.press(getByTestId('toggleLowStimulus'));
    await waitFor(() => {
      expect(getByTestId('isLowStimulus')).toHaveTextContent('true');
    });
  });

  it('toggles low stimulus back to false on second call', async () => {
    const { getByTestId } = await render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    fireEvent.press(getByTestId('toggleLowStimulus'));
    await waitFor(() => {
      expect(getByTestId('isLowStimulus')).toHaveTextContent('true');
    });
    fireEvent.press(getByTestId('toggleLowStimulus'));
    await waitFor(() => {
      expect(getByTestId('isLowStimulus')).toHaveTextContent('false');
    });
  });

  it('isDark reflects dark mode correctly', async () => {
    const { getByTestId } = await render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    fireEvent.press(getByTestId('setDark'));
    await waitFor(() => {
      expect(getByTestId('isDark')).toHaveTextContent('true');
    });
  });

  it('isDark is false in light mode', async () => {
    const { getByTestId } = await render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    fireEvent.press(getByTestId('setLight'));
    await waitFor(() => {
      expect(getByTestId('isDark')).toHaveTextContent('false');
    });
  });
});
