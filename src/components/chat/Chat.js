import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { firestore, auth } from '../../services/firebase';
import { switchConversation } from '../../redux/actions';
import MessageForm from './MessageForm';
import TextChat from './TextChat';
import VoiceChat from './VoiceChat';

export default function Chat({ className }) {
  const dummyRef = useRef(null);
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState('');
  const [formDisabled, setFormDisabled] = useState(true);
  const [index, setIndex] = useState(0);
  const [voiceShown, setVoiceShown] = useState(false);
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
    if (loading || !conversations.length) return;

    dispatch(switchConversation(conversations[0].id));
    dummyRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [loading]);

  useEffect(() => {
    if (!conversationId) return;

    setFormValue('');
    setVoiceShown(false);

    const i = conversations.findIndex((conv) => conv.id === conversationId);

    if (i === -1) setFormDisabled(true);
    else setFormDisabled(false);

    setIndex(i);
  }, [conversationId]);

  useEffect(() => {
    if (loading) return;

    dummyRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [index]);

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
      {voiceShown ? (
        <VoiceChat conversationId={conversationId} />
      ) : (
        <TextChat
          conversations={conversations}
          index={index}
          loading={loading}
          dummyRef={dummyRef}
        />
      )}

      <MessageForm
        onSendMessage={handleSendMessage}
        onChange={(e) => setFormValue(e.target.value)}
        onSwitch={(e) => setVoiceShown(!voiceShown)}
        formValue={formValue}
        formDisabled={formDisabled}
      />
    </div>
  );
}
