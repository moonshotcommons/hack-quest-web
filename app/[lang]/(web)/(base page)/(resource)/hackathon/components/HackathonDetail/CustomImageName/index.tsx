import React, { useContext, useMemo, useRef, useState } from 'react';
import EditBox from '../EditBox';
import {
  HackathonInfoParterKeys,
  HackathonInfoSectionCustomType,
  HackathonType
} from '@/service/webApi/resourceStation/type';
import BaseImage from '@/components/Common/BaseImage';
import { VscChevronDown } from 'react-icons/vsc';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonEditContext, HackathonEditModalType } from '../../../constants/type';
import RemoveSectionModal, { RemoveSectionModalRef } from '../RemoveSectionModal';

interface CustomImageNameProp {
  custom: HackathonInfoSectionCustomType;
}

const CustomImageName: React.FC<CustomImageNameProp> = ({ custom }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [showAll, setShowAll] = useState(false);
  const { setEditCustomInfo } = useContext(HackathonEditContext);
  const removeSectionRef = useRef<RemoveSectionModalRef>(null);
  const list = useMemo(() => {
    return custom?.list || [];
  }, [custom]);
  return (
    <EditBox
      title={custom.title}
      className="border-none bg-transparent p-0"
      type={HackathonEditModalType.CUSTOM_IMAGE_NAME}
      custom={custom}
      handleDelete={() => {
        setEditCustomInfo(custom as HackathonInfoSectionCustomType);
        removeSectionRef.current?.open();
      }}
    >
      <div
        className={`body-s-bold flex flex-wrap gap-[20px] overflow-hidden text-neutral-off-black ${!showAll && 'max-h-[208px]'}`}
      >
        {list.map((v, i) => (
          <div
            className="flex h-[56px] w-[calc((100%-60px)/4)] flex-shrink-0 items-center gap-[5px] overflow-hidden rounded-[80px] border border-neutral-medium-gray bg-neutral-white p-[5px]"
            key={i}
          >
            <BaseImage src={v.picture} alt={v.name} className="h-[46px] w-[46px] flex-shrink-0 rounded-[50%]" />
            <span className="w-0 flex-1 truncate pr-[5px]" title={v.name}>
              {v.name}
            </span>
          </div>
        ))}
      </div>
      {list.length > 12 && (
        <div className="body-l mt-[20px] flex justify-end">
          <div className="flex cursor-pointer items-center gap-[8px]" onClick={() => setShowAll(!showAll)}>
            <span>{showAll ? t('showLess') : t('showAll')}</span>
            <VscChevronDown className={`body-xl transition ${showAll ? 'rotate-180' : ''}`} />
          </div>
        </div>
      )}
      <RemoveSectionModal ref={removeSectionRef} title={custom.title} type={HackathonEditModalType.CUSTOM_IMAGE_NAME} />
    </EditBox>
  );
};

export default CustomImageName;
