import React from 'react';
import { tabData } from './data';
import { divide } from 'lodash-es';

interface TabProp {
  curTab: string;
  changeTab: (tab: string) => void;
}

const Tab: React.FC<TabProp> = ({ curTab }) => {
  return (
    <div>
      {tabData.map((tab) => (
        <div key={tab.value}>{tab.label}</div>
      ))}
    </div>
  );
};

export default Tab;
