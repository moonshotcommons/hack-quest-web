'use client';
import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonScheduleType, HackathonType } from '@/service/webApi/resourceStation/type';
import { HiArrowLongRight } from 'react-icons/hi2';
import { IoAdd, IoRemoveOutline } from 'react-icons/io5';
import Link from 'next/link';
import { cloneDeep } from 'lodash-es';

interface ScheduleProp {
  hackathon: HackathonType;
}

const Schedule: React.FC<ScheduleProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [isExpandAll, setIsExpandAll] = useState(false);
  const [schedule, setSchedule] = useState<HackathonScheduleType[]>([]);
  const handleExpand = (i: number) => {
    if (!schedule[i].children?.length) return;
    const newList = cloneDeep(schedule);
    newList[i].isExpand = !newList[i].isExpand;
    setSchedule(newList);
    setIsExpandAll(newList.some((v) => v.isExpand));
  };
  const handleExpandAll = () => {
    const isAll = !isExpandAll;
    const newList = hackathon.schedule?.map((v) => ({
      ...v,
      isExpand: v.children?.length > 0 ? isAll : false
    }));
    setIsExpandAll(isAll);
    setSchedule(newList);
  };
  useEffect(() => {
    const newList = hackathon.schedule?.map((v) => ({
      ...v,
      isExpand: false
    }));
    setSchedule(newList);
  }, [hackathon]);
  if (!hackathon.schedule?.length) return null;
  return (
    <div>
      <div className="mb-[32px] flex items-center justify-between">
        <Title title={t('hackathonDetail.schedule')} />
        {schedule.some((v) => v.children?.length > 0) && (
          <div className="underline-m cursor-pointer text-neutral-black" onClick={handleExpandAll}>
            {isExpandAll ? t('courses.collapseAll') : t('courses.expandAll')}
          </div>
        )}
      </div>
      <div className="body-l text-neutral-rich-gray">
        {schedule.map((v, i) => (
          <div className={`border-t  py-[20px] ${i ? 'border-neutral-medium-gray' : 'border-transparent'}`} key={i}>
            <div className="flex cursor-pointer" onClick={() => handleExpand(i)}>
              <div className="w-[280px]">{v.time}</div>
              <div className="body-l-bold flex-1 text-neutral-off-black">{v.desc}</div>
              {v.children?.length > 0 && <div>{v.isExpand ? <IoRemoveOutline size={28} /> : <IoAdd size={28} />}</div>}
            </div>
            {v.children?.length > 0 && v.isExpand && (
              <div className="mt-[24px] flex flex-col gap-[24px] px-[16px]">
                {v.children.map((c, j) => (
                  <div className="flex" key={j}>
                    <div className="w-[264px] flex-shrink-0">{c.time}</div>
                    <div className="body-m flex-1 text-neutral-off-black">
                      <p>{c.desc}</p>
                      {c.link && (
                        <div className="body-s mt-[4px]  flex  text-neutral-black">
                          <Link href={c.link}>
                            <div className="relative flex cursor-pointer items-center gap-[6px]">
                              <span>{t('hackathonDetail.openZoomMeeting')}</span>
                              <HiArrowLongRight size={16}></HiArrowLongRight>
                              <div className="absolute bottom-0 left-0 h-[2px] w-full rounded-[2px] bg-yellow-dark"></div>
                            </div>
                          </Link>
                        </div>
                      )}
                      {c.address && (
                        <div className="body-s mt-[4px]  text-neutral-rich-gray">
                          <span>{t('address')}：</span>
                          <span className="underline-s"> {c.address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
