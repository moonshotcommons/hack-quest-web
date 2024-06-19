import React, { useContext, useState } from 'react';
import EditBox from '../EditBox';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import BaseImage from '@/components/Common/BaseImage';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { VscChevronDown } from 'react-icons/vsc';

interface SpeakersSponsorsBoxProp {
  type: 'speakersAndJudges' | 'sponsors';
  hackathon: HackathonType;
}

const SpeakersSponsorsBox: React.FC<SpeakersSponsorsBoxProp> = ({ type, hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [showAll, setShowAll] = useState(false);
  // const list = useMemo(() => {
  //   return showAll ? hackathon[type] : hackathon[type]?.slice(0, 6);
  // }, [showAll]);
  return (
    <EditBox title={`hackathonDetail.${type}`} className="border-none bg-transparent p-0">
      <div
        className={`body-m-bold flex flex-wrap gap-[20px] overflow-hidden text-neutral-off-black ${!showAll && 'max-h-[280px]'}`}
      >
        {hackathon[type]?.map((v, i) => (
          <div
            className="flex h-[80px] w-[calc((100%-20px)/2)] flex-shrink-0 items-center gap-[8px] overflow-hidden rounded-[100px] border border-neutral-light-gray bg-neutral-white p-[8px]"
            key={i}
          >
            <BaseImage src={v.avatar} alt={v.firstName} className="h-[65px] w-[65px] flex-shrink-0 rounded-[50%]" />
            <div className="flex flex-1 flex-col justify-center">
              <p className="line-clamp-1" title={v.firstName}>
                {v.firstName}
              </p>
              <p className="body-xs line-clamp-2" title={v.lastName}>
                {v.lastName}
              </p>
            </div>
          </div>
        ))}
      </div>
      {hackathon[type]?.length > 6 && (
        <div className="body-l mt-[20px] flex justify-end">
          <div className="flex cursor-pointer items-center gap-[8px]" onClick={() => setShowAll(!showAll)}>
            <span>{showAll ? t('showLess') : t('showAll')}</span>
            <VscChevronDown className={`body-xl transition ${showAll ? 'rotate-180' : ''}`} />
          </div>
        </div>
      )}
    </EditBox>
  );
};

export default SpeakersSponsorsBox;
