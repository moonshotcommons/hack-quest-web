'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import Button from '@/components/Common/Button';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { FormComponentProps } from '..';
import { cn } from '@/helper/utils';
import ProjectTypeRadio from './ProjectTypeRadio';
import LinkArrow from '@/components/Common/LinkArrow';
import GroupProjectForm from './GroupProjectForm';
import OwnerGroupDetail from './OwnerGroupDetail';
import JoinGroupDetail from './JoinGroupDetail';
import GroupActionConfirm, { GroupActionConfirmRef } from './GroupActionConfirm';
import { ActionType } from './GroupActionConfirm/type';
import { useGroupAction } from './GroupActionConfirm/useGroupAction';
import { HackathonRegisterStateType } from '../../../type';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import {
  HackathonRegisterStep,
  HackathonTeam,
  HackathonTeamDetail,
  TeamMemberInfo
} from '@/service/webApi/resourceStation/type';
import { errorMessage } from '@/helper/ui';
import { HACKATHON_SUBMIT_STEPS } from '../../constants';
import Link from 'next/link';
import { HACKQUEST_DISCORD } from '@/constants/links';

const formSchema = z.object({
  type: z.enum(['Solo Project', 'Group Project'], {
    required_error: 'You need to select a register type.'
  }),
  teamName: z.string(),
  teamCode: z.string()
});

interface SubmissionTypeFormProps {
  onNext: VoidFunction;
  onBack: VoidFunction;
}

export type SubmissionTypeFormSchema = z.infer<typeof formSchema>;

const SubmissionTypeForm: FC<
  Omit<FormComponentProps, 'type' | 'formState' | 'setCurrentStep'> &
    Pick<HackathonRegisterStateType, 'submissionType' | 'status' | 'isRegister'>
> = ({ onNext, onBack, simpleHackathonInfo, status, refreshRegisterInfo, submissionType, isRegister }) => {
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

  const { run: submitRequest, loading } = useRequest(
    async (values: z.infer<typeof formSchema>) => {
      const res = await webApi.resourceStationApi.updateHackathonRegisterInfo(simpleHackathonInfo.id, {
        status:
          HACKATHON_SUBMIT_STEPS.find((item) => item.type === status)!.stepNumber === 3
            ? HackathonRegisterStep.Review
            : status
      });
      return { res, values };
    },
    {
      manual: true,
      onSuccess({ res, values }) {
        onNext({ submissionType: { ...submissionType, type: values.type } });
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submitRequest(values);
  };

  const { runAsync: createTeam } = useRequest(
    async (teamName: string) => {
      const res = await webApi.resourceStationApi.addTeam(simpleHackathonInfo.id, teamName);
      await refreshRegisterInfo();
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

  const { runAsync: joinTeam } = useRequest(
    async (code: string) => {
      const res = await webApi.resourceStationApi.joinTeam(code);
      await refreshRegisterInfo();
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
        await deleteGroup(team.code!, refreshRegisterInfo);
      },
      onConfirmCallback: () => setGroupType(null)
    });
  };

  const onLeaveTeam = (team: HackathonTeam) => {
    confirmRef.current?.open<ActionType.LeaveTeam>({
      type: ActionType.LeaveTeam,
      teamName: team.name!,
      onConfirm: async () => {
        await leaveGroup(simpleHackathonInfo.id, refreshRegisterInfo);
      },
      onConfirmCallback: () => setGroupType(null)
    });
  };

  const onRemoveMember = (team: HackathonTeam, userInfo: TeamMemberInfo) => {
    confirmRef.current?.open<ActionType.RemoveMember>({
      type: ActionType.RemoveMember,
      userInfo,
      onConfirm: async () => {
        await removeMember(team.code!, userInfo.userId, refreshRegisterInfo);
      }
    });
  };

  useEffect(() => {
    if (submissionType.type) {
      form.setValue('type', submissionType.type);
      form.trigger('type');
      setGroupType(submissionType.groupType || null);
    }
  }, [submissionType]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <ProjectTypeRadio form={form} submissionType={submissionType} />
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
            <OwnerGroupDetail
              team={submissionType.team!}
              onDelete={onDeleteGroup}
              onRemoveMember={onRemoveMember}
              teamDetail={submissionType.teamDetail as HackathonTeamDetail}
              userId={submissionType.userId!}
            />
          )}
          {type === 'Group Project' && groupType === 'member' && (
            <JoinGroupDetail
              team={submissionType.team!}
              onLeaveTeam={onLeaveTeam}
              userId={submissionType.userId!}
              teamDetail={submissionType.teamDetail as HackathonTeamDetail}
            />
          )}
          <div className="flex justify-end gap-4">
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
          </div>
        </form>
      </Form>
      <GroupActionConfirm ref={confirmRef} />
    </div>
  );
};

export default SubmissionTypeForm;
