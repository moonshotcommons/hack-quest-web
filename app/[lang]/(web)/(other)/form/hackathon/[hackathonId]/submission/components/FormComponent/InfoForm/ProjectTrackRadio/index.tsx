import { cn } from '@/helper/utils';
import { UseFormReturn } from 'react-hook-form';
import { InfoFormSchema } from '..';

interface ProjectTypeRadioProps {
  form: UseFormReturn<InfoFormSchema, any, undefined>;
}

const ProjectTrackRadio = ({ form }: ProjectTypeRadioProps) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="body-l text-left text-neutral-off-black">Please choose the project type you want to submit</p>
      <div className="flex w-full justify-between gap-5">
        <div
          onClick={() => {
            form.setValue('track', 'AI + Web3 Applications');
            form.trigger('track');
          }}
          className={cn(
            `body-m-bold flex h-[72px]  w-full cursor-pointer items-center justify-center gap-3 rounded-[8px] border-[3px] border-neutral-off-white p-5`,
            form.watch('track') === 'Solo Project'
              ? 'border-yellow-dark bg-yellow-extra-light shadow-[0px_0px_8px_0px_rgba(249,216,28,0.30)]'
              : ''
          )}
        >
          <span>AI + Web3 Applications</span>
        </div>
        <div
          onClick={() => {
            form.setValue('track', 'Fully On-chain Game');
            form.trigger('track');
          }}
          className={cn(
            `body-m-bold flex h-[72px]  w-full cursor-pointer items-center justify-center gap-3 rounded-[8px] border-[3px] border-neutral-off-white p-5`,
            form.watch('track') === 'Group Project'
              ? 'border-yellow-dark bg-yellow-extra-light shadow-[0px_0px_8px_0px_rgba(249,216,28,0.30)]'
              : ''
          )}
        >
          <span>Fully On-chain Game</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectTrackRadio;
