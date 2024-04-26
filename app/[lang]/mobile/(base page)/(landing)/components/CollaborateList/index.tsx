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
    <div className="relative h-[40.875rem] w-full bg-neutral-white py-10">
      <p className="body-l-bold body-xs px-[7rem] text-center text-neutral-medium-gray">
        {t('CollaborateList.ecosystemsAndProjects')}
      </p>
      <div className="relative mt-[1.5rem] h-[32.25rem] w-full">
        <Image
          src={'/images/landing/cooperation_list_mobile.png'}
          alt="cooperation"
          fill
          className="object-contain"
        ></Image>
      </div>
    </div>
  );
};

export default CollaborateList;
