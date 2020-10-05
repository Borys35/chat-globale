import React, { useEffect, useRef, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector, useDispatch } from 'react-redux';

import { firestore, auth } from '../../services/firebase';
import { switchConversation } from '../../redux/actions';
import Button from '../atoms/Button';
import ChatMessage from './ChatMessage';

export default function Chat({ className }) {
  const dummyRef = useRef(null);
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState('');
  const [formDisabled, setFormDisabled] = useState(true);
  const [index, setIndex] = useState(0);
  const conversationId = useSelector(
    (state) => state.conversations.currentConversationId
  );

  const conversationsRef = firestore().collection('conversations');
  const query = conversationsRef.where(
    'uids',
    'array-contains',
    auth().currentUser.uid
  );
  const [conversations, loading] = useCollectionData(query, {
    idField: 'id',
  });

  useEffect(() => {
    if (!loading && conversations.length)
      dispatch(switchConversation(conversations[0].id));
  }, [loading]);

  useEffect(() => {
    if (!conversationId) return;

    setFormValue('');

    const i = conversations.findIndex((conv) => conv.id === conversationId);

    if (i === -1) setFormDisabled(true);
    else setFormDisabled(false);

    setIndex(i);

    dummyRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [conversationId]);

  async function handleSendMessage(e) {
    e.preventDefault();

    const { uid, displayName, photoURL } = auth().currentUser;

    setFormValue('');

    const timestamp = firestore.FieldValue.serverTimestamp();
    await conversationsRef.doc(conversationId).update({
      messages: firestore.FieldValue.arrayUnion({
        text: formValue,
        createdAt: new Date(),
        uid,
        displayName,
        photoURL,
      }),
    });

    dummyRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className={`chat ${className}`}>
      <div className={`chat__list`}>
        {!loading && conversations[index]
          ? conversations[index].messages &&
            conversations[index].messages.length
            ? conversations[index].messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))
            : 'No messages'
          : 'No conversation selected'}
        {/* {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)} */}
        <div ref={dummyRef}></div>
      </div>
      <form className={`chat__form`} onSubmit={handleSendMessage}>
        <input
          className={`chat__form__input`}
          disabled={formDisabled}
          type="text"
          placeholder="Enter a message..."
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <Button disabled={!formValue || formDisabled}>
          <FaPaperPlane />
        </Button>
      </form>
    </div>
  );
}
