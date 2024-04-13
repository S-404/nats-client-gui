import React, { FC } from 'react';
import messagesIcon from '/icon-messages.png';
import './messagesIcon.css'

const MessagesIcon:FC = () => {
  return (
    <img className={'messages-icon'} src={messagesIcon} alt={'messages'}/>
  );
};

export default MessagesIcon;
