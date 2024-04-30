import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useState } from 'react';
import { guestSpeakersData, titleTxtData } from '../../constants/data';
import Title from '../Title';
import Spcard from '../Spcard';
import { cloneDeep } from 'lodash-es';

interface SpeakersProp {}

const Speakers: React.FC<SpeakersProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
  const [list, setList] = useState(guestSpeakersData);
  const handleShowMore = (i: number) => {
    const newList = cloneDeep(list);
    newList[i].showMore = !newList[i].showMore;
    setList(newList);
  };
  return (
    <div>
      <div className="mb-[32px]">
        <Title title={t(titleTxtData[4])} />
      </div>
      <div className="flex flex-wrap gap-x-[20px] gap-y-[32px]">
        {list.map((v, i) => (
          <div key={i} className="w-[calc((100%-20px)/2)]">
            <Spcard info={v as any} handleShowMore={() => handleShowMore(i)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Speakers;
