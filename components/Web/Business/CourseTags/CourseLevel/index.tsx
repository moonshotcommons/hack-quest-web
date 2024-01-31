import { cn } from '@/helper/utils';
import { FC, useMemo } from 'react';

const levels = ['Beginner', 'Intermediate', 'Advanced'];

interface CourseLevelProps {
  level: (typeof levels)[number];
  size?: 'small' | 'large';
  className?: string;
}

const CourseLevel: FC<CourseLevelProps> = (props) => {
  const { level, size = 'small', className } = props;
  const levelIndex = useMemo(() => {
    return levels.findIndex((item) => item === level);
  }, [level]);

  return (
    <div className="flex gap-[5px] items-center">
      <div
        className={cn(
          `flex gap-[1px] items-center`,
          size === 'large' ? 'gap-[2px]' : ''
        )}
      >
        {levels.map((item, index) => {
          return (
            <div
              key={item}
              className={cn(
                `w-[12px] h-[12px] border border-neutral-black`,
                index === 0 ? 'rounded-l-full' : '',
                index === levels.length - 1 ? 'rounded-r-full' : '',
                index <= levelIndex ? 'bg-[#dadada]' : '',
                size === 'large' ? 'w-[20px] h-[20px]' : ''
              )}
            ></div>
          );
        })}
      </div>
      <p
        className={cn(
          'body-xs text-neutral-rich-gray',
          `${
            size === 'large' ? 'text-[16px]  text-neutral-black' : ''
          } ${className}`
        )}
      >
        {level}
      </p>
    </div>
  );
};

export default CourseLevel;
