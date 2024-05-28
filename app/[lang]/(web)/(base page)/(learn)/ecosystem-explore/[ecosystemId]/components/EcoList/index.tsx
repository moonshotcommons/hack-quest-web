import React from 'react';
import Ecard from './Ecard';

interface EcoListProp {}

const EcoList: React.FC<EcoListProp> = ({}) => {
  return (
    <div className="flex flex-col gap-[100px]">
      <Ecard />
    </div>
  );
};

export default EcoList;
