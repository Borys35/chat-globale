import React from 'react';
import { FaPaperPlane, FaMicrophoneAlt } from 'react-icons/fa';

import Button from '../atoms/Button';

export default function MessageForm({
  onSendMessage,
  onChange,
  onSwitch,
  formValue,
  formDisabled,
}) {
  function handleSwitch(e) {
    e.preventDefault();
    onSwitch();
  }

  return (
    <form className={`chat__form`} onSubmit={onSendMessage}>
      <input
        className={`chat__form__input`}
        disabled={formDisabled}
        type="text"
        placeholder="Enter a message..."
        value={formValue}
        onChange={onChange}
      />
      <Button onClick={handleSwitch}>
        <FaMicrophoneAlt />
      </Button>
      <Button disabled={!formValue || formDisabled}>
        <FaPaperPlane />
      </Button>
    </form>
  );
}
