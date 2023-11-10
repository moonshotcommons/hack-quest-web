import React from 'react';
import MantleInfo from './MantleInfo';
import Progress from './Progress';
import TargetBox from './TagetBox';

interface MantleProp {}

const Mantle: React.FC<MantleProp> = ({}) => {
  return (
    <div className="p-[30px]">
      <MantleInfo />
      <Progress />
      <TargetBox />
    </div>
  );
};

export default Mantle;
