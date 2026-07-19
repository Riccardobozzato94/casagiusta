import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { EmptyState } from '@/components/ui/EmptyState';

describe('EmptyState', () => {
  it('renders title and description', async () => {
    const { getByText } = await render(<EmptyState icon="📄" title="Vuoto" description="Nessun elemento" />);
    expect(getByText('Vuoto')).toBeTruthy();
    expect(getByText('Nessun elemento')).toBeTruthy();
  });

  it('renders with icon', async () => {
    const { getByText } = await render(<EmptyState icon="🔒" title="Protetto" description="Nessun dato" />);
    expect(getByText('Protetto')).toBeTruthy();
  });

  it('renders with action button when actionLabel is provided', async () => {
    const onAction = jest.fn();
    const { getByText } = await render(
      <EmptyState
        icon="📄"
        title="Vuoto"
        description="Nessun elemento"
        actionLabel="Aggiungi"
        onAction={onAction}
      />
    );
    const button = getByText('Aggiungi');
    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('renders default variant', async () => {
    const { getByText } = await render(<EmptyState icon="📄" title="Test" description="Desc" variant="default" />);
    expect(getByText('Test')).toBeTruthy();
  });

  it('renders calm variant', async () => {
    const { getByText } = await render(<EmptyState icon="📄" title="Test" description="Desc" variant="calm" />);
    expect(getByText('Test')).toBeTruthy();
  });

  it('renders encouraging variant', async () => {
    const { getByText } = await render(<EmptyState icon="📄" title="Test" description="Desc" variant="encouraging" />);
    expect(getByText('Test')).toBeTruthy();
  });

  it('does not render action button when actionLabel is missing', async () => {
    const { getByText, queryByText } = await render(<EmptyState icon="📄" title="Test" description="Desc" />);
    expect(getByText('Test')).toBeTruthy();
    expect(queryByText('Aggiungi')).toBeNull();
  });
});
