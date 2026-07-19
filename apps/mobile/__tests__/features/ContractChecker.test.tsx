import React from 'react';
import { render } from '@testing-library/react-native';
import { ContractChecker } from '@/features/contract/ContractChecker';

describe('ContractChecker', () => {
  const mockContract = {
    id: '1',
    type: 'Abitativo 4+4',
    rent_amount: 7200,
    deposit_amount: 600,
    start_date: '2024-01-01',
    end_date: '2028-12-31',
    registered: true,
  };

  it('renders contract type', async () => {
    const { getByText } = await render(<ContractChecker contract={mockContract} />);
    expect(getByText(/Abitativo 4\+4/)).toBeTruthy();
  });

  it('renders all clause labels', async () => {
    const { getByText } = await render(<ContractChecker contract={mockContract} />);
    expect(getByText('Registrazione contratto')).toBeTruthy();
    expect(getByText('Deposito cauzionale')).toBeTruthy();
    expect(getByText('Durata contratto')).toBeTruthy();
  });

  it('shows compliant status for registered contract', async () => {
    const { getByText, getAllByText } = await render(<ContractChecker contract={mockContract} />);
    // The component renders 4 check labels for a full contract
    expect(getByText('Registrazione contratto')).toBeTruthy();
    expect(getAllByText('OK')).toHaveLength(4);
  });

  it('handles missing optional fields gracefully', async () => {
    const minimalContract = { id: '2', type: 'Abitativo 3+2' };
    const { getByText } = await render(<ContractChecker contract={minimalContract as any} />);
    expect(getByText(/Abitativo 3\+2/)).toBeTruthy();
  });

  it('renders deposit amount formatted', async () => {
    const { getByText } = await render(<ContractChecker contract={mockContract} />);
    expect(getByText(/600/)).toBeTruthy();
  });
});
