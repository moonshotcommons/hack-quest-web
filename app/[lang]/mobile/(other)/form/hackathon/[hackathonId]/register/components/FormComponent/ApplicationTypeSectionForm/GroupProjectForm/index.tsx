import { FC, useMemo } from 'react';
import Button from '@/components/Common/Button';
import { UseFormReturn } from 'react-hook-form';
import { SubmissionTypeFormSchema } from '..';
import { cn } from '@/helper/utils';
import CustomFormField from '@/components/Web/Business/CustomFormField';
import { useRequest } from 'ahooks';

interface GroupProjectFormProps {
  form: UseFormReturn<SubmissionTypeFormSchema, any, undefined>;
  onCreateTeam: () => Promise<void>;
  onJoinTeam: () => Promise<void>;
}

const GroupProjectForm: FC<GroupProjectFormProps> = ({ form, onCreateTeam, onJoinTeam }) => {
  const teamName = form.getValues('teamName').trim();
  const teamCode = form.getValues('teamCode').trim();
  const teamNameDisable = useMemo(() => {
    return !teamName;
  }, [teamName]);

  const teamCodeDisable = useMemo(() => {
    return !teamCode;
  }, [teamCode]);

  const { run: create, loading: createLoading } = useRequest(
    () => {
      return onCreateTeam();
    },
    {
      manual: true
    }
  );

  const { run: join, loading: joinLoading } = useRequest(
    () => {
      return onJoinTeam();
    },
    {
      manual: true
    }
  );

  return (
    <>
      <div className="flex flex-col gap-1">
        <CustomFormField
          form={form}
          label="Team Name"
          placeholder="Enter a team name"
          name="teamName"
          className="focus:border-yellow-dark"
        />
        <div className="mt-2 flex justify-end">
          <Button
            type="primary"
            htmlType="button"
            className={cn(
              'button-text-s w-[140px] items-center px-0 py-2 uppercase',
              teamNameDisable ? 'bg-neutral-light-gray' : ''
            )}
            disabled={teamNameDisable}
            loading={createLoading}
            onClick={create}
          >
            create team
          </Button>
        </div>
      </div>
      <div className="flex h-[22px] items-center justify-between gap-6">
        <span className="h-px flex-1 scale-y-50 bg-neutral-medium-gray"></span>
        <span className="body-s inline-block w-4">or</span>
        <span className="h-px flex-1 scale-y-50 bg-neutral-medium-gray"></span>
      </div>

      <div className="flex flex-col gap-1">
        <CustomFormField
          form={form}
          label="Team Code"
          placeholder="e.g. HX56QSDFDSC"
          name="teamCode"
          className="focus:border-yellow-dark"
        />
        <div className="mt-2 flex justify-end">
          <Button
            type="primary"
            className={cn(
              'button-text-s w-[140px] items-center px-0 py-2 uppercase',
              teamCodeDisable ? 'bg-neutral-light-gray' : ''
            )}
            htmlType="button"
            disabled={teamCodeDisable}
            loading={joinLoading}
            onClick={join}
          >
            join team
          </Button>
        </div>
      </div>
    </>
  );
};

export default GroupProjectForm;
