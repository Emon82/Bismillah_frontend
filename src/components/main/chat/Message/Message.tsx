import React from 'react';

// import './Message.css';

// import ReactEmoji from 'react-emoji';

const Message = ({ message, uid }: any) => {
  const isSentByCurrentUser = message.uid === uid;
  return !isSentByCurrentUser ? (
    <div className="message-row other-message">
      <div className="message-content">
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Sumit" />
        <div className="message-text">{message?.message}</div>
        <div className="message-time">Apr 16</div>
      </div>
    </div>
  ) : (
    <div className="message-row you-message">
      <div className="message-content">
        <div className="message-text">{message?.message}</div>
        <div className="message-time">Apr 16</div>
      </div>
    </div>
  );
};

export default Message;
