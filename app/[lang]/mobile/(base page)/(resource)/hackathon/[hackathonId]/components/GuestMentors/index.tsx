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
      <div className="flex flex-col gap-[.5rem]">
        {showList.map((v: MentorType, i: number) => (
          <div
            key={i}
            className="flex-row-center w-full  gap-[.25rem] rounded-[1.875rem] border border-neutral-medium-gray bg-neutral-off-white p-[.5rem] text-neutral-off-black"
          >
            <div className="relative h-[2.5rem] w-[2.5rem] overflow-hidden rounded-[50%]">
              <Image src={v.picture as string} alt="picture" fill className="object-cover"></Image>
            </div>
            <div className="flex h-[2.5rem] flex-1 flex-shrink-0 flex-col justify-center text-neutral-off-black">
              <p className="body-xs">{v.name}</p>
              <p className="caption-10pt line-clamp-1 pr-[1.25rem]">{v.title}</p>
            </div>
          </div>
        ))}
      </div>
      {listData.length > 6 && (
        <div className="body-s mt-[1rem] flex justify-end">
          <div className="flex cursor-pointer items-center gap-[.5rem]" onClick={() => setShowAll(!showAll)}>
            <span>{showAll ? t('showLess') : t('showAll')}</span>
            <VscChevronDown className={`body-s transition ${showAll ? 'rotate-180' : ''}`} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestMentors;
