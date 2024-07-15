import React, { useContext, useEffect, useRef, useState } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonScheduleType, HackathonType } from '@/service/webApi/resourceStation/type';
import { IoAdd, IoRemoveOutline } from 'react-icons/io5';
import { cloneDeep } from 'lodash-es';
import EditBox from '../EditBox';
import dayjs from 'dayjs';
import RemoveSectionModal, { RemoveSectionModalRef } from '../RemoveSectionModal';
import { HackathonEditModalType } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
import { createEditor } from '@wangeditor/editor';
import { TEXT_EDITOR_TYPE } from '@/components/Common/TextEditor';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';

interface ScheduleProp {
  hackathon: HackathonType;
}

type ScheduleType = HackathonScheduleType & {
  isExpand: boolean;
};

const Schedule: React.FC<ScheduleProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [isExpandAll, setIsExpandAll] = useState(false);
  const [schedule, setSchedule] = useState<ScheduleType[]>([]);
  const removeSectionRef = useRef<RemoveSectionModalRef>(null);
  const { getHasHackathonSection } = useDealHackathonData();
  const handleExpand = (i: number) => {
    const newList = cloneDeep(schedule);
    newList[i].isExpand = !newList[i].isExpand;
    setSchedule(newList);
    setIsExpandAll(newList.some((v) => v.isExpand));
  };
  const handleExpandAll = () => {
    const isAll = !isExpandAll;
    const newList = schedule.map((v) => ({
      ...v,
      isExpand: isAll
    }));
    setIsExpandAll(isAll);
    setSchedule(newList);
  };
  useEffect(() => {
    const newList =
      hackathon.info?.sections?.schedule?.list?.map((v) => ({
        ...v,
        isExpand: false
      })) || [];
    setSchedule(newList);
  }, [hackathon]);
  if (!getHasHackathonSection('schedule')) return null;
  return (
    <EditBox
      title={'hackathonDetail.schedule'}
      className="rounded-[0] border-none bg-transparent p-0"
      type={HackathonEditModalType.SCHEDULE}
      handleDelete={() => removeSectionRef.current?.open()}
      isExpandAll={isExpandAll}
      handleExpandAll={handleExpandAll}
    >
      <div className="body-s text-neutral-rich-gray">
        {schedule?.map((v, i) => (
          <div className={`border-t  py-[1.25rem] ${i ? 'border-neutral-medium-gray' : 'border-transparent'}`} key={i}>
            <div
              className={`flex cursor-pointer items-center justify-between gap-[1.25rem]`}
              onClick={() => handleExpand(i)}
            >
              <div className="flex-1">
                <div className="">{`${dayjs(v.startTime).format('MMM D,YYYY H:mm')} - ${dayjs(v.endTime).format('MMM D,YYYY H:mm')}`}</div>
                <div className="body-m-bold text-neutral-off-black">{v.eventName}</div>
              </div>

              <div className="flex-shrink-0">{v.isExpand ? <IoRemoveOutline size={28} /> : <IoAdd size={28} />}</div>
            </div>
            {v.isExpand && (
              <div>
                <div className="text-neutral-medium-gray">{t('description')}</div>
                {/* <div className="mt-[4px] whitespace-pre-line text-neutral-off-black">{v.description}</div> */}
                {(v.description as any)?.type === TEXT_EDITOR_TYPE ? (
                  <div
                    className="reset-editor-style-mob mt-[4px] whitespace-pre-line text-neutral-off-black"
                    dangerouslySetInnerHTML={{
                      __html: createEditor({ content: (v.description as any)?.content || [] }).getHtml()
                    }}
                  ></div>
                ) : (
                  <div className="mt-[4px] whitespace-pre-line text-neutral-off-black">{v.description}</div>
                )}
                <div className="mt-[8px] flex flex-col gap-[8px]">
                  {v.link && (
                    <div>
                      <div className="text-neutral-medium-gray">{t('hackathonDetail.onlineMeetingURL')}</div>
                      <div className="text-neutral-off-black">{v.link}</div>
                    </div>
                  )}
                  {v.address && (
                    <div>
                      <div className="text-neutral-medium-gray">{t('hackathonDetail.onsiteMeetingAddress')}</div>
                      <div className="text-neutral-off-black">{v.address}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <RemoveSectionModal ref={removeSectionRef} type="schedule" />
    </EditBox>
  );
};

export default Schedule;
