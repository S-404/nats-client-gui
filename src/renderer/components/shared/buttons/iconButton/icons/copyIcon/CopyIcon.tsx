import React, { FC } from 'react';
import copiedIcon from '/icon-copy.png';
import './copyIcon.css'


const CopyIcon: FC = () => {
  return (
    <img className='copy-icon' src={copiedIcon} alt={'copy'}/>
  );
};

export default CopyIcon;
