import React from 'react';

import { auth } from '../services/firebase';
import Button from './atoms/Button';

export default function SignIn() {
  function handleGoogleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    auth().signInWithRedirect(provider);
  }

  return (
    <div className={`sign-in-container`}>
      <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
    </div>
  );
}
