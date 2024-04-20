'use client';
import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { HiArrowLongRight } from 'react-icons/hi2';
import { IoAdd } from 'react-icons/io5';

interface ScheduleProp {
  hackathon: HackathonType;
}

const Schedule: React.FC<ScheduleProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [isExpandAll, setIsExpandAll] = useState(false);
  useEffect(() => {}, [isExpandAll]);
  return (
    <div>
      <div className="mb-[32px] flex items-center justify-between">
        <Title title={t('hackathonDetail.schedule')} className="mb-[0]" />
        <div className="underline-m cursor-pointer text-neutral-black" onClick={() => setIsExpandAll(!isExpandAll)}>
          {isExpandAll ? t('courses.collapseAll') : t('courses.expandAll')}
        </div>
      </div>
      <div className="body-l text-neutral-rich-gray">
        <div className="flex pb-[20px]">
          <div className="w-[280px]">Sep 1, 2023 - Dec 1, 2023</div>
          <div className="body-l-bold text-neutral-off-black">{t('hackathonDetail.registration')}</div>
        </div>

        <div className="border-t border-neutral-medium-gray py-[20px]">
          <div className="flex cursor-pointer pb-[24px]">
            <div className="w-[280px]">Dec 2, 2023</div>
            <div className="body-l-bold flex-1 text-neutral-off-black">{t('hackathonDetail.orientation')}</div>
            <div>
              <IoAdd size={28} />
              {/* <IoRemoveOutline size={28} /> */}
            </div>
          </div>
          <div className="flex flex-col gap-[24px] px-[16px]">
            {Array.from({ length: 3 }).map((_, i) => (
              <div className="flex" key={i}>
                <div className="w-[264px] flex-shrink-0">10:00 am - 12:00 pm</div>
                <div className="body-m flex-1 text-neutral-off-black">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt, sapien at maximus
                    tristique
                  </p>
                  <div className="body-s mt-[4px]  flex  text-neutral-black">
                    <div className="relative flex cursor-pointer items-center gap-[6px]">
                      <span>{t('hackathonDetail.openZoomMeeting')}</span>
                      <HiArrowLongRight size={16}></HiArrowLongRight>
                      <div className="absolute bottom-0 left-0 h-[2px] w-full rounded-[2px] bg-yellow-dark"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-neutral-medium-gray py-[20px]">
          <div className="flex pb-[24px]">
            <div className="w-[280px]">Dec 2, 2023</div>
            <div className="body-l-bold flex-1 text-neutral-off-black">{t('hackathonDetail.orientation')}</div>
            <div className="cursor-pointer">
              <IoAdd size={28} />
              {/* <IoRemoveOutline size={28} /> */}
            </div>
          </div>
          <div className="flex flex-col gap-[24px] px-[16px]">
            {Array.from({ length: 3 }).map((_, i) => (
              <div className="flex" key={i}>
                <div className="w-[264px] flex-shrink-0">10:00 am - 12:00 pm</div>
                <div className="body-m flex-1 text-neutral-off-black">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt, sapien at maximus
                    tristique
                  </p>
                  <div className="body-s mt-[4px]  text-neutral-rich-gray">
                    <span>{t('address')}：</span>
                    <span className="underline-s"> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
