import Button from '@/components/Common/Button';
import MenuLink from '@/constants/MenuLink';
import { useRedirect } from '@/hooks/router/useRedirect';
import { HackathonVoteType } from '@/service/webApi/resourceStation/type';
import { useCountDown } from 'ahooks';
import { ChevronRightIcon } from 'lucide-react';

function formatCustomDate(date: string) {
  const dateObj = new Date(date);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(dateObj);

  // Adjust the formatted date to the desired format
  return formattedDate.replace(/(\w{3}) (\d{1,2}), (\d{4})/, (match, p1, p2, p3) => {
    return `${p1.toUpperCase()} ${p2}, ${p3}`;
  });
}

export function HackathonVotingCard({ vote }: { vote: HackathonVoteType }) {
  const { redirectToUrl } = useRedirect();
  const [_, formattedRes] = useCountDown({
    targetDate: vote.reviewTime
  });

  const { days, hours, minutes, seconds } = formattedRes;

  const status: string = 'ended';

  function goHackathonDetail() {
    redirectToUrl(`${MenuLink.HACKATHON}/${vote.alias}`);
  }

  function renderStatusTag() {
    return (
      <span>
        <span className="body-s-bold self-start rounded-[0.5rem] border-2 border-status-success-dark px-3 py-1 uppercase text-status-success-dark">
          {status}
        </span>
      </span>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl bg-neutral-white p-5 shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12)]">
      <div className="flex cursor-pointer items-center justify-between" onClick={goHackathonDetail}>
        <h1 className="font-next-book-bold text-lg font-bold text-neutral-off-black">{vote.name}</h1>
        <ChevronRightIcon size={16} />
      </div>
      {renderStatusTag()}
      {status === 'ended' ? (
        <>
          <div className="flex flex-col gap-1">
            <h4 className="body-s text-neutral-medium-gray">Closed on</h4>
            <span className="body-s text-neutral-off-black">{formatCustomDate(vote.rewardTime)}</span>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="body-s text-neutral-medium-gray">Participants</h4>
            <span className="body-s text-neutral-off-black">{vote.participants}</span>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="body-s text-neutral-medium-gray">Total Prize</h4>
            <span className="body-s text-neutral-off-black">{vote.participants}</span>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="body-s text-neutral-medium-gray">Host</h4>
            <span className="body-s text-neutral-off-black underline">{vote.hosts[0].name}</span>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col">
            <h4 className="body-s text-neutral-medium-gray">Submission Close in</h4>
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
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="body-s text-neutral-medium-gray">Voting Projects</h4>
            <span className="body-s text-neutral-off-black">{vote.projectCount}</span>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="body-s text-neutral-medium-gray">Today’s Remaining Votes</h4>
            <span className="body-s text-neutral-off-black">{vote.remainingVote}</span>
          </div>
        </>
      )}
      {status === 'ended' ? (
        <Button size="medium-x" ghost className="w-full uppercase">
          learn more
        </Button>
      ) : (
        <Button size="medium-x" type="primary" className="w-full uppercase">
          Go to vote
        </Button>
      )}
    </div>
  );
}
