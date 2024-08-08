import React, { useMemo } from 'react';
import BaseWinners from './BaseWinners';
import OtherWinners from './OtherWinners';
import Button from '@/components/Common/Button';
import { HackathonJugingInfoType, HackathonWinnerType } from '@/service/webApi/resourceStation/type';
import Loading from '@/components/Common/Loading';

interface WinnerViewProp {
  winners: HackathonWinnerType[];
  handleAdd: (type: 'base' | 'other') => void;
  handleDelete: (winner: HackathonWinnerType) => void;
  handleEdit: (winner: HackathonWinnerType) => void;
  loading: boolean;
  judgeInfo: HackathonJugingInfoType;
  handleAnnounce: VoidFunction;
}

const WinnerView: React.FC<WinnerViewProp> = ({
  winners,
  handleAdd,
  handleDelete,
  handleEdit,
  loading,
  judgeInfo,
  handleAnnounce
}) => {
  const { baseWinners, otherWinners, announceDisabled } = useMemo(() => {
    return {
      baseWinners: winners.filter((v) => v.type === 'base'),
      otherWinners: winners.filter((v) => v.type === 'other'),
      announceDisabled: winners.some((v) => !v.name || !v.project?.id) || !winners.length
    };
  }, [winners]);
  return (
    <Loading loading={loading}>
      <div className="flex flex-col gap-[28px]">
        <BaseWinners
          judgeInfo={judgeInfo}
          loading={loading}
          winners={baseWinners}
          handleEdit={handleEdit}
          handleAdd={() => handleAdd('base')}
          handleDelete={() => handleDelete(baseWinners[baseWinners.length - 1])}
        />
        <OtherWinners
          judgeInfo={judgeInfo}
          loading={loading}
          winners={otherWinners}
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
    </Loading>
  );
};

export default WinnerView;
