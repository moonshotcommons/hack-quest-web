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
      {/* <svg width="726" height="26" viewBox="0 0 726 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="329.5" y1="13.25" y2="13.25" stroke="#8C8C8C" strokeWidth="0.5" />
        <path
          d="M362.198 18.144C361.441 18.144 360.785 17.9787 360.23 17.648C359.675 17.3173 359.243 16.8533 358.934 16.256C358.635 15.648 358.486 14.9333 358.486 14.112C358.486 13.4933 358.571 12.9387 358.742 12.448C358.913 11.9467 359.163 11.52 359.494 11.168C359.825 10.816 360.214 10.5493 360.662 10.368C361.121 10.176 361.633 10.08 362.198 10.08C362.955 10.08 363.611 10.2453 364.166 10.576C364.721 10.9067 365.147 11.376 365.446 11.984C365.755 12.5813 365.91 13.2907 365.91 14.112C365.91 14.7307 365.825 15.2853 365.654 15.776C365.483 16.2667 365.233 16.6933 364.902 17.056C364.571 17.408 364.177 17.68 363.718 17.872C363.27 18.0533 362.763 18.144 362.198 18.144ZM362.198 17.104C362.678 17.104 363.099 16.9867 363.462 16.752C363.825 16.5173 364.102 16.176 364.294 15.728C364.497 15.28 364.598 14.7413 364.598 14.112C364.598 13.1413 364.379 12.4 363.942 11.888C363.515 11.376 362.934 11.12 362.198 11.12C361.707 11.12 361.281 11.2373 360.918 11.472C360.566 11.696 360.289 12.032 360.086 12.48C359.894 12.9173 359.798 13.4613 359.798 14.112C359.798 15.072 360.017 15.8133 360.454 16.336C360.891 16.848 361.473 17.104 362.198 17.104ZM368.513 18.112C368.299 18.112 368.134 18.0533 368.017 17.936C367.91 17.8187 367.857 17.6533 367.857 17.44V10.768C367.857 10.5547 367.91 10.3947 368.017 10.288C368.123 10.1707 368.278 10.112 368.481 10.112C368.683 10.112 368.838 10.1707 368.945 10.288C369.062 10.3947 369.121 10.5547 369.121 10.768V12.064H368.961C369.131 11.4347 369.457 10.9493 369.937 10.608C370.417 10.2667 371.009 10.0853 371.713 10.064C371.873 10.0533 372.001 10.0907 372.097 10.176C372.193 10.2507 372.246 10.384 372.257 10.576C372.267 10.7573 372.225 10.9013 372.129 11.008C372.033 11.1147 371.883 11.1787 371.681 11.2L371.425 11.232C370.699 11.296 370.139 11.5307 369.745 11.936C369.361 12.3307 369.169 12.8747 369.169 13.568V17.44C369.169 17.6533 369.11 17.8187 368.993 17.936C368.886 18.0533 368.726 18.112 368.513 18.112Z"
          fill="#8C8C8C"
        />
        <line x1="726" y1="13.25" x2="396.5" y2="13.25" stroke="#8C8C8C" strokeWidth="0.5" />
      </svg> */}
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
