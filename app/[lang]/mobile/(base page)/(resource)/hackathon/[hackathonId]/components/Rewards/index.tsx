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

const Rewards: React.FC<RewardsProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  if (!hackathon.rewards?.length) return null;
  return (
    <div>
      <Title title={t('hackathonDetail.rewards')} />
      <div className="flex flex-col gap-[1rem]">
        {hackathon.rewards.map((v, i) => (
          <div className="flex flex-col gap-[.5rem]" key={i}>
            <p className="text-h4-mob text-neutral-rich-gray">{v.name}</p>
            <p className="body-s whitespace-pre-line text-neutral-rich-gray">{v.desc}</p>
            <Box className="px-[2rem] py-[1.25rem] text-neutral-off-black">
              <div className="text-center">
                <p className=" text-h2-mob mb-[.25rem]">{v.totalPlace} USD</p>
                <p className="body-s text-neutral-medium-gray">
                  {t('hackathonDetail.trackTotalReward', {
                    track: ''
                  })}
                </p>
              </div>
              {v.place?.length > 0 && (
                <>
                  <div className=" my-[.5rem] h-[1px] bg-neutral-light-gray"></div>

                  <div className="body-m flex  flex-col gap-[.25rem] [&>div]:flex [&>div]:items-center [&>div]:justify-between ">
                    {v.place?.[0] > 0 && (
                      <div>
                        <span className="body-s text-neutral-medium-gray">{t('hackathonDetail.firstPlace')}</span>
                        <span>{v.place?.[0] || 0} USD</span>
                      </div>
                    )}
                    {v.place?.[1] > 0 && (
                      <div>
                        <span className="body-s text-neutral-medium-gray">{t('hackathonDetail.secondPlace')}</span>
                        <span>{v.place?.[1] || 0} USD</span>
                      </div>
                    )}
                    {v.place?.[2] > 0 && (
                      <div>
                        <span className="body-s text-neutral-medium-gray">{t('hackathonDetail.thirdPlace')}</span>
                        <span>{v.place?.[2] || 0} USD</span>
                      </div>
                    )}
                    {v.place?.[3] > 0 && (
                      <div>
                        <span className="body-s text-neutral-medium-gray">{'Fourth Place'}</span>
                        <span>{v.place?.[3] || 0} USD</span>
                      </div>
                    )}
                    {v.place?.[4] > 0 && (
                      <div>
                        <span className="body-s text-neutral-medium-gray">{'Fifth Place'}</span>
                        <span>{v.place?.[4] || 0} USD</span>
                      </div>
                    )}
                    {v.place?.[5] > 0 && (
                      <div>
                        <span className="body-s text-neutral-medium-gray">{'Sixth Place'}</span>
                        <span>{v.place?.[5] || 0} USD</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </Box>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
