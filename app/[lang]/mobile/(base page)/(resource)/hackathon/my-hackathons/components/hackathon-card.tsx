import { useCountDown } from 'ahooks';
import { ChevronRightIcon } from 'lucide-react';
import { CopyIcon } from '@/components/Common/Icon/CopyV2';
import { GroupUsersIcon } from '@/components/Common/Icon/GroupUsers';
import { AwardBadge } from '@/components/hackathon/award-badge';
import { HackathonCardAction } from '@/components/hackathon/hackathon-card-action';
import { LeaveTeamModal } from '@/components/hackathon/leave-team-modal';
import { WithdrawModal } from '@/components/hackathon/withdraw-modal';
import MenuLink from '@/constants/MenuLink';
import { cn } from '@/helper/utils';
import { ClientOnly } from '@/hooks/dom/useIsClient';
import { useRedirect } from '@/hooks/router/useRedirect';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { ManageTeamModal } from '@/components/hackathon/manage-team-modal';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import dayjs from 'dayjs';
import { useMemo } from 'react';

export function HackathonCard({ hackathon }: { hackathon: HackathonType }) {
  const { redirectToUrl } = useRedirect();
  const { getStepIndex } = useDealHackathonData();
  const stepIndex = getStepIndex(hackathon);

  const utcTime = useMemo(() => {
    const time = stepIndex <= 0 ? hackathon.timeline?.registrationClose : hackathon?.timeline?.submissionClose;
    return dayjs.utc(time).local().toDate();
  }, [hackathon]);
  const [_, formattedRes] = useCountDown({
    targetDate: utcTime
  });

  const { days, hours, minutes, seconds } = formattedRes;

  const status = hackathon.participation?.status as string;

  const isGroupProject = hackathon.participation?.team !== null;

  const isTeamLeader = hackathon.participation?.team?.creatorId === hackathon.participation?.userId;

  const isEnded = status === 'ended' || status === 'missed';

  function goHackathonDetail() {
    redirectToUrl(`${MenuLink.EXPLORE_HACKATHON}/${hackathon.alias}`);
  }

  return (
    <div className="flex w-full flex-col rounded-2xl bg-neutral-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12)]">
      {hackathon.participation?.project?.winner && isEnded && <AwardBadge />}
      <div className="flex w-full flex-col gap-4 p-5">
        <div className="flex cursor-pointer items-center justify-between" onClick={goHackathonDetail}>
          <h1 className="font-next-book-bold text-lg font-bold text-neutral-off-black">{hackathon.name}</h1>
          <ChevronRightIcon size={16} />
        </div>
        <span
          className={cn(
            'self-start rounded-[0.5rem] border-2 border-status-success-dark px-3 py-1 text-sm font-bold uppercase text-status-success-dark',
            {
              'border-neutral-medium-gray text-neutral-medium-gray': status === 'ended' || status === 'pending',
              'border-neutral-medium-gray bg-neutral-medium-gray text-neutral-white': status === 'missed',
              'border-status-error text-status-error': status === 'action required'
            }
          )}
        >
          {status}
        </span>
        {!isEnded && (
          <div className="flex flex-col">
            <h4 className="body-s text-neutral-medium-gray">
              {stepIndex <= 0 ? 'Registration Close in' : 'Submission Close in'}
            </h4>
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
        )}
        <div className="flex flex-col gap-1">
          <h4 className="body-s text-neutral-medium-gray">Submission Type</h4>
          <div className="flex items-center gap-2">
            <GroupUsersIcon />
            <span className="body-s text-neutral-off-black">{isGroupProject ? 'Group Project' : 'Solo Project'}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="body-s text-neutral-medium-gray">{isGroupProject ? 'Team Name' : 'Name'}</h4>
          <span className="body-s text-neutral-off-black">
            {hackathon.participation?.team?.name ||
              `${hackathon.participation?.firstName} ${hackathon.participation?.lastName}`}
          </span>
        </div>
        {!isEnded && isTeamLeader && (
          <div className="flex flex-col gap-1">
            <h4 className="body-s text-neutral-medium-gray">Team Code</h4>
            <div className="body-s inline-flex items-center justify-between rounded-[0.5rem] bg-yellow-extra-light px-4 py-1.5">
              <span className="text-neutral-off-black">{hackathon.participation?.team?.code}</span>
              <button className="outline-none">
                <CopyIcon className="h-5 w-5 text-neutral-medium-gray" />
              </button>
            </div>
          </div>
        )}
        {isEnded && isGroupProject && (
          <div className="flex flex-col gap-1">
            <h4 className="body-s text-neutral-medium-gray">Your Vote Tally</h4>
            <span className="body-s text-neutral-off-black">{hackathon.participation?.project?.vote}</span>
          </div>
        )}
        <HackathonCardAction hackathon={hackathon} />
      </div>
      <ManageTeamModal />
      <LeaveTeamModal team={hackathon.participation?.team!} />
      <WithdrawModal />
    </div>
  );
}
