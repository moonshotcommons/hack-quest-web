import { HackathonScheduleType } from '@/service/webApi/resourceStation/type';
import React, { useContext, useMemo } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import Button from '@/components/Common/Button';
import dayjs from '@/components/Common/Dayjs';
import { TEXT_EDITOR_TYPE } from '@/components/Common/TextEditor';
import { createEditor } from '@wangeditor/editor';

interface PreviewProp {
  schedule: HackathonScheduleType;
  handleEdit: VoidFunction;
  handleRemoveEvent: VoidFunction;
}

const Preview: React.FC<PreviewProp> = ({ schedule, handleEdit, handleRemoveEvent }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);

  const renderEditor = useMemo(() => {
    return (
      <div
        className="reset-editor-style mt-[4px] whitespace-pre-line text-neutral-off-black"
        dangerouslySetInnerHTML={{
          __html: createEditor({ content: structuredClone((schedule?.description as any)?.content) || [] }).getHtml()
        }}
      ></div>
    );
  }, [schedule.description]);
  return (
    <div
      className={`body-m flex flex-col gap-[8px] border-b border-neutral-medium-gray pb-[24px] text-neutral-off-black`}
    >
      <div className="flex items-center gap-[24px]">
        <span className="text-neutral-rich-gray">{`${dayjs(schedule.startTime).format('MMM D,YYYY H:mm')} - ${dayjs(schedule.endTime).format('MMM D,YYYY H:mm')}`}</span>
        <span className="body-l-bold">{schedule.eventName}</span>
      </div>
      <div className="flex flex-col gap-[8px]">
        <div>
          <div className="text-neutral-medium-gray">{'Description'}</div>
          {(schedule?.description as any).type === TEXT_EDITOR_TYPE ? (
            renderEditor
          ) : (
            <div className="mt-[4px] whitespace-pre-line  text-neutral-off-black">{schedule.description}</div>
          )}
        </div>
        {schedule.link && (
          <div>
            <div className="text-neutral-medium-gray">{'Online Meeting URL'}</div>
            <span className="mt-[4px] text-neutral-off-black">{schedule.link}</span>
          </div>
        )}
        {schedule.address && (
          <div>
            <div className="text-neutral-medium-gray">{'Onsite Meeting Address'}</div>
            <div className="mt-[4px] text-neutral-off-black">{schedule.address}</div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="underline-m cursor-pointer text-neutral-off-black" onClick={handleRemoveEvent}>
          {t('hackathonDetail.removeEvent')}
        </span>
        <div className="flex gap-[16px]">
          <Button ghost className="button-text-s h-[34px] w-[140px] uppercase" onClick={handleEdit}>
            {t('edit')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
