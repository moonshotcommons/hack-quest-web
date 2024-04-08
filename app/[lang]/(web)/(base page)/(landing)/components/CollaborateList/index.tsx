import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import Image from 'next/image';
import { FC } from 'react';

interface CollaborateListProps {
  lang: Lang;
}

const CollaborateList: FC<CollaborateListProps> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.LANDING);
  return (
    <div className="relative h-[385px] w-full bg-neutral-off-white">
      <div className="container absolute left-1/2 top-0 mx-auto max-w-[1280px] -translate-x-1/2 rounded-[2rem] bg-neutral-white p-[3.75rem] ">
        <p className="body-l-bold text-center text-neutral-medium-gray">{t('CollaborateList.ecosystemsAndProjects')}</p>
        <div className="relative mt-[1.5rem] h-[272px] w-full">
          <Image src={'/images/landing/cooperation_list.png'} alt="cooperation" fill className="object-contain"></Image>
        </div>
      </div>
    </div>
  );
};

export default CollaborateList;
