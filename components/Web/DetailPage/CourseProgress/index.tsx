import { FC } from 'react';

interface CourseProgressProps {
  progress: number;
}

const CourseProgress: FC<CourseProgressProps> = ({ progress }) => {
  return (
    <>
      <div>
        <div className="flex items-center gap-[20px]">
          <div className="h-[10px] w-[715px] max-w-[715px] rounded-[10px] bg-[#DADADA]">
            <div
              className="h-[10px] rounded-[10px] bg-yellow-dark"
              style={{ width: `${Math.floor(progress)}%` }}
            ></div>
          </div>
          <span className="body-xl">{`${Math.floor(progress)}%`}</span>
        </div>
      </div>
      <p className="body-m text-neutral-black">Overall Process</p>
    </>
  );
};

export default CourseProgress;
