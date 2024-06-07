import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext } from 'react';
import { titleTxtData } from '../../constants/data';
import Title from '../Title';

interface CourseDescProp {}

const CourseDesc: React.FC<CourseDescProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
  return (
    <div>
      <div className="mb-[32px]">
        <Title title={t(titleTxtData[1])} />
      </div>
      <div className="body-m flex flex-col gap-[20px] text-neutral-rich-gray">
        <p className="">{t('ntuCourse.courseDescription.text1')}</p>
        <p className="">{t('ntuCourse.courseDescription.text2')}</p>
        <p className="">{t('ntuCourse.courseDescription.text3')}</p>
      </div>
    </div>
  );
};

export default CourseDesc;
