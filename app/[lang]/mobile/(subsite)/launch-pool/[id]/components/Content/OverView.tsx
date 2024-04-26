import Image from 'next/image';
import React, { useContext, useMemo } from 'react';
import LaunchImg from '@/public/images/launch/launch_frame.png';
import HackLogo from '@/public/images/logo/black-icon-text-logo.svg';
import { separationNumber } from '@/helper/utils';
import Button from '@/components/Common/Button';
import { IoIosArrowForward } from 'react-icons/io';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { useCountDown } from 'ahooks';
import moment from 'moment';
import Link from 'next/link';
import { LaunchPoolProjectStatus } from '@/service/webApi/launchPool/type';
import { LaunchDetailContext } from '@/app/[lang]/(web)/(subsite)/launch-pool/[id]/constants/type';
import { linkIcons } from '@/app/[lang]/(web)/(subsite)/launch-pool/[id]/constants/data';

interface OverViewProp {
  claimToken: VoidFunction;
}

const TimeText: React.FC<Record<string, number>> = ({ d, h, m, s }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="text-neutral-black">
      {d}
      {t('day')} {h}
      {t('hour')} {m}
      {t('minutes')} {s}
      {t('seconds')}
    </div>
  );
};

const OverView: React.FC<OverViewProp> = ({ claimToken }) => {
  const { launchInfo, loading, joinWaitlist, participateNow } = useContext(LaunchDetailContext);

  const targetDate = useMemo(() => {
    switch (launchInfo.status) {
      case LaunchPoolProjectStatus.UPCOMING:
        return launchInfo.fuelStart;
      case LaunchPoolProjectStatus.FUELING:
        return launchInfo.allocationStart;
      case LaunchPoolProjectStatus.ALLOCATION:
        return launchInfo.airdropStart;
      case LaunchPoolProjectStatus.AIRDROP:
        return launchInfo.airdropEnd;
      default:
        return launchInfo.airdropEnd;
    }
  }, [launchInfo]);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const [countdown, formattedRes] = useCountDown({
    targetDate: moment(targetDate).format('YYYY-MM-DD HH:mm:ss')
  });
  const { days, hours, minutes, seconds } = formattedRes;

  const statusRender = () => {
    if (loading) return null;
    switch (launchInfo.status) {
      case LaunchPoolProjectStatus.UPCOMING:
        return {
          topTag: (
            <div className="body-m-bold flex items-center rounded-[.5rem] border-2 border-neutral-medium-gray px-[12px] py-[.25rem] uppercase text-neutral-medium-gray">
              {t('upComing')}
            </div>
          ),
          time: (
            <div className="flex [&>div]:flex-1">
              <div className=""> {t('fuelingStartsIn')}</div>
              <TimeText d={days} h={hours} m={minutes} s={seconds} />
            </div>
          ),
          button: !launchInfo.isJoined && (
            <Button type="primary" className="button-text-l h-[3rem] w-full uppercase" onClick={joinWaitlist}>
              {t('joinWaitlist')}
            </Button>
          )
        };
      case LaunchPoolProjectStatus.FUELING:
        return {
          topTag: (
            <div className="body-m-bold flex items-center rounded-[.5rem] border-2 border-status-success-dark px-[.75rem] py-[.25rem] uppercase text-status-success-dark">
              {t('liveNow')}
            </div>
          ),
          time: (
            <div className="flex [&>div]:flex-1">
              <div className=""> {t('fuelingClosesIn')}</div>
              <TimeText d={days} h={hours} m={minutes} s={seconds} />
            </div>
          ),
          button: !launchInfo.participateInfo?.isParticipate ? (
            <Button type="primary" className="button-text-l h-[3rem] w-full uppercase" onClick={participateNow}>
              {t('participateNow')}
            </Button>
          ) : null
        };
      case LaunchPoolProjectStatus.ALLOCATION:
        return {
          topTag: (
            <div className="body-m-bold flex items-center rounded-[.5rem] border-2 border-status-success-dark px-[.75rem] py-[.25rem] uppercase text-status-success-dark">
              {t('allocating')}
            </div>
          ),
          time: launchInfo.participateInfo?.isParticipate ? (
            <div className="flex [&>div]:flex-1">
              <div className=""> {t('allocationEndsin')}</div>
              <TimeText d={days} h={hours} m={minutes} s={seconds} />
            </div>
          ) : (
            <div className="flex [&>div]:flex-1">
              <div className=""> {t('airdropClosesin')}</div>
              <TimeText d={days} h={hours} m={minutes} s={seconds} />
            </div>
          ),
          button: !launchInfo.participateInfo?.isParticipate ? (
            <Button className="button-text-l h-[3rem] w-full cursor-not-allowed bg-neutral-light-gray uppercase text-neutral-medium-gray">
              {t('fuelingEnded')}
            </Button>
          ) : null
        };
      case LaunchPoolProjectStatus.AIRDROP:
        return {
          topTag: (
            <div className="body-m-bold flex items-center rounded-[.5rem] border-2 border-status-success-dark px-[.75rem] py-[.25rem]  uppercase text-status-success-dark">
              {t('airdrop')}
            </div>
          ),
          time: (
            <div className="flex [&>div]:flex-1">
              <div className=""> {t('airdropClosesin')}</div>
              <TimeText d={days} h={hours} m={minutes} s={seconds} />
            </div>
          ),
          button: !launchInfo.participateInfo?.isParticipate ? (
            <Button className="button-text-l h-[3rem] w-full cursor-not-allowed bg-neutral-light-gray uppercase text-neutral-medium-gray">
              {t('fuelingEnded')}
            </Button>
          ) : (
            <Button
              type="primary"
              className="button-text-l h-[3rem] w-full  uppercase "
              loading={loading}
              onClick={claimToken}
            >
              {t('claimToken')}
            </Button>
          )
        };
      case LaunchPoolProjectStatus.END:
        return {
          topTag: (
            <div className="body-m-bold flex items-center rounded-[.5rem] border-2 border-neutral-rich-gray px-[.75rem] py-[.25rem]  uppercase text-neutral-rich-gray">
              {t('ended')}
            </div>
          ),
          time: (
            <div className="flex [&>div]:flex-1">
              <div className=""> {t('airdropClosesin')}</div>
              <TimeText d={days} h={hours} m={minutes} s={seconds} />
            </div>
          ),
          button: (
            <Button className="button-text-l h-[3rem] w-full cursor-not-allowed bg-neutral-light-gray uppercase text-neutral-medium-gray">
              {t('ended')}
            </Button>
          )
        };
    }
  };
  return (
    <div className="">
      <div className="flex-center h-[16.875rem] w-full border-b border-t border-neutral-light-gray bg-neutral-white">
        <Image src={LaunchImg} alt="launch" width={243}></Image>
      </div>
      <div className="mt-[2.5rem] flex flex-1 flex-col gap-[20px] px-[1.25rem]">
        <div className="">
          <div className="item-center flex justify-between">
            <Image src={HackLogo} alt="hack-logo" width={163}></Image>
            {statusRender()?.topTag}
          </div>
          <h1 className="body-m mt-[.25rem] text-neutral-off-black">{launchInfo.name}</h1>
        </div>

        <div className="body-xs flex text-neutral-medium-gray">
          <div className="flex-1 ">
            <p> {t('totalParticipatedUsers')}</p>
            <p className="body-xl-bold mt-[.25rem] text-neutral-black">
              {launchInfo.status === LaunchPoolProjectStatus.UPCOMING ? '??' : separationNumber(launchInfo.userCount)}
            </p>
          </div>
          <div className="flex-1 ">
            <p> {t('totalFuel')}</p>
            <p className="body-xl-bold mt-[.25rem] text-neutral-black">
              {launchInfo.status === LaunchPoolProjectStatus.UPCOMING ? '??' : separationNumber(launchInfo.totalFuel)}
            </p>
          </div>
        </div>

        <div className="body-s text-neutral-medium-gray [&>div]:mb-[.5rem]">
          <div className="flex [&>div]:flex-1">
            <div className=""> {t('projectToken')}</div>
            <div className="text-neutral-black">${launchInfo.symbol}</div>
          </div>
          {statusRender()?.time}
          <div className="flex [&>div]:flex-1">
            <div className=""> {t('totalAirdropAmount')}</div>
            <div className="text-neutral-black">{`${launchInfo.airdropRatio * 100}% / ${separationNumber(launchInfo.totalAirdropAmount)} $${launchInfo.symbol}`}</div>
          </div>
          <div className="flex [&>div]:flex-1">
            <div className=""> {t('currentStakings')}</div>
            <div className="text-neutral-black">{`${separationNumber(launchInfo.currentStakings)} $${launchInfo.symbol}`}</div>
          </div>
          <div className="flex [&>div]:flex-1">
            <div className=""> {t('blockchainNetwork')}</div>
            <div className="text-neutral-black">Manta Network</div>
          </div>
          {launchInfo.participateInfo?.isParticipate && launchInfo.status !== LaunchPoolProjectStatus.END && (
            <div className="flex [&>div]:flex-1">
              <div className=""> {t('yourFuel')}</div>
              <div className="flex cursor-pointer items-center gap-[.5rem] text-neutral-off-black">
                <div className="relative">
                  {t('checkYourFuelingBoard')}
                  <div className="absolute bottom-0 left-0 h-[.125rem] w-full bg-yellow-primary"></div>
                </div>
                <IoIosArrowForward size={18} />
              </div>
            </div>
          )}
        </div>
        {statusRender()?.button}
        <div className="my-[.625rem] h-[.0625rem] w-full bg-neutral-light-gray"></div>
        <div className="body-s flex items-center text-neutral-medium-gray">
          <span className="flex-1 ">{t('links')}</span>
          <div className="flex flex-1 items-center justify-between">
            {linkIcons(true).map((v: any) => (
              <Link key={v.id} target="_blank" href={v.link}>
                {v.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
