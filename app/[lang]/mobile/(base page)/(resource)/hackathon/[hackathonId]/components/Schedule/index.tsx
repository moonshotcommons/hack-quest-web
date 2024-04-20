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
        <div className="underline-s cursor-pointer text-neutral-black" onClick={() => setIsExpandAll(!isExpandAll)}>
          {isExpandAll ? t('courses.collapseAll') : t('courses.expandAll')}
        </div>
      </div>
      <div className="body-s text-neutral-rich-gray">
        <div className="pb-[20px]">
          <div>Sep 1, 2023 - Dec 1, 2023</div>
          <div className="body-m-bold text-neutral-off-black">{t('hackathonDetail.registration')}</div>
        </div>

        <div className="border-t border-neutral-medium-gray py-[1.25rem]">
          <div className="cursor-pointer pb-[1.5rem]">
            <div className="w-[280px]">Dec 2, 2023</div>
            <div className="flex cursor-pointer items-center justify-between">
              <div className="body-l-bold flex-1 text-neutral-off-black">{t('hackathonDetail.orientation')}</div>
              <div>
                <IoAdd size={24} />
                {/* <IoRemoveOutline size={24} /> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[1.5rem]">
            {Array.from({ length: 3 }).map((_, i) => (
              <div className="" key={i}>
                <div>10:00 am - 12:00 pm</div>
                <div className="body-s  text-neutral-off-black">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt, sapien at maximus
                    tristique
                  </p>
                  <div className="body-s mt-[.25rem]  flex  text-neutral-black">
                    <div className="relative flex cursor-pointer items-center gap-[.375rem]">
                      <span>{t('hackathonDetail.openZoomMeeting')}</span>
                      <HiArrowLongRight size={16}></HiArrowLongRight>
                      <div className="absolute bottom-0 left-0 h-[.125rem] w-full rounded-[.125rem] bg-yellow-dark"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-neutral-medium-gray py-[1.25rem]">
          <div className="cursor-pointer pb-[1.5rem]">
            <div className="w-[280px]">Dec 2, 2023</div>
            <div className="flex cursor-pointer items-center justify-between">
              <div className="body-l-bold flex-1 text-neutral-off-black">{t('hackathonDetail.orientation')}</div>
              <div>
                <IoAdd size={24} />
                {/* <IoRemoveOutline size={24} /> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[1.5rem]">
            {Array.from({ length: 3 }).map((_, i) => (
              <div className="" key={i}>
                <div>10:00 am - 12:00 pm</div>
                <div className="body-s  text-neutral-off-black">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt, sapien at maximus
                    tristique
                  </p>
                  <div className="caption-12pt mt-[.25rem]  text-neutral-rich-gray">
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
