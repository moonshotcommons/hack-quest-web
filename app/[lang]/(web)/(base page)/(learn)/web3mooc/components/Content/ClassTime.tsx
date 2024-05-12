import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext } from 'react';
import Title from '../Title';
import { classTimeData, titleTxtData } from '../../constants/data';

interface ClassTimeProp {}

const ClassTime: React.FC<ClassTimeProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
  return (
    <div>
      <div className="mb-[32px]">
        <Title title={t(titleTxtData[1])} />
      </div>
      <div className="body-l flex flex-col gap-[20px] text-neutral-rich-gray">
        <p>{`${t('ntuCourse.classTime.class')}:${classTimeData.class}`}</p>
        <p>{`${t('ntuCourse.classTime.discussionMentorship')}:${classTimeData.discussionMentorship}`}</p>
        <p className="body-m font-[300]">{t('ntuCourse.classTime.location')}</p>
      </div>
    </div>
  );
};

export default ClassTime;
