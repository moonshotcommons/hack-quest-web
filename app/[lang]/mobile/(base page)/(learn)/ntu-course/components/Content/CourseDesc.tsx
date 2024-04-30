import { TransNs, Lang } from '@/i18n/config';
import React from 'react';
import Title from '../Title';
import { titleTxtData } from '@/app/[lang]/(web)/(base page)/(learn)/ntu-course/constants/data';
import { useTranslation } from '@/i18n/server';

interface CourseDescProp {
  lang: Lang;
}

const CourseDesc: React.FC<CourseDescProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.LEARN);
  return (
    <div>
      <div className="mb-[1rem]">
        <Title title={t(titleTxtData[6])} />
      </div>
      <div className="body-s flex flex-col gap-[.625rem] text-neutral-rich-gray">
        <p className="">{t('ntuCourse.courseDescription.text1')}</p>
        <p className="">{t('ntuCourse.courseDescription.text2')}</p>
      </div>
    </div>
  );
};

export default CourseDesc;
