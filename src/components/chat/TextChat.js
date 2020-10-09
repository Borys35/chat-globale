import React, { useEffect, useRef, useState } from 'react';

import ChatMessage from './ChatMessage';

export default function TextChat({ conversations, index, loading, dummyRef }) {
  return (
    <div className={`chat__list`}>
      {!loading && conversations[index]
        ? conversations[index].messages && conversations[index].messages.length
          ? conversations[index].messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))
          : 'No messages'
        : 'No conversation selected'}
      <div ref={dummyRef}></div>
    </div>
  );
}
