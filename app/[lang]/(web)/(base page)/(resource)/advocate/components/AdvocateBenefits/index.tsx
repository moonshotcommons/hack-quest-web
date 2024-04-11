import { FC } from 'react';
import Card from './Card';
import { dataList } from './constant';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';

interface AdvocateBenefitsProps {
  lang: Lang;
}

const AdvocateBenefits: FC<AdvocateBenefitsProps> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.RESOURCE);
  return (
    <div className="container mx-auto mt-[100px] flex flex-col items-center">
      <h2 className="text-h2 text-neutral-off-black">{t('advocate.AdvocateBenefits.title')}</h2>
      <div className="mt-[3.75rem] flex w-full cursor-pointer flex-wrap gap-10">
        {dataList.map((item, index) => {
          return (
            <Card
              key={index}
              title={t(item.title)}
              description={t(item.description)}
              icon={item.icon}
              iconClassName={item.iconClassName}
            ></Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdvocateBenefits;
