import React, { useContext } from 'react';
import { MantleContext } from '../../../constants/type';
import TargetCard from '../../TargetCard';

interface TargetBoxProp {}

const TargetBox: React.FC<TargetBoxProp> = () => {
  const { targetList } = useContext(MantleContext);
  return (
    <div>
      <div className="body-l text-neutral-off-black">Targets to Achieve</div>
      {targetList.map((target) => (
        <TargetCard key={target.id} target={target} />
      ))}
    </div>
  );
};

export default TargetBox;
