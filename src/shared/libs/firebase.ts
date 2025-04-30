import {
  onMessage,
  getMessaging,
  getToken as getMessagingToken
} from 'firebase/messaging';
import { initializeApp } from 'firebase/app';

import { APP_DATA, FIREBASE_CONFIGS } from '@/shared/constants';
import { isLocal } from '@/shared/helpers';

const FIREBASE_APP = FIREBASE_CONFIGS.projectId ? initializeApp(FIREBASE_CONFIGS) : null;
const FIREBASE_MESSAGING = FIREBASE_APP ? getMessaging(FIREBASE_APP) : null;

export async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted' && !!FIREBASE_MESSAGING) {
      const token = await getMessagingToken(FIREBASE_MESSAGING, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY ?? null
      });
      if (isLocal()) {
        console.log(`- FCM Token [${APP_DATA.name.toUpperCase()}]:`, token);
        localStorage.setItem(`${APP_DATA.name.toUpperCase()}_CLIENT_FCM_TOKEN`, token);
      }
      return token;
    }
    return null;
  } catch {
    throw Error('Error: Getting notification permission!');
  }
}

export function onMessageListener() {
  return new Promise((resolve) => {
    if (!FIREBASE_MESSAGING) return;
    onMessage(FIREBASE_MESSAGING, (payload) => {
      resolve(payload);
    });
  });
}
