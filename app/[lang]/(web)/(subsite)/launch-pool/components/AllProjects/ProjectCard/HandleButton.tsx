'use client';
import { FC, useRef } from 'react';
import { ProjectStatus } from '.';
import Button from '@/components/Common/Button';
import WaitListModal, {
  WaitListModalInstance
} from '@/components/Web/Business/WaitListModal';
import { useUserStore } from '@/store/zustand/userStore';
import ConnectModal, {
  ConnectModalInstance
} from '@/components/Web/Business/ConnectModal';

interface HandleButtonProps {
  status: ProjectStatus;
}

const HandleButton: FC<HandleButtonProps> = ({ status }) => {
  const waitListRef = useRef<WaitListModalInstance>(null);
  const connectModalRef = useRef<ConnectModalInstance>(null);
  const userInfo = useUserStore((state) => state.userInfo);

  const renderButton = () => {
    switch (status) {
      case ProjectStatus.UPCOMING:
        return (
          <Button
            type="primary"
            className="button-text-l w-[270px] max-w-[270px] py-4 uppercase"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              waitListRef.current?.onJoin(userInfo?.email);
            }}
          >
            Join waitlist
          </Button>
        );
      case ProjectStatus.LIVE_NOW:
        return (
          <Button
            type="primary"
            className="button-text-l w-[270px] max-w-[270px] py-4 uppercase"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              connectModalRef.current?.onConnect();
            }}
          >
            Participate now
          </Button>
        );
      case ProjectStatus.CLOSED:
        return (
          <Button
            ghost
            className="button-text-l w-[270px] max-w-[270px] py-4 uppercase"
          >
            See more
          </Button>
        );
    }
  };
  return (
    <>
      {renderButton()}
      <WaitListModal ref={waitListRef} />
      <ConnectModal ref={connectModalRef} />
    </>
  );
};

export default HandleButton;
