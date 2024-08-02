import React, { useMemo } from 'react';
import WinnerAdd from '../WinnerAdd';
import { HackathonWinnerType, HackathonJugingInfoType } from '@/service/webApi/resourceStation/type';
import Button from '@/components/Common/Button';

interface WinnerBelowProp {
  winners: HackathonWinnerType[];
  handleAdd: (type: 'base' | 'other') => void;
  handleDelete: (winner: HackathonWinnerType) => void;
  handleEdit: (winner: HackathonWinnerType) => void;
  loading: boolean;
  judgeInfo: HackathonJugingInfoType;
  handleAnnounce: VoidFunction;
}

const WinnerBelow: React.FC<WinnerBelowProp> = ({
  winners,
  handleAdd,
  handleDelete,
  handleEdit,
  loading,
  judgeInfo,
  handleAnnounce
}) => {
  const announceDisabled = useMemo(() => {
    return winners.some((v) => !v.name || !v.project?.id) || !winners.length;
  }, [winners]);
  return (
    <div className="flex flex-col gap-[16px]">
      <p className="text-h5">Please add winners below</p>
      <WinnerAdd
        judgeInfo={judgeInfo}
        loading={loading}
        winners={winners}
        handleEdit={handleEdit}
        handleAdd={() => handleAdd('other')}
        handleDelete={handleDelete}
      />
      {!judgeInfo.reward?.judge?.announce && (
        <div className="flex justify-end">
          <Button
            type="primary"
            className="h-[48px] w-[320px]"
            disabled={announceDisabled}
            onClick={() => {
              if (announceDisabled) return;
              handleAnnounce();
            }}
          >
            announce winners
          </Button>
        </div>
      )}
    </div>
  );
};

export default WinnerBelow;
