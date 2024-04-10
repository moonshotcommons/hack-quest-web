import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import { IntendedLearnersType } from '@/service/webApi/course/type';
import { FC } from 'react';

interface IntendedLearnersProps {
  intendedLearners: IntendedLearnersType;
  lang: Lang;
}

const IntendedLearners: FC<IntendedLearnersProps> = async ({ intendedLearners, lang }) => {
  const { t } = await useTranslation(lang, TransNs.BASIC);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex h-fit items-center gap-4">
        <div className="h-[34px] w-[5px] rounded-full bg-yellow-dark"></div>
        <h3 className="text-h3 text-neutral-black">{t('courses.intendedLearners')}</h3>
      </div>
      <div className="flex flex-col gap-2">
        <p className="body-l-bold text-neutral-black">{}</p>
        <ul className="[&>li]:body-m flex list-disc flex-col gap-2 [&>li]:ml-6 [&>li]:text-neutral-black">
          {intendedLearners.audience?.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <p className="body-l-bold text-neutral-black">{t('courses.requirements')}</p>
        <ul className="[&>li]:body-m flex list-disc flex-col gap-2 [&>li]:ml-6 [&>li]:text-neutral-black">
          {intendedLearners.requirements?.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default IntendedLearners;
