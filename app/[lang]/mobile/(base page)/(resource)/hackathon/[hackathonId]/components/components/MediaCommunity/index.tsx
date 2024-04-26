'use client';
import { MentorType } from '@/service/webApi/resourceStation/type';
import React, { useContext, useMemo, useState } from 'react';
import Image from 'next/image';
import { VscChevronDown } from 'react-icons/vsc';
import { BurialPoint } from '@/helper/burialPoint';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { TransNs } from '@/i18n/config';
import { cloneDeep } from 'lodash-es';
import Title from '../Title';

interface MediaCommunityProp {
  listData: MentorType[];
  title: string;
}

const MediaCommunity: React.FC<MediaCommunityProp> = ({ listData, title }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [showAll, setShowAll] = useState(false);
  const showList = useMemo(() => {
    return showAll ? cloneDeep(listData) : listData?.slice(0, 12);
  }, [showAll, listData]);
  if (!listData.length) return null;
  return (
    <div>
      <Title title={t(`hackathonDetail.${title}`)} />
      <div className="flex flex-wrap gap-[.5rem]">
        {showList.map((v: MentorType, i: number) => (
          <div key={i} className="w-[calc((100%-0.5rem)/2)]">
            <div className="relative h-0 w-full pt-[45%]">
              <Image src={v.picture as string} fill alt="picture" className="object-contain"></Image>
            </div>
          </div>
        ))}
      </div>
      {listData.length > 12 && (
        <div className="body-s mt-[1rem] flex justify-end">
          <div
            className="flex cursor-pointer items-center gap-[.5rem]"
            onClick={() => {
              setShowAll(!showAll);
              BurialPoint.track(`hackathonDetail show all 按钮点击`);
            }}
          >
            <span>{showAll ? t('showLess') : t('showAll')}</span>
            <VscChevronDown className={`body-s transition ${showAll ? 'rotate-180' : ''}`} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaCommunity;
