import React, { FC, ReactNode } from 'react';
import './tab-container.scss';

interface ITabContainer {
  name: string;
  children: ReactNode;
}

const TabContainer: FC<ITabContainer> = ({ name, children }) => {
  return (
    <div className={'tab-container'}>
      <label className={'tab-container__label'}>{name}</label>
      <div className={'tab-container__content'}>
        {children}
      </div>
    </div>
  );
};

export default TabContainer;
