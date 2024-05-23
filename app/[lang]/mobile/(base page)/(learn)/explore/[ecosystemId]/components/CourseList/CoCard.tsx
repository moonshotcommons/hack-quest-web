import React from 'react';
import Title from '../Title';
import Button from '@/components/Common/Button';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import { list } from './data';
import PracticeCard from '@/components/Web/Business/PracticeCard';

interface CoCardProp {
  lang: Lang;
}

const CoCard: React.FC<CoCardProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.LEARN);
  return (
    <div className="flex flex-col gap-[32px]">
      <Title
        title={'Rust Basic Project'}
        description={'Follow the course to deploy the first project on Solana ecosystem'}
      />
      <div className="flex gap-[20px]">
        {list.map((project) => (
          <div key={project.id} className="w-[calc((100%-60px)/4)]]">
            <PracticeCard course={project as any} />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          ghost
          className="button-text-m h-[48px] w-[165px] border-neutral-black p-0 uppercase text-neutral-black"
        >
          {t('exploreMore')}
        </Button>
      </div>
    </div>
  );
};

export default CoCard;
