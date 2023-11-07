import React from 'react';
import MantleInfo from './MantleInfo';
import Progress from './Progress';

interface MantleProp {}

const Mantle: React.FC<MantleProp> = ({}) => {
  return (
    <div className="h-full overflow-auto px-[30px]">
      <MantleInfo />
      <Progress />
    </div>
  );
};

export default Mantle;
