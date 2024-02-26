import { cn } from '@/helper/utils';
import { FC, useMemo } from 'react';

const levels = ['Beginner', 'Intermediate', 'Advanced'];

interface CourseLevelProps {
  level: (typeof levels)[number];
  size?: 'small' | 'large';
}

const CourseLevel: FC<CourseLevelProps> = (props) => {
  const { level, size = 'small' } = props;
  const levelIndex = useMemo(() => {
    return levels.findIndex((item) => item === level);
  }, [level]);

  return (
    <div className="flex gap-[5px]">
      <div
        className={cn(
          `flex items-center gap-[1px]`,
          size === 'large' ? 'gap-[2px]' : ''
        )}
      >
        {levels.map((item, index) => {
          return (
            <div
              key={item}
              className={cn(
                `h-[12px] w-[12px] border border-white`,
                index === 0 ? 'rounded-l-full' : '',
                index === levels.length - 1 ? 'rounded-r-full' : '',
                index <= levelIndex ? 'bg-white' : '',
                size === 'large' ? 'h-[20px] w-[20px]' : ''
              )}
            ></div>
          );
        })}
      </div>
      <p
        className={cn(
          'text-[12px] text-white',
          size === 'large' ? 'text-[16px]' : ''
        )}
      >
        {level}
      </p>
    </div>
  );
};

export default CourseLevel;
