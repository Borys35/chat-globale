import React, { useEffect, useRef, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { firestore, auth } from '../../services/firebase';
import Button from '../atoms/Button';
import Navbar from '../partials/Navbar';
import ChatMessage from './ChatMessage';

export default function Chat() {
  const messagesRef = firestore().collection('messages');
  const query = messagesRef.orderBy('createdAt').limitToLast(25);

  const [messages, loading] = useCollectionData(query, { idField: 'id' });

  const dummyRef = useRef(null);
  const [formValue, setFormValue] = useState('');

  async function handleSendMessage(e) {
    e.preventDefault();

    const { uid, photoURL } = auth().currentUser;

    setFormValue('');

    await messagesRef.add({
      text: formValue,
      createdAt: firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    dummyRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    dummyRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [loading]);

  return (
    <div className={`chat`}>
      <Navbar />
      <div className={`chat__list`}>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <div ref={dummyRef}></div>
      </div>
      <form className={`chat__form`} onSubmit={handleSendMessage}>
        <input
          className={`chat__form__input`}
          type="text"
          placeholder="Enter a message..."
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <Button disabled={!formValue}>
          <FaPaperPlane />
        </Button>
      </form>
    </div>
  );
}
