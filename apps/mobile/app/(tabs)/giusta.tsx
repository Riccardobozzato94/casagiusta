import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import { FadeInView } from '@/components/animations/FadeInView';
import { ScaleOnPress } from '@/components/animations/ScaleOnPress';
import { StreamingText } from '@/features/ai/StreamingText';

type Message = {
  id: string;
  ruolo: 'utente' | 'giusta';
  testo: string;
  citazioni?: { testo: string; fonte: string }[];
  stream?: boolean;
};

const BENVENUTO: Message = {
  id: 'benvenuto',
  ruolo: 'giusta',
  testo:
    'Ciao! Sono Giusta, la tua assistente legale locatizia.\n\nPosso aiutarti a:\n- Analizzare clausole contrattuali\n- Calcolare aggiornamenti ISTAT\n- Generare diffide e comunicazioni\n- Spiegare i tuoi diritti come inquilino\n\nCome posso esserti utile oggi?',
  stream: true,
};

const QUICK_ACTIONS = [
  'Cosa posso fare se...',
  'Controlla contratto',
  'Genera diffida',
  'Calcola ISTAT',
];

const QUERY_LIMITE = 5;

function ChatBubble({ message }: { message: Message }) {
  const { isDark } = useTheme();
  const [citazioniAperte, setCitazioniAperte] = useState(false);
  const [completato, setCompletato] = useState(false);
  const isUtente = message.ruolo === 'utente';

  const streamingAttivo = !isUtente && message.stream && !completato;

  return (
    <FadeInView direction={isUtente ? 'down' : 'up'} distance={16} duration={350}>
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
          {isUtente ? (
            <Text className={`text-base leading-6 text-white`}>
              {message.testo}
            </Text>
          ) : (
            <Text className={`text-base leading-6 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              {streamingAttivo ? (
                <StreamingText
                  text={message.testo}
                  speed={12}
                  onComplete={() => setCompletato(true)}
                />
              ) : (
                message.testo
              )}
            </Text>
          )}

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
                  <FadeInView key={idx} delay={idx * 60} direction="up" distance={8}>
                    <TouchableOpacity
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
                  </FadeInView>
                ))}
            </>
          )}
        </View>
      </View>
    </FadeInView>
  );
}

function LoadingDots() {
  const { isDark } = useTheme();
  return (
    <FadeInView direction="up" distance={12} duration={250}>
      <View className="items-start mb-3">
        <View
          className={`rounded-2xl rounded-tl-md px-4 py-3 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}
        >
          <View className="flex-row gap-1.5">
            <View className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-slate-500' : 'bg-slate-400'}`} style={{ opacity: 0.4 }} />
            <View className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-slate-500' : 'bg-slate-400'}`} style={{ opacity: 0.6 }} />
            <View className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-slate-500' : 'bg-slate-400'}`} style={{ opacity: 0.8 }} />
          </View>
        </View>
      </View>
    </FadeInView>
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
  const [streamingId, setStreamingId] = useState<string | null>('benvenuto');
  const limiteRaggiunto = conteggioQuery >= QUERY_LIMITE;

  // Auto-scroll on new messages or during streaming
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 50);
    return () => clearTimeout(timer);
  }, [messaggi.length, caricamento]);

  const handleInvia = async () => {
    const testo = input.trim();
    if (!testo || limiteRaggiunto) return;

    const utenteId = `u-${Date.now()}`;
    const msgUtente: Message = {
      id: utenteId,
      ruolo: 'utente',
      testo,
    };

    setMessaggi((prev) => [...prev, msgUtente]);
    setInput('');
    setCaricamento(true);
    setConteggioQuery((prev) => prev + 1);

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    const giustaId = `g-${Date.now()}`;
    const risposte: string[] = [
      'Grazie per la tua domanda. In base alla normativa vigente (Legge n. 392/1978), ti posso confermare che il tuo contratto di locazione è soggetto a specifiche tutele.\n\nPer quanto riguarda la tua richiesta:\n\n• Il deposito cauzionale non può superare 3 mensilità del canone (art. 5, L. 392/1978)\n• La durata minima del contratto è di 4 anni, con rinnovo automatico per altri 4 (salvo disdetta)\n• L\'aggiornamento ISTAT è limitato al 75% della variazione accertata\n\nTi consiglio di verificare il tuo contratto con la funzione Analisi Contratto per una valutazione personalizzata.',
      'Certamente! Ecco cosa devi sapere:\n\n1. **Registrazione del contratto** - Obbligatoria entro 30 giorni dalla sottoscrizione. Se non registrato, il contratto è nullo.\n\n2. **Adeguamento ISTAT** - Può essere applicato solo se espressamente previsto dal contratto. Il limite è il 75% della variazione ISTAT.\n\n3. **Manutenzione straordinaria** - A carico del locatore, salvo diverso accordo specifico.\n\n4. **Spese condominiali** - Le spese ordinarie sono a carico tuo, quelle straordinarie del locatore.\n\nHai bisogno di approfondire un punto specifico?',
      'Ti preparo una diffida personalizzata.\n\nIntestazione: Spett.le Proprietario\n\nOggetto: Richiesta di restituzione deposito cauzionale\n\nCon la presente, il sottoscritto [NOME], in qualità di conduttore dell\'immobile sito in [INDIRIZZO], contesta la mancata restituzione del deposito cauzionale di € [IMPORTO] versato all\'atto della stipula del contratto.\n\nAi sensi dell\'art. 5 della L. 392/1978, il deposito cauzionale deve essere restituito entro 30 giorni dalla riconsegna dell\'immobile.\n\nVisto il ritardo, si diffida il proprietario a provvedere al pagamento entro 15 giorni dal ricevimento della presente, pena l\'avvio delle opportune azioni legali.\n\nVuoi che personalizzi questa diffida con i tuoi dati?',
    ];
    const rispostaScelta = risposte[Math.floor(Math.random() * risposte.length)];

    const msgGiusta: Message = {
      id: giustaId,
      ruolo: 'giusta',
      testo: rispostaScelta,
      citazioni: [
        {
          testo: 'Legge 27 luglio 1978, n. 392 - Disciplina delle locazioni di immobili urbani',
          fonte: 'L. 392/1978',
        },
        {
          testo: 'Art. 1571-1654 Codice Civile - Disposizioni generali sulle locazioni',
          fonte: 'Codice Civile',
        },
      ],
      stream: true,
    };

    setMessaggi((prev) => [...prev, msgGiusta]);
    setStreamingId(giustaId);
    setCaricamento(false);
  };

  const handleStreamComplete = () => {
    setStreamingId(null);
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
          <ChatBubble
            key={msg.id}
            message={{ ...msg, stream: msg.id === streamingId }}
          />
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
              <ScaleOnPress key={action} scaleTo={0.94} duration={80}>
                <TouchableOpacity
                  onPress={() => setInput(action)}
                  className={`px-4 py-2 rounded-full ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border`}
                  accessibilityLabel={action}
                  accessibilityRole="button"
                >
                  <Text className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {action}
                  </Text>
                </TouchableOpacity>
              </ScaleOnPress>
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
            <ScaleOnPress scaleTo={0.88} duration={80}>
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
            </ScaleOnPress>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
