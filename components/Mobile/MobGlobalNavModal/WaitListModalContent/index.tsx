'use client';
import { FC, createContext, useEffect, useMemo, useState } from 'react';

import { motion } from 'framer-motion';
import useGetHeight from '@/hooks/dom/useGetHeight';
import { useRequest } from 'ahooks';
import { errorMessage } from '@/helper/ui';
import InputEmail from './InputEmail';
import JoinedSuccess from './JoinedSuccess';
import Image from 'next/image';
import Loading from '@/public/images/other/loading.png';
import { useUserStore } from '@/store/zustand/userStore';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { NavType } from '../../MobLayout/constant';

const logo = (
  <svg width="168" height="20" viewBox="0 0 168 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1423_260)">
      <path
        d="M79.3557 17.3668H74.3769V2.66343H79.3557V17.3668ZM89.3485 2.66343H83.4736L79.3557 9.15577V10.0151L83.9001 17.3668H89.775L84.3345 9.58544L89.3485 2.66343ZM35.2993 2.66343V8.04283H31.3679V2.66343H26.3891V17.3668H31.3679V11.9112H35.2993V17.3668H40.2781V2.66343H35.2993ZM67.2785 13.505C65.3155 13.505 63.972 11.9375 63.972 10.0151C63.972 8.09277 65.3155 6.52519 67.2785 6.52519C68.7042 6.52519 69.7269 7.29256 70.0034 7.65653L72.4765 4.22048C71.7995 3.59109 69.7112 2.1628 66.7333 2.1628C61.4545 2.1628 58.7506 6.30051 58.7506 10.0151C58.7506 13.7297 61.4545 17.8674 66.7333 17.8674C69.7125 17.8674 71.7995 16.4391 72.4765 15.8097L70.0034 12.3737C69.7269 12.7377 68.7042 13.505 67.2785 13.505ZM53.5735 17.3694C52.8131 16.0331 51.4174 15.5456 50.0856 15.5456C48.7539 15.5456 47.3582 16.0331 46.5978 17.3694H41.8798L47.3778 2.6608H52.7961L58.294 17.3694H53.5761H53.5735ZM51.9835 12.3041L50.0843 7.02845L48.1852 12.3041C48.1852 12.3041 48.9404 11.9782 50.0282 11.9782H50.1378C51.227 11.9782 51.9809 12.3041 51.9809 12.3041H51.9835ZM53.5735 17.3694C52.8131 16.0331 51.4174 15.5456 50.0856 15.5456C48.7539 15.5456 47.3582 16.0331 46.5978 17.3694H41.8798L47.3778 2.6608H52.7961L58.294 17.3694H53.5761H53.5735ZM51.9835 12.3041L50.0843 7.02845L48.1852 12.3041C48.1852 12.3041 48.9404 11.9782 50.0282 11.9782H50.1378C51.227 11.9782 51.9809 12.3041 51.9809 12.3041H51.9835ZM167.401 2.66343H154.053V6.50549H158.238V17.3668H163.216V6.50549H167.401V2.66343ZM136.989 6.50549V2.66343H124.328V17.3668H129.307V17.3615H136.989V13.5195H129.307V11.6773H136.989V8.34899H129.307V6.5068H136.989V6.50549ZM147.876 8.09408H145.014C144.579 8.09408 144.227 7.73931 144.227 7.30175C144.227 6.8642 144.579 6.50943 145.014 6.50943H152.033V2.66737H143.849C141.287 2.66737 139.215 4.7763 139.248 7.36351C139.281 9.91131 141.389 11.9375 143.918 11.9375H146.78C147.214 11.9375 147.566 12.2922 147.566 12.7298C147.566 13.1673 147.214 13.5221 146.78 13.5221H139.764V17.3642H147.945C150.507 17.3642 152.579 15.2552 152.545 12.668C152.513 10.1202 150.405 8.09408 147.876 8.09408ZM116.692 2.66343V11.1175C116.692 12.2029 115.818 13.0832 114.741 13.0832C113.663 13.0832 112.789 12.2029 112.789 11.1175V2.66343H107.811V11.6602C107.811 15.5101 110.867 17.8411 114.688 17.87C118.54 17.899 121.672 15.6218 121.672 11.7482V2.66343H116.693H116.692ZM103.318 13.9754L106.446 12.7731L106.183 16.9016C106.183 16.9016 102.15 17.8674 97.7565 17.8674C92.2285 17.8674 89.7737 13.3631 89.7737 9.76677C89.7737 6.17042 92.4777 2.16411 97.7565 2.16411C103.035 2.16411 105.439 5.75652 105.293 9.3936C105.215 11.3567 104.224 13.0977 103.318 13.8467V13.9754ZM97.7578 13.505C99.5435 13.505 100.518 11.8363 100.518 10.0204C100.518 8.20445 99.5435 6.52651 97.7578 6.52651C95.9721 6.52651 94.9977 8.20445 94.9977 10.0204C94.9977 11.8363 95.9721 13.505 97.7578 13.505ZM17.5455 2.92885C19.3429 4.7395 20.4529 7.23737 20.4529 9.99934L19.9899 19.5953L10.5267 19.9987C7.7849 19.9987 5.30399 18.8792 3.50787 17.0698C1.71044 15.2605 0.599121 12.7626 0.599121 10.0007L0.999563 0.466461L10.5267 0C13.2685 0 15.7494 1.11951 17.5455 2.92885ZM14.625 5.99829C13.592 4.95762 12.165 4.31246 10.5893 4.31246C7.43663 4.31246 4.88007 6.88785 4.88007 10.0637C4.88007 11.651 5.52051 13.0885 6.55357 14.1292C7.58663 15.1698 9.01362 15.815 10.5893 15.815C13.7407 15.815 16.2972 13.2409 16.2985 10.0637C16.2985 8.47645 15.6581 7.03896 14.625 5.99829Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_1423_260">
        <rect width="166.802" height="20" fill="white" transform="translate(0.599121)" />
      </clipPath>
    </defs>
  </svg>
);

