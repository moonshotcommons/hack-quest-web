'use client';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useState } from 'react';
import Title from '../Title';
import Spcard from '../Spcard';
import { cloneDeep } from 'lodash-es';
import { sponsorsData, titleTxtData } from '@/app/[lang]/(web)/(base page)/(learn)/ntu-course/constants/data';

interface SponsorsProp {}

const Sponsors: React.FC<SponsorsProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
  const [list, setList] = useState(sponsorsData);
  const handleShowMore = (i: number) => {
    const newList = cloneDeep(list);
    newList[i].showMore = !newList[i].showMore;
    setList(newList);
  };
  return (
    <div>
      <div className="mb-[1rem]">
        <Title title={t(titleTxtData[5])} />
      </div>
      <div className="flex flex-col gap-[1.5rem]">
        {list.map((v, i) => (
          <div key={i} className="w-full">
            <Spcard info={v as any} handleShowMore={() => handleShowMore(i)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
