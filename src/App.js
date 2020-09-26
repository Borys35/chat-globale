import React, { useState } from 'react';
import './App.scss';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './services/firebase';
import SignIn from './components/SignIn';
import Chat from './components/chat/Chat';
import Loading from './components/Loading';

function App() {
  const [screenLoading, setScreenLoading] = useState(true);
  const [user, loading] = useAuthState(auth());

  return (
    <main className="app">
      {loading || screenLoading ? (
        <Loading
          realLoading={loading}
          onLoaded={() => setScreenLoading(false)}
        />
      ) : !user ? (
        <SignIn />
      ) : (
        <Chat />
      )}
    </main>
  );
}

export default App;
