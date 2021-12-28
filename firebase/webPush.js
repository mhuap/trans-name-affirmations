import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import localforage from 'localforage';
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

// const firebaseCloudMessaging = {
//   tokenInlocalforage: async () => {
//     return localforage.getItem('fcm_token')
//   },
//
//   init: async function (setTokenFound) {
//
//     try {
//       const currentToken = await this.tokenInlocalforage()
//       if (currentToken !== null) {
//         console.log('current token for client ', currentToken);
//         setTokenFound(true);
//         return false
//       }
//
//       await Notification.requestPermission()
//       const token = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY })
//
//       localforage.setItem('fcm_token', token)
//       console.log('fcm_token', token)
//     } catch (error) {
//       console.log('An error occurred while retrieving token. ', error);
//       console.error(error)
//     }
//   },
// }

const app = initializeApp(clientCredentials);
// const analytics = getAnalytics(app);
const messaging = getMessaging(app);

const getToken2 = async (setTokenFound) => {
  let currentToken = "";

  try {
    currentToken = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY });
    if (currentToken) {
      console.log('current token for client ', currentToken);
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }

  return currentToken;
};

const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});


export { getToken2, onMessageListener };
