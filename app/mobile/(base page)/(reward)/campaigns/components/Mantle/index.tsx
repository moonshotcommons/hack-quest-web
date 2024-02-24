import React from 'react';
import MantleInfo from './MantleInfo';
import Progress from './Progress';
import TargetBox from './TagetBox';

interface MantleProp {}

const Mantle: React.FC<MantleProp> = ({}) => {
  return (
    <div className="pb-[6.25rem]">
      <MantleInfo />
      <TargetBox />
      <Progress />
    </div>
  );
};

export default Mantle;
