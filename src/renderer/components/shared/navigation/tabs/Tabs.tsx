import React, { FC } from 'react';
import './tabs.scss';

export type TabsItem = {
  value: string
  view: string
  id: string
}

interface ITabsProps {
  items: TabsItem[];
  onSelectItem: (value: string) => void;
  selectedId?: string;
}

const Tabs: FC<ITabsProps> = ({ items, onSelectItem, selectedId }) => {
  return (
    <div className={'tabs'}>
      <div className={'tabs__tabs-item-list'}>
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item.value)}
            className={`tabs-item-list__item ${selectedId === item.id ? 'tabs-item-list__item_selected' : ''}`}
          >
            {item.view}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
