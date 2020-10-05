import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

import { auth } from '../../services/firebase';
import Button from '../atoms/Button';

export default function Navbar() {
  function handleSignOut() {
    auth().signOut();
  }

  return (
    <nav className={`navbar`}>
      <h1>Chat{/* GLOBALE */}</h1>
      <Button onClick={handleSignOut}>
        <FaSignOutAlt />
      </Button>
    </nav>
  );
}
