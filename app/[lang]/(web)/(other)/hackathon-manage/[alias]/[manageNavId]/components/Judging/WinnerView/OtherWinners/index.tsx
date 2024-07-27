import React from 'react';
import WinnerAdd from '../../WinnerAdd';

interface OtherWinnersProp {
  winners: any;
  setWinners: (winners: any) => void;
}

const OtherWinners: React.FC<OtherWinnersProp> = ({ winners, setWinners }) => {
  return (
    <div className="body-m flex flex-col gap-[16px] text-neutral-off-black">
      <p className="text-h5">Other Winners</p>
      <p className="text-neutral-rich-gray">
        You can add customized winners here, like Best Team Project, Best Solo Project, Best Design, etc..
      </p>
      <WinnerAdd winners={winners} setWinners={setWinners} />
    </div>
  );
};

export default OtherWinners;
