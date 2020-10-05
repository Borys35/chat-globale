import React from 'react';
import ReactTooltip from 'react-tooltip';
import { useDispatch } from 'react-redux';

import { switchConversation } from '../../redux/actions';

export default function ListItem({ item, onClick }) {
  const { id, displayName, photoURL } = item;
  const dispatch = useDispatch();

  function handleClick() {
    if (onClick) onClick();
    else dispatch(switchConversation(id));
  }

  return (
    <div className={`list__item`} onClick={handleClick}>
      <img
        className={`list__img`}
        src={photoURL}
        alt="Item"
        data-tip={displayName}
      />
      <ReactTooltip effect="solid" />
    </div>
  );
}
