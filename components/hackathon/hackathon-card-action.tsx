'use client';

import { useRouter } from 'next/navigation';
import { isMobile } from 'react-device-detect';
import Button from '@/components/Common/Button';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { useLeaveTeamModal } from './leave-team-modal';
import { useManageTeamModal } from './manage-team-modal';
import { useWithdrawModal } from './withdraw-modal';
import { hasPermission, ROLES } from './constants';
import { HackathonPartner } from '@/app/[lang]/(web)/(other)/form/hackathon/[hackathonId]/submission/[projectId]/components/constants';

function PrimaryButton({
  outline,
  children,
  onClick
}: {
  outline?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button
      size="small"
      type="primary"
      ghost={outline}
      className="h-[3.25rem] w-full text-sm font-medium uppercase sm:h-[2.6875rem] sm:w-[11.25rem] sm:text-xs"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button className="underline-s text-neutral-rich-gray outline-none" onClick={onClick}>
      {children}
    </button>
  );
}

export function HackathonCardAction({ hackathon }: { hackathon: HackathonType }) {
  const router = useRouter();
  const leaveTeamModal = useLeaveTeamModal();
  const manageTeamModal = useManageTeamModal();
  const withdrawModal = useWithdrawModal();
  const { setTipsModalOpenState } = useGlobalStore();

  const { participation } = hackathon;
  const isSubmitted = participation?.isSubmit;
  const projectId = participation?.project?.id;
  const status = participation?.status as string;
  const code = participation?.team?.code || '';
  const username = participation?.info?.About?.firstName + ' ' + participation?.info?.About?.lastName;

  const isGroupProject = hackathon.participation?.team !== null;

  const isTeamLeader = hackathon.participation?.team?.creatorId === hackathon.participation?.userId;

  const isPartiallySubmitted = !isSubmitted && projectId;

  const role = isGroupProject ? (isTeamLeader ? ROLES.TEAM_LEADER : ROLES.TEAM_MEMBER) : ROLES.SOLO;

  if (
    hackathon.participation?.isRegister &&
    (hackathon.info?.allowSubmission === false || hackathon.allowSubmission === false)
  ) {
    return (
      <Button
        size="small"
        type="primary"
        disabled
        className="h-[3.25rem] w-full bg-neutral-light-gray text-sm font-medium uppercase text-neutral-medium-gray opacity-100 sm:h-[2.6875rem] sm:w-[11.25rem] sm:text-xs"
      >
        {/* {children} */}
        Pending
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {hasPermission(role, status, 'submit') && (
        <PrimaryButton
          onClick={() =>
            isMobile
              ? setTipsModalOpenState(true)
              : router.push(`/form/hackathon/${hackathon.id}/submission/${projectId || '-1'}`)
          }
        >
          {isPartiallySubmitted ? 'continue submission' : 'start submission'}
        </PrimaryButton>
      )}

      {![HackathonPartner.Linea, HackathonPartner.Hack4Bengal].includes(hackathon.id as HackathonPartner) &&
        hasPermission(role, status, 'learn_more') && (
          <PrimaryButton outline onClick={() => router.push(`/hackathon/${hackathon.alias}`)}>
            learn more
          </PrimaryButton>
        )}

      {(hasPermission(role, status, 'edit') ||
        [HackathonPartner.Linea, HackathonPartner.Hack4Bengal].includes(hackathon.id as HackathonPartner)) && (
        <PrimaryButton
          onClick={() =>
            isMobile
              ? setTipsModalOpenState(true)
              : router.push(`/hackathon/projects/${hackathon.participation?.project?.id || ''}/edit`)
          }
        >
          edit submission
        </PrimaryButton>
      )}

      {hasPermission(role, status, 'manage') && (
        <SecondaryButton
          onClick={() => {
            manageTeamModal.onOpen(code);
          }}
        >
          Manage Team
        </SecondaryButton>
      )}

      {hasPermission(role, status, 'withdraw') && (
        <SecondaryButton onClick={() => withdrawModal.onOpen(username, hackathon.id)}>Withdraw</SecondaryButton>
      )}

      {hasPermission(role, status, 'leave') && (
        <SecondaryButton onClick={() => leaveTeamModal.onOpen(hackathon.id)}>Leave Team</SecondaryButton>
      )}

      {hasPermission(role, status, 'view') && (
        <PrimaryButton outline onClick={() => router.push(`/hackathon/projects/${projectId}`)}>
          view my project
        </PrimaryButton>
      )}
    </div>
  );
}
