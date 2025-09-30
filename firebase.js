import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);


getToken(messaging, { vapidKey: "YOUR_VAPID_KEY" }).then((currentToken) => {
  if (currentToken) {
    console.log('FCM Token:', currentToken);
  } else {
    console.warn('No FCM token available.');
  }
});
