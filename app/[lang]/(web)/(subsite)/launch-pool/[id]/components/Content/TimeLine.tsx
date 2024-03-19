import React, { useContext } from 'react';
import { titleTxtData } from '../../constants/data';
import moment from 'moment';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';

interface TimeLineProp {}

const TimeLine: React.FC<TimeLineProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div>
      <p className="text-h3 text-neutral-off-black">{t(titleTxtData[1])}</p>
      <div className="my-[24px] flex gap-[20px] [&>div]:flex-1">
        <div className="rounded-[16px] border border-neutral-light-gray px-[20px] py-[16px]">
          <div className="flex items-center justify-between">
            <span className="text-h4 text-neutral-off-black">
              {t('fueling')}
            </span>
            <div className="caption-12pt rounded-[20px] border border-neutral-rich-gray px-[12px] py-[4px] text-neutral-rich-gray">
              ENDED
            </div>
          </div>
          <p className="mt-[8px] text-neutral-rich-gray">
            {moment(+new Date()).format('ll').split(',').slice(0, 1)}
          </p>
        </div>

        <div className="rounded-[16px] border border-neutral-light-gray px-[20px] py-[16px]">
          <div className="flex items-center justify-between">
            <span className="text-h4 text-neutral-off-black">
              {t('allocation')}
            </span>
            <div className="caption-12pt rounded-[20px] border border-neutral-rich-gray px-[12px] py-[4px] text-neutral-rich-gray">
              ENDED
            </div>
          </div>
          <p className="mt-[8px] text-neutral-rich-gray">
            {moment(+new Date()).format('ll').split(',').slice(0, 1)}
          </p>
        </div>

        <div className="rounded-[16px] border border-neutral-light-gray px-[20px] py-[16px]">
          <div className="flex items-center justify-between">
            <span className="text-h4 text-neutral-off-black">
              {t('airdrop')}
            </span>
            <div className="caption-12pt rounded-[20px] border border-status-success-dark px-[12px] py-[4px] text-status-success-dark">
              {t('liveNow')}
            </div>
          </div>
          <p className="mt-[8px] text-neutral-rich-gray">
            {moment(+new Date()).format('ll').split(',').slice(0, 1)}
          </p>
        </div>
      </div>
      <div className="body-s text-neutral-rich-gray">
        <div>
          <p>{t('fuelingDescriptionTop')}</p>
          <ul className="my-[10px] list-disc pl-[20px]">
            <li>{t('fuelingDescription1')}</li>
            <li>{t('fuelingDescription2')}</li>
            <li>{t('fuelingDescription3')}</li>
          </ul>
          <p>
            <span>{t('fuelingDescriptionBottom')}</span>
            <span className="cursor-pointer underline">
              {t('allocationCalculation')}
            </span>
          </p>
        </div>
        <p>{t('allocationDescription')}</p>
        <p>{t('airdropDescription')}</p>
      </div>
    </div>
  );
};

export default TimeLine;
