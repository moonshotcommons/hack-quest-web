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
import { useMutation } from '@tanstack/react-query';
import webApi from '@/service';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';

function PrimaryButton({
  outline,
  children,
  dsisabled,
  isLoading,
  onClick
}: {
  outline?: boolean;
  dsisabled?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button
      size="small"
      type="primary"
      disabled={dsisabled}
      ghost={outline}
      loading={isLoading}
      className="h-[3.25rem] w-full text-sm font-medium uppercase disabled:bg-neutral-light-gray sm:h-[2.6875rem] sm:w-[11.25rem] sm:text-xs"
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
  const { getStepIndex } = useDealHackathonData();
  const stepIndex = getStepIndex(hackathon);

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

  const { mutate, isPending } = useMutation({
    mutationFn: (hackathonId: string) => webApi.resourceStationApi.memberConfirmRegister(hackathonId),
    onSuccess: () => {
      router.refresh();
    }
  });

  if (
    hackathon.participation?.isRegister &&
    ![HackathonPartner.Linea, HackathonPartner.Hack4Bengal].includes(hackathon.id as HackathonPartner) &&
    (hackathon.info?.allowSubmission === false || hackathon.allowSubmission === false) &&
    hackathon.participation?.joinState !== 'approved'
  ) {
    return (
      <div className="flex flex-col gap-2">
        <Button
          size="small"
          type="primary"
          disabled
          className="h-[3.25rem] w-full bg-neutral-light-gray text-sm font-medium uppercase text-neutral-medium-gray opacity-100 sm:h-[2.6875rem] sm:w-[11.25rem] sm:text-xs"
        >
          {/* {children} */}
          Pending
        </Button>
        {hasPermission(role, status, 'withdraw') && (
          <SecondaryButton onClick={() => withdrawModal.onOpen(username, hackathon.id)}>Withdraw</SecondaryButton>
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

        {hasPermission(role, status, 'leave') && (
          <SecondaryButton onClick={() => leaveTeamModal.onOpen(hackathon.id)}>Leave Team</SecondaryButton>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {hasPermission(role, status, 'submit') && stepIndex === 2 && (
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

      {(![HackathonPartner.Linea, HackathonPartner.Hack4Bengal].includes(hackathon.id as HackathonPartner) ||
        !hackathon.participation?.project) &&
        hasPermission(role, status, 'learn_more') && (
          <PrimaryButton outline onClick={() => router.push(`/hackathon/${hackathon.alias}`)}>
            learn more
          </PrimaryButton>
        )}

      {(hasPermission(role, status, 'edit') ||
        (hackathon.participation?.project &&
          [HackathonPartner.Linea, HackathonPartner.Hack4Bengal].includes(hackathon.id as HackathonPartner))) &&
        stepIndex === 2 && (
          <PrimaryButton
            onClick={() => {
              isMobile
                ? setTipsModalOpenState(true)
                : router.push(`/hackathon/projects/${hackathon.participation?.project?.id || ''}/edit`);
            }}
          >
            edit submission
          </PrimaryButton>
        )}

      {(hasPermission(role, status, 'pending') || (hackathon.participation?.isRegister && stepIndex === 1)) &&
        ![HackathonPartner.Linea, HackathonPartner.Hack4Bengal].includes(hackathon.id as HackathonPartner) && (
          <PrimaryButton dsisabled>Pending</PrimaryButton>
        )}

      {hasPermission(role, status, 'confirm') && (
        <PrimaryButton isLoading={isPending} onClick={() => mutate(hackathon.id)}>
          confirm attendance
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
        <PrimaryButton outline onClick={() => router.push(`/hackathon/projects/${participation?.project?.alias}`)}>
          view my project
        </PrimaryButton>
      )}
    </div>
  );
}
