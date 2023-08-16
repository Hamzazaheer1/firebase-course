import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAusLuWLdhe3k-mlFyNSI3OI3Dee5ch6TQ',
  authDomain: 'fir-course-d4e7d.firebaseapp.com',
  projectId: 'fir-course-d4e7d',
  storageBucket: 'fir-course-d4e7d.appspot.com',
  messagingSenderId: '644998646472',
  appId: '1:644998646472:web:8c0b041465a5a3cf81b3fd',
  measurementId: 'G-G0GG02JRJN',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
