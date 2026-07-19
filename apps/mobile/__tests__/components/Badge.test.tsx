import React from 'react';
import { render } from '@testing-library/react-native';
import { Badge } from '@/components/ui/Badge';

describe('Badge', () => {
  it('renders with default props', async () => {
    const { getByText } = await render(<Badge label="Test" />);
    expect(getByText('Test')).toBeTruthy();
  });

  it('renders with success variant', async () => {
    const { getByText } = await render(<Badge label="Completato" variant="success" />);
    expect(getByText('Completato')).toBeTruthy();
  });

  it('renders with warning variant', async () => {
    const { getByText } = await render(<Badge label="Attenzione" variant="warning" />);
    expect(getByText('Attenzione')).toBeTruthy();
  });

  it('renders with danger variant', async () => {
    const { getByText } = await render(<Badge label="Critico" variant="danger" />);
    expect(getByText('Critico')).toBeTruthy();
  });

  it('renders with info variant', async () => {
    const { getByText } = await render(<Badge label="Info" variant="info" />);
    expect(getByText('Info')).toBeTruthy();
  });

  it('renders with neutral variant', async () => {
    const { getByText } = await render(<Badge label="Bozza" variant="neutral" />);
    expect(getByText('Bozza')).toBeTruthy();
  });

  it('renders in sm size', async () => {
    const { getByText } = await render(<Badge label="Small" size="sm" />);
    expect(getByText('Small')).toBeTruthy();
  });

  it('renders in md size', async () => {
    const { getByText } = await render(<Badge label="Medium" size="md" />);
    expect(getByText('Medium')).toBeTruthy();
  });
});
