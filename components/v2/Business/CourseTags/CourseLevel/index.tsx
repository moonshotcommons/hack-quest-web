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
          `flex gap-[1px] items-center`,
          size === 'large' ? 'gap-[2px]' : ''
        )}
      >
        {levels.map((item, index) => {
          return (
            <div
              key={item}
              className={cn(
                `w-[12px] h-[12px] border border-[#000]`,
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
          'text-[12px] font-neuemachina-light text-[var(--neutral-rich-gray)]',
          size === 'large' ? 'text-[16px] font-next-book text-black' : ''
        )}
      >
        {level}
      </p>
    </div>
  );
};

export default CourseLevel;
