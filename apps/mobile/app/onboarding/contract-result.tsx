import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Alert,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import { StatusBar } from 'expo-status-bar';

interface ContractClause {
  id: string;
  label: string;
  compliant: boolean;
  detail: string;
  severity: 'critical' | 'warning' | 'info';
  legalRef?: string;
  recommendation?: string;
}

interface ContractSummary {
  tipo: string;
  canone: number;
  deposito: number;
  mensilitaDeposito: number;
  scadenza: string;
  durata: string;
}

const MOCK_SUMMARY: ContractSummary = {
  tipo: 'Abitativo 4+4',
  canone: 7200,
  deposito: 600,
  mensilitaDeposito: 2,
  scadenza: '31/12/2028',
  durata: '4 anni',
};

const MOCK_CLAUSES: ContractClause[] = [
  {
    id: 'c1',
    label: 'Aggiornamento ISTAT',
    compliant: true,
    detail: 'Clausola presente e conforme al limite del 75% (L. 431/1998)',
    severity: 'info',
    legalRef: 'L. 431/1998, Art. 1',
    recommendation: 'Nessuna azione necessaria. La clausola è conforme.',
  },
  {
    id: 'c2',
    label: 'Durata del contratto',
    compliant: true,
    detail: '4+4 anni come da legge per contratti abitativi',
    severity: 'info',
    legalRef: 'L. 431/1998, Art. 2',
    recommendation: 'Nessuna azione necessaria.',
  },
  {
    id: 'c3',
    label: 'Deposito cauzionale',
    compliant: true,
    detail: 'Mensilità nel limite di 3 previsto dalla legge',
    severity: 'info',
    legalRef: 'Codice Civile, Art. 1599',
    recommendation: 'Nessuna azione necessaria.',
  },
  {
    id: 'c4',
    label: 'Spese condominiali',
    compliant: false,
    detail: 'Ripartizione delle spese non specificata nel contratto',
    severity: 'warning',
    legalRef: 'Codice Civile, Art. 1609',
    recommendation: 'Richiedi integrazione contrattuale che specifichi la ripartizione delle spese condominiali ordinarie e straordinarie.',
  },
  {
    id: 'c5',
    label: 'Recesso anticipato',
    compliant: true,
    detail: 'Preavviso 6 mesi conforme alla normativa',
    severity: 'info',
    legalRef: 'L. 431/1998, Art. 4',
    recommendation: 'Nessuna azione necessaria.',
  },
  {
    id: 'c6',
    label: 'Destinazione d\'uso',
    compliant: true,
    detail: 'Abitativa dichiarata e conforme',
    severity: 'info',
    recommendation: 'Nessuna azione necessaria.',
  },
  {
    id: 'c7',
    label: 'Clausola di salvaguardia',
    compliant: false,
    detail: 'Assente. In caso di modifiche unilaterali non c\'è tutela esplicita.',
    severity: 'critical',
    legalRef: 'Codice Civile, Art. 1467',
    recommendation: 'Richiedi l\'inserimento di una clausola di salvaguardia che protegga da modifiche unilaterali del contratto.',
  },
  {
    id: 'c8',
    label: 'Registrazione contratto',
    compliant: true,
    detail: 'Contratto registrato all\'Agenzia delle Entrate',
    severity: 'info',
    recommendation: 'Nessuna azione necessaria.',
  },
];

function ScoreRing({ percentuale }: { percentuale: number }) {
  const animValue = useRef(new Animated.Value(0)).current;
  const { isDark } = useTheme();

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: percentuale / 100,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, []);

  const dimensione = 160;
  const spessore = 12;
  const raggio = (dimensione - spessore) / 2;
  const circonferenza = 2 * Math.PI * raggio;

  const strokeDashoffset = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circonferenza, 0],
  });

  const getColor = () => {
    if (percentuale >= 80) return '#10b981';
    if (percentuale >= 60) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <View className="items-center justify-center" style={{ width: dimensione, height: dimensione }}>
      {/* Background circle */}
      <View
        style={{
          width: dimensione,
          height: dimensione,
          borderRadius: dimensione / 2,
          borderWidth: spessore,
          borderColor: isDark ? '#334155' : '#e2e8f0',
          position: 'absolute',
        }}
      />
      {/* Animated SVG-like circle using Animated.View with rotation trick */}
      <Animated.View
        style={{
          width: dimensione,
          height: dimensione,
          borderRadius: dimensione / 2,
          borderWidth: spessore,
          borderColor: 'transparent',
          borderTopColor: getColor(),
          borderRightColor: getColor(),
          position: 'absolute',
          transform: [{
            rotate: animValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['-90deg', '270deg'],
            }),
          }],
        }}
      />
      {/* Score text */}
      <View className="items-center">
        <Animated.Text
          className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}
        >
          {Math.round(percentuale)}%
        </Animated.Text>
        <Text className="text-xs text-teal-500 font-medium mt-1">Punteggio</Text>
      </View>
    </View>
  );
}

