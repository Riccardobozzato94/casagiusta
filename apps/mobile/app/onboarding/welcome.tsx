import { useState, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Slide {
  icon: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    icon: '🛡️',
    title: 'Le tue prove, al sicuro',
    description:
      'Foto, video, documenti. Tutto crittografato e con timestamp legale.',
  },
  {
    icon: '💬',
    title: 'I tuoi diritti, spiegati bene',
    description:
      'Giusta, la nostra AI, ti guida con risposte chiare e citazioni normative.',
  },
  {
    icon: '👥',
    title: 'Non sei solo',
    description:
      'Community anonima e avvocati verificati pronti ad aiutarti.',
  },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList<Slide>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: any) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    },
    [],
  );

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    router.push('/onboarding/upload-contract');
  };

  const handleSkip = () => {
    router.replace('/onboarding/completed');
  };

  const renderSlide = ({ item }: { item: Slide }) => (
    <View style={{ width: SCREEN_WIDTH }} className="px-8 items-center justify-center">
      <View className="w-32 h-32 bg-primary-700/20 rounded-full items-center justify-center mb-10">
        <Text className="text-6xl">{item.icon}</Text>
      </View>
      <Text className="text-2xl font-display font-bold text-white text-center mb-4">
        {item.title}
      </Text>
      <Text className="text-base font-body text-text-dark-secondary text-center leading-6">
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-surface-dark-primary">
      <StatusBar style="light" />
      <View className="flex-1">
        <View className="flex-row justify-end px-6 pt-4">
          <TouchableOpacity onPress={handleSkip} className="py-2 px-4">
            <Text className="text-text-dark-tertiary text-sm font-body">Salta</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderSlide}
          keyExtractor={(_, index) => String(index)}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          className="flex-1"
          contentContainerStyle={{ alignItems: 'center' }}
        />

        <View className="flex-row justify-center mb-8">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`w-2.5 h-2.5 rounded-full mx-1.5 ${
                index === currentIndex ? 'bg-primary-500' : 'bg-surface-dark-tertiary'
              }`}
            />
          ))}
        </View>

        <View className="px-6 pb-8">
          <TouchableOpacity
            onPress={handleNext}
            className="bg-primary-600 py-4 px-6 rounded-xl items-center justify-center"
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold text-base">Inizia</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
