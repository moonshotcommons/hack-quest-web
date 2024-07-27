import React, { useState } from 'react';
import WinnerAdd from '../WinnerAdd';
import { Button } from '@/components/ui/button';
import { ConfirmModal } from '@/components/hackathon-org/modals/confirm-modal';

interface WinnerBelowProp {}

const WinnerBelow: React.FC<WinnerBelowProp> = () => {
  const [winners, setWinners] = useState<any>([]);
  const [announceOpen, setAnnounceOpen] = useState(false);
  const confirmAnnounce = () => {
    setAnnounceOpen(false);
  };
  return (
    <div className="flex flex-col gap-[16px]">
      <p className="text-h5">Please add winners below</p>
      <WinnerAdd winners={winners} setWinners={setWinners} />
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
          <p className="">This step cannot be undone and all winners will be notified.</p>
        </div>
      </ConfirmModal>
    </div>
  );
};

export default WinnerBelow;