function ClauseCard({ clause, isDark }: { clause: ContractClause; isDark: boolean }) {
  const [expanded, setExpanded] = useState(false);

  const severityColors: Record<string, { bg: string; text: string; icon: string }> = {
    critical: { bg: isDark ? 'bg-red-900/30' : 'bg-red-50', text: 'text-red-600', icon: '\u{26A0}\uFE0F' },
    warning: { bg: isDark ? 'bg-amber-900/30' : 'bg-amber-50', text: 'text-amber-600', icon: '\u{26A0}\uFE0F' },
    info: { bg: isDark ? 'bg-teal-900/30' : 'bg-teal-50', text: 'text-teal-600', icon: '\u{2139}\uFE0F' },
  };

  const colors = severityColors[clause.severity] ?? severityColors.info;

  return (
    <TouchableOpacity
      onPress={() => setExpanded(!expanded)}
      className={`rounded-2xl overflow-hidden border ${isDark ? 'border-slate-700' : 'border-slate-200'} mb-2`}
      activeOpacity={0.7}
      accessibilityLabel={`Clausola ${clause.label}. ${clause.compliant ? 'Conforme' : 'Non conforme'}`}
      accessibilityRole="button"
    >
      {/* Header */}
      <View
        className={`flex-row items-center p-4 ${isDark ? 'bg-slate-800' : 'bg-white'}`}
      >
        <View className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${clause.compliant ? 'bg-green-100' : 'bg-red-100'}`}>
          <Text className="text-sm">{clause.compliant ? '\u{2705}' : '\u{274C}'}</Text>
        </View>
        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <Text className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>
              {clause.label}
            </Text>
            <View className={`px-2 py-0.5 rounded-full ${colors.bg}`}>
              <Text className={`text-xs ${colors.text}`}>{colors.icon} {clause.severity === 'critical' ? 'Critico' : clause.severity === 'warning' ? 'Attenzione' : 'Info'}</Text>
            </View>
          </View>
          <Text className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {clause.detail}
          </Text>
        </View>
        <Text className={`text-base ml-2 ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
          {expanded ? '\u{25BC}' : '\u{25B6}'}
        </Text>
      </View>

      {/* Expanded content */}
      {expanded && (
        <View className={`px-4 pb-4 pt-1 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
          {clause.legalRef && (
            <View className={`p-3 rounded-xl mb-2 ${isDark ? 'bg-slate-700' : 'bg-slate-50'}`}>
              <Text className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Riferimento normativo
              </Text>
              <Text className={`text-sm mt-0.5 ${isDark ? 'text-teal-300' : 'text-teal-600'}`}>
                {clause.legalRef}
              </Text>
            </View>
          )}
          {clause.recommendation && (
            <View className={`p-3 rounded-xl ${isDark ? 'bg-slate-700' : 'bg-slate-50'}`}>
              <Text className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Raccomandazione
              </Text>
              <Text className={`text-sm mt-0.5 leading-5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {clause.recommendation}
              </Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function ContractResultScreen() {
  const { isDark } = useTheme();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const totalClausole = MOCK_CLAUSES.length;
  const compliantCount = MOCK_CLAUSES.filter((c) => c.compliant).length;
  const percentuale = Math.round((compliantCount / totalClausole) * 100);
  const isCompliant = percentuale >= 60;
  const critiche = MOCK_CLAUSES.filter((c) => !c.compliant);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `CasaGiusta - Analisi contratto: ${percentuale}% conforme. ${compliantCount}/${totalClausole} clausole a norma. ${critiche.length > 0 ? `\n\nDa verificare: ${critiche.map(c => c.label).join(', ')}` : ''}\n\nAnalisi generata da CasaGiusta.`,
      });
    } catch {}
  };

  const handleDownloadPdf = () => {
    Alert.alert('Scarica PDF', 'Il PDF del report sarà disponibile a breve nella sezione Profilo.');
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
          className="px-6 pt-4 pb-2"
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className={`w-10 h-10 rounded-full items-center justify-center mb-4 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}
            accessibilityLabel="Indietro"
            accessibilityRole="button"
          >
            <Text className={`text-lg ${isDark ? 'text-white' : 'text-slate-600'}`}>{'\u{2190}'}</Text>
          </TouchableOpacity>

          <Text className={`text-2xl font-bold mb-2 font-display ${isDark ? 'text-white' : 'text-slate-800'}`}>
            Risultati analisi
          </Text>
          <Text className={`text-base leading-6 font-body ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Abbiamo analizzato il tuo contratto in profondità. Ecco cosa abbiamo trovato.
          </Text>
        </Animated.View>

        {/* Score ring */}
        <Animated.View
          style={{ opacity: fadeAnim }}
          className="items-center py-8"
        >
          <ScoreRing percentuale={percentuale} />
          <View className="flex-row items-center gap-2 mt-4">
            <View
              className={`px-3 py-1.5 rounded-full ${
                isCompliant
                  ? isDark ? 'bg-green-900/30' : 'bg-green-50'
                  : isDark ? 'bg-red-900/30' : 'bg-red-50'
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  isCompliant ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {isCompliant ? '\u{2705} Contratto a norma' : '\u{26A0}\uFE0F Da verificare'}
              </Text>
            </View>
          </View>
          <Text className={`text-sm mt-3 text-center px-10 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {isCompliant
              ? 'Buone notizie! Il tuo contratto è generalmente conforme. Verifica le raccomandazioni per migliorarlo ulteriormente.'
              : `Il contratto presenta ${critiche.length} clausole${critiche.length > 1 ? ' da verificare' : ' da verificare'}. Ti consigliamo di intervenire.`}
          </Text>
        </Animated.View>

        {/* Summary card */}
        <Animated.View
          style={{ opacity: fadeAnim }}
          className="mx-5 mb-6"
        >
          <Text className={`text-sm font-semibold mb-3 px-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            Riepilogo contratto
          </Text>
          <View
            className={`rounded-2xl p-5 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border shadow-sm`}
          >
            <View className="flex-row items-center justify-between mb-4">
              <Text className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                Dettagli
              </Text>
              <View className={`px-2.5 py-1 rounded-full ${isCompliant ? 'bg-green-100' : 'bg-amber-100'}`}>
                <Text className={`text-xs font-semibold ${isCompliant ? 'text-green-700' : 'text-amber-700'}`}>
                  {compliantCount}/{totalClausole} clausole ok
                </Text>
              </View>
            </View>
            <View className="gap-3">
              <SummaryRow label="Tipo contratto" value={MOCK_SUMMARY.tipo} isDark={isDark} />
              <SummaryRow label="Canone annuo" value={`\u20AC ${MOCK_SUMMARY.canone.toLocaleString()}`} isDark={isDark} />
              <SummaryRow label="Deposito cauzionale" value={`\u20AC ${MOCK_SUMMARY.deposito} (${MOCK_SUMMARY.mensilitaDeposito} mensilità)`} isDark={isDark} />
              <SummaryRow label="Durata" value={MOCK_SUMMARY.durata} isDark={isDark} />
              <SummaryRow label="Scadenza" value={MOCK_SUMMARY.scadenza} isDark={isDark} isLast />
            </View>
          </View>
        </Animated.View>

        {/* Clauses */}
        <Animated.View
          style={{ opacity: fadeAnim }}
          className="px-5 mb-6"
        >
          <View className="flex-row items-center justify-between mb-3 px-1">
            <Text className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
              Clausole analizzate
            </Text>
            <Text className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Tocca per dettagli
            </Text>
          </View>
          {MOCK_CLAUSES.map((clause) => (
            <ClauseCard key={clause.id} clause={clause} isDark={isDark} />
          ))}
        </Animated.View>

        {/* Legal disclaimer */}
        <View className="mx-5 mb-6">
          <View
            className={`rounded-2xl p-4 ${isDark ? 'bg-amber-900/20 border-amber-800/30' : 'bg-amber-50 border-amber-200'} border`}
          >
            <View className="flex-row items-start gap-3">
              <Text className="text-lg">{'\u{26A0}\uFE0F'}</Text>
              <View className="flex-1">
                <Text className={`text-sm font-semibold mb-1 ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
                  Disclaimer legale
                </Text>
                <Text className={`text-xs leading-5 ${isDark ? 'text-amber-400/70' : 'text-amber-600/80'}`}>
                  Questa analisi è generata automaticamente e non costituisce consulenza legale.
                  Ti consigliamo di far verificare il contratto da un avvocato specializzato
                  prima di firmare o intraprendere azioni legali.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action buttons */}
        <Animated.View
          style={{ opacity: fadeAnim }}
          className="px-5 gap-3"
        >
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={handleDownloadPdf}
              className={`flex-1 py-3.5 rounded-xl items-center flex-row justify-center gap-2 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border`}
              activeOpacity={0.7}
              accessibilityLabel="Scarica PDF"
              accessibilityRole="button"
            >
              <Text className={`text-base ${isDark ? 'text-white' : 'text-slate-700'}`}>{'\u{1F4C4}'}</Text>
              <Text className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-700'}`}>Scarica PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleShare}
              className={`flex-1 py-3.5 rounded-xl items-center flex-row justify-center gap-2 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border`}
              activeOpacity={0.7}
              accessibilityLabel="Condividi"
              accessibilityRole="button"
            >
              <Text className={`text-base ${isDark ? 'text-white' : 'text-slate-700'}`}>{'\u{1F91D}'}</Text>
              <Text className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-700'}`}>Condividi</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => router.push('/onboarding/completed')}
            className="bg-teal-600 py-4 rounded-xl items-center"
            activeOpacity={0.8}
            accessibilityLabel="Continua con CasaGiusta"
            accessibilityRole="button"
          >
            <Text className="text-white font-semibold text-base">Continua con CasaGiusta</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SummaryRow({
  label,
  value,
  isDark,
  isLast,
}: {
  label: string;
  value: string;
  isDark: boolean;
  isLast?: boolean;
}) {
  return (
    <View
      className={`flex-row items-center justify-between ${!isLast ? 'pb-3 border-b' : ''} ${!isLast && isDark ? 'border-slate-700' : ''} ${!isLast && !isDark ? 'border-slate-100' : ''}`}
    >
      <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        {label}
      </Text>
      <Text className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
        {value}
      </Text>
    </View>
  );
}
