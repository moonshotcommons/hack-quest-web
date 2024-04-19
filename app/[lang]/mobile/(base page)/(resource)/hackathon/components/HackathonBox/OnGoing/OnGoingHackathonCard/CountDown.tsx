'use client';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useCountDown } from 'ahooks';
import { cn } from '@/helper/utils';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonType } from '@/service/webApi/resourceStation/type';

interface CountDownItemProps {
  count: number;
  format: string;
  className: string;
}

const CountItem: FC<CountDownItemProps> = ({ count, format, className }) => {
  const countNode = useMemo(() => {
    const countString = count.toString().split('');
    if (countString.length === 1) {
      return (
        <>
          <span className={cn('body-m-bold inline-block rounded-[4px] px-2 py-1 text-neutral-rich-gray', className)}>
            0{countString[0]}
          </span>
        </>
      );
    } else {
      return (
        <>
          <span className={cn('body-m-bold inline-block rounded-[4px] px-2 py-1 text-neutral-rich-gray', className)}>
            {countString.join('')}
          </span>
        </>
      );
    }
  }, [count, className]);

  return (
    <div className="flex items-center gap-1">
      {countNode}
      <span className="body-m uppercase text-neutral-rich-gray">{format}</span>
    </div>
  );
};

interface CountDownProps {
  hackathon: HackathonType;
}

const CountDown: FC<CountDownProps> = ({ hackathon }) => {
  const [mount, setMount] = useState(false);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const [countdown, formattedRes] = useCountDown({
    targetDate: hackathon.endTime
  });
  const { days, hours, minutes, seconds, milliseconds } = formattedRes;
  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;
  return (
    <div className="flex gap-[12px]">
      <CountItem count={days} format={t('day')} className="bg-neutral-off-white" />
      <CountItem count={hours} format={t('hour')} className="bg-neutral-off-white" />
      <CountItem count={minutes} format={t('minutes')} className="bg-neutral-off-white" />
      <CountItem count={seconds} format={t('seconds')} className="bg-neutral-off-white" />
    </div>
  );
};

export default CountDown;
