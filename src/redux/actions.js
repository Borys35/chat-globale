import * as actions from './actionTypes';

export const switchConversation = (id) => ({
  type: actions.SWITCH_CONVERSATION,
  payload: { id },
});

export const joinVoiceChat = (id) => ({
  type: actions.JOIN_VOICE_CHAT,
  payload: { id },
});
