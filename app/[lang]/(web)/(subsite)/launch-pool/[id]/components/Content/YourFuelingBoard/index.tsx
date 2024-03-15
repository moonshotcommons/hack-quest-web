import React from 'react';

import { titleTxtData } from '../../../constants/data';
import Info from './Info';
import StakeFuel from './StakeFuel';
import InvitationFuel from './InvitationFuel';
import TargetFuel from './TargetFuel';

interface YourFuelingBoardProp {}

const YourFuelingBoard: React.FC<YourFuelingBoardProp> = () => {
  return (
    <div className="mt-[120px]">
      <p className="text-h3 text-neutral-off-black">{titleTxtData[2]}</p>
      <p className="body-l my-[24px] text-neutral-black">
        Congratulations! It’s time to claim your token!
      </p>
      <Info />
      <StakeFuel />
      <InvitationFuel />
      <TargetFuel />
    </div>
  );
};

export default YourFuelingBoard;
