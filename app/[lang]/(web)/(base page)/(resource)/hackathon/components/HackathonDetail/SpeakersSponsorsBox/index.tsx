import React, { useContext, useMemo, useRef, useState } from 'react';
import EditBox from '../EditBox';
import { HackathonInfoSponsorsKeys, HackathonType } from '@/service/webApi/resourceStation/type';
import BaseImage from '@/components/Common/BaseImage';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { VscChevronDown } from 'react-icons/vsc';
import { HackathonEditContext, HackathonEditModalType } from '../../../constants/type';
import RemoveSectionModal, { RemoveSectionModalRef } from '../RemoveSectionModal';

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
    return hackathon.info?.[type]?.list || [];
  }, [hackathon, type]);
  if (!list.length) return null;
  return (
    <EditBox
      title={hackathon.info?.[type].title || `hackathonDetail.${type}`}
      className="border-none bg-transparent p-0"
      type={type as HackathonEditModalType}
      handleDelete={() => removeSectionRef.current?.open()}
    >
      <div
        className={`body-m-bold flex flex-wrap gap-[20px] overflow-hidden text-neutral-off-black ${!showAll && 'max-h-[280px]'}`}
      >
        {list.map((v, i) => (
          <div
            className="flex h-[80px] w-[calc((100%-20px)/2)] flex-shrink-0 items-center gap-[8px] overflow-hidden rounded-[100px] border border-neutral-light-gray bg-neutral-white p-[8px]"
            key={i}
          >
            <BaseImage src={v.picture} alt={v.name} className="h-[65px] w-[65px] flex-shrink-0 rounded-[50%]" />
            <div className="flex flex-1 flex-col justify-center">
              <p className="line-clamp-1" title={v.name}>
                {v.name}
              </p>
              <p className="body-xs line-clamp-2" title={v.title}>
                {v.title}
              </p>
            </div>
          </div>
        ))}
      </div>
      {list.length > 6 && (
        <div className="body-l mt-[20px] flex justify-end">
          <div className="flex cursor-pointer items-center gap-[8px]" onClick={() => setShowAll(!showAll)}>
            <span>{showAll ? t('showLess') : t('showAll')}</span>
            <VscChevronDown className={`body-xl transition ${showAll ? 'rotate-180' : ''}`} />
          </div>
        </div>
      )}
      <RemoveSectionModal ref={removeSectionRef} type={type} />
    </EditBox>
  );
};

export default SpeakersSponsorsBox;
