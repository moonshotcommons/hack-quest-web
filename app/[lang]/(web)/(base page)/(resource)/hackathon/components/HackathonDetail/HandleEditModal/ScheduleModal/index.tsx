import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { HackathonScheduleType, HackathonType } from '@/service/webApi/resourceStation/type';
import { HackathonEditContext, HackathonEditModalType } from '../../../../constants/type';
import { v4 } from 'uuid';
import Edit from './Edit';
import Preview from './Preview';
import Title from '../../Title';
import { IoIosAddCircle } from 'react-icons/io';
import CommonButton from '../CommonButton';
import RemoveSectionModal, { RemoveSectionModalRef } from '../../RemoveSectionModal';
import { cloneDeep } from 'lodash-es';
import { scheduleDefaultValues } from '../../../../constants/data';
import { ConfirmModal } from '@/components/hackathon-org/modals/confirm-modal';

interface ScheduleModalProp {
  hackathon: HackathonType;
}

const ScheduleModal: React.FC<ScheduleModalProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { modalType, setModalType, updateHackathon, loading } = useContext(HackathonEditContext);
  const [schedules, setSchedules] = useState<HackathonScheduleType[]>([]);
  const [editIds, setEditIds] = useState<string[]>([]);
  const removeSectionRef = useRef<RemoveSectionModalRef>(null);
  const [open, setOpen] = useState(false);
  const [removeSchedule, setRemoveSchedule] = useState<HackathonScheduleType | null>(null);
  const handleRemoveEvent = (item: HackathonScheduleType, index?: number) => {
    const isExist = hackathon.info?.sections?.schedule?.list?.some((v) => v.id === item.id);
    if (isExist) {
      setOpen(true);
      setRemoveSchedule(item);
    } else {
      const newSchedules = cloneDeep(schedules);
      newSchedules.splice(index as number, 1);
      setSchedules(newSchedules);
      const newEditIds = editIds.filter((v) => v !== item.id);
      setEditIds([...newEditIds]);
    }
  };

  const handleConfirmRemoveEvent = () => {
    const newSchedules = hackathon.info?.sections?.schedule?.list.filter((v) => v.id !== removeSchedule?.id);
    updateHackathon({
      data: {
        schedule: {
          list: newSchedules
        }
      },
      closeModal: false,
      cb() {
        const newEditIds = editIds.filter((v) => v !== removeSchedule?.id);
        setEditIds([...newEditIds]);
      }
    });
  };

  const handleAdd = (item: HackathonScheduleType) => {
    const index = schedules.findIndex((v) => v.id === item.id);
    const newSchedules = cloneDeep(schedules);
    if (index >= 0) {
      newSchedules[index] = item;
    } else {
      newSchedules.push(item);
    }
    updateHackathon({
      data: {
        schedule: {
          list: newSchedules
        }
      },
      closeModal: false,
      cb() {
        const newEditIds = editIds.filter((v) => v !== item.id);
        setEditIds([...newEditIds]);
      }
    });
  };
  useEffect(() => {
    const newSchedules = hackathon.info?.sections?.schedule?.list || [];
    setSchedules(newSchedules);
  }, [hackathon]);
  return (
    <div className="">
      <div className="px-[40px]">
        <Title title={'hackathonDetail.schedule'} />
      </div>
      <div className="scroll-wrap-y flex w-full flex-1 flex-col gap-[24px] px-[40px]">
        <div className="flex flex-col gap-[24px]">
          {schedules.map((schedule, i) =>
            ~editIds.indexOf(schedule.id) ? (
              <Edit
                key={schedule.id}
                hackathon={hackathon}
                schedule={schedule}
                handleRemoveEvent={() => handleRemoveEvent(schedule, i)}
                handleAdd={handleAdd}
              />
            ) : (
              <Preview
                schedule={schedule}
                key={schedule.id}
                handleRemoveEvent={() => handleRemoveEvent(schedule)}
                handleEdit={() => setEditIds([...editIds, schedule.id])}
              />
            )
          )}
        </div>
        <div
          className="h-[81px] flex-shrink-0 cursor-pointer rounded-[80px] bg-neutral-off-white p-[5px]"
          onClick={() => {
            const defaultValues = cloneDeep(scheduleDefaultValues);
            const id = v4();
            setEditIds([...editIds, id]);
            setSchedules([
              ...schedules,
              {
                ...defaultValues,
                id
              }
            ]);
          }}
        >
          <div className="flex-center h-full w-full rounded-[80px] border border-dashed border-neutral-light-gray text-neutral-medium-gray">
            <IoIosAddCircle size={32} />
          </div>
        </div>
      </div>

      <CommonButton handleSave={() => setModalType(HackathonEditModalType.NULL)} cantSubmit={editIds.length > 0} />
      <RemoveSectionModal ref={removeSectionRef} type={modalType} />
      <ConfirmModal open={open} onClose={() => setOpen(false)} onConfirm={handleConfirmRemoveEvent} isLoading={loading}>
        {`${t('hackathonDetail.confirmRemove', {
          block: `${removeSchedule?.eventName} ${t('hackathonDetail.schedule')}`
        })}`}
      </ConfirmModal>
    </div>
  );
};

export default ScheduleModal;
