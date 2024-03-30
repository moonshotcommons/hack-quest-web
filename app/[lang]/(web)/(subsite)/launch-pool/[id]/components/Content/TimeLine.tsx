import React, { useContext } from 'react';
import { titleTxtData } from '../../constants/data';
import moment from 'moment';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { LaunchDetailContext } from '../../constants/type';
import { LaunchPoolProjectStatus } from '@/service/webApi/launchPool/type';

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
              <div className="caption-12pt rounded-[20px] border border-neutral-rich-gray px-[12px] py-[4px] text-neutral-rich-gray">
                {t('upComing')}
              </div>
            );
          case LaunchPoolProjectStatus.FUELING:
            return (
              <div className="caption-12pt rounded-[20px] border border-status-success-dark px-[12px] py-[4px] text-status-success-dark">
                {t('liveNow')}
              </div>
            );
          default:
            return (
              <div className="caption-12pt rounded-[20px] border border-neutral-rich-gray px-[12px] py-[4px] text-neutral-rich-gray">
                {t('ended')}
              </div>
            );
        }
      case 'allocation':
        switch (launchInfo.status) {
          case LaunchPoolProjectStatus.UPCOMING:
          case LaunchPoolProjectStatus.FUELING:
            return (
              <div className="caption-12pt rounded-[20px] border border-neutral-rich-gray px-[12px] py-[4px] text-neutral-rich-gray">
                {t('upComing')}
              </div>
            );
          case LaunchPoolProjectStatus.ALLOCATION:
            return (
              <div className="caption-12pt rounded-[20px] border border-status-success-dark px-[12px] py-[4px] text-status-success-dark">
                {t('liveNow')}
              </div>
            );
          default:
            return (
              <div className="caption-12pt rounded-[20px] border border-neutral-rich-gray px-[12px] py-[4px] text-neutral-rich-gray">
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
              <div className="caption-12pt rounded-[20px] border border-neutral-rich-gray px-[12px] py-[4px] text-neutral-rich-gray">
                {t('upComing')}
              </div>
            );
          case LaunchPoolProjectStatus.AIRDROP:
            return (
              <div className="caption-12pt rounded-[20px] border border-status-success-dark px-[12px] py-[4px] text-status-success-dark">
                {t('liveNow')}
              </div>
            );
          default:
            return (
              <div className="caption-12pt rounded-[20px] border border-neutral-rich-gray px-[12px] py-[4px] text-neutral-rich-gray">
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
            <ul className="my-[10px] list-disc pl-[20px]">
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
    <div>
      <p className="text-h3 text-neutral-off-black">{t(titleTxtData[1])}</p>
      <div className="my-[24px] flex gap-[20px] [&>div]:flex-1">
        <div
          className={`rounded-[16px] border  px-[20px] py-[16px] ${launchInfo.status === LaunchPoolProjectStatus.FUELING ? 'border-neutral-medium-gray bg-neutral-white' : 'border-neutral-light-gray'}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-h4 text-neutral-off-black">{t('fueling')}</span>
            {tagRender('fueling')}
          </div>
          <p className="mt-[8px] text-neutral-rich-gray">{moment(+new Date()).format('ll').split(',').slice(0, 1)}</p>
        </div>

        <div
          className={`rounded-[16px] border  px-[20px] py-[16px] ${launchInfo.status === LaunchPoolProjectStatus.ALLOCATION ? 'border-neutral-medium-gray bg-neutral-white' : 'border-neutral-light-gray'}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-h4 text-neutral-off-black">{t('allocation')}</span>
            {tagRender('allocation')}
          </div>
          <p className="mt-[8px] text-neutral-rich-gray">{moment(+new Date()).format('ll').split(',').slice(0, 1)}</p>
        </div>

        <div
          className={`rounded-[16px] border  px-[20px] py-[16px] ${launchInfo.status === LaunchPoolProjectStatus.AIRDROP || launchInfo.status === LaunchPoolProjectStatus.END ? 'border-neutral-medium-gray bg-neutral-white' : 'border-neutral-light-gray'}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-h4 text-neutral-off-black">{t('airdrop')}</span>
            {tagRender('airdrop')}
          </div>
          <p className="mt-[8px] text-neutral-rich-gray">{moment(+new Date()).format('ll').split(',').slice(0, 1)}</p>
        </div>
      </div>
      <div className="body-s text-neutral-rich-gray">{descriptionRender()}</div>
    </div>
  );
};

export default TimeLine;
