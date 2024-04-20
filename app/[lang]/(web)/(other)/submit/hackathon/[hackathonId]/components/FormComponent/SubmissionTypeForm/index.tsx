'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import Button from '@/components/Common/Button';
import { FC, useMemo, useRef, useState } from 'react';
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
import { HackathonSubmitStateType } from '../../../type';

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
  Omit<FormComponentProps, 'type' | 'formState' | 'setCurrentStep'> & {
    submissionType: HackathonSubmitStateType['submissionType'];
  }
> = ({ onNext, onBack }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: undefined,
      teamName: '',
      teamCode: ''
    }
  });

  const [groupType, setGroupType] = useState<'join' | 'owner' | null>(null);

  const type = form.getValues('type');
  const isValid = form.formState.isValid;

  const disabled = useMemo(() => {
    return !isValid || (isValid && type !== 'Solo Project' && !groupType);
  }, [type, isValid, groupType]);

  const confirmRef = useRef<GroupActionConfirmRef>(null);

  const { deleteGroup, removeMember, leaveGroup } = useGroupAction();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onNext({
      submissionType: {
        type: values.type,
        groupType: groupType!,
        members: [
          {
            role: 'Admin',
            info: {
              name: 'Peter Parker'
            }
          },
          {
            role: 'member',
            info: {
              name: 'Peter Parker2'
            }
          },
          {
            role: 'member',
            info: {
              name: 'Peter Parker3'
            }
          }
        ]
      }
    });
  };

  const createTeam = () => {
    const teamName = form.getValues('teamName');
    if (!!teamName.trim()) setGroupType('owner');
  };

  const joinTeam = () => {
    const teamCode = form.getValues('teamCode');
    if (!!teamCode.trim()) setGroupType('join');
  };

  const onDeleteGroup = () => {
    confirmRef.current?.open<ActionType.DeleteTeam>({
      type: ActionType.DeleteTeam,
      teamName: form.getValues('teamName'),
      onConfirm: deleteGroup,
      onConfirmCallback: () => setGroupType(null)
    });
  };

  const onLeaveTeam = () => {
    confirmRef.current?.open<ActionType.LeaveTeam>({
      type: ActionType.LeaveTeam,
      teamName: '测试战队',
      onConfirm: leaveGroup,
      onConfirmCallback: () => setGroupType(null)
    });
  };

  const onRemoveMember = (id: string) => {
    confirmRef.current?.open<ActionType.RemoveMember>({
      type: ActionType.RemoveMember,
      userInfo: {
        username: '测试成员'
      },
      onConfirm: removeMember
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <ProjectTypeRadio form={form} />
          <div className="caption-14pt flex justify-between text-neutral-off-black">
            <p>Are you looking for a teammate? Follow HackQuest Discord to find your dream team!</p>
            <LinkArrow direction="right" decorate>
              Go to Discord
            </LinkArrow>
          </div>
          {type === 'Group Project' && groupType === null && (
            <div className="flex flex-col gap-3 text-left">
              <p>Create a new team or join an existing one.</p>
              <GroupProjectForm form={form} onCreateTeam={createTeam} onJoinTeam={joinTeam} />
            </div>
          )}
          {type === 'Group Project' && groupType === 'owner' && (
            <OwnerGroupDetail
              teamName={form.getValues('teamName')}
              onDelete={onDeleteGroup}
              onRemoveMember={onRemoveMember}
            />
          )}
          {type === 'Group Project' && groupType === 'join' && (
            <JoinGroupDetail teamName={form.getValues('teamCode')} onLeaveTeam={onLeaveTeam} />
          )}
          <div className="flex justify-end gap-4">
            <Button ghost className="button-text-m w-[165px] px-0 py-4 uppercase" onClick={onBack} htmlType="button">
              Back
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className={cn('w-[165px] px-0 py-4 uppercase', disabled ? 'bg-neutral-light-gray' : '')}
              disabled={disabled}
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
      <GroupActionConfirm ref={confirmRef} />
    </div>
  );
};

export default SubmissionTypeForm;
