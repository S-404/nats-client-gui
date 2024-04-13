import React, { FC } from 'react';
import iconSave from '/icon-save2.png';

import './saveIcon.css';


const SaveIcon: FC = () => {
  return (
    <img className={'save-icon'} src={iconSave} alt={'save'}/>
  );
};

export default SaveIcon;
