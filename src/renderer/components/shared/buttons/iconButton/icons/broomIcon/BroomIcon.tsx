import React, { FC } from 'react';
import iconBroom from '/icon-broom.png';

import './broomIcon.css';


const BroomIcon: FC = () => {
  return (
    <img className={'broom-icon'} src={iconBroom} alt={'broom'}/>
  );
};

export default BroomIcon;
