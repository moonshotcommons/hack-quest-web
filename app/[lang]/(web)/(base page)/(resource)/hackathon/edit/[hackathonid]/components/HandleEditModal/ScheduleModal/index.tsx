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
import { IoIosAddCircle } from 'react-icons/io';

interface ScheduleModalProp {
  hackathon: HackathonType;
}

const ScheduleModal: React.FC<ScheduleModalProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { setModalType } = useContext(HackathonEditContext);
  const [editIndexs, setEditIndexs] = useState<number[]>([]);
  const handleRemoveSection = () => {
    if (cantSubmit) return;
  };

  const cantSubmit = useMemo(() => {
    return false;
  }, []);

  const handleRemoveEvent = () => {};

  const handleEdit = (i: number) => {
    setEditIndexs([...editIndexs, i]);
  };
  return (
    <div className="">
      <div className="px-[40px]">
        <Title title={'hackathonDetail.schedule'} />
      </div>
      <div className="scroll-wrap-y flex w-full flex-1 flex-col gap-[24px] px-[40px]">
        <div className="flex flex-col gap-[24px]">
          {hackathon.info?.schedule?.list?.map((schedule, i) =>
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
        <div className="h-[81px] flex-shrink-0 cursor-pointer rounded-[80px] bg-neutral-off-white p-[5px]">
          <div className="flex-center h-full w-full rounded-[80px] border border-dashed border-neutral-light-gray text-neutral-medium-gray">
            <IoIosAddCircle size={32} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-[40px]">
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
