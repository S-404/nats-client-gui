import React, { FC } from 'react';
import messageIcon from '/icon-message.png';
import './messageIcon.css'

const MessageIcon:FC = () => {
  return (
    <img className={'message-icon'} src={messageIcon} alt={'message'}/>
  );
};

export default MessageIcon;
