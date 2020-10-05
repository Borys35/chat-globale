import React, { useState } from 'react';
import Modal from 'react-modal';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { firestore, auth } from '../../services/firebase';

import plus from '../../assets/images/plus.svg';
import ListItem from './ListItem';

Modal.setAppElement('#root');

export default function Friends() {
  const [modalOpened, setModalOpened] = useState(false);
  const [friendId, setFriendId] = useState('');
  const conversationsRef = firestore().collection('conversations');
  const query = conversationsRef
    .where('uids', 'array-contains', auth().currentUser.uid)
    .where('type', '==', 'friend');

  const [friends] = useCollectionData(query, {
    idField: 'id',
  });

  function openModal() {
    setModalOpened(true);
  }

  function closeModal() {
    setModalOpened(false);
  }

  async function handleAddFriend(e) {
    e.preventDefault();
    const { uid, displayName, photoURL } = auth().currentUser;
    const addedUserRef = firestore().doc(`users/${friendId}`);
    const addedUser = (await addedUserRef.get()).data();

    if (!addedUser) return;

    await conversationsRef.add({
      members: [{ uid, displayName, photoURL }, addedUser],
      message: [],
      type: 'friend',
      uids: [uid, addedUser.uid],
    });
  }

  return (
    <>
      <Modal isOpen={modalOpened} onRequestClose={closeModal}>
        <form onSubmit={handleAddFriend}>
          <label>Enter user's id</label>
          <input onChange={(e) => setFriendId(e.target.value)} />
          <button>Add a friend</button>
        </form>
      </Modal>
      <div className={`list`}>
        {friends &&
          friends.map((friend) => {
            friend.photoURL = friend.members.find(
              (f) => f.uid !== auth().currentUser.uid
            ).photoURL;
            friend.displayName = friend.members.find(
              (f) => f.uid !== auth().currentUser.uid
            ).displayName;
            return <ListItem key={friend.id} item={friend} />;
          })}
        <ListItem
          item={{
            displayName: 'Add a friend',
            photoURL: plus,
          }}
          onClick={openModal}
        />
      </div>
    </>
  );
}
