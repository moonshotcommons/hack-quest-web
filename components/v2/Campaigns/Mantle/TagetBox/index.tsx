import React, { useContext, useState } from 'react';
import TargetCard from '../../components/TargetCard';
import { TargetType } from '@/service/webApi/campagins/type';
import { MantleContext } from '../type';

interface TargetBoxProp {}

const TargetBox: React.FC<TargetBoxProp> = () => {
  const { targetList } = useContext(MantleContext);
  return (
    <div>
      <div className="text-[18px]">Targets to Achieve</div>
      {targetList.map((target) => (
        <TargetCard key={target.id} target={target} />
      ))}
    </div>
  );
};

export default TargetBox;
