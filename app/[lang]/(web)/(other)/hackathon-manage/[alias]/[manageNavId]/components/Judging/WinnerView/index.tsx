import React, { useState } from 'react';
import BaseWinners from './BaseWinners';
import OtherWinners from './OtherWinners';
import Button from '@/components/Common/Button';
import { ConfirmModal } from '@/components/hackathon-org/modals/confirm-modal';

interface WinnerViewProp {}

const WinnerView: React.FC<WinnerViewProp> = () => {
  const [baseWinners, setBaseWinners] = useState<any>([
    {
      prizeName: 'fisrt',
      id: 1,
      image: '/images/learn/hack_logo.png',
      name: 'MetaLine-X',
      team: 'Scroll',
      rank: 1,
      totalVotes: 100
    },
    {
      prizeName: 'fisrt',
      id: 2,
      image: '/images/learn/hack_logo.png',
      name: 'MetaLine-X',
      team: 'Scroll',
      rank: 2,
      totalVotes: 100
    },
    {
      prizeName: 'fisrt1',
      id: 3,
      image: '/images/learn/hack_logo.png',
      name: 'MetaLine-X',
      team: 'Scroll',
      rank: 3,
      totalVotes: 100
    },
    {
      prizeName: 'fisrt2',
      id: 4,
      image: '/images/learn/hack_logo.png',
      name: 'MetaLine-X',
      team: 'Scroll',
      rank: 4,
      totalVotes: 100
    },
    {
      prizeName: 'fisrt3',
      id: 5,
      image: '/images/learn/hack_logo.png',
      name: 'MetaLine-X',
      team: 'Scroll',
      rank: 5,
      totalVotes: 100
    },
    {
      prizeName: 'fisrt4',
      id: 6,
      image: '/images/learn/hack_logo.png',
      name: 'MetaLine-X',
      team: 'Scroll',
      rank: 6,
      totalVotes: 100
    }
  ]);
  const [otherWinners, setOtherWinners] = useState<any>([]);
  const [announceOpen, setAnnounceOpen] = useState(false);
  const confirmAnnounce = () => {
    setAnnounceOpen(false);
  };
  return (
    <div className="flex flex-col gap-[28px]">
      <BaseWinners winners={baseWinners} setWinners={setBaseWinners} />
      <OtherWinners winners={otherWinners} setWinners={setOtherWinners} />
      <div className="flex justify-end">
        <Button className="h-[48px] w-[320px]" disabled={false} onClick={() => setAnnounceOpen(true)}>
          announce winners
        </Button>
      </div>
      <ConfirmModal
        open={announceOpen}
        autoClose={false}
        onClose={() => setAnnounceOpen(false)}
        onConfirm={confirmAnnounce}
        className=" px-[132px] sm:!w-[808px] sm:!max-w-[808px]"
      >
        <div className="body-m flex flex-col items-center gap-[40px] text-neutral-black">
          <p className="text-h3">Do you want to announce winners?</p>
          <p className="">
            This step cannot be undone and all submitters will be notified. Please check the reward announcement before
            you announce winners.
          </p>
          <p className="cursor-pointer underline">Click to check the reward announcement</p>
        </div>
      </ConfirmModal>
    </div>
  );
};

export default WinnerView;
