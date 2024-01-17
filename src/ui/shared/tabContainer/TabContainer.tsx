import React, { FC, ReactNode } from 'react';
import './tab-container.scss';

interface ITabContainer {
  name: string;
  children: ReactNode;
}

const TabContainer: FC<ITabContainer> = ({ name, children }) => {
  return (
    <div className={`tab-container ${name}-tab`}>
      <label className={'tab-container__label'}>{name}</label>
      {children}
    </div>
  );
};

export default TabContainer;
