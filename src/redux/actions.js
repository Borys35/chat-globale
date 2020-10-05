import * as actions from './actionTypes';

export const switchConversation = (id) => ({
  type: actions.SWITCH_CONVERSATION,
  payload: { id },
});
