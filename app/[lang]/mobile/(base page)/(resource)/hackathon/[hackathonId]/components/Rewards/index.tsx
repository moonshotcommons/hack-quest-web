'use client';
import React, { useContext } from 'react';
import Title from '../components/Title';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import Box from '../components/Box';

interface RewardsProp {
  hackathon: HackathonType;
}

const Rewards: React.FC<RewardsProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div>
      <Title title={t('hackathonDetail.rewards')} />
      <div className="flex flex-col gap-[1rem]">
        <div className="flex flex-col gap-[.5rem]">
          <p className="text-h4-mob text-neutral-rich-gray">AI Track</p>
          <p className="body-s text-ring">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt, sapien at maximus tristique,
            tellus turpis feugiat dui, non tempus urna turpis sed ex. Curabitur in dolor elit.
          </p>
          <Box className="px-[2rem] py-[1.25rem] text-neutral-off-black">
            <div className="text-center">
              <p className=" text-h2-mob mb-[.25rem]">15000 USDT</p>
              <p className="body-s text-neutral-medium-gray">
                {t('hackathonDetail.trackTotalReward', {
                  track: 'AI'
                })}
              </p>
            </div>
            <div className=" my-[.5rem] h-[1px] bg-neutral-light-gray"></div>

            <div className="body-m flex  flex-col gap-[.25rem] [&>div]:flex [&>div]:items-center [&>div]:justify-between ">
              <div>
                <span className="body-s text-neutral-medium-gray">{t('hackathonDetail.firstPlace')}</span>
                <span>5000 USDC</span>
              </div>
              <div>
                <span className="body-s text-neutral-medium-gray">{t('hackathonDetail.secondPlace')}</span>
                <span>3000 USDC</span>
              </div>
              <div>
                <span className="body-s text-neutral-medium-gray">{t('hackathonDetail.thirdPlace')}</span>
                <span>2000 USDC</span>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
