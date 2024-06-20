import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBPKwkDTpkM-fI9M9rjJguLKeOMYliMj2k',
  authDomain: 'nwitter-8aa70.firebaseapp.com',
  projectId: 'nwitter-8aa70',
  storageBucket: 'nwitter-8aa70.appspot.com',
  messagingSenderId: '47199377700',
  appId: '1:47199377700:web:1b903f446be67fa9e23bb1',
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
