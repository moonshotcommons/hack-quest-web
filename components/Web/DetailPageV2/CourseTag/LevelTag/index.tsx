import { tagFormate } from '@/helper/formate';
import { cn } from '@/helper/utils';
import { FC, ReactNode, useMemo } from 'react';

interface LevelTagProps {
  icon?: ReactNode;
  label?: ReactNode;
  value?: string;
  valueNode?: ReactNode;
}

const levels = ['Beginner', 'Intermediate', 'Advanced'];

const LevelTag: FC<LevelTagProps> = (props) => {
  const { value, label, icon, valueNode } = props;
  const levelIndex = useMemo(() => {
    if (value) return levels.findIndex((item) => item === tagFormate(value));
    return 0;
  }, [value]);

  return (
    <div className="flex items-center gap-3">
      {!!icon && icon}
      {!icon && (
        <div className={cn(`flex items-center gap-[1px]`)}>
          {levels.map((item, index) => {
            return (
              <div
                key={item}
                className={cn(
                  `h-[18px] w-[18px] border-[2px] border-neutral-rich-gray`,
                  index === 0 ? 'rounded-l-full' : '',
                  index === levels.length - 1 ? 'rounded-r-full' : '',
                  index <= levelIndex ? 'bg-neutral-light-gray' : ''
                  // size === 'large' ? 'h-[20px] w-[20px]' : ''
                )}
              ></div>
            );
          })}
        </div>
      )}
      <div className="flex flex-col">
        {!!label && label}
        {!label && (
          <span className="body-xs text-neutral-medium-gray">Skill Level</span>
        )}
        {!!valueNode && valueNode}
        {!valueNode && value && (
          <span className="body-m-bold capitalize">{value.toLowerCase()}</span>
        )}
      </div>
    </div>
  );
};

export default LevelTag;
