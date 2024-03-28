import Image from 'next/image';
import React, { useContext } from 'react';
import LaunchImg from '@/public/images/launch/launch_frame.png';
import HackLogo from '@/public/images/logo/light-footer-logo.svg';
import { separationNumber } from '@/helper/utils';
import Button from '@/components/Common/Button';
import { linksIcon } from '../../constants/data';
import { IoIosArrowForward } from 'react-icons/io';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { LaunchDetailContext, LaunchStatus } from '../../constants/type';

interface OverViewProp {}

const OverView: React.FC<OverViewProp> = () => {
  const { launchInfo } = useContext(LaunchDetailContext);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);

  const statusRender = () => {
    switch (launchInfo.status) {
      case LaunchStatus.UN_FUELING:
        return {
          topTag: (
            <div className="body-m-bold flex h-[34px] items-center rounded-[8px] border-2 border-neutral-medium-gray px-[12px] uppercase text-neutral-medium-gray">
              {t('upComing')}
            </div>
          ),
          time: (
            <div className="flex [&>div]:flex-1">
              <div className=""> {t('fuelingStartsIn')}</div>
              <div className="text-neutral-black">5D 4H 48M 21MM</div>
            </div>
          ),
          button: (
            <Button type="primary" className="button-text-l h-[60px] w-full uppercase">
              {t('joinWaitlist')}
            </Button>
          )
        };
      case LaunchStatus.FUELING:
        return {
          topTag: (
            <div className="body-m-bold flex h-[34px] items-center rounded-[8px] border-2 border-status-success-dark px-[12px] uppercase text-status-success-dark">
              {t('liveNow')}
            </div>
          ),
          time: (
            <div className="flex [&>div]:flex-1">
              <div className=""> {t('fuelingClosesIn')}</div>
              <div className="text-neutral-black">5D 4H 48M 21MM</div>
            </div>
          ),
          button: !launchInfo.participate ? (
            <Button type="primary" className="button-text-l h-[60px] w-full uppercase">
              {t('participateNow')}
            </Button>
          ) : null
        };
      case LaunchStatus.ALLOCATIONING:
        return {
          topTag: (
            <div className="body-m-bold flex h-[34px] items-center rounded-[8px] border-2 border-status-success-dark px-[12px] uppercase text-status-success-dark">
              {t('allocating')}
            </div>
          ),
          time: launchInfo.participate ? (
            <div className="flex [&>div]:flex-1">
              <div className=""> {t('allocationEndsin')}</div>
              <div className="text-neutral-black">5D 4H 48M 21MM</div>
            </div>
          ) : (
            <div className="flex [&>div]:flex-1">
              <div className=""> {t('airdropClosesin')}</div>
              <div className="text-neutral-black">5D 4H 48M 21MM</div>
            </div>
          ),
          button: !launchInfo.participate ? (
            <Button className="button-text-l h-[60px] w-full cursor-not-allowed bg-neutral-light-gray uppercase text-neutral-medium-gray">
              {t('fuelingEnded')}
            </Button>
          ) : null
        };
      case LaunchStatus.AIRDROPING:
        return {
          topTag: (
            <div className="body-m-bold flex h-[34px] items-center rounded-[8px] border-2 border-status-success-dark px-[12px] uppercase text-status-success-dark">
              {t('airdrop')}
            </div>
          ),
          time: (
            <div className="flex [&>div]:flex-1">
              <div className=""> {t('airdropClosesin')}</div>
              <div className="text-neutral-black">5D 4H 48M 21MM</div>
            </div>
          ),
          button: !launchInfo.participate ? (
            <Button className="button-text-l h-[60px] w-full cursor-not-allowed bg-neutral-light-gray uppercase text-neutral-medium-gray">
              {t('fuelingEnded')}
            </Button>
          ) : (
            <Button type="primary" className="button-text-l h-[60px] w-full  uppercase ">
              {t('claimToken')}
            </Button>
          )
        };
      default:
        return {
          topTag: (
            <div className="body-m-bold flex h-[34px] items-center rounded-[8px] border-2 border-neutral-rich-gray px-[12px] uppercase text-neutral-rich-gray">
              {t('ended')}
            </div>
          ),
          time: (
            <div className="flex [&>div]:flex-1">
              <div className=""> {t('airdropClosesin')}</div>
              <div className="text-neutral-black">5D 4H 48M 21MM</div>
            </div>
          ),
          button: (
            <Button className="button-text-l h-[60px] w-full cursor-not-allowed bg-neutral-light-gray uppercase text-neutral-medium-gray">
              {t('ended')}
            </Button>
          )
        };
    }
  };
  return (
    <div className="flex gap-[40px]">
      <div className="flex-center w-[498px] rounded-[16px] border border-neutral-light-gray bg-neutral-white">
        <Image src={LaunchImg} alt="launch" width={341}></Image>
      </div>
      <div className="flex flex-1 flex-col gap-[20px]">
        <div className="">
          <div className="item-center flex justify-between">
            <Image src={HackLogo} alt="hack-logo" width={280}></Image>
            {statusRender().topTag}
          </div>
          <h1 className="body-l mt-[4px] text-neutral-off-black">{launchInfo.name}</h1>
        </div>

        <div className="body-s flex text-neutral-medium-gray">
          <div className="flex-1 ">
            <p> {t('totalParticipatedUsers')}</p>
            <p className="body-xl-bold mt-[4px] text-neutral-black">
              {launchInfo.status === LaunchStatus.UN_FUELING ? '??' : separationNumber(35120)}
            </p>
          </div>
          <div className="flex-1 ">
            <p> {t('totalFuel')}</p>
            <p className="body-xl-bold mt-[4px] text-neutral-black">
              {launchInfo.status === LaunchStatus.UN_FUELING ? '??' : separationNumber(35120)}
            </p>
          </div>
        </div>

        <div className="body-m text-neutral-medium-gray [&>div]:mb-[8px]">
          <div className="flex [&>div]:flex-1">
            <div className=""> {t('projectToken')}</div>
            <div className="text-neutral-black">$HQT</div>
          </div>
          {statusRender()?.time}
          <div className="flex [&>div]:flex-1">
            <div className=""> {t('totalAirdropAmount')}</div>
            <div className="text-neutral-black">{`${2}% / ${separationNumber(2000000)} $HQT`}</div>
          </div>
          <div className="flex [&>div]:flex-1">
            <div className=""> {t('currentStakings')}</div>
            <div className="text-neutral-black">{`${separationNumber(10000000)} $MNT`}</div>
          </div>
          <div className="flex [&>div]:flex-1">
            <div className=""> {t('blockchainNetwork')}</div>
            <div className="text-neutral-black">Manta Network</div>
          </div>
          {launchInfo.participate && launchInfo.status !== LaunchStatus.ENDED && (
            <div className="flex [&>div]:flex-1">
              <div className=""> {t('yourFuel')}</div>
              <div className="flex cursor-pointer items-center gap-[8px] text-neutral-off-black">
                <div className="relative">
                  {t('checkYourFuelingBoard')}
                  <div className="absolute bottom-0 left-0 h-[2px] w-full bg-yellow-primary"></div>
                </div>
                <IoIosArrowForward size={18} />
              </div>
            </div>
          )}
        </div>
        {statusRender().button}
        <div className="my-[10px] h-[1px] w-full bg-neutral-light-gray"></div>
        <div className="body-m flex items-center text-neutral-medium-gray">
          <span className="flex-1 ">{t('links')}</span>
          <div className="flex flex-1 items-center justify-between">
            {linksIcon.hack}
            {linksIcon.file}
            {linksIcon.discord}
            {linksIcon.twitter}
            {linksIcon.telegram}
            {linksIcon.email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
