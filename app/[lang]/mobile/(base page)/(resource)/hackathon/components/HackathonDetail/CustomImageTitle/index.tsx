import React, { useContext, useMemo, useRef, useState } from 'react';
import EditBox from '../EditBox';
import { HackathonInfoSectionCustomType } from '@/service/webApi/resourceStation/type';
import BaseImage from '@/components/Common/BaseImage';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { VscChevronDown } from 'react-icons/vsc';
import RemoveSectionModal, { RemoveSectionModalRef } from '../RemoveSectionModal';
import {
  HackathonEditContext,
  HackathonEditModalType
} from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';

interface CustomImageTitleProp {
  custom: HackathonInfoSectionCustomType;
}

const CustomImageTitle: React.FC<CustomImageTitleProp> = ({ custom }) => {
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
      className="rounded-none border-none bg-transparent p-0"
      type={HackathonEditModalType.CUSTOM_IMAGE_TITLE}
      custom={custom}
      handleDelete={() => {
        setEditCustomInfo(custom as HackathonInfoSectionCustomType);
        removeSectionRef.current?.open();
      }}
    >
      <div
        className={`body-xs flex flex-col gap-[.5rem] overflow-hidden text-neutral-off-black ${!showAll && 'max-h-[11.5rem]'}`}
      >
        {list.map((v, i) => (
          <div
            className="flex h-[3.5rem] w-full flex-shrink-0 items-center gap-[.5rem] overflow-hidden rounded-[100px] border border-neutral-light-gray bg-neutral-white p-[8px]"
            key={i}
          >
            <BaseImage src={v.picture} alt={v.name} className="h-[2.5rem] w-[2.5rem] flex-shrink-0 rounded-[50%]" />
            <div className="flex flex-1 flex-col justify-center">
              <p className="line-clamp-1" title={v.name}>
                {v.name}
              </p>
              <p className="caption-10pt line-clamp-2" title={v.title}>
                {v.title}
              </p>
            </div>
          </div>
        ))}
      </div>
      {list.length > 3 && (
        <div className="body-s mt-[1rem] flex justify-end">
          <div className="flex cursor-pointer items-center gap-[.5rem]" onClick={() => setShowAll(!showAll)}>
            <span>{showAll ? t('showLess') : t('showAll')}</span>
            <VscChevronDown className={`body-m transition ${showAll ? 'rotate-180' : ''}`} />
          </div>
        </div>
      )}
      <RemoveSectionModal
        ref={removeSectionRef}
        title={custom.title}
        type={HackathonEditModalType.CUSTOM_IMAGE_TITLE}
      />
    </EditBox>
  );
};

export default CustomImageTitle;
