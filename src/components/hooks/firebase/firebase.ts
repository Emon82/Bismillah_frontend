import firebase from 'firebase';
// eslint-disable-next-line import/no-duplicates
import 'firebase/firestore';
// eslint-disable-next-line import/no-duplicates
import 'firebase/auth';
// eslint-disable-next-line import/no-duplicates
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDY3k0oh5tgLBtTXWn82nsI2v1Ckbq18-0',
  authDomain: 'bismillah-marriage-cccee.firebaseapp.com',
  projectId: 'bismillah-marriage-cccee',
  storageBucket: 'bismillah-marriage-cccee.appspot.com',
  messagingSenderId: '11533164178',
  appId: '1:11533164178:web:9fc30f611da4a373a9d04b',
  measurementId: 'G-8VGBH9WVGR',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

// console.log(firebase.apps)
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
