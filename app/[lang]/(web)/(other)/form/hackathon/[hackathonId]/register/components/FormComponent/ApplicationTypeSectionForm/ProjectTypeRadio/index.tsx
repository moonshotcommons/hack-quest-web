import { cn } from '@/helper/utils';
import { UseFormReturn } from 'react-hook-form';
import { SubmissionTypeFormSchema } from '..';
import { SubmissionType } from '../../../../type';
import { HackathonPartner } from '../../../../../submission/[projectId]/components/constants';

interface ProjectTypeRadioProps {
  form: UseFormReturn<SubmissionTypeFormSchema, any, undefined>;
  submissionType: SubmissionType;
  hackathonId: string;
  config: {
    type?: 'Solo or Group' | 'Solo Only' | 'Group Only';
    minSize?: number;
    maxSize?: number;
  };
}

const ProjectTypeRadio = ({ form, submissionType, hackathonId, config }: ProjectTypeRadioProps) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="body-l text-left text-neutral-off-black">Please choose the project type you want to submit</p>
      <div className="flex w-full justify-between gap-5">
        <div
          onClick={() => {
            if (hackathonId === HackathonPartner.Hack4Bengal || config.type === 'Group Only') return;
            if (!!Object.keys(submissionType.team || {}).length) {
              return;
            }

            form.setValue('type', 'Solo Project');
            form.trigger('type');
          }}
          className={cn(
            `body-m-bold flex h-[72px]  w-full cursor-pointer items-center justify-center gap-3 rounded-[8px] border-[3px] border-neutral-off-white p-5`,
            form.watch('type') === 'Solo Project'
              ? 'border-yellow-dark bg-yellow-extra-light shadow-[0px_0px_8px_0px_rgba(249,216,28,0.30)]'
              : '',
            !!Object.keys(submissionType.team || {}).length ||
              hackathonId === HackathonPartner.Hack4Bengal ||
              config.type === 'Group Only'
              ? '!cursor-not-allowed'
              : ''
          )}
          title={
            !!Object.keys(submissionType.team || {}).length
              ? 'You must first delete or leave the team!'
              : hackathonId === HackathonPartner.Hack4Bengal || config.type === 'Group Only'
                ? 'Solo participation is not allowed!'
                : ''
          }
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="15.5" stroke="#3E3E3E" />
            <g clipPath="url(#clip0_8109_38111)">
              <path
                d="M15.9043 16.1094C15.0793 16.1094 14.373 15.8156 13.7855 15.2281C13.198 14.6406 12.9043 13.9344 12.9043 13.1094C12.9043 12.2844 13.198 11.5781 13.7855 10.9906C14.373 10.4031 15.0793 10.1094 15.9043 10.1094C16.7293 10.1094 17.4355 10.4031 18.023 10.9906C18.6105 11.5781 18.9043 12.2844 18.9043 13.1094C18.9043 13.9344 18.6105 14.6406 18.023 15.2281C17.4355 15.8156 16.7293 16.1094 15.9043 16.1094ZM9.9043 22.1094V20.0094C9.9043 19.5844 10.0137 19.1938 10.2324 18.8375C10.4512 18.4813 10.7418 18.2094 11.1043 18.0219C11.8793 17.6344 12.6668 17.3438 13.4668 17.15C14.2668 16.9563 15.0793 16.8594 15.9043 16.8594C16.7293 16.8594 17.5418 16.9563 18.3418 17.15C19.1418 17.3438 19.9293 17.6344 20.7043 18.0219C21.0668 18.2094 21.3574 18.4813 21.5762 18.8375C21.7949 19.1938 21.9043 19.5844 21.9043 20.0094V22.1094H9.9043ZM11.4043 20.6094H20.4043V20.0094C20.4043 19.8719 20.3699 19.7469 20.3012 19.6344C20.2324 19.5219 20.1418 19.4344 20.0293 19.3719C19.3543 19.0344 18.673 18.7812 17.9855 18.6125C17.298 18.4438 16.6043 18.3594 15.9043 18.3594C15.2043 18.3594 14.5105 18.4438 13.823 18.6125C13.1355 18.7812 12.4543 19.0344 11.7793 19.3719C11.6668 19.4344 11.5762 19.5219 11.5074 19.6344C11.4387 19.7469 11.4043 19.8719 11.4043 20.0094V20.6094ZM15.9043 14.6094C16.3168 14.6094 16.6699 14.4625 16.9637 14.1688C17.2574 13.875 17.4043 13.5219 17.4043 13.1094C17.4043 12.6969 17.2574 12.3438 16.9637 12.05C16.6699 11.7563 16.3168 11.6094 15.9043 11.6094C15.4918 11.6094 15.1387 11.7563 14.8449 12.05C14.5512 12.3438 14.4043 12.6969 14.4043 13.1094C14.4043 13.5219 14.5512 13.875 14.8449 14.1688C15.1387 14.4625 15.4918 14.6094 15.9043 14.6094Z"
                fill="#3E3E3E"
              />
            </g>
            <defs>
              <clipPath id="clip0_8109_38111">
                <rect width="12" height="20" fill="white" transform="translate(9.9043 6.10938)" />
              </clipPath>
            </defs>
          </svg>
          <span>Solo Project</span>
        </div>
        <div
          onClick={() => {
            if (config.type === 'Solo Only') return;
            form.setValue('type', 'Group Project');
            form.trigger('type');
          }}
          className={cn(
            `body-m-bold flex h-[72px]  w-full cursor-pointer items-center justify-center gap-3 rounded-[8px] border-[3px] border-neutral-off-white p-5`,
            form.watch('type') === 'Group Project'
              ? 'border-yellow-dark bg-yellow-extra-light shadow-[0px_0px_8px_0px_rgba(249,216,28,0.30)]'
              : '',
            config.type === 'Solo Only' ? '!cursor-not-allowed' : ''
          )}
          title={config.type === 'Group Only' ? 'Group participation is not allowed!' : ''}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="15.5" stroke="#3E3E3E" />
            <g clipPath="url(#clip0_8109_38117)">
              <path
                d="M8.5 21.6094V19.5094C8.5 19.0844 8.60938 18.6938 8.82812 18.3375C9.04688 17.9813 9.3375 17.7094 9.7 17.5219C10.475 17.1344 11.2625 16.8438 12.0625 16.65C12.8625 16.4563 13.675 16.3594 14.5 16.3594C15.325 16.3594 16.1375 16.4563 16.9375 16.65C17.7375 16.8438 18.525 17.1344 19.3 17.5219C19.6625 17.7094 19.9531 17.9813 20.1719 18.3375C20.3906 18.6938 20.5 19.0844 20.5 19.5094V21.6094H8.5ZM22 21.6094V19.3594C22 18.8094 21.8469 18.2812 21.5406 17.775C21.2344 17.2688 20.8 16.8344 20.2375 16.4719C20.875 16.5469 21.475 16.675 22.0375 16.8563C22.6 17.0375 23.125 17.2594 23.6125 17.5219C24.0625 17.7719 24.4063 18.05 24.6438 18.3563C24.8813 18.6625 25 18.9969 25 19.3594V21.6094H22ZM14.5 15.6094C13.675 15.6094 12.9688 15.3156 12.3813 14.7281C11.7938 14.1406 11.5 13.4344 11.5 12.6094C11.5 11.7844 11.7938 11.0781 12.3813 10.4906C12.9688 9.90312 13.675 9.60938 14.5 9.60938C15.325 9.60938 16.0313 9.90312 16.6188 10.4906C17.2063 11.0781 17.5 11.7844 17.5 12.6094C17.5 13.4344 17.2063 14.1406 16.6188 14.7281C16.0313 15.3156 15.325 15.6094 14.5 15.6094ZM22 12.6094C22 13.4344 21.7063 14.1406 21.1188 14.7281C20.5312 15.3156 19.825 15.6094 19 15.6094C18.8625 15.6094 18.6875 15.5938 18.475 15.5625C18.2625 15.5312 18.0875 15.4969 17.95 15.4594C18.2875 15.0594 18.5469 14.6156 18.7281 14.1281C18.9094 13.6406 19 13.1344 19 12.6094C19 12.0844 18.9094 11.5781 18.7281 11.0906C18.5469 10.6031 18.2875 10.1594 17.95 9.75938C18.125 9.69688 18.3 9.65625 18.475 9.6375C18.65 9.61875 18.825 9.60938 19 9.60938C19.825 9.60938 20.5312 9.90312 21.1188 10.4906C21.7063 11.0781 22 11.7844 22 12.6094ZM10 20.1094H19V19.5094C19 19.3719 18.9656 19.2469 18.8969 19.1344C18.8281 19.0219 18.7375 18.9344 18.625 18.8719C17.95 18.5344 17.2688 18.2812 16.5813 18.1125C15.8938 17.9438 15.2 17.8594 14.5 17.8594C13.8 17.8594 13.1063 17.9438 12.4188 18.1125C11.7313 18.2812 11.05 18.5344 10.375 18.8719C10.2625 18.9344 10.1719 19.0219 10.1031 19.1344C10.0344 19.2469 10 19.3719 10 19.5094V20.1094ZM14.5 14.1094C14.9125 14.1094 15.2656 13.9625 15.5594 13.6688C15.8531 13.375 16 13.0219 16 12.6094C16 12.1969 15.8531 11.8438 15.5594 11.55C15.2656 11.2563 14.9125 11.1094 14.5 11.1094C14.0875 11.1094 13.7344 11.2563 13.4406 11.55C13.1469 11.8438 13 12.1969 13 12.6094C13 13.0219 13.1469 13.375 13.4406 13.6688C13.7344 13.9625 14.0875 14.1094 14.5 14.1094Z"
                fill="#3E3E3E"
              />
            </g>
            <defs>
              <clipPath id="clip0_8109_38117">
                <rect width="16.5" height="20" fill="white" transform="translate(8.5 5.60938)" />
              </clipPath>
            </defs>
          </svg>
          <span>Group Project</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectTypeRadio;
