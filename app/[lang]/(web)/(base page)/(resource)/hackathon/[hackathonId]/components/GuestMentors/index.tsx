'use client';
import { MentorType } from '@/service/webApi/resourceStation/type';
import React, { useMemo, useState, useContext } from 'react';
import Image from 'next/image';
import { VscChevronDown } from 'react-icons/vsc';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { TransNs } from '@/i18n/config';
import Title from '../components/Title';
import { cloneDeep } from 'lodash-es';

interface GuestMentorsProp {
  listData: MentorType[];
}

const GuestMentors: React.FC<GuestMentorsProp> = ({ listData }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [showAll, setShowAll] = useState(false);
  const showList = useMemo(() => {
    return showAll ? cloneDeep(listData) : listData?.slice(0, 6);
  }, [showAll, listData]);
  if (!listData.length) return null;
  return (
    <div>
      <Title title={t('hackathonDetail.guestsAndMentors')} />
      <div className="mt-[32px] flex flex-wrap gap-[20px]">
        {showList.map((v: MentorType, i: number) => (
          <div
            key={i}
            className="flex-row-center w-[calc(50%-10px)] gap-[10px] rounded-[100px] border border-neutral-medium-gray bg-neutral-off-white p-[10px]"
          >
            <div className="relative h-[65px] w-[65px] overflow-hidden rounded-[50%]">
              <Image src={v.picture as string} alt="picture" fill className="object-cover"></Image>
            </div>
            <div className="flex h-[65px] flex-1 flex-shrink-0 flex-col justify-center text-neutral-off-black">
              <p className="body-m-bold">{v.name}</p>
              <p className="body-xs line-clamp-2 pr-[40px]">{v.title}</p>
            </div>
          </div>
        ))}
      </div>
      {listData.length > 6 && (
        <div className="body-l mt-[20px] flex justify-end">
          <div className="flex cursor-pointer items-center gap-[8px]" onClick={() => setShowAll(!showAll)}>
            <span>{showAll ? t('showLess') : t('showAll')}</span>
            <VscChevronDown className={`body-xl transition ${showAll ? 'rotate-180' : ''}`} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestMentors;
