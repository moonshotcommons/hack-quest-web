'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import Button from '@/components/Common/Button';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { CommonFormComponentProps } from '..';
import { cn } from '@/helper/utils';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import { HackathonTeam, HackathonTeamDetail, TeamMemberInfo } from '@/service/webApi/resourceStation/type';
import { getHackathonStepInfo } from '../../constants';
import { useHackathonConfig } from '@/components/HackathonCreation/Renderer/HackathonRendererProvider';
import { ApplicationSectionType } from '@/components/HackathonCreation/type';
import GroupActionConfirm, { GroupActionConfirmRef } from './GroupActionConfirm';
import { useGroupAction } from './GroupActionConfirm/useGroupAction';
import { ActionType } from './GroupActionConfirm/type';
import OwnerGroupDetail from './OwnerGroupDetail';
import JoinGroupDetail from './JoinGroupDetail';
import ProjectTypeRadio from './ProjectTypeRadio';
import { HackathonPartner } from '../../../../submission/[projectId]/components/constants';
import { HACKQUEST_DISCORD } from '@/constants/links';
import Link from 'next/link';
import LinkArrow from '@/components/Common/LinkArrow';
import GroupProjectForm from './GroupProjectForm';

interface ApplicationTypeSectionFormProps {
  sectionConfig: {
    property: {
      type?: 'Solo or Group' | 'Solo Only' | 'Group Only';
      minSize?: number;
      maxSize?: number;
    };
  };
}

const formSchema = z.object({
  type: z.enum(['Solo Project', 'Group Project'], {
    required_error: 'You need to select a register type.'
  }),
  teamName: z.string(),
  teamCode: z.string()
});

export type SubmissionTypeFormSchema = z.infer<typeof formSchema>;

const ApplicationTypeSectionForm: FC<ApplicationTypeSectionFormProps & CommonFormComponentProps> = ({
  sectionConfig,
  info,
  isRegister,
  refreshRegisterInfo
}) => {
  const { simpleHackathonInfo, onNext, onBack, hackathonSteps } = useHackathonConfig();
  const hackathonInfo = simpleHackathonInfo!;
  const applicationType = info.applicationType;

  const { type: propType, maxSize, minSize } = sectionConfig.property;
  const defaultType =
    propType === 'Group Only' ? 'Group Project' : propType === 'Solo Only' ? 'Solo Project' : undefined;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: defaultType,
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
    async (values: Record<string, string>) => {
      const { nextStep } = getHackathonStepInfo(hackathonSteps, ApplicationSectionType.ApplicationType);
      const state = {
        info: info,
        status: nextStep.type
      };
      await webApi.resourceStationApi.updateHackathonRegisterInfo(hackathonInfo.id, state);
      // await refreshRegisterInfo();
      return state;
    },
    {
      manual: true,
      onSuccess(state) {
        onNext(state);
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
      const res = await webApi.resourceStationApi.addTeam(hackathonInfo.id, teamName);
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
        await leaveGroup(hackathonInfo.id, refreshRegisterInfo);
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
    if (applicationType.type) {
      form.setValue('type', applicationType.type);
      form.trigger('type');
      setGroupType(applicationType.groupType || null);
    }
  }, [applicationType]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
          <ProjectTypeRadio
            form={form}
            submissionType={applicationType}
            hackathonId={hackathonInfo.id}
            config={sectionConfig.property}
          />
          {hackathonInfo.id !== HackathonPartner.Hack4Bengal && (
            <div className="caption-14pt flex justify-between text-neutral-off-black">
              <p>Are you looking for a teammate? Follow HackQuest Discord to find your dream team!</p>
              <Link href={HACKQUEST_DISCORD} target="_blank">
                <LinkArrow direction="right" decorate>
                  Go to Discord
                </LinkArrow>
              </Link>
            </div>
          )}
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
              team={applicationType.team!}
              onDelete={onDeleteGroup}
              onRemoveMember={onRemoveMember}
              teamDetail={applicationType.teamDetail as HackathonTeamDetail}
              userId={applicationType.userId!}
              hackathonId={hackathonInfo.id}
              config={sectionConfig.property}
            />
          )}
          {type === 'Group Project' && groupType === 'member' && (
            <JoinGroupDetail
              team={applicationType.team!}
              onLeaveTeam={onLeaveTeam}
              userId={applicationType.userId!}
              teamDetail={applicationType.teamDetail as HackathonTeamDetail}
            />
          )}
          <div className="flex justify-end gap-4">
            <Button
              htmlType="button"
              ghost
              className="button-text-m w-[165px] px-0 py-4 uppercase"
              disabled={hackathonSteps[0].type === ApplicationSectionType.ApplicationType}
              onClick={onBack}
            >
              Back
            </Button>
            <Button
              type="primary"
              loading={loading}
              htmlType="submit"
              className={cn('button-text-m min-w-[165px] px-0 py-4 uppercase', disabled ? 'bg-neutral-light-gray' : '')}
              onClick={(e) => {
                e.preventDefault();
                onSubmit(form.getValues());
              }}
              disabled={disabled}
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

export default ApplicationTypeSectionForm;
