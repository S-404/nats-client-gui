import React, { CSSProperties, FC } from 'react';

import './badge.scss';


interface IBadgeProps {
  text: string;
  badgeStyle?: CSSProperties;
}

const Badge: FC<IBadgeProps> = ({ text, badgeStyle }) => {
  return (
    <div className={'badge'} style={{ ...badgeStyle }}>
      {text}
    </div>
  );
};

export default Badge;
