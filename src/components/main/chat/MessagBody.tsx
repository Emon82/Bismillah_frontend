import React from 'react';
// import FreeScrollBar from 'react-free-scrollbar';
import Message from './Message/Message';

const Messages = ({ message, uid }: any) => (
  <div>
    {message.length &&
      message.map((msg: any, i: any) => <Message message={msg} uid={uid} />)}
  </div>
);
export default Messages;
