import { IntendedLearnersType } from '@/service/webApi/course/type';
import { FC } from 'react';

interface IntendedLearnersProps {
  intendedLearners: IntendedLearnersType;
}

const IntendedLearners: FC<IntendedLearnersProps> = ({ intendedLearners }) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex h-fit items-center gap-4">
        <div className="h-[34px] w-[5px] rounded-full bg-yellow-dark"></div>
        <h3 className="text-h3 text-neutral-black">Intended Learners</h3>
      </div>
      <div className="flex flex-col gap-2">
        <p className="body-l-bold text-neutral-black">Who’s This Course For</p>
        <ul className="[&>li]:body-m flex list-disc flex-col gap-2 [&>li]:ml-6 [&>li]:text-neutral-black">
          {intendedLearners.audience?.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <p className="body-l-bold text-neutral-black">Requirements</p>
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
