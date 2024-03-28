import { useUserStore } from '@/store/zustand/userStore';
import React, { useContext } from 'react';
import { useShallow } from 'zustand/react/shallow';
import Image from 'next/image';
import { separationNumber } from '@/helper/utils';
import Button from '@/components/Common/Button';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { LaunchDetailContext, LaunchStatus } from '../../../constants/type';
import LockMask from '../../LockMask';
import { BiUser } from 'react-icons/bi';
import { FaLock } from 'react-icons/fa6';

interface InfoProp {}

const Info: React.FC<InfoProp> = () => {
  const { launchInfo } = useContext(LaunchDetailContext);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const { userInfo } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo
    }))
  );

  const statusRender = () => {
    switch (launchInfo.status) {
      case LaunchStatus.UN_FUELING:
        return {
          desc: <p className="body-l my-[40px] text-neutral-rich-gray">{t('fuelingDescription')}</p>,
          button: (
            <div className="flex justify-center">
              <Button type="primary" className="h-[60px] w-[477px] uppercase">
                {t('joinWaitlist')}
              </Button>
            </div>
          )
        };
      case LaunchStatus.FUELING:
        if (launchInfo.participate) return null;
        return {
          desc: <p className="body-l my-[40px] text-neutral-rich-gray">{t('fuelingDescription')}</p>,
          button: (
            <div className="flex justify-center">
              <Button type="primary" className="h-[60px] w-[477px] uppercase">
                {t('participateNow')}
              </Button>
            </div>
          )
        };
      case LaunchStatus.AIRDROPING:
        if (!launchInfo.participate) return null;
        return {
          button: (
            <div className="mt-[24px] flex justify-center">
              <Button type="primary" className="h-[60px] w-[270px] uppercase">
                {t('claimToken')}
              </Button>
            </div>
          )
        };
      case LaunchStatus.ALLOCATIONING:
        return null;
      case LaunchStatus.ENDED:
        if (!launchInfo.participate) return null;
        return {
          button: (
            <div className="mt-[24px] flex justify-center">
              <Button className="h-[60px] w-[270px] cursor-not-allowed bg-neutral-light-gray uppercase text-neutral-medium-gray">
                {t('claimed')}
              </Button>
            </div>
          )
        };
    }
  };
  return (
    <div className="body-l relative overflow-hidden rounded-[16px] border border-neutral-light-gray bg-neutral-white px-[40px] py-[32px]">
      {(launchInfo.status === LaunchStatus.ALLOCATIONING ||
        launchInfo.status === LaunchStatus.AIRDROPING ||
        launchInfo.status === LaunchStatus.ENDED) &&
        !launchInfo.participate && <LockMask text={t('dontParticipateText')} />}
      {launchInfo.status === LaunchStatus.ALLOCATIONING && launchInfo.participate && (
        <FaLock size={20} className="absolute left-[12px] top-[12px] text-neutral-rich-gray" />
      )}
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center">
          <div className="relative h-[74px] w-[74px] overflow-hidden rounded-[50%]">
            {!launchInfo.participate ? (
              <div className="flex-center h-full w-full bg-neutral-off-white text-neutral-light-gray">
                <BiUser size={40}></BiUser>
              </div>
            ) : (
              <Image src={userInfo?.avatar as string} alt="avatar" fill className="object-cover"></Image>
            )}
          </div>
          <p className="mt-[8px] text-neutral-black">{!launchInfo.participate ? 'N/A' : userInfo?.nickname}</p>
        </div>
        <div className="flex-1 border-r border-neutral-light-gray text-center">
          <p className="text-h2 text-neutral-off-black"> {!launchInfo.participate ? 'N/A' : separationNumber(24299)}</p>
          <p className="mt-[22px] text-neutral-medium-gray">{t('totalFuel')}</p>
        </div>
        <div className="flex-1 border-r border-neutral-light-gray text-center">
          <p className="text-h2 text-neutral-off-black"> {!launchInfo.participate ? 'N/A' : `#${95}`}</p>
          <p className="mt-[22px] text-neutral-medium-gray">{t('fuelRank')}</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-h2 text-neutral-off-black"> {!launchInfo.participate ? 'N/A' : `${22} #HQT`}</p>
          <p className="mt-[22px] text-neutral-medium-gray">{t('finalTokenShare')}</p>
        </div>
      </div>
      {statusRender()?.desc}
      {statusRender()?.button}
    </div>
  );
};

export default Info;
