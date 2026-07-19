import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

interface ContractClause {
  label: string;
  compliant: boolean;
  detail: string;
}

const mockClauses: ContractClause[] = [
  { label: 'Aggiornamento ISTAT', compliant: true, detail: 'Clausola presente e conforme al 75%' },
  { label: 'Durata del contratto', compliant: true, detail: '4+4 anni come da legge' },
  { label: 'Deposito cauzionale', compliant: true, detail: 'Mensilità nel limite di 3' },
  { label: 'Spese condominiali', compliant: false, detail: 'Ripartizione non specificata' },
  { label: 'Recesso anticipato', compliant: true, detail: 'Preavviso 6 mesi conforme' },
  { label: 'Destinazione d\'uso', compliant: true, detail: 'Abitativa dichiarata' },
];

export default function ContractResultScreen() {
  const router = useRouter();
  const compliantCount = mockClauses.filter((c) => c.compliant).length;
  const isCompliant = compliantCount >= mockClauses.length * 0.6;

  return (
    <SafeAreaView className="flex-1 bg-surface-dark-primary">
      <StatusBar style="light" />
      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="pt-4 pb-6">
          <Text className="text-2xl font-display font-bold text-white mb-2">
            Risultati analisi
          </Text>
          <Text className="text-base font-body text-text-dark-secondary">
            Ecco cosa abbiamo trovato nel tuo contratto.
          </Text>
        </View>

        <View className="bg-surface-dark-secondary rounded-2xl p-5 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white font-semibold text-lg font-display">Riepilogo</Text>
            <View
              className={`px-3 py-1 rounded-full ${
                isCompliant ? 'bg-success/20' : 'bg-danger-500/20'
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  isCompliant ? 'text-success' : 'text-danger-500'
                }`}
              >
                {isCompliant ? '✅ A norma' : '⚠️ Da verificare'}
              </Text>
            </View>
          </View>

          <View className="space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-text-dark-tertiary text-sm">Tipo contratto</Text>
              <Text className="text-white text-sm font-semibold">Abitativo 4+4</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-text-dark-tertiary text-sm">Canone annuo</Text>
              <Text className="text-white text-sm font-semibold">€ 7.200</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-text-dark-tertiary text-sm">Deposito cauzionale</Text>
              <Text className="text-white text-sm font-semibold">€ 600 (2 mensilità)</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-text-dark-tertiary text-sm">Scadenza</Text>
              <Text className="text-white text-sm font-semibold">31/12/2028</Text>
            </View>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-white font-semibold text-lg font-display mb-4">
            Il tuo contratto è a norma?
          </Text>
          <View
            className={`px-4 py-3 rounded-xl flex-row items-center ${
              isCompliant ? 'bg-success/10' : 'bg-danger-500/10'
            }`}
          >
            <View
              className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                isCompliant ? 'bg-success/20' : 'bg-danger-500/20'
              }`}
            >
              <Text className="text-xl">{isCompliant ? '✅' : '⚠️'}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white font-semibold text-base">
                {isCompliant
                  ? 'Il contratto è generalmente a norma'
                  : 'Il contratto presenta alcune criticità'}
              </Text>
              <Text className="text-text-dark-tertiary text-sm mt-1">
                {isCompliant
                  ? `${compliantCount} di ${mockClauses.length} clausole sono conformi.`
                  : `${mockClauses.length - compliantCount} clausole da verificare.`}
              </Text>
            </View>
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-white font-semibold text-lg font-display mb-4">
            Clausole trovate
          </Text>
          <View className="space-y-2">
            {mockClauses.map((clause, index) => (
              <View
                key={index}
                className="bg-surface-dark-secondary rounded-xl p-4 flex-row items-center"
              >
                <Text className="text-xl mr-3">
                  {clause.compliant ? '✅' : '❌'}
                </Text>
                <View className="flex-1">
                  <Text className="text-white font-semibold text-sm">{clause.label}</Text>
                  <Text className="text-text-dark-tertiary text-xs mt-0.5">{clause.detail}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View className="space-y-3">
          <TouchableOpacity
            onPress={() => {}}
            className="py-4 px-6 rounded-xl items-center justify-center border border-border-dark"
            activeOpacity={0.8}
          >
            <Text className="text-text-dark-secondary font-semibold text-base">Modifica dati</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/onboarding/completed')}
            className="bg-primary-600 py-4 px-6 rounded-xl items-center justify-center"
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold text-base">Continua</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
