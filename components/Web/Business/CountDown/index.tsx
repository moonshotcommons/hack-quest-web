'use client';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useCountDown } from 'ahooks';
import { cn } from '@/helper/utils';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import useGetDevice from '@/hooks/utils/useGetDevice';

interface CountDownItemProps {
  count: number;
  format: string;
  className: string;
}

const CountItem: FC<CountDownItemProps> = ({ count, format, className }) => {
  const isMobile = useGetDevice();
  const countNode = useMemo(() => {
    const countString = count.toString().split('');
    if (countString.length === 1) {
      return (
        <>
          <span
            className={cn(
              `inline-block rounded-[4px] px-2 py-1 text-neutral-rich-gray ${isMobile ? 'body-m-bold' : 'body-xl-bold'}`,
              className
            )}
          >
            0{countString[0]}
          </span>
        </>
      );
    } else {
      return (
        <>
          <span
            className={cn(
              `inline-block rounded-[4px] px-2 py-1 text-neutral-rich-gray ${isMobile ? 'body-m-bold' : 'body-xl-bold'}`,
              className
            )}
          >
            {countString.join('')}
          </span>
        </>
      );
    }
  }, [count, className]);

  return (
    <div className="flex items-center gap-1">
      {countNode}
      <span className="body-l uppercase text-neutral-rich-gray">{format}</span>
    </div>
  );
};

interface CountDownProps {
  time: string;
  countItemClassName?: string;
}

const CountDown: FC<CountDownProps> = ({ time, countItemClassName = '' }) => {
  const isMobile = useGetDevice();
  const [mount, setMount] = useState(false);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const [countdown, formattedRes] = useCountDown({
    targetDate: time
  });
  const { days, hours, minutes, seconds, milliseconds } = formattedRes;
  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;
  return (
    <div className={`flex ${isMobile ? 'gap-[.75rem]' : 'gap-[16px]'}`}>
      <CountItem count={days} format={t('day')} className={cn('bg-neutral-off-white', countItemClassName)} />
      <CountItem count={hours} format={t('hour')} className={cn('bg-neutral-off-white', countItemClassName)} />
      <CountItem count={minutes} format={t('minutes')} className={cn('bg-neutral-off-white', countItemClassName)} />
      <CountItem count={seconds} format={t('seconds')} className={cn('bg-neutral-off-white', countItemClassName)} />
    </div>
  );
};

export default CountDown;
