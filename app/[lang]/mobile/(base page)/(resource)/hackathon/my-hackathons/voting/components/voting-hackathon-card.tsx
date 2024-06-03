import Image from 'next/image';
import moment from 'moment';
import { useCountDown } from 'ahooks';
import { HackathonVoteType } from '@/service/webApi/resourceStation/type';
import { ClientOnly } from '@/hooks/dom/useIsClient';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import { separationNumber } from '@/helper/utils';

export function VotingHackathonCard({ hackathon }: { hackathon: HackathonVoteType }) {
  const { getTotalPrize } = useDealHackathonData();
  const totalPrize = getTotalPrize(hackathon.rewards);
  const [_, formattedRes] = useCountDown({
    targetDate: hackathon.rewardTime
  });

  const { days, hours, minutes, seconds } = formattedRes;
  const currentTime = moment();
  const isEnded = currentTime.isAfter(moment(hackathon.rewardTime));

  return (
    <div className="flex w-full rounded-xl bg-neutral-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12)]">
      <div className="relative h-[7.5rem] w-[7.5rem] overflow-hidden">
        {hackathon.image && <Image src={hackathon.image} fill alt={hackathon.alias} className="rounded-l-xl" />}
      </div>
      <div className="flex flex-1 flex-col justify-between px-3 py-2">
        <h1 className="text-sm text-neutral-black">{hackathon.name}</h1>
        {isEnded ? (
          <>
            <span className="inline-flex items-center justify-center self-start rounded-[0.5rem] border border-neutral-medium-gray px-2 py-1 text-xs font-light text-neutral-medium-gray">
              CLOSED {moment(hackathon?.rewardTime).format('ll')}
            </span>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1 text-xs font-light">
                <h4 className="text-neutral-medium-gray">Participants</h4>
                <p className="text-neutral-off-black">{hackathon.participants}</p>
              </div>
              <div className="flex flex-col gap-1 text-xs font-light">
                <h4 className="text-neutral-medium-gray">Total Prize</h4>
                <p className="text-neutral-off-black">${separationNumber(totalPrize || 0)}</p>
              </div>
              <div className="flex flex-col gap-1 text-xs font-light">
                <h4 className="text-neutral-medium-gray">Host</h4>
                <p className="text-neutral-off-black underline">{hackathon?.hosts[0]?.name}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <h4 className="text-xs font-light text-neutral-medium-gray">Voting Close in</h4>
              <ClientOnly>
                <div className="flex items-center text-xs font-light">
                  <span className="rounded bg-neutral-off-white px-1 py-px text-neutral-rich-gray">
                    {days < 10 ? `0${days}` : days}
                  </span>
                  <span className="pl-1 pr-3">D</span>
                  <span className="rounded bg-neutral-off-white px-1 py-px text-neutral-rich-gray">
                    {hours < 10 ? `0${hours}` : hours}
                  </span>
                  <span className="pl-1 pr-3">H</span>
                  <span className="rounded bg-neutral-off-white px-1 py-px text-neutral-rich-gray">
                    {minutes < 10 ? `0${minutes}` : minutes}
                  </span>
                  <span className="pl-1 pr-3">M</span>
                  <span className="rounded bg-neutral-off-white px-1 py-px text-neutral-rich-gray">
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </span>
                  <span className="pl-1 pr-3">S</span>
                </div>
              </ClientOnly>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex flex-col gap-1 text-xs font-light">
                <h4 className="text-neutral-medium-gray">Voting Projects</h4>
                <p className="text-neutral-off-black">{hackathon.projectCount}</p>
              </div>
              <div className="flex flex-col gap-1 text-xs font-light">
                <h4 className="text-neutral-medium-gray">Your Remaining Votes</h4>
                <p className="text-neutral-off-black">{hackathon.remainingVote}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
