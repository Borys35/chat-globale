import produce from 'immer';

import * as actions from '../actionTypes';

export default produce((draft, action) => {
  switch (action.type) {
    case actions.SWITCH_CONVERSATION:
      draft.currentConversationId = action.payload.id;
      break;
    case actions.JOIN_VOICE_CHAT:
      draft.voiceChatConversationId = action.payload.id;
      break;
    default:
      break;
  }
}, {});
