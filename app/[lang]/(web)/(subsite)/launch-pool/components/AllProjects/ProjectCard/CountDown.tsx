'use client';
import { FC, useEffect, useMemo, useState } from 'react';
import { useCountDown } from 'ahooks';
import { ProjectStatus } from '.';
import { cn } from '@/helper/utils';

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
            0
          </span>
          <span
            className={cn(
              'body-xl-bold inline-block rounded-[4px] px-2 py-1 text-neutral-rich-gray',
              className
            )}
          >
            {countString[0]}
          </span>
        </>
      );
    } else {
      return (
        <>
          {countString.map((item, index) => {
            return (
              <span
                key={index}
                className={cn(
                  'body-xl-bold inline-block rounded-[4px] px-2 py-1 text-neutral-rich-gray',
                  className
                )}
              >
                {item}
              </span>
            );
          })}
        </>
      );
    }
  }, [count]);

  return (
    <div className="flex items-center gap-1">
      {countNode}
      <span className="body-l uppercase text-neutral-rich-gray">{format}</span>
    </div>
  );
};

interface CountDownProps {
  status: ProjectStatus;
}

const CountDown: FC<CountDownProps> = ({ status }) => {
  const [mount, setMount] = useState(false);
  const [countdown, formattedRes] = useCountDown({
    targetDate: `${new Date().getFullYear()}-3-29 23:59:59`
  });
  const { days, hours, minutes, seconds, milliseconds } = formattedRes;
  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;
  console.log(days, hours, minutes, seconds, milliseconds);
  return (
    <div className="flex flex-col gap-2">
      <p className="body-s text-neutral-medium-gray">Offerings Close in</p>
      <div className="flex gap-4">
        <CountItem
          count={days}
          format="D"
          className={
            status === ProjectStatus.UPCOMING
              ? 'bg-neutral-white'
              : 'bg-neutral-off-white'
          }
        />
        <CountItem
          count={hours}
          format="H"
          className={
            status === ProjectStatus.UPCOMING
              ? 'bg-neutral-white'
              : 'bg-neutral-off-white'
          }
        />
        <CountItem
          count={minutes}
          format="M"
          className={
            status === ProjectStatus.UPCOMING
              ? 'bg-neutral-white'
              : 'bg-neutral-off-white'
          }
        />
        <CountItem
          count={seconds}
          format="S"
          className={
            status === ProjectStatus.UPCOMING
              ? 'bg-neutral-white'
              : 'bg-neutral-off-white'
          }
        />
      </div>
    </div>
  );
};

export default CountDown;
