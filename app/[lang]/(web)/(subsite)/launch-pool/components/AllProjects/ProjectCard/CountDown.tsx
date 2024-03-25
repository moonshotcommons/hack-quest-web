'use client';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useCountDown } from 'ahooks';
import { cn } from '@/helper/utils';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import {
  LaunchPoolProjectType,
  LaunchPoolProjectStatus
} from '@/service/webApi/launchPool/type';

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
          <span
            className={cn(
              'body-xl-bold inline-block rounded-[4px] px-2 py-1 text-neutral-rich-gray',
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
              'body-xl-bold inline-block rounded-[4px] px-2 py-1 text-neutral-rich-gray',
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
  project: LaunchPoolProjectType;
}

const CountDown: FC<CountDownProps> = ({ project }) => {
  const [mount, setMount] = useState(false);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const [countdown, formattedRes] = useCountDown({
    targetDate: `${new Date().getFullYear()}-3-29 23:59:59`
  });
  const status = project.status;
  const { days, hours, minutes, seconds, milliseconds } = formattedRes;
  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;
  return (
    <div className="flex flex-col gap-2">
      <p className="body-s text-neutral-medium-gray">{t('closeIn')}</p>
      <div className="flex gap-4">
        <CountItem
          count={days}
          format={t('day')}
          className={
            status === LaunchPoolProjectStatus.UPCOMING
              ? 'bg-neutral-white'
              : 'bg-neutral-off-white'
          }
        />
        <CountItem
          count={hours}
          format={t('hour')}
          className={
            status === LaunchPoolProjectStatus.UPCOMING
              ? 'bg-neutral-white'
              : 'bg-neutral-off-white'
          }
        />
        <CountItem
          count={minutes}
          format={t('minutes')}
          className={
            status === LaunchPoolProjectStatus.UPCOMING
              ? 'bg-neutral-white'
              : 'bg-neutral-off-white'
          }
        />
        <CountItem
          count={seconds}
          format={t('seconds')}
          className={
            status === LaunchPoolProjectStatus.UPCOMING
              ? 'bg-neutral-white'
              : 'bg-neutral-off-white'
          }
        />
      </div>
    </div>
  );
};

export default CountDown;
