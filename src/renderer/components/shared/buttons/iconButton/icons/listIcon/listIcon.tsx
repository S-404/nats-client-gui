import React, { FC } from 'react';
import iconList from '/icon-list.png';

import './listIcon.css';

const ListIcon:FC = () => {
  return (
    <img className={'list-icon'} src={iconList} alt={'list'}/>
  );
};

export default ListIcon;
