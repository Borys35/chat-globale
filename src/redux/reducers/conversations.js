import produce from 'immer';

import { SWITCH_CONVERSATION } from '../actionTypes';

export default produce((draft, action) => {
  switch (action.type) {
    case SWITCH_CONVERSATION:
      draft.currentConversationId = action.payload.id;
      break;
    default:
      break;
  }
}, {});
