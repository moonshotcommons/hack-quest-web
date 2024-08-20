import React from 'react';
import WinnerAdd from '../../WinnerAdd';
import { HackathonJugingInfoType, HackathonWinnerType } from '@/service/webApi/resourceStation/type';

interface OtherWinnersProp {
  winners: HackathonWinnerType[];
  handleAdd: VoidFunction;
  handleDelete: (winner: HackathonWinnerType) => void;
  handleEdit: (winner: HackathonWinnerType) => void;
  loading: boolean;
  judgeInfo: HackathonJugingInfoType;
}

const OtherWinners: React.FC<OtherWinnersProp> = (props) => {
  if (props.judgeInfo.reward?.judge?.announce && !props.winners.length) return null;
  return (
    <div className="body-m flex flex-col gap-[16px] text-neutral-off-black">
      <p className="text-h5">Other Winners</p>
      <p className="text-neutral-rich-gray">
        You can add customized winners here, like Best Team Project, Best Solo Project, Best Design, etc..
      </p>
      <WinnerAdd {...props} />
    </div>
  );
};

export default OtherWinners;
