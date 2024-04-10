import Tags from '@/components/Common/Tags';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import { KnowledgeGainType } from '@/service/webApi/course/type';
import { FC } from 'react';

interface KnowledgeGainProps {
  knowledgeGain: KnowledgeGainType;
  lang: Lang;
}

const KnowledgeGain: FC<KnowledgeGainProps> = async ({ knowledgeGain, lang }) => {
  const { t } = await useTranslation(lang, TransNs.BASIC);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex h-fit items-center gap-4">
        <div className="h-[34px] w-[5px] rounded-full bg-yellow-dark"></div>
        <h3 className="text-h3 text-neutral-black">{t('courses.knowledgeGain')}</h3>
      </div>

      <ul className="[&>li]:body-m flex list-disc flex-col gap-2 [&>li]:ml-6 [&>li]:text-neutral-black">
        {knowledgeGain.description?.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>

      <div className="Web3 flex flex-wrap gap-2">
        {knowledgeGain.tags?.map((item) => {
          return (
            <Tags size="lg" key={item}>
              {item}
            </Tags>
          );
        })}
      </div>
    </div>
  );
};

export default KnowledgeGain;
