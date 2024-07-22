'use client';
import LinkArrow from '@/components/Common/LinkArrow';
import { getEndOfDay } from '@/helper/utils';

import webApi from '@/service';
import { useQuery } from '@tanstack/react-query';
import { useCountDown } from 'ahooks';
import Image from 'next/image';
import { FC, useMemo, useRef } from 'react';
import DailyChallengeModal, { DailyChallengeModalInstance } from './DailyChallengeModal';
import { useIsClient } from '@/hooks/dom/useIsClient';

interface DailyChallengeProps {}

const DailyChallenge: FC<DailyChallengeProps> = (props) => {
  const { data } = useQuery({
    queryKey: ['daily-challenge'],
    queryFn: () => webApi.userApi.fetchDailyChallenge()
  });
  const isClient = useIsClient();
  const dailyChallengeInstance = useRef<DailyChallengeModalInstance>(null);
  const [countdown, formattedRes] = useCountDown({
    targetDate: getEndOfDay().format()
  });
  const { days, hours, minutes, seconds, milliseconds } = formattedRes;

  const modal = useMemo(() => {
    if (!data) return null;
    return <DailyChallengeModal ref={dailyChallengeInstance} challengeData={data} />;
  }, [data]);

  return (
    <div className="relative flex w-full overflow-hidden rounded-[1rem] bg-neutral-white p-4">
      <div className="relative z-[5] flex flex-col gap-4">
        <h5 className="text-h5 text-neutral-off-black">Daily Challenge</h5>
        {!data?.completed && (
          <>
            <div className="body-xs py-.5 w-fit rounded-full bg-neutral-off-white px-3 text-neutral-rich-gray">
              {isClient &&
                `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`}
            </div>
            <LinkArrow
              direction="right"
              size={'sm'}
              className="button-text-s text-neutral-off-black"
              onClick={() => {
                dailyChallengeInstance.current?.open();
              }}
            >
              START QUIZ
            </LinkArrow>
          </>
        )}
        {data?.completed && (
          <>
            <div className="body-xs py-.5 w-fit rounded-full bg-status-success-light px-3 text-neutral-rich-gray">{`COMPLETED`}</div>
            <div>&nbsp;</div>
          </>
        )}
      </div>

      <Image
        src={'/images/home/daily-challenge-bg.png'}
        width={220}
        height={124}
        alt="daily challenge"
        className="absolute bottom-0 right-0"
      />
      {data && modal}
    </div>
  );
};

export default DailyChallenge;
