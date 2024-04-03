import React, { useContext } from 'react';
import moment from 'moment';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { LaunchPoolProjectStatus } from '@/service/webApi/launchPool/type';
import { LaunchDetailContext } from '@/app/[lang]/(web)/(subsite)/launch-pool/[id]/constants/type';
import { titleTxtData } from '@/app/[lang]/(web)/(subsite)/launch-pool/[id]/constants/data';

interface TimeLineProp {}

const TimeLine: React.FC<TimeLineProp> = () => {
  const { launchInfo } = useContext(LaunchDetailContext);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const tagRender = (type: string) => {
    switch (type) {
      case 'fueling':
        switch (launchInfo.status) {
          case LaunchPoolProjectStatus.UPCOMING:
            return (
              <div className="caption-10pt w-fit rounded-[1.25rem] border border-neutral-rich-gray px-[.75rem] py-[.1875rem] text-neutral-rich-gray">
                {t('upComing')}
              </div>
            );
          case LaunchPoolProjectStatus.FUELING:
            return (
              <div className="caption-10pt w-fit rounded-[1.25rem] border border-status-success-dark px-[.75rem] py-[.1875rem] text-status-success-dark">
                {t('liveNow')}
              </div>
            );
          default:
            return (
              <div className="caption-10pt w-fit rounded-[1.25rem] border border-neutral-rich-gray px-[.75rem] py-[.1875rem] text-neutral-rich-gray">
                {t('ended')}
              </div>
            );
        }
      case 'allocation':
        switch (launchInfo.status) {
          case LaunchPoolProjectStatus.UPCOMING:
          case LaunchPoolProjectStatus.FUELING:
            return (
              <div className="caption-10pt w-fit rounded-[1.25rem] border border-neutral-rich-gray px-[.75rem] py-[.1875rem] text-neutral-rich-gray">
                {t('upComing')}
              </div>
            );
          case LaunchPoolProjectStatus.ALLOCATION:
            return (
              <div className="caption-10pt w-fit rounded-[1.25rem] border border-status-success-dark px-[.75rem] py-[.1875rem] text-status-success-dark">
                {t('liveNow')}
              </div>
            );
          default:
            return (
              <div className="caption-10pt w-fit rounded-[1.25rem] border border-neutral-rich-gray px-[.75rem] py-[.1875rem] text-neutral-rich-gray">
                {t('ended')}
              </div>
            );
        }
      case 'airdrop':
        switch (launchInfo.status) {
          case LaunchPoolProjectStatus.UPCOMING:
          case LaunchPoolProjectStatus.FUELING:
          case LaunchPoolProjectStatus.ALLOCATION:
            return (
              <div className="caption-10pt w-fit rounded-[1.25rem] border border-neutral-rich-gray px-[.75rem] py-[.1875rem] text-neutral-rich-gray">
                {t('upComing')}
              </div>
            );
          case LaunchPoolProjectStatus.AIRDROP:
            return (
              <div className="caption-10pt w-fit rounded-[1.25rem] border border-status-success-dark px-[.75rem] py-[.1875rem] text-status-success-dark">
                {t('liveNow')}
              </div>
            );
          default:
            return (
              <div className="caption-10pt w-fit rounded-[1.25rem] border border-neutral-rich-gray px-[.75rem] py-[.1875rem] text-neutral-rich-gray">
                {t('ended')}
              </div>
            );
        }
    }
  };
  const descriptionRender = () => {
    switch (launchInfo.status) {
      case LaunchPoolProjectStatus.UPCOMING:
      case LaunchPoolProjectStatus.FUELING:
        return (
          <div>
            <p>{t('fuelingDescriptionTop')}</p>
            <ul className="my-[10px] list-disc pl-[1.25rem]">
              <li>{t('fuelingDescription1')}</li>
              <li>{t('fuelingDescription2')}</li>
              <li>{t('fuelingDescription3')}</li>
            </ul>
            <p>
              <span>{t('fuelingDescriptionBottom')}</span>
              <span className="cursor-pointer underline">{t('allocationCalculation')}</span>
            </p>
          </div>
        );
      case LaunchPoolProjectStatus.ALLOCATION:
        return <p>{t('allocationDescription')}</p>;
      default:
        return <p>{t('airdropDescription')}</p>;
    }
  };
  return (
    <div className="px-[1.25rem]">
      <p className="text-h3-mob text-neutral-off-black">{t(titleTxtData[1])}</p>
      <div className="my-[1.25rem] flex justify-between gap-[.5rem] [&>div]:w-[calc((100%-1rem)/3)]">
        <div
          className={`rounded-[1rem] border  p-[.75rem] ${launchInfo.status === LaunchPoolProjectStatus.FUELING ? 'border-neutral-medium-gray bg-neutral-white' : 'border-neutral-light-gray'}`}
        >
          <p className="text-h4-mob text-neutral-off-black">{t('fueling')}</p>
          <div className="my-[.5rem]">{tagRender('fueling')}</div>
          <p className="body-xs text-neutral-rich-gray">
            {moment(launchInfo.fuelStart).format('ll').split(',').slice(0, 1)}
            {' - '}
            {moment(launchInfo.allocationStart).format('ll').split(',').slice(0, 1)}
          </p>
        </div>

        <div
          className={`rounded-[1rem] border   p-[.75rem] ${launchInfo.status === LaunchPoolProjectStatus.ALLOCATION ? 'border-neutral-medium-gray bg-neutral-white' : 'border-neutral-light-gray'}`}
        >
          <p className="text-h4-mob text-neutral-off-black">{t('allocation')}</p>
          <div className="my-[.5rem]">{tagRender('allocation')}</div>
          <p className="body-xs text-neutral-rich-gray">
            {moment(launchInfo.allocationStart).format('ll').split(',').slice(0, 1)}
            {' - '}
            {moment(launchInfo.airdropStart).format('ll').split(',').slice(0, 1)}
          </p>
        </div>

        <div
          className={`rounded-[1rem] border   p-[.75rem] ${launchInfo.status === LaunchPoolProjectStatus.AIRDROP || launchInfo.status === LaunchPoolProjectStatus.END ? 'border-neutral-medium-gray bg-neutral-white' : 'border-neutral-light-gray'}`}
        >
          <p className="text-h4-mob text-neutral-off-black">{t('airdrop')}</p>
          <div className="my-[.5rem]">{tagRender('airdrop')}</div>
          <p className="body-xs text-neutral-rich-gray">
            {moment(launchInfo.airdropStart).format('ll').split(',').slice(0, 1)}
            {' - '}
            {moment(launchInfo.airdropEnd).format('ll').split(',').slice(0, 1)}
          </p>
        </div>
      </div>
      <div className="body-s text-neutral-rich-gray">{descriptionRender()}</div>
    </div>
  );
};

export default TimeLine;
