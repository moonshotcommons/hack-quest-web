import { Lang, TransNs } from '@/i18n/config';
import React from 'react';
import Title from '../Title';
import { titleTxtData } from '@/app/[lang]/(web)/(base page)/(learn)/web3mooc/constants/data';
import { useTranslation } from '@/i18n/server';

interface EnrollmentProp {
  lang: Lang;
}

const Enrollment: React.FC<EnrollmentProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.LEARN);
  return (
    <div>
      <div className="mb-[1rem]">
        <Title title={t(titleTxtData[2])} />
      </div>
      <div className="body-s flex flex-col gap-[.625rem] text-neutral-rich-gray">
        <p className="">{t('ntuCourse.enrollment.text1')}</p>
        <p className="">{t('ntuCourse.enrollment.text2')}</p>
        <p className="">{t('ntuCourse.enrollment.text3')}</p>
        <p className="">{t('ntuCourse.enrollment.text4')}</p>
      </div>
    </div>
  );
};

export default Enrollment;