export enum JoinStatus {
  InputEmail = 'input',
  Joined = 'joined'
}

interface WaitListModalContentProps {
  changeNavState: VoidFunction;
}

export const WaitListModalContentContext = createContext({
  changeNavState: () => {}
});

const WaitListModalContent: FC<WaitListModalContentProps> = ({ changeNavState }) => {
  const { pageHeight } = useGetHeight();
  const [joinStatus, setJoinStatus] = useState(JoinStatus.InputEmail);
  const userInfo = useUserStore((state) => state.userInfo);
  const mobileNavModalToggleOpenHandle = useGlobalStore((state) => state.mobileNavModalToggleOpenHandle);
  const { loading, run: joinHandle } = useRequest(
    (email: string) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(true);
        }, 1500);
      });
    },
    {
      manual: true,
      onSuccess() {
        setJoinStatus(JoinStatus.Joined);
      },
      onError(e) {
        errorMessage(e);
      }
    }
  );

  const reset = () => {
    setTimeout(() => {
      setJoinStatus(JoinStatus.InputEmail);
    }, 500);
  };

  const SlotComponent = useMemo(() => {
    switch (joinStatus) {
      case JoinStatus.InputEmail:
        return (
          <InputEmail
            onSubmit={(email) => {
              joinHandle(email);
            }}
          />
        );
      case JoinStatus.Joined:
        return (
          <JoinedSuccess
            onClose={() => {
              reset();
              mobileNavModalToggleOpenHandle.toggleOpen();
              mobileNavModalToggleOpenHandle.setNavType(NavType.NAV_LIST);
            }}
          />
        );
    }
  }, [joinStatus, joinHandle, mobileNavModalToggleOpenHandle]);

  useEffect(() => {
    if (userInfo?.email) {
      joinHandle(userInfo.email);
    }
  }, [userInfo]);

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
      className="fixed bottom-0 left-0 top-[64px] flex  w-screen  flex-col border border-neutral-light-gray bg-neutral-white px-5 py-8"
    >
      <WaitListModalContentContext.Provider value={{ changeNavState }}>
        <div className="flex h-full w-full items-center justify-center">
          {loading && (
            <Image src={Loading} width={64} alt="loading" className="animate-spin object-contain opacity-100"></Image>
          )}
          {!loading && SlotComponent}
        </div>
      </WaitListModalContentContext.Provider>
    </motion.div>
  );
};

export default WaitListModalContent;
