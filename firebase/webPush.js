import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import localforage from 'localforage';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(clientCredentials);
// const analytics = getAnalytics(app);
const messaging = getMessaging(app);

const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    return localforage.getItem('fcm_token')
  },

  nameInlocalforage: async () => {
    return localforage.getItem('name')
  },

  init: async function (setTokenFound, setRegToken, setName, setOnboarding) {

    try {
      const currentToken = await this.tokenInlocalforage();
      if (currentToken !== null) {
        console.log('current token for client ', currentToken);
        setTokenFound(true);
        setRegToken(currentToken)
        const currentName = await this.nameInlocalforage();
        if (currentName !== null) {
          // not first time
          setName(currentName)
          setOnboarding(0)
        }
        return false
      }

      await Notification.requestPermission()
      const token = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY })

      setTokenFound(true);
      setRegToken(token);
      localforage.setItem('fcm_token', token)
      console.log('fcm_token', token)
    } catch (error) {
      console.log('An error occurred while retrieving token. ', error);
      console.error(error)
    }
  },

  storeName: async (name) => {
    localforage.setItem('name', name)
    console.log('name', name)
  },

  getName: async (setName) => {
    const currentName = await localforage.getItem('name')
    setName(currentName);
  },
}

const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload ", payload);
      resolve(payload);
    });
});


export { firebaseCloudMessaging, onMessageListener };
