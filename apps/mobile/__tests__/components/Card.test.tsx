import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Card } from '@/components/ui/Card';

describe('Card', () => {
  it('renders children', async () => {
    const { getByText } = await render(
      <Card>
        <Text>Contenuto</Text>
      </Card>
    );
    expect(getByText('Contenuto')).toBeTruthy();
  });

  it('renders with default variant', async () => {
    const { getByText } = await render(
      <Card>
        <Text>Test</Text>
      </Card>
    );
    expect(getByText('Test')).toBeTruthy();
  });

  it('renders with elevated variant', async () => {
    const { getByText } = await render(
      <Card variant="elevated">
        <Text>Elevato</Text>
      </Card>
    );
    expect(getByText('Elevato')).toBeTruthy();
  });

  it('renders with outlined variant', async () => {
    const { getByText } = await render(
      <Card variant="outlined">
        <Text>Bordato</Text>
      </Card>
    );
    expect(getByText('Bordato')).toBeTruthy();
  });

  it('renders with alert variant', async () => {
    const { getByText } = await render(
      <Card variant="alert">
        <Text>Allerta</Text>
      </Card>
    );
    expect(getByText('Allerta')).toBeTruthy();
  });

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    const { getByText } = await render(
      <Card onPress={onPress}>
        <Text>Premibile</Text>
      </Card>
    );
    fireEvent.press(getByText('Premibile'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not crash without onPress', async () => {
    const { getByText } = await render(
      <Card>
        <Text>Solo testo</Text>
      </Card>
    );
    expect(getByText('Solo testo')).toBeTruthy();
  });
});
