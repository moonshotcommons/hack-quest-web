import React from 'react';
import TargetCard from '../../components/TargetCard';

interface TargetBoxProp {}

const TargetBox: React.FC<TargetBoxProp> = () => {
  return (
    <div>
      <div className="text-[18px]">Targets to Achieve</div>
      <TargetCard target={{}} />
      <TargetCard target={{}} />
    </div>
  );
};

export default TargetBox;
