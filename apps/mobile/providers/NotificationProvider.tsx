import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import Constants from 'expo-constants';

// ───────────────────────────────────────────────
// Configurazione handler notifiche in foreground
// ───────────────────────────────────────────────
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// ───────────────────────────────────────────────
// Tipi notifica
// ───────────────────────────────────────────────
type NotificationType =
  | 'caso'
  | 'ai_risposta'
  | 'community'
  | 'promemoria'
  | 'sistema'
  | 'scadenza';

interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, unknown>;
}

interface NotificationContextType {
  expoPushToken: string | null;
  lastNotification: AppNotification | null;
  registerForPushNotifications: () => Promise<string | null>;
}

const NotificationContext = createContext<NotificationContextType>({
  expoPushToken: null,
  lastNotification: null,
  registerForPushNotifications: async () => null,
});

export function useNotifications() {
  return useContext(NotificationContext);
}

// ───────────────────────────────────────────────
// NotificationProvider
// ───────────────────────────────────────────────
export function NotificationProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const router = useRouter();
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [lastNotification, setLastNotification] =
    useState<AppNotification | null>(null);
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  // ── Registrazione push ──
  async function registerForPushNotifications(): Promise<string | null> {
    try {
      // Richiedi permessi
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.warn('[Push] Permesso notifiche non concesso');
        return null;
      }

      // Ottieni Expo Push Token
      const projectId =
        Constants.expoConfig?.extra?.eas?.projectId ??
        Constants.expoConfig?.projectId;

      if (!projectId) {
        console.warn('[Push] Project ID non trovato in app.json');
        return null;
      }

      const tokenData = await Notifications.getExpoPushTokenAsync({
        projectId,
      });
      const token = tokenData.data;
      setExpoPushToken(token);

      // Salva token su Supabase (tabella users)
      if (token) {
        const { error } = await supabase.rpc('upsert_push_token', {
          p_push_token: token,
          p_platform: Platform.OS,
        });

        if (error) {
          console.warn('[Push] Errore salvataggio token:', error.message);
        }
      }

      // Configura canale Android
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Notifiche CasaGiusta',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#14b8a6',
        });
      }

      return token;
    } catch (err) {
      console.error('[Push] Errore registrazione:', err);
      return null;
    }
  }

  // ── Setup listener ──
  useEffect(() => {
    // Registrazione automatica al mount
    registerForPushNotifications();

    // Listener per notifiche in foreground
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        const data = notification.request.content.data;
        setLastNotification({
          id: notification.request.identifier,
          type: (data?.type as NotificationType) ?? 'sistema',
          title: notification.request.content.title ?? '',
          body: notification.request.content.body ?? '',
          data: data as Record<string, unknown>,
        });
      });

    // Listener per tap su notifica
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;

        if (data?.screen && typeof data.screen === 'string') {
          // Naviga alla schermata specificata dalla notifica
          try {
            router.push(data.screen as any);
          } catch {
            console.warn('[Push] Navigazione fallita verso:', data.screen);
          }
        }
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(
          responseListener.current
        );
      }
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        expoPushToken,
        lastNotification,
        registerForPushNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
