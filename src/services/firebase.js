import firebase from 'firebase/app';

import secrets from '../secrets.json';

firebase.initializeApp({
  apiKey: secrets.apiKey,
  authDomain: 'chat-globale.firebaseapp.com',
  databaseURL: 'https://chat-globale.firebaseio.com',
  projectId: 'chat-globale',
  storageBucket: 'chat-globale.appspot.com',
  messagingSenderId: '338057541472',
  appId: '1:338057541472:web:5899607c48fdf918da5005',
  measurementId: 'G-J1K2ZG0CN7',
});

export const auth = firebase.auth;
export const firestore = firebase.firestore;
export const analytics = firebase.analytics;

auth().onAuthStateChanged((user) => {
  firestore().collection('users').doc(user.uid).set({
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
  });
});
