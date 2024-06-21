import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useMemo } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { IoIosAddCircle } from 'react-icons/io';
import { HackathonEditContext, HackathonEditModalType } from '../../constants/type';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';

interface AddSectionProp {
  hackathon: HackathonType;
}

const AddSection: React.FC<AddSectionProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { setModalType, isEdit } = useContext(HackathonEditContext);
  const { dealModalList } = useDealHackathonData();
  const cantAdd = useMemo(() => {
    const list = dealModalList(hackathon);
    return list.every((v) => v.added);
  }, [hackathon]);
  if (cantAdd || !isEdit) return null;
  return (
    <div
      className="flex-center body-l w-full rounded-[16px] border border-dotted border-neutral-medium-gray py-[46px] text-neutral-medium-gray"
      onClick={() => setModalType(HackathonEditModalType.LIST)}
    >
      <div className="flex cursor-pointer items-center gap-[5px]">
        <IoIosAddCircle size={26} />
        <span>{t('hackathonDetail.addNewsection')}</span>
      </div>
    </div>
  );
};

export default AddSection;
