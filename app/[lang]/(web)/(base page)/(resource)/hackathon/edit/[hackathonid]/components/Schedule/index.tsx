import React, { useContext, useEffect, useState } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonScheduleType, HackathonType } from '@/service/webApi/resourceStation/type';
import { HiArrowLongRight } from 'react-icons/hi2';
import { IoAdd, IoRemoveOutline } from 'react-icons/io5';
import Link from 'next/link';
import { cloneDeep } from 'lodash-es';
import EditBox from '../EditBox';
import { HackathonEditModalType } from '../../constants/type';

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
  // const handleExpandAll = () => {
  //   const isAll = !isExpandAll;
  //   const newList = hackathon.schedule?.map((v) => ({
  //     ...v,
  //     isExpand: v.children?.length > 0 ? isAll : false
  //   }));
  //   setIsExpandAll(isAll);
  //   setSchedule(newList);
  // };
  useEffect(() => {
    const newList =
      hackathon.info?.schedule?.list?.map((v) => ({
        ...v,
        isExpand: false
      })) || [];
    setSchedule(newList);
  }, [hackathon]);
  if (!schedule?.length) return null;
  return (
    <EditBox
      title={'hackathonDetail.schedule'}
      className="rounded-[0] border-none bg-transparent p-0"
      type={HackathonEditModalType.SCHEDULE}
      handleDelete={() => {}}
    >
      <div className="body-m mt-[-20px] text-neutral-rich-gray">
        {/* {schedule?.map((v, i) => (
          <div className={`border-t  py-[20px] ${i ? 'border-neutral-medium-gray' : 'border-transparent'}`} key={i}>
            <div className={`flex ${v.children?.length > 0 && 'cursor-pointer'}`} onClick={() => handleExpand(i)}>
              <div className="w-[340px]">{v.time}</div>
              <div className="body-l-bold flex-1 text-neutral-off-black">{v.desc}</div>
              {v.children?.length > 0 && <div>{v.isExpand ? <IoRemoveOutline size={28} /> : <IoAdd size={28} />}</div>}
            </div>
            {v.children?.length > 0 && v.isExpand && (
              <div className="mt-[24px] flex flex-col gap-[24px] px-[16px]">
                {v.children.map((c, j) => (
                  <div key={j}>
                    <div className="text-neutral-medium-gray">{t('description')}</div>
                    <div className="mt-[4px] whitespace-pre-line text-neutral-off-black">{c.desc}</div>
                    <div className="mt-[8px]">
                      {c.link && (
                        <div>
                          <div className="text-neutral-medium-gray">{t('hackathonDetail.onlineMeetingURL')}</div>
                          <Link href={c.link} target="_blank" className="mt-[4px] flex">
                            <div className="relative flex cursor-pointer items-center gap-[6px] text-neutral-off-black">
                              <span>{t('hackathonDetail.openMeeting')}</span>
                              <HiArrowLongRight size={16}></HiArrowLongRight>
                              <div className="absolute bottom-0 left-0 h-[2px] w-full rounded-[2px] bg-yellow-dark"></div>
                            </div>
                          </Link>
                        </div>
                      )}
                      {c.address && (
                        <div>
                          <div className="text-neutral-medium-gray">{t('hackathonDetail.onsiteMeetingAddress')}</div>
                          <div className="text-neutral-off-black">{c.address}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))} */}
      </div>
    </EditBox>
  );
};

export default Schedule;
