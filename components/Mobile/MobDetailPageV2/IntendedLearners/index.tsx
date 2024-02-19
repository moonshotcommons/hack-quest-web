import { FC } from 'react';

interface IntendedLearnersProps {}

const IntendedLearners: FC<IntendedLearnersProps> = (props) => {
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
            <li>
              For Advanced iOS and macOS developers eager to learn SwiftUI
              framework
            </li>
            <li>
              If you want to get a job as an App developer, then take this
              course
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <p className="body-m-bold text-neutral-black">Requirements</p>
          <ul className="[&>li]:body-s flex list-disc flex-col gap-2 [&>li]:ml-6 [&>li]:text-neutral-black">
            <li>
              {` No programming experience needed - I'll teach you everything you need to know`}
            </li>
            <li>
              {`I'll walk you through, step-by-step how to get all the software installed and set up`}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IntendedLearners;
