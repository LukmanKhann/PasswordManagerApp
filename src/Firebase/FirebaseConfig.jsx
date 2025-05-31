import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: 'AIzaSyDFn7zgsiRmTzg9aMtXT1Eo_J0XSTxnv6Q',
  authDomain: 'password-manager-95d3b.firebaseapp.com',
  projectId: 'password-manager-95d3b',
  storageBucket: 'password-manager-95d3b.appspot.com',
  messagingSenderId: '621956434943',
  appId: '1:621956434943:android:660b9ab10806c15465f5ca',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_DB = getFirestore(FIREBASE_APP)
