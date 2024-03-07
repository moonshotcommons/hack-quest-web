import { IntendedLearnersType } from '@/service/webApi/course/type';
import { FC } from 'react';

interface IntendedLearnersProps {
  intendedLearners: IntendedLearnersType;
}

const IntendedLearners: FC<IntendedLearnersProps> = ({ intendedLearners }) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex h-fit items-center gap-2">
        <div className="h-[22px] w-[5px] rounded-full bg-yellow-dark"></div>
        <h2 className="text-h2-mob text-neutral-black">Intended Learners</h2>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="body-m-bold text-neutral-black">
            Who’s This Course For
          </p>
          <ul className="[&>li]:body-s flex list-disc flex-col gap-2 [&>li]:ml-6 [&>li]:text-neutral-black">
            {intendedLearners.audience?.map((item) => {
              return <li key={item}>{item}</li>;
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <p className="body-m-bold text-neutral-black">Requirements</p>
          <ul className="[&>li]:body-s flex list-disc flex-col gap-2 [&>li]:ml-6 [&>li]:text-neutral-black">
            {intendedLearners.requirements?.map((item) => {
              return <li key={item}>{item}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IntendedLearners;
