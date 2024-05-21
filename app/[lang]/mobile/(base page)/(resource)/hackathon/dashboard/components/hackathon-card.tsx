import Button, { ButtonType } from '@/components/Common/Button';
import { CopyIcon } from '@/components/Common/Icon/CopyV2';
import { GroupUsersIcon } from '@/components/Common/Icon/GroupUsers';
import { LeaveTeamModal, useLeaveTeamModal } from '@/components/hackathon/leave-team-modal';
import MenuLink from '@/constants/MenuLink';
import { useRedirect } from '@/hooks/router/useRedirect';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { useCountDown } from 'ahooks';
import { ChevronRightIcon } from 'lucide-react';

export function HackathonCard({ hackathon }: { hackathon: HackathonType }) {
  const { onOpen } = useLeaveTeamModal();
  const { redirectToUrl } = useRedirect();
  const [_, formattedRes] = useCountDown({
    targetDate: hackathon.reviewTime
  });

  const { days, hours, minutes, seconds } = formattedRes;

  const isGroupProject = hackathon.participation?.team !== null;

  const isTeamLeader = hackathon.participation?.team?.creatorId === hackathon.participation?.userId;

  function goHackathonDetail() {
    redirectToUrl(`${MenuLink.HACKATHON}/${hackathon.alias}`);
  }

  function goEditHackathonPage(hackathonId: string) {
    // TODO: Go to edit page
  }

  function handleSubmit(id: string) {
    if (isTeamLeader || !isGroupProject) {
      redirectToUrl(`/form${MenuLink.HACKATHON}/${hackathon.id}/submission/${id}`);
    }
  }

  function renderStatusTag() {
    const status = hackathon.participation?.status;
    return (
      <span>
        <span className="body-s-bold self-start rounded-[0.5rem] border-2 border-status-success-dark px-3 py-1 text-status-success-dark">
          {status}
        </span>
      </span>
    );
  }

  function renderActionButton() {
    const { participation } = hackathon;
    const isSubmitted = participation?.isSubmit;
    const projectId = participation?.project?.id;
    const status = participation?.status;

    const renderPrimaryButton = ({
      label,
      type = 'primary',
      onClick
    }: {
      label: string;
      type?: ButtonType;
      onClick?: () => void;
    }) => (
      <Button size="medium-x" type={type} className="w-full uppercase" onClick={onClick}>
        {label}
      </Button>
    );

    const renderSecondaryButton = ({ label, onClick }: { label: string; onClick?: () => void }) => (
      <button className="underline-s text-neutral-rich-gray outline-none" onClick={onClick}>
        {label}
      </button>
    );

    if (!isSubmitted) {
      if (isGroupProject) {
        if (isTeamLeader) {
          return (
            <>
              {projectId
                ? renderPrimaryButton({
                    label: 'continue submission',
                    onClick: () => handleSubmit(projectId)
                  })
                : renderPrimaryButton({
                    label: 'start submission',
                    onClick: () => handleSubmit('-1')
                  })}
              {renderSecondaryButton({
                label: 'Manage Team',
                onClick: () => {}
              })}
            </>
          );
        } else {
          return (
            <div className="ml-auto flex flex-col">
              {renderSecondaryButton({
                label: 'Leave the Team',
                onClick: () => onOpen(hackathon.id)
              })}
            </div>
          );
        }
      } else {
        return (
          <>
            {projectId
              ? renderPrimaryButton({
                  label: 'continue submission',
                  onClick: () => handleSubmit(projectId)
                })
              : renderPrimaryButton({
                  label: 'start submission',
                  onClick: () => handleSubmit('-1')
                })}
            {renderSecondaryButton({
              label: 'Withdraw',
              onClick: () => {}
            })}
          </>
        );
      }
    } else {
      if (status === 'REVIEW') {
        return (
          <Button size="medium-x" ghost className="w-full" onClick={goHackathonDetail}>
            view my project
          </Button>
        );
      } else {
        if (isGroupProject) {
          if (isTeamLeader) {
            return (
              <>
                {renderPrimaryButton({
                  label: 'edit submission',
                  onClick: () => goEditHackathonPage(hackathon.id)
                })}
                {renderSecondaryButton({
                  label: 'Manage Team',
                  onClick: () => {}
                })}
              </>
            );
          } else {
            return renderSecondaryButton({
              label: 'Leave the Team',
              onClick: () => onOpen(hackathon.id)
            });
          }
        } else {
          return (
            <>
              {renderPrimaryButton({
                label: 'edit submission',
                onClick: () => goEditHackathonPage(hackathon.id)
              })}
              {renderSecondaryButton({
                label: 'Withdraw',
                onClick: () => {}
              })}
            </>
          );
        }
      }
    }
  }

  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl bg-neutral-white p-5 shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12)]">
      <div className="flex cursor-pointer items-center justify-between" onClick={goHackathonDetail}>
        <h1 className="font-next-book-bold text-lg font-bold text-neutral-off-black">{hackathon.name}</h1>
        <ChevronRightIcon size={16} />
      </div>
      {renderStatusTag()}
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
      {isTeamLeader && (
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
      {renderActionButton()}
      <LeaveTeamModal />
    </div>
  );
}
