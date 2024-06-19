import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { IoIosAddCircle } from 'react-icons/io';
import { HackathonEditContext, HackathonEditModalType } from '../../constants/type';

interface AddSectionProp {
  hackathon: HackathonType;
}

const AddSection: React.FC<AddSectionProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { setModalType } = useContext(HackathonEditContext);
  return (
    <div className="flex-center body-l w-full rounded-[16px] border border-dotted border-neutral-medium-gray py-[46px] text-neutral-medium-gray">
      <div
        className="flex cursor-pointer items-center gap-[5px]"
        onClick={() => setModalType(HackathonEditModalType.LIST)}
      >
        <IoIosAddCircle size={26} />
        <span>{t('hackathonDetail.addNewsection')}</span>
      </div>
    </div>
  );
};

export default AddSection;
