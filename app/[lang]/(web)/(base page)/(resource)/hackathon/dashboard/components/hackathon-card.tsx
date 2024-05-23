'use client';

import Button, { ButtonType } from '@/components/Common/Button';
import { CopyIcon } from '@/components/Common/Icon/CopyV2';
import { GroupUsersIcon } from '@/components/Common/Icon/GroupUsers';
import { LeaveTeamModal, useLeaveTeamModal } from '@/components/hackathon/leave-team-modal';
import MenuLink from '@/constants/MenuLink';
import { ClientOnly } from '@/hooks/dom/useIsClient';
import { useRedirect } from '@/hooks/router/useRedirect';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { useCountDown } from 'ahooks';
import { ChevronRightIcon } from 'lucide-react';

interface HackathonCardProps {
  hackathon: HackathonType;
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  const { onOpen } = useLeaveTeamModal();
  const { redirectToUrl } = useRedirect();
  const [_, formattedRes] = useCountDown({
    targetDate: hackathon.reviewTime
  });

  const { days, hours, minutes, seconds } = formattedRes;

  // Submission Type (Group or Solo)
  const isGroupProject = hackathon.participation?.team !== null;

  // Team leader
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
        <span className="rounded-[0.5rem] border-2 border-status-success-dark px-3 py-1 text-lg text-status-success-dark">
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
      <Button size="small" type={type} className="w-[11.25rem] uppercase" onClick={onClick}>
        {label}
      </Button>
    );

    const renderSecondaryButton = ({ label, onClick }: { label: string; onClick?: () => void }) => (
      <button className="underline-s text-neutral-rich-gray outline-none">{label}</button>
    );

    // Registered but not submit
    if (!isSubmitted) {
      // Group project
      if (isGroupProject) {
        // Team leader
        if (isTeamLeader) {
          return (
            <div className="ml-auto flex flex-col gap-1">
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
            </div>
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
          <div className="ml-auto flex flex-col gap-1">
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
          </div>
        );
      }
    } else {
      // Submitted and under review
      if (status === 'REVIEW') {
        return (
          <div className="ml-auto">
            <Button size="small" ghost className="w-[11.25rem] text-xs" onClick={goHackathonDetail}>
              view my project
            </Button>
          </div>
        );
      } else {
        // Submited but not review
        // Group project
        if (isGroupProject) {
          // Team leader
          if (isTeamLeader) {
            return (
              <div className="ml-auto flex flex-col gap-1">
                {renderPrimaryButton({
                  label: 'edit submission',
                  onClick: () => goEditHackathonPage(hackathon.id)
                })}
                {renderSecondaryButton({
                  label: 'Manage Team',
                  onClick: () => {}
                })}
              </div>
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
          // Solo project
          return (
            <div className="ml-auto flex flex-col gap-1">
              {renderPrimaryButton({
                label: 'edit submission',
                onClick: () => goEditHackathonPage(hackathon.id)
              })}
              {renderSecondaryButton({
                label: 'Withdraw',
                onClick: () => {}
              })}
            </div>
          );
        }
      }
    }
  }

  return (
    <div className="w-full rounded-2xl bg-neutral-white p-6 shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12)]">
      <div className="flex cursor-pointer items-center justify-between" onClick={goHackathonDetail}>
        <div className="flex items-center gap-3">
          {renderStatusTag()}
          <h1 className="ml-3 font-next-book-bold text-[1.75rem] font-bold text-neutral-off-black">{hackathon.name}</h1>
        </div>
        <ChevronRightIcon size={28} />
      </div>
      <div className="my-6 h-px w-full bg-neutral-medium-gray" />
      <div className="flex items-center justify-between gap-16">
        <div className="flex items-center gap-7">
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
            <h4 className="body-s text-neutral-medium-gray">Submission Type</h4>
            <div className="flex h-8 items-center gap-2">
              <GroupUsersIcon />
              <span className="body-s text-neutral-off-black">{isGroupProject ? 'Group Project' : 'Solo Project'}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="body-s text-neutral-medium-gray">{isGroupProject ? 'Team Name' : 'Name'}</h4>
            <span className="body-s leading-8 text-neutral-off-black">
              {hackathon.participation?.team?.name ||
                `${hackathon.participation?.firstName} ${hackathon.participation?.lastName}`}
            </span>
          </div>
          {isTeamLeader && (
            <div className="flex flex-col gap-1">
              <h4 className="body-s text-neutral-medium-gray">Team Code</h4>
              <div className="body-xs inline-flex items-center justify-center gap-5 rounded-[0.5rem] bg-yellow-extra-light px-4 py-1.5">
                <span className="text-neutral-off-black">{hackathon.participation?.team?.code}</span>
                <button className="outline-none">
                  <CopyIcon className="h-5 w-5 text-neutral-medium-gray" />
                </button>
              </div>
            </div>
          )}
        </div>
        {renderActionButton()}
        <LeaveTeamModal />
      </div>
    </div>
  );
}
