import React, { useState } from 'react';
import Modal from 'react-modal';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { firestore, auth } from '../../services/firebase';

import plus from '../../assets/images/plus.svg';
import ListItem from './ListItem';

Modal.setAppElement('#root');

export default function Groups() {
  const [modalOpened, setModalOpened] = useState(false);
  const [groupId, setGroupId] = useState('');
  const [groupName, setGroupName] = useState('');
  const conversationsRef = firestore().collection('conversations');
  const query = conversationsRef
    .where('uids', 'array-contains', auth().currentUser.uid)
    .where('type', '==', 'group');

  const [groups] = useCollectionData(query, {
    idField: 'id',
  });

  function openModal() {
    setModalOpened(true);
  }

  function closeModal() {
    setModalOpened(false);
    setGroupId('');
    setGroupName('');
  }

  async function handleAddGroup(e) {
    e.preventDefault();
    const { uid, displayName, photoURL } = auth().currentUser;
    await conversationsRef.doc(groupId).update({
      uids: firestore.FieldValue.arrayUnion(uid),
      members: firestore.FieldValue.arrayUnion({
        uid,
        displayName,
        photoURL,
      }),
    });
    closeModal();
  }

  async function handleCreateGroup(e) {
    e.preventDefault();
    const { uid, displayName, photoURL } = auth().currentUser;
    const newConv = await conversationsRef.add({
      displayName: groupName,
      type: 'group',
      photoURL:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Ma0f_Z3WDbz4EfbwoTvLPQHaHI%26pid%3DApi&f=1',
      messages: [],
      uids: firestore.FieldValue.arrayUnion(uid),
      members: firestore.FieldValue.arrayUnion({
        uid,
        displayName,
        photoURL,
      }),
    });
    setGroupId(newConv.id);
    closeModal();
  }

  return (
    <>
      <Modal isOpen={modalOpened} onRequestClose={closeModal}>
        <form onSubmit={handleAddGroup}>
          <label>Enter group's id</label>
          <input onChange={(e) => setGroupId(e.target.value)} />
          <button>Add a group</button>
        </form>
        <form onSubmit={handleCreateGroup}>
          <label>Enter new group's name</label>
          <input onChange={(e) => setGroupName(e.target.value)} />
          <button>Create a group</button>
        </form>
      </Modal>
      <div className={`list`}>
        {groups &&
          groups.map((group) => <ListItem key={group.id} item={group} />)}
        <ListItem
          item={{
            displayName: 'Add a group',
            photoURL: plus,
          }}
          onClick={openModal}
        />
      </div>
    </>
  );
}
