'use client';

import Button from '@/components/Common/Button';
import MenuLink from '@/constants/MenuLink';
import { cn, separationNumber } from '@/helper/utils';
import { ClientOnly } from '@/hooks/dom/useIsClient';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import { useRedirect } from '@/hooks/router/useRedirect';
import { HackathonVoteType } from '@/service/webApi/resourceStation/type';
import { useCountDown } from 'ahooks';
import { ChevronRightIcon } from 'lucide-react';
import moment from 'moment';

export function HackathonVotingCard({ vote }: { vote: HackathonVoteType }) {
  const currentTime = moment();
  const { getTotalPrize } = useDealHackathonData();
  const totalPrize = getTotalPrize(vote.rewards);
  const { redirectToUrl } = useRedirect();
  const [_, formattedRes] = useCountDown({
    targetDate: vote?.timeline?.rewardTime || 0
  });

  const status = currentTime.isAfter(moment(vote?.timeline?.rewardTime || 0)) ? 'ended' : 'ongoing';

  const { days, hours, minutes, seconds } = formattedRes;

  function goHackathonDetail() {
    redirectToUrl(`${MenuLink.HACKATHON}/voting/${vote.alias}`);
  }

  function renderStatusTag() {
    return (
      <span
        className={cn(
          'rounded-[0.5rem] border-2 border-status-success-dark px-3 py-1 text-lg uppercase text-status-success-dark',
          {
            'border-neutral-medium-gray text-neutral-medium-gray': status === 'ended'
          }
        )}
      >
        {status}
      </span>
    );
  }

  return (
    <div className="card-hover w-full rounded-2xl bg-neutral-white p-6 shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12)]">
      <div className="flex cursor-pointer items-center justify-between" onClick={goHackathonDetail}>
        <div className="flex items-center gap-3">
          {renderStatusTag()}
          <h1 className="ml-3 font-next-book-bold text-[1.75rem] font-bold text-neutral-off-black">{vote.name}</h1>
        </div>
        <ChevronRightIcon size={28} />
      </div>
      <div className="my-6 h-px w-full bg-neutral-medium-gray" />
      <div className="flex items-center justify-between gap-16">
        <div className="flex items-center gap-7">
          {status === 'ended' ? (
            <>
              <div className="flex flex-col gap-1">
                <h4 className="body-s text-neutral-medium-gray">Closed on</h4>
                <span className="body-s leading-8 text-neutral-off-black">
                  {moment(vote?.timeline?.rewardTime || 0)?.format('ll')}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="body-s text-neutral-medium-gray">Participants</h4>
                <span className="body-s leading-8 text-neutral-off-black">{vote?.memberCount || 0}</span>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="body-s text-neutral-medium-gray">Total Prize</h4>
                <span className="body-s leading-8 text-neutral-off-black">${separationNumber(totalPrize || 0)}</span>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="body-s text-neutral-medium-gray">Host</h4>
                <span className="body-s leading-8 text-neutral-off-black">{vote?.info?.host || '-'}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col">
                <h4 className="body-s text-neutral-medium-gray">Submission Close in</h4>
                <ClientOnly>
                  <div className="flex items-center">
                    <span className="body-m-bold rounded bg-neutral-off-white px-2 py-1 text-neutral-rich-gray">
                      {days < 10 ? `0${days}` : days}
                    </span>
                    <span className="body-m pl-1 pr-3">D</span>
                    <span className="body-m-bold rounded bg-neutral-off-white px-2 py-1 text-neutral-rich-gray">
                      {hours < 10 ? `0${hours}` : hours}
                    </span>
                    <span className="body-m pl-1 pr-3">H</span>
                    <span className="body-m-bold rounded bg-neutral-off-white px-2 py-1 text-neutral-rich-gray">
                      {minutes < 10 ? `0${minutes}` : minutes}
                    </span>
                    <span className="body-m pl-1 pr-3">M</span>
                    <span className="body-m-bold rounded bg-neutral-off-white px-2 py-1 text-neutral-rich-gray">
                      {seconds < 10 ? `0${seconds}` : seconds}
                    </span>
                    <span className="body-m pl-1 pr-3">S</span>
                  </div>
                </ClientOnly>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="body-s text-neutral-medium-gray">Voting Projects</h4>
                <span className="body-s leading-8 text-neutral-off-black">{vote.projectCount}</span>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="body-s text-neutral-medium-gray">Remaining Votes</h4>
                <span className="body-s leading-8 text-neutral-off-black">{vote.remainingVote}</span>
              </div>
            </>
          )}
        </div>
        {status === 'ended' ? (
          <Button
            size="small"
            ghost
            className="ml-auto w-[11.25rem] uppercase"
            onClick={() => redirectToUrl(`${MenuLink.EXPLORE_HACKATHON}/${vote.alias}`)}
          >
            learn more
          </Button>
        ) : (
          <Button size="small" type="primary" className="ml-auto w-[11.25rem] uppercase" onClick={goHackathonDetail}>
            Go to vote
          </Button>
        )}
      </div>
    </div>
  );
}
