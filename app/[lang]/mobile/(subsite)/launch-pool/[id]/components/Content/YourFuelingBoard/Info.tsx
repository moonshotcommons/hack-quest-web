import { useUserStore } from '@/store/zustand/userStore';
import React, { useContext } from 'react';
import { useShallow } from 'zustand/react/shallow';
import Image from 'next/image';
import { separationNumber } from '@/helper/utils';
import Button from '@/components/Common/Button';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import LockMask from '../../LockMask';
import { BiUser } from 'react-icons/bi';
import { FaLock } from 'react-icons/fa6';
import { LaunchPoolProjectStatus } from '@/service/webApi/launchPool/type';
import { LaunchDetailContext } from '@/app/[lang]/(web)/(subsite)/launch-pool/[id]/constants/type';

interface InfoProp {}

const Info: React.FC<InfoProp> = () => {
  const { launchInfo, loading, joinWaitlist, participateNow } = useContext(LaunchDetailContext);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const { userInfo } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo
    }))
  );

  const statusRender = () => {
    if (loading) return null;
    switch (launchInfo.status) {
      case LaunchPoolProjectStatus.UPCOMING:
        return {
          desc: <p className="body-l my-[40px] text-neutral-rich-gray">{t('fuelingDescription')}</p>,
          button: (
            <div className="flex justify-center">
              <Button type="primary" className="h-[60px] w-[477px] uppercase" onClick={joinWaitlist}>
                {t('joinWaitlist')}
              </Button>
            </div>
          )
        };
      case LaunchPoolProjectStatus.FUELING:
        if (launchInfo.participateInfo?.isParticipate) return null;
        return {
          desc: <p className="body-l my-[40px] text-neutral-rich-gray">{t('fuelingDescription')}</p>,
          button: (
            <div className="flex justify-center">
              <Button type="primary" className="h-[60px] w-[477px] uppercase" onClick={participateNow}>
                {t('participateNow')}
              </Button>
            </div>
          )
        };
      case LaunchPoolProjectStatus.AIRDROP:
        if (!launchInfo.participateInfo?.isParticipate) return null;
        return {
          button: (
            <div className="mt-[24px] flex justify-center">
              <Button type="primary" className="h-[60px] w-[270px] uppercase">
                {t('claimToken')}
              </Button>
            </div>
          )
        };
      case LaunchPoolProjectStatus.ALLOCATION:
        return null;
      case LaunchPoolProjectStatus.END:
        if (!launchInfo.participateInfo?.isParticipate) return null;
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
    <div className="body-l relative overflow-hidden rounded-[1rem] border border-neutral-light-gray bg-neutral-white p-[1.25rem]">
      {(launchInfo.status === LaunchPoolProjectStatus.ALLOCATION ||
        launchInfo.status === LaunchPoolProjectStatus.AIRDROP ||
        launchInfo.status === LaunchPoolProjectStatus.END) &&
        !launchInfo.participateInfo?.isParticipate && <LockMask text={t('dontParticipateText')} />}
      {launchInfo.status === LaunchPoolProjectStatus.ALLOCATION && launchInfo.participateInfo?.isParticipate && (
        <FaLock size={20} className="absolute left-[1rem] top-[1rem] text-neutral-rich-gray" />
      )}
      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-col items-center">
          <div className="relative h-[4.625rem] w-[4.625rem] overflow-hidden rounded-[50%]">
            {!launchInfo.participateInfo?.isParticipate ? (
              <div className="flex-center h-full w-full bg-neutral-off-white text-neutral-light-gray">
                <BiUser size={40}></BiUser>
              </div>
            ) : (
              <Image src={userInfo?.avatar as string} alt="avatar" fill className="object-cover"></Image>
            )}
          </div>
          <p className="body-m mt-[.5rem] text-neutral-black">
            {!launchInfo.participateInfo?.isParticipate ? 'N/A' : userInfo?.nickname}
          </p>
        </div>
        <div className="mt-[.625rem] flex w-full">
          <div className="flex-1 border-r border-neutral-light-gray text-center">
            <p className="text-h2-mob text-neutral-off-black">
              {' '}
              {!launchInfo.participateInfo?.isParticipate
                ? 'N/A'
                : separationNumber(launchInfo.participateInfo?.userLaunchProject?.totalFuel || 0)}
            </p>
            <p className="body-s mt-[1.25rem] text-neutral-medium-gray">{t('totalFuel')}</p>
          </div>
          <div className="flex-1 border-r border-neutral-light-gray text-center">
            <p className="text-h2-mob text-neutral-off-black">
              {' '}
              {!launchInfo.participateInfo?.isParticipate
                ? 'N/A'
                : `#${launchInfo.participateInfo?.userLaunchProject?.rank || 0}`}
            </p>
            <p className="body-s mt-[1.25rem] text-neutral-medium-gray">{t('fuelRank')}</p>
          </div>
          <div className="flex-1 px-[.75rem] text-center">
            <p className="text-h2-mob text-neutral-off-black">
              {' '}
              {!launchInfo.participateInfo?.isParticipate
                ? 'N/A'
                : `${launchInfo.participateInfo?.userLaunchProject?.estimatedToken || 0} $${launchInfo.symbol}`}
            </p>
            <p className="body-s  mt-[1.25rem] text-neutral-medium-gray">{t('finalTokenShare')}</p>
          </div>
        </div>
      </div>
      {statusRender()?.desc}
      {statusRender()?.button}
    </div>
  );
};

export default Info;
