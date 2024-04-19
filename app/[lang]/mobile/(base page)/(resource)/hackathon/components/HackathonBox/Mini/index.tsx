'use client';
import React, { useContext, useMemo, useState } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import OnGoingHackathonCard from '../OnGoing/OnGoingHackathonCard';
import { LuChevronDown } from 'react-icons/lu';

interface MiniProp {
  miniHackathonList: HackathonType[];
}

const Mini: React.FC<MiniProp> = ({ miniHackathonList }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [listCount, setListCount] = useState(1);

  const list = useMemo(() => {
    return miniHackathonList.slice(0, listCount);
  }, [miniHackathonList, listCount]);
  if (!miniHackathonList.length) return null;
  return (
    <div className="mb-[3.75rem]">
      <p className="text-h2-mob text-neutral-black">{t('miniHacks')}</p>
      <p className="body-m mt-[.75rem] text-neutral-rich-gray">{t('miniHacksDescrition')}</p>
      <div>
        {list.map((hackathon) => (
          <div key={hackathon.id} className="mt-[20px]">
            <OnGoingHackathonCard hackathon={hackathon} />
          </div>
        ))}
      </div>
      {listCount >= miniHackathonList.length && (
        <div
          className="mt-[1.25rem] flex items-center justify-center gap-[.375rem]"
          onClick={() => setListCount((pre) => pre + 1)}
        >
          <span>{t('courses.viewMore')}</span>
          <LuChevronDown size={20} />
        </div>
      )}
    </div>
  );
};

export default Mini;
