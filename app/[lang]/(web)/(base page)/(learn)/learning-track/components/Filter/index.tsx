'use client';
import React from 'react';
import { LearningTrackTab, SearchInfoType } from '../../constants/type';
import { filterList } from '../../constants/data';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import { getSearchParamsUrl } from '@/helper/utils';
import MenuLink from '@/constants/MenuLink';
import Link from 'next/link';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';

interface FilterProp {
  searchInfo: SearchInfoType;
  lang: Lang;
}

const Filter: React.FC<FilterProp> = ({ searchInfo, lang }) => {
  const getSearchInfo = (info: SearchInfoType) => {
    const param = {
      ...info,
      track: info.track === LearningTrackTab.BASIC ? '' : info.track
    };
    return getSearchParamsUrl(param, MenuLink.LEARNING_TRACK);
  };

  const { t } = useTranslation(lang, TransNs.LEARN);

  return (
    <SlideHighlight
      className={`flex gap-[30px] pb-[2px]`}
      type="LEARNING_TRACK"
      currentIndex={filterList.findIndex((v) => v.value === searchInfo.language)}
    >
      {filterList.map((v) => (
        <Link key={v.value} href={getSearchInfo({ ...searchInfo, language: v.value })}>
          <div
            className={`body-l cursor-pointer  text-neutral-black ${searchInfo.language === v.value ? '  body-l-bold ' : ' '}`}
          >
            {t(v.label)}
          </div>
        </Link>
      ))}
    </SlideHighlight>
  );
};

export default Filter;
