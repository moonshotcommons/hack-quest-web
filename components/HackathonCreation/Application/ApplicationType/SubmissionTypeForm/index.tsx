'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FC, useMemo, useRef, useState } from 'react';

import LinkArrow from '@/components/Common/LinkArrow';
import GroupProjectForm from './GroupProjectForm';
import GroupActionConfirm, { GroupActionConfirmRef } from './GroupActionConfirm';
import { ActionType } from './GroupActionConfirm/type';
import { useGroupAction } from './GroupActionConfirm/useGroupAction';

import { useRequest } from 'ahooks';
import webApi from '@/service';
import { HackathonTeam, TeamMemberInfo } from '@/service/webApi/resourceStation/type';
import { errorMessage } from '@/helper/ui';

import Link from 'next/link';
import { HACKQUEST_DISCORD } from '@/constants/links';
import { PresetComponentConfig } from '@/components/HackathonCreation/type';

const formSchema = z.object({
  type: z.enum(['Solo Project', 'Group Project'], {
    required_error: 'You need to select a register type.'
  }),
  teamName: z.string(),
  teamCode: z.string()
});

interface SubmissionTypeProps {
  form: any;
  config: PresetComponentConfig;
  type?: 'Solo or Group' | 'Solo Only' | 'Group Only';
  minSize?: number;
  maxSize?: number;
  isRegister: boolean;
  submissionType?: 'Solo' | 'Group';
}

export type SubmissionTypeFormSchema = z.infer<typeof formSchema>;

const SubmissionTypeForm: FC<SubmissionTypeProps> = ({ isRegister, submissionType }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: undefined,
      teamName: '',
      teamCode: ''
    }
  });

  const [groupType, setGroupType] = useState<'member' | 'owner' | null>(null);

  const type = form.getValues('type');
  const isValid = form.formState.isValid;

  const disabled = useMemo(() => {
    return !isValid || (isValid && type !== 'Solo Project' && !groupType);
  }, [type, isValid, groupType]);

  const confirmRef = useRef<GroupActionConfirmRef>(null);
  const { deleteGroup, removeMember, leaveGroup } = useGroupAction();

  const { runAsync: createTeam } = useRequest(
    async (teamName: string) => {
      // const res = await webApi.resourceStationApi.addTeam(simpleHackathonInfo.id, teamName);
      // await refreshRegisterInfo();
      // return res;
    },
    {
      manual: true,
      onSuccess(res) {},
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const { runAsync: joinTeam } = useRequest(
    async (code: string) => {
      const res = await webApi.resourceStationApi.joinTeam(code);
      // await refreshRegisterInfo();
      return res;
    },
    {
      manual: true,
      onSuccess(res) {},
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const onDeleteGroup = (team: HackathonTeam) => {
    confirmRef.current?.open<ActionType.DeleteTeam>({
      type: ActionType.DeleteTeam,
      teamName: team.name!,
      onConfirm: async () => {
        // await deleteGroup(team.code!, refreshRegisterInfo);
      },
      onConfirmCallback: () => setGroupType(null)
    });
  };

  const onLeaveTeam = (team: HackathonTeam) => {
    confirmRef.current?.open<ActionType.LeaveTeam>({
      type: ActionType.LeaveTeam,
      teamName: team.name!,
      onConfirm: async () => {
        // await leaveGroup(simpleHackathonInfo.id, refreshRegisterInfo);
      },
      onConfirmCallback: () => setGroupType(null)
    });
  };

  const onRemoveMember = (team: HackathonTeam, userInfo: TeamMemberInfo) => {
    confirmRef.current?.open<ActionType.RemoveMember>({
      type: ActionType.RemoveMember,
      userInfo,
      onConfirm: async () => {
        // await removeMember(team.code!, userInfo.userId, refreshRegisterInfo);
      }
    });
  };

  // useEffect(() => {
  //   if (submissionType.type) {
  //     form.setValue('type', submissionType.type);
  //     form.trigger('type');
  //     setGroupType(submissionType.groupType || null);
  //   }
  // }, [submissionType]);

  return (
    <div>
      {/* <ProjectTypeRadio form={form} submissionType={submissionType} /> */}
      <div className="caption-14pt flex justify-between text-neutral-off-black">
        <p>Are you looking for a teammate? Follow HackQuest Discord to find your dream team!</p>
        <Link href={HACKQUEST_DISCORD} target="_blank">
          <LinkArrow direction="right" decorate>
            Go to Discord
          </LinkArrow>
        </Link>
      </div>
      {type === 'Group Project' && groupType === null && (
        <div className="flex flex-col gap-3 text-left">
          <p>Create a new team or join an existing one.</p>
          <GroupProjectForm
            form={form}
            onCreateTeam={async () => {
              const teamName = form.getValues('teamName');
              if (teamName.trim()) {
                await createTeam(teamName);
              }
            }}
            onJoinTeam={async () => {
              const teamCode = form.getValues('teamCode');
              if (teamCode.trim()) {
                await joinTeam(teamCode);
              }
            }}
          />
        </div>
      )}
      {type === 'Group Project' && groupType === 'owner' && (
        <div></div>
        // <OwnerGroupDetail
        //   team={submissionType.team!}
        //   onDelete={onDeleteGroup}
        //   onRemoveMember={onRemoveMember}
        //   teamDetail={submissionType.teamDetail as HackathonTeamDetail}
        //   userId={submissionType.userId!}
        // />
      )}
      {type === 'Group Project' && groupType === 'member' && (
        <div></div>
        // <JoinGroupDetail
        //   team={submissionType.team!}
        //   onLeaveTeam={onLeaveTeam}
        //   userId={submissionType.userId!}
        //   teamDetail={submissionType.teamDetail as HackathonTeamDetail}
        // />
      )}
      {/* <div className="flex justify-end gap-4">
        <Button ghost className="button-text-m w-[165px] px-0 py-4 uppercase" onClick={onBack} htmlType="button">
          Back
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          className={cn('button-text-m min-w-[165px] px-0 py-4 uppercase', disabled ? 'bg-neutral-light-gray' : '')}
          disabled={disabled}
          loading={loading}
        >
          {isRegister ? 'update' : 'Save'} And Next
        </Button>
      </div> */}

      <GroupActionConfirm ref={confirmRef} />
    </div>
  );
};

export default SubmissionTypeForm;
