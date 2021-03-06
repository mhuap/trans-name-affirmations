// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyDuglzUVxGekBmYF_EF2tajpMIPylOKUBw",
  authDomain: "trans-name-affirmations.firebaseapp.com",
  projectId: "trans-name-affirmations",
  storageBucket: "trans-name-affirmations.appspot.com",
  messagingSenderId: "151056753007",
  appId: "1:151056753007:web:8266a48732378d704f489a",
  measurementId: "G-WJRWZQ0GBG",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
console.log("initialized");
// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   console.log("Received background message ", payload);
//
//   return self.clients.matchAll().then(all => all.forEach(client => {
//     client.postMessage("BACKGROUND PAYLOAD");
//    }));
//
//   // const notificationTitle = payload.notification.title;
//   // const notificationOptions = {
//   //   body: payload.notification.body,
//   //   icon: "/icons/icon-256x256.png",
//   // };
//   // eslint-disable-next-line no-restricted-globals
//   // return self.registration.showNotification(
//   //   notificationTitle,
//   //   notificationOptions
//   // );
// });
//
// self.addEventListener("notificationClick", (e) => {
//   e.notification.close();
//   console.log(self.registration.scope);
// })
