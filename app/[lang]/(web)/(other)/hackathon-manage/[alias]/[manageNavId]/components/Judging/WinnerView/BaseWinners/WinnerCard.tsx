import React from 'react';
import WinnerProject from '../../WinnerProject';
import WinnerName from '../../WinnerName';

interface WinnerCardProp {
  handleChangeName: (prizeName: string) => void;
  winner: any;
}

const WinnerCard: React.FC<WinnerCardProp> = ({ winner, handleChangeName }) => {
  return (
    <div className="flex items-center gap-[20px] rounded-[10px] border border-neutral-light-gray px-[24px] py-[20px] text-neutral-off-black">
      <WinnerName project={winner} handleChangeName={handleChangeName} />
      <WinnerProject project={winner} />
    </div>
  );
};

export default WinnerCard;
