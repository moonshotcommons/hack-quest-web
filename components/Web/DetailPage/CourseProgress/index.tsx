import { FC } from 'react';

interface CourseProgressProps {
  progress: number;
}

const CourseProgress: FC<CourseProgressProps> = ({ progress }) => {
  return (
    <>
      <div>
        <div className="flex items-center gap-[20px]">
          <div className="max-w-[715px] w-[715px] h-[10px] bg-[#DADADA] rounded-[10px]">
            <div
              className="bg-[#FCC409] h-[10px] rounded-[10px]"
              style={{ width: `${Math.floor(progress)}%` }}
            ></div>
          </div>
          <span className="text-[21px] font-next-book leading-[160%] tracking-[0.42px]">{`${Math.floor(
            progress
          )}%`}</span>
        </div>
      </div>
      <p className="text-neutral-black text-[16px] font-next-book tracking-[0.32px]">
        Overall Process
      </p>
    </>
  );
};

export default CourseProgress;
