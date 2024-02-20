import Tags from '@/components/Common/Tags';
import { KnowledgeGainType } from '@/service/webApi/course/type';
import { FC } from 'react';

interface KnowledgeGainProps {
  knowledgeGain: KnowledgeGainType;
}

const KnowledgeGain: FC<KnowledgeGainProps> = ({ knowledgeGain }) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex h-fit items-center gap-2">
        <div className="h-[22px] w-[5px] rounded-full bg-yellow-dark"></div>
        <h2 className="text-h2-mob text-neutral-black">{`What You’ll Learn`}</h2>
      </div>

      <div className="flex flex-col gap-5">
        <ul className="[&>li]:body-s flex list-disc flex-col gap-2 [&>li]:ml-6 [&>li]:text-neutral-black">
          {knowledgeGain.description?.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>

        <div className="flex flex-wrap gap-3">
          {knowledgeGain.tags?.map((item) => {
            return (
              <Tags size="lg" key={item}>
                {item}
              </Tags>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGain;
