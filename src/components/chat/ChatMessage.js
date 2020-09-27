import React from 'react';
import Filter from 'bad-words';

import { auth } from '../../services/firebase';
import { convertTimestamp } from '../../utils/date';

const filter = new Filter();

export default function ChatMessage({ message }) {
  const { text, createdAt, uid, displayName, photoURL } = message;

  const modifierClass = uid === auth().currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`chat__message chat__message--${modifierClass}`}>
      <img className={`chat__img`} src={photoURL} alt="User" />
      <div
        className={`chat__message-container chat__message-container--${modifierClass}`}
      >
        <p className={`chat__timestamp`}>
          {createdAt && convertTimestamp(createdAt)}
        </p>
        <div
          className={`chat__text-container chat__text-container--${modifierClass}`}
        >
          <p className={`chat__name`}>{displayName}</p>
          <p className={`chat__text`}>{filter.clean(text)}</p>
        </div>
      </div>
    </div>
  );
}
