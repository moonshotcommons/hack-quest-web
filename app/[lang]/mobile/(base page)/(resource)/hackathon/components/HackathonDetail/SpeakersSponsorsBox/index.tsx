import React, { useContext, useMemo, useRef, useState } from 'react';
import EditBox from '../EditBox';
import { HackathonInfoSponsorsKeys, HackathonType } from '@/service/webApi/resourceStation/type';
import BaseImage from '@/components/Common/BaseImage';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { VscChevronDown } from 'react-icons/vsc';
import RemoveSectionModal, { RemoveSectionModalRef } from '../RemoveSectionModal';
import { HackathonEditModalType } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';

interface SpeakersSponsorsBoxProp {
  type: HackathonInfoSponsorsKeys;
  hackathon: HackathonType;
}

const SpeakersSponsorsBox: React.FC<SpeakersSponsorsBoxProp> = ({ type, hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [showAll, setShowAll] = useState(false);
  const removeSectionRef = useRef<RemoveSectionModalRef>(null);
  const list = useMemo(() => {
    return hackathon.info?.sections?.[type]?.list || [];
  }, [hackathon, type]);
  if (!list.length) return null;
  return (
    <EditBox
      title={hackathon.info?.sections?.[type]?.title || `hackathonDetail.${type}`}
      className="border-none bg-transparent p-0"
      type={type as HackathonEditModalType}
      handleDelete={() => removeSectionRef.current?.open()}
    >
      <div
        className={`body-xs flex flex-col gap-[.5rem] overflow-hidden text-neutral-off-black ${!showAll && 'max-h-[280px]'}`}
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
      {list.length > 6 && (
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

export default SpeakersSponsorsBox;
