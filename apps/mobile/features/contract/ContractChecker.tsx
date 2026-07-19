import React from 'react';
import { View, Text } from 'react-native';
import type { Contract } from '@casagiusta/shared/src/types/database';

interface CheckResult {
  label: string;
  status: 'ok' | 'warning' | 'error';
  description: string;
  normativa?: string;
}

interface ContractCheckerProps {
  contract: Contract;
}

export function ContractChecker({ contract }: ContractCheckerProps) {
  const checks: CheckResult[] = [
    {
      label: 'Registrazione contratto',
      status: contract.registered ? 'ok' : 'warning',
      description: contract.registered
        ? "Contratto registrato all'Agenzia delle Entrate"
        : 'Il contratto non risulta registrato. La registrazione è obbligatoria.',
      normativa: 'L. 431/1998, art. 3',
    },
    {
      label: 'Deposito cauzionale',
      status: (contract.deposit_amount ?? 0) <= contract.rent_amount * 3 ? 'ok' : 'error',
      description: `Deposito di \u20AC${contract.deposit_amount} per un canone di \u20AC${contract.rent_amount}. ${
        (contract.deposit_amount ?? 0) <= contract.rent_amount * 3
          ? 'Nei limiti di legge (max 3 mensilit\u00E0).'
          : 'Supera il limite massimo di 3 mensilit\u00E0!'
      }`,
      normativa: 'L. 431/1998, art. 5',
    },
    {
      label: 'Clausola aggiornamento ISTAT',
      status: 'ok',
      description: 'Limite 75% della variazione ISTAT applicabile solo dopo il primo anno.',
      normativa: 'L. 431/1998, art. 4',
    },
    {
      label: 'Durata contratto',
      status: 'ok',
      description: `Contratto ${contract.type} con scadenza il ${new Date(contract.end_date!).toLocaleDateString('it-IT')}`,
      normativa: 'L. 431/1998, art. 2',
    },
  ];

  return (
    <View className="space-y-3">
      <Text className="text-lg font-display font-bold text-text-primary dark:text-white mb-2">
        Il tuo contratto \u00E8 a norma? {'\u2705'}
      </Text>

      {checks.map((check, index) => (
        <View key={index} className="bg-surface-secondary dark:bg-surface-dark-secondary p-4 rounded-xl">
          <View className="flex-row items-center mb-1">
            <Text className="mr-2">
              {check.status === 'ok' ? '\u2705' : check.status === 'warning' ? '\u26A0\uFE0F' : '\u274C'}
            </Text>
            <Text className="font-semibold text-text-primary dark:text-white flex-1">
              {check.label}
            </Text>
            <View className={`px-2 py-0.5 rounded-full ${
              check.status === 'ok' ? 'bg-success/20' : check.status === 'warning' ? 'bg-warning/20' : 'bg-danger/20'
            }`}>
              <Text className={`text-xs font-medium ${
                check.status === 'ok' ? 'text-success' : check.status === 'warning' ? 'text-warning' : 'text-danger'
              }`}>
                {check.status === 'ok' ? 'OK' : check.status === 'warning' ? 'Attenzione' : 'Errore'}
              </Text>
            </View>
          </View>
          <Text className="text-sm text-text-secondary dark:text-text-dark-secondary ml-7">
            {check.description}
          </Text>
          {check.normativa && (
            <Text className="text-xs text-primary-600 dark:text-primary-400 ml-7 mt-1 font-mono">
              {check.normativa}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}
