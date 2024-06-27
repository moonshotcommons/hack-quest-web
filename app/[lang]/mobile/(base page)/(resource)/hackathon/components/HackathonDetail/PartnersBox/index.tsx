import React, { useContext, useMemo, useRef, useState } from 'react';
import EditBox from '../EditBox';
import { HackathonInfoParterKeys, HackathonType } from '@/service/webApi/resourceStation/type';
import BaseImage from '@/components/Common/BaseImage';
import { VscChevronDown } from 'react-icons/vsc';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import RemoveSectionModal, { RemoveSectionModalRef } from '../RemoveSectionModal';
import { HackathonEditModalType } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';

interface PartnersBoxProp {
  type: HackathonInfoParterKeys;
  hackathon: HackathonType;
}

const PartnersBox: React.FC<PartnersBoxProp> = ({ type, hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [showAll, setShowAll] = useState(false);
  const removeSectionRef = useRef<RemoveSectionModalRef>(null);
  const list = useMemo(() => {
    return hackathon.info?.[type]?.list || [];
  }, [hackathon, type]);
  if (!list.length) return null;
  return (
    <EditBox
      title={hackathon.info?.[type]?.title || `hackathonDetail.${type}`}
      className="border-none bg-transparent p-0"
      type={type as HackathonEditModalType}
      handleDelete={() => removeSectionRef.current?.open()}
    >
      <div
        className={`body-s-bold flex flex-wrap gap-[.5rem] overflow-hidden text-neutral-off-black ${!showAll && 'max-h-[208px]'}`}
      >
        {list.map((v, i) => (
          <div
            className="flex h-[3.5rem] w-[calc((100%-0.5rem)/2)] flex-shrink-0 items-center gap-[.3125rem] overflow-hidden rounded-[5rem] border border-neutral-medium-gray bg-neutral-white p-[.3125rem]"
            key={i}
          >
            <BaseImage src={v.picture} alt={v.name} className="h-[2.875rem] w-[2.875rem] flex-shrink-0 rounded-[50%]" />
            <span className="w-0 flex-1 truncate pr-[5px]" title={v.name}>
              {v.name}
            </span>
          </div>
        ))}
      </div>
      {list.length > 12 && (
        <div className="body-s mt-[1rem] flex justify-end">
          <div className="flex cursor-pointer items-center gap-[.5rem]" onClick={() => setShowAll(!showAll)}>
            <span>{showAll ? t('showLess') : t('showAll')}</span>
            <VscChevronDown className={`body-m transition ${showAll ? 'rotate-180' : ''}`} />
          </div>
        </div>
      )}
      <RemoveSectionModal ref={removeSectionRef} type={type} />
    </EditBox>
  );
};

export default PartnersBox;
