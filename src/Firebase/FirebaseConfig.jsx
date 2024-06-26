import firebase from 'firebase/app';
import 'firebase/firestore';

// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: 'AIzaSyDFn7zgsiRmTzg9aMtXT1Eo_J0XSTxnv6Q',
  authDomain: 'password-manager-95d3b.firebaseapp.com',
  projectId: 'password-manager-95d3b',
  storageBucket: 'password-manager-95d3b.appspot.com',
  messagingSenderId: '621956434943',
  appId: '1:621956434943:android:660b9ab10806c15465f5ca',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
