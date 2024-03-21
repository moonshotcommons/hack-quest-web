'use client';
import { FC, createContext, useMemo, useState } from 'react';

import { motion } from 'framer-motion';
import useGetHeight from '@/hooks/useGetHeight';
import ConnectWallet from './ConnectWallet';
import ConnectTwitter from './ConnectTwitter';
import ConnectDiscord from './ConnectDiscord';
import ConnectProgress from './ConnectProcess';
import { ConnectType } from './constant';
import Button from '@/components/Common/Button';
import EnterInviteCode from './EnterInviteCode';

export enum JoinStatus {
  InputEmail = 'input',
  Joined = 'joined'
}

interface ConnectModalContentProps {
  changeNavState: VoidFunction;
}

export const ConnectModalContentContext = createContext({
  changeNavState: () => {}
});

const ConnectModalContent: FC<ConnectModalContentProps> = ({
  changeNavState
}) => {
  const { pageHeight } = useGetHeight();
  const [currentConnectType, setCurrentConnectType] = useState(
    ConnectType.INVITE_CODE
  );

  const reset = () => {
    setTimeout(() => {}, 500);
  };

  const SlotComponent = useMemo(() => {
    switch (currentConnectType) {
      case ConnectType.WALLET:
        return <ConnectWallet />;
      case ConnectType.TWITTER:
        return <ConnectTwitter />;
      case ConnectType.DISCORD:
        return <ConnectDiscord />;
      case ConnectType.INVITE_CODE:
        return <EnterInviteCode />;
    }
  }, [currentConnectType]);

  return (
    <motion.div
      variants={{
        open: {
          transition: { staggerChildren: 0.07, delayChildren: 0.2 },
          opacity: 1,
          pointerEvents: 'auto',
          height: pageHeight
        },
        closed: {
          transition: { staggerChildren: 0.05, staggerDirection: -1 },
          opacity: 0,
          pointerEvents: 'none'
        }
      }}
      className="fixed bottom-0 left-0 top-[64px] flex  w-screen  flex-col border border-neutral-light-gray bg-neutral-white px-5 pb-[30px] pt-[94px]"
    >
      <ConnectModalContentContext.Provider value={{ changeNavState }}>
        <div>
          <div>
            <ConnectProgress connectType={currentConnectType} />
          </div>
          <div>{SlotComponent}</div>
        </div>
        <Button
          type="primary"
          className="button-text-l w-[270px] self-end py-4 uppercase"
        >
          Continue
        </Button>
      </ConnectModalContentContext.Provider>
    </motion.div>
  );
};

export default ConnectModalContent;
