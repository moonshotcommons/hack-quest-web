import { TransNs, Lang } from '@/i18n/config';
import React from 'react';
import Title from '../Title';
import { useTranslation } from '@/i18n/server';
import { titleTxtData, classTimeData } from '@/app/[lang]/(web)/(base page)/(learn)/web3mooc/constants/data';

interface ClassTimeProp {
  lang: Lang;
}

const ClassTime: React.FC<ClassTimeProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.LEARN);
  return (
    <div>
      <div className="mb-[1rem]">
        <Title title={t(titleTxtData[1])} />
      </div>
      <div className="body-s flex flex-col gap-[.625rem] text-neutral-rich-gray">
        <p>{`${t('ntuCourse.classTime.class')}:${classTimeData.class}`}</p>
        <p>{`${t('ntuCourse.classTime.discussionMentorship')}:${classTimeData.discussionMentorship}`}</p>
        <p className="body-s font-[300]">{t('ntuCourse.classTime.location')}</p>
      </div>
    </div>
  );
};

export default ClassTime;
