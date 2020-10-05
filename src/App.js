import React, { useEffect, useState } from 'react';
import './App.scss';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from './services/firebase';
import SignIn from './components/SignIn';
import Chat from './components/chat/Chat';
import Loading from './components/Loading';
import Friends from './components/lists/Friends';
import Groups from './components/lists/Groups';
import Navbar from './components/partials/Navbar';

function App() {
  const [screenLoading, setScreenLoading] = useState(true);
  const [user, loading] = useAuthState(auth());

  useEffect(() => {
    if (!user) return;

    const usersRef = firestore().collection('users');
    usersRef.doc(user.uid); //.set({});
  }, [user]);

  return (
    <main className="app">
      <Navbar />
      {loading || screenLoading ? (
        <Loading
          realLoading={loading}
          onLoaded={() => setScreenLoading(false)}
        />
      ) : !user ? (
        <SignIn />
      ) : (
        <div className="main-wrapper">
          <Friends />
          <Groups />
          <Chat className="main-wrapper__chat" />
        </div>
      )}
    </main>
  );
}

export default App;
