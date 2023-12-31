import { useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

export const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log(auth?.currentUser);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const signoutFunc = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In With Goodle</button>
      <button onClick={signoutFunc}>Sign Out</button>
    </div>
  );
};
