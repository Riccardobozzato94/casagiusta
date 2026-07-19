import { Tabs } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons: Record<string, string> = {
    index: '\u{1F3E0}',
    vault: '\u{1F512}',
    giusta: '\u{1F4AC}',
    casi: '\u{1F4CB}',
    profilo: '\u{1F464}',
  };
  return (
    <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>
      {icons[name] ?? '\u25CF'}
    </Text>
  );
}

export default function TabLayout() {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderTopColor: isDark ? '#334155' : '#e2e8f0',
            borderTopWidth: 1,
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom + 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: '#0f766e',
          tabBarInactiveTintColor: isDark ? '#64748b' : '#94a3b8',
          tabBarLabelStyle: {
            fontFamily: 'Inter',
            fontSize: 11,
            fontWeight: '600',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => <TabIcon name="index" focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="vault"
          options={{
            title: 'Vault',
            tabBarIcon: ({ focused }) => <TabIcon name="vault" focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="giusta"
          options={{
            title: 'Giusta',
            tabBarIcon: ({ focused }) => <TabIcon name="giusta" focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="casi"
          options={{
            title: 'Casi',
            tabBarIcon: ({ focused }) => <TabIcon name="casi" focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="profilo"
          options={{
            title: 'Profilo',
            tabBarIcon: ({ focused }) => <TabIcon name="profilo" focused={focused} />,
          }}
        />
      </Tabs>

      <TouchableOpacity
        onPress={() => router.push('/emergency')}
        className="absolute bottom-24 right-5 w-14 h-14 bg-danger-600 rounded-full items-center justify-center shadow-lg z-50"
        activeOpacity={0.8}
        accessibilityLabel="Emergenza"
        accessibilityRole="button"
      >
        <Text className="text-white text-2xl">{'\u{1F6A8}'}</Text>
      </TouchableOpacity>
    </>
  );
}
