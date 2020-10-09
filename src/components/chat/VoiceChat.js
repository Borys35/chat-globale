import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { firestore } from '../../services/firebase';
import { joinVoiceChat } from '../../redux/actions';
import Button from '../atoms/Button';

export default function VoiceChat({ conversationId }) {
  const chatRef = useRef(null);
  const dispatch = useDispatch();
  const voiceChatId = useSelector(
    (state) => state.conversations.voiceChatConversationId
  );

  async function handleJoinVideoChat() {
    // new RTCPeerConnection({});

    dispatch(joinVoiceChat(conversationId));

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    addVideo(stream);

    const config = { iceServers: [{ urls: 'stun:stun.1.google.com:19302' }] };
    const connection = new RTCPeerConnection(config);
    connection.onicecandidate = (event) => {
      if (!event.candidate) return;
    };
    connection.ontrack = (event) => {
      addVideo(event.streams[0]);
    };
  }

  function addVideo(stream) {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.muted = true;
    video.style.transform = 'rotateY(180deg)';
    video.onloadedmetadata = () => {
      video.play();
    };
    chatRef.current.appendChild(video);
  }

  return (
    <>
      {conversationId !== voiceChatId ? (
        <div>
          <Button onClick={handleJoinVideoChat}>Join to voice chat</Button>
        </div>
      ) : (
        <div ref={chatRef}></div>
      )}
    </>
  );
}
