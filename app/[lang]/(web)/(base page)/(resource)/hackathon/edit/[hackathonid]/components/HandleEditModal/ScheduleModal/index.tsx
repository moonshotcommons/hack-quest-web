import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useMemo, useState } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import Button from '@/components/Common/Button';
import { HackathonEditContext, HackathonEditModalType } from '../../../constants/type';
import { v4 } from 'uuid';
import Edit from './Edit';
import Preview from './Preview';
import Title from '../../Title';

interface ScheduleModalProp {
  hackathon: HackathonType;
}

const ScheduleModal: React.FC<ScheduleModalProp> = ({ hackathon }) => {
  console.info(hackathon);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { setModalType } = useContext(HackathonEditContext);
  const [editIndexs, setEditIndexs] = useState<number[]>([]);
  const handleRemoveSection = () => {
    if (cantSubmit) return;
  };

  const schedules = useMemo(() => {
    return hackathon.schedule.map((v) => ({ ...v, id: v4() }));
  }, [hackathon]);

  const cantSubmit = useMemo(() => {
    return false;
  }, []);

  const handleRemoveEvent = () => {};

  const handleEdit = (i: number) => {
    setEditIndexs([...editIndexs, i]);
  };
  return (
    <div className="flex w-full flex-col gap-[24px]">
      <Title title={'hackathonDetail.schedule'} />
      <div className="flex flex-col gap-[24px]">
        {schedules.map((schedule, i) =>
          ~editIndexs.indexOf(i) ? (
            <Edit key={schedule.id} />
          ) : (
            <Preview
              schedule={schedule}
              key={schedule.id}
              handleRemoveEvent={() => handleRemoveEvent()}
              handleEdit={() => handleEdit(i)}
            />
          )
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="underline-m cursor-pointer text-neutral-off-black" onClick={handleRemoveSection}>
          {t('hackathonDetail.removeSection')}
        </span>
        <div className="flex gap-[16px]">
          <Button
            ghost
            className="h-[48px] w-[165px] uppercase"
            onClick={() => setModalType(HackathonEditModalType.NULL)}
          >
            {t('cancel')}
          </Button>
          <Button
            type="primary"
            disabled={cantSubmit}
            className={`h-[48px] w-[165px] uppercase ${cantSubmit && 'bg-neutral-light-gray text-neutral-medium-gray'}`}
          >
            {t('confirm')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
