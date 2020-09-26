import React from 'react';

export default function Button({ children, disabled, onClick }) {
  return (
    <button className={`button`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
