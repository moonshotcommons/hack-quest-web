import { FC } from 'react';

interface IntendedLearnersProps {}

const IntendedLearners: FC<IntendedLearnersProps> = (props) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex h-fit items-center gap-4">
        <div className="h-[34px] w-[5px] rounded-full bg-yellow-dark"></div>
        <h3 className="text-h3 text-neutral-black">Intended Learners</h3>
      </div>
      <div className="flex flex-col gap-2">
        <p className="body-l-bold text-neutral-black">Who’s This Course For</p>
        <ul className="[&>li]:body-m flex list-disc flex-col gap-2 [&>li]:ml-6 [&>li]:text-neutral-black">
          <li>
            For Advanced iOS and macOS developers eager to learn SwiftUI
            framework
          </li>
          <li>
            If you want to get a job as an App developer, then take this course
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <p className="body-l-bold text-neutral-black">Requirements</p>
        <ul className="[&>li]:body-m flex list-disc flex-col gap-2 [&>li]:ml-6 [&>li]:text-neutral-black">
          <li>
            {` No programming experience needed - I'll teach you everything you need to know`}
          </li>
          <li>
            {`I'll walk you through, step-by-step how to get all the software installed and set up`}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IntendedLearners;
