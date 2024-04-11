'use client';
import { tagFormate } from '@/helper/formate';
import { cn } from '@/helper/utils';
import { FC, ReactNode, useMemo } from 'react';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';

interface LevelTagProps {
  icon?: ReactNode;
  label?: ReactNode;
  value?: string;
  valueNode?: ReactNode;
  lang: Lang;
}

const levels = ['Beginner', 'Intermediate', 'Advanced'];

const LevelTag: FC<LevelTagProps> = (props) => {
  const { value, label, icon, valueNode, lang, ...rest } = props;
  const { t } = useTranslation(lang, TransNs.BASIC);
  const levelIndex = useMemo(() => {
    if (value) return levels.findIndex((item) => item === tagFormate(value));
    return 0;
  }, [value]);

  return (
    <div className="flex items-center gap-3" {...rest}>
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
        {!label && <span className="body-xs text-neutral-medium-gray">{t('courses.skillLevel')}</span>}
        {!!valueNode && valueNode}
        {!valueNode && value && <span className="body-s-bold capitalize">{t(`courses.${value.toLowerCase()}`)}</span>}
      </div>
    </div>
  );
};

export default LevelTag;
