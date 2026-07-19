import { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';

type Message = {
  id: string;
  ruolo: 'utente' | 'giusta';
  testo: string;
  citazioni?: { testo: string; fonte: string }[];
};

const BENVENUTO: Message = {
  id: 'benvenuto',
  ruolo: 'giusta',
  testo:
    'Ciao! Sono Giusta, la tua assistente legale locatizia.\n\nPosso aiutarti a:\n- Analizzare clausole contrattuali\n- Calcolare aggiornamenti ISTAT\n- Generare diffide e comunicazioni\n- Spiegare i tuoi diritti come inquilino\n\nCome posso esserti utile oggi?',
};

const QUICK_ACTIONS = [
  'Cosa posso fare se...',
  'Controlla contratto',
  'Genera diffida',
  'Calcola ISTAT',
];

const QUERY_LIMITE = 5;
const ANIMAZIONE_DOTS = ['', '.', '..', '...'];

function ChatBubble({
  message,
}: {
  message: Message;
}) {
  const { isDark } = useTheme();
  const [citazioniAperte, setCitazioniAperte] = useState(false);
  const isUtente = message.ruolo === 'utente';

  return (
    <View className={`mb-3 ${isUtente ? 'items-end' : 'items-start'}`}>
      <View
        className={`max-w-[82%] rounded-2xl px-4 py-3 ${
          isUtente
            ? 'bg-teal-600 rounded-tr-md'
            : isDark
              ? 'bg-slate-800 rounded-tl-md'
              : 'bg-slate-100 rounded-tl-md'
        }`}
      >
        <Text
          className={`text-base leading-6 ${isUtente ? 'text-white' : isDark ? 'text-slate-200' : 'text-slate-800'}`}
        >
          {message.testo}
        </Text>

        {message.citazioni && message.citazioni.length > 0 && (
          <>
            <TouchableOpacity
              onPress={() => setCitazioniAperte(!citazioniAperte)}
              className={`flex-row items-center gap-1 mt-2 ${isUtente ? 'justify-end' : ''}`}
              accessibilityLabel={citazioniAperte ? 'Nascondi fonti' : 'Mostra fonti'}
              accessibilityRole="button"
            >
              <Text className={`text-xs ${isUtente ? 'text-teal-200' : 'text-teal-500'}`}>
                {'\u{1F4D6}'} Fonti
              </Text>
              <Text
                className={`text-xs ${isUtente ? 'text-teal-200' : 'text-teal-500'}`}
              >
                {citazioniAperte ? '\u{25B2}' : '\u{25BC}'}
              </Text>
            </TouchableOpacity>
            {citazioniAperte &&
              message.citazioni.map((cit, idx) => (
                <TouchableOpacity
                  key={idx}
                  className={`mt-1.5 p-2 rounded-lg ${isUtente ? 'bg-teal-700' : isDark ? 'bg-slate-700' : 'bg-slate-200'}`}
                  accessibilityLabel={`Fonte: ${cit.fonte}`}
                  accessibilityRole="button"
                >
                  <Text
                    className={`text-xs leading-4 ${isUtente ? 'text-teal-100' : isDark ? 'text-slate-300' : 'text-slate-600'}`}
                  >
                    "{cit.testo}"
                  </Text>
                  <Text
                    className={`text-xs mt-0.5 font-medium ${isUtente ? 'text-teal-200' : 'text-teal-500'}`}
                  >
                    {cit.fonte}
                  </Text>
                </TouchableOpacity>
              ))}
          </>
        )}
      </View>
    </View>
  );
}

function LoadingDots() {
  const { isDark } = useTheme();
  const [dotIndex, setDotIndex] = useState(0);

  // Simulated dots animation
  useState(() => {
    const interval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % ANIMAZIONE_DOTS.length);
    }, 400);
    return () => clearInterval(interval);
  });

  return (
    <View className="items-start mb-3">
      <View
        className={`rounded-2xl rounded-tl-md px-4 py-3 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}
      >
        <View className="flex-row gap-1.5">
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-slate-500' : 'bg-slate-400'}`}
              style={{ opacity: dotIndex >= i ? 1 : 0.3 }}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

export default function GiustaScreen() {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [messaggi, setMessaggi] = useState<Message[]>([BENVENUTO]);
  const [input, setInput] = useState('');
  const [caricamento, setCaricamento] = useState(false);
  const [conteggioQuery, setConteggioQuery] = useState(0);
  const limiteRaggiunto = conteggioQuery >= QUERY_LIMITE;

  const handleInvia = async () => {
    const testo = input.trim();
    if (!testo || limiteRaggiunto) return;

    const msgUtente: Message = {
      id: `u-${Date.now()}`,
      ruolo: 'utente',
      testo,
    };

    setMessaggi((prev) => [...prev, msgUtente]);
    setInput('');
    setCaricamento(true);
    setConteggioQuery((prev) => prev + 1);

    // Simulate response
    await new Promise((r) => setTimeout(r, 1200));

    const msgGiusta: Message = {
      id: `g-${Date.now()}`,
      ruolo: 'giusta',
      testo:
        'Grazie per la tua domanda. In base alla normativa vigente (Legge n. 392/1978), ti posso confermare che...',
      citazioni: [
        {
          testo: 'Art. 1, Legge 392/1978 - Disciplina delle locazioni',
          fonte: 'Legge 27 luglio 1978, n. 392',
        },
      ],
    };

    setMessaggi((prev) => [...prev, msgGiusta]);
    setCaricamento(false);

    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Header */}
      <View
        style={{ paddingTop: insets.top + 16 }}
        className={`px-5 pb-4 border-b ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
      >
        <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
          Giusta
        </Text>
        <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Assistente legale locatizio
        </Text>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        className={`flex-1 px-4 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
      >
        {messaggi.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {caricamento && <LoadingDots />}
      </ScrollView>

      {/* Quick actions */}
      {messaggi.length === 1 && (
        <View className={`px-4 pb-3 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            {QUICK_ACTIONS.map((action) => (
              <TouchableOpacity
                key={action}
                onPress={() => {
                  setInput(action);
                }}
                className={`px-4 py-2 rounded-full ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border`}
                accessibilityLabel={action}
                accessibilityRole="button"
              >
                <Text className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {action}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Disclaimer */}
      <View className="px-4 pb-1">
        <Text className="text-xs text-amber-500 text-center">
          {'\u26A0\uFE0F'} Non è consulenza legale. Verifica sempre con un professionista.
        </Text>
      </View>

      {/* Counter */}
      <View className={`px-4 pb-1 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <Text className={`text-xs text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          {limiteRaggiunto
            ? 'Limite giornaliero raggiunto'
            : `${QUERY_LIMITE - conteggioQuery}/${QUERY_LIMITE} richieste oggi`}
        </Text>
      </View>

      {/* Input */}
      <View
        className={`px-4 pt-2 pb-4 border-t ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
        style={{ paddingBottom: insets.bottom + 12 }}
      >
        {limiteRaggiunto ? (
          <View
            className={`rounded-xl p-4 items-center ${isDark ? 'bg-slate-800' : 'bg-amber-50'} border ${isDark ? 'border-slate-700' : 'border-amber-200'}`}
          >
            <Text
              className={`text-sm font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
            >
              {'\u{1F6E1}\uFE0F'} Limite giornaliero raggiunto
            </Text>
            <Text
              className={`text-xs text-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
            >
              Passa a Pro per richieste illimitate e funzionalità avanzate.
            </Text>
            <TouchableOpacity
              className="mt-3 bg-teal-600 rounded-lg py-2 px-6"
              onPress={() => router.push('/abbonamento')}
              accessibilityLabel="Passa a Pro"
              accessibilityRole="button"
            >
              <Text className="text-white font-semibold text-sm">Passa a Pro</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-row items-center gap-2">
            <TextInput
              className={`flex-1 rounded-xl px-4 py-3 text-base ${isDark ? 'bg-slate-800 text-white border-slate-700' : 'bg-white text-slate-800 border-slate-200'} border`}
              placeholder="Scrivi a Giusta..."
              placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
              value={input}
              onChangeText={setInput}
              multiline
              maxLength={2000}
              accessibilityLabel="Scrivi a Giusta"
            />
            <TouchableOpacity
              onPress={handleInvia}
              disabled={!input.trim()}
              className={`w-12 h-12 rounded-full items-center justify-center ${input.trim() ? 'bg-teal-600' : isDark ? 'bg-slate-700' : 'bg-slate-200'}`}
              accessibilityLabel="Invia messaggio"
              accessibilityRole="button"
            >
              <Text
                className={`text-lg ${input.trim() ? 'text-white' : isDark ? 'text-slate-500' : 'text-slate-400'}`}
              >
                {'\u{2191}'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
