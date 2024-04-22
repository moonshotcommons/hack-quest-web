import { cn } from '@/helper/utils';
import { UseFormReturn } from 'react-hook-form';
import { InfoFormSchema } from '..';

interface ProjectTypeRadioProps {
  form: UseFormReturn<InfoFormSchema, any, undefined>;
}

const ProjectTrackRadio = ({ form }: ProjectTypeRadioProps) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="body-m text-left text-neutral-rich-gray">Which Hackathon Track Do You Belong To</p>
      <div className="flex w-full justify-between gap-5">
        <div
          onClick={() => {
            form.setValue('track', 'AI + Web3 Applications');
            form.trigger('track');
          }}
          className={cn(
            `body-m flex h-[50px]  w-full cursor-pointer items-center justify-center gap-3 rounded-[8px] border-[3px] border-neutral-off-white px-5 py-3`,
            form.watch('track') === 'AI + Web3 Applications'
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
            `body-m flex h-[50px]  w-full cursor-pointer items-center justify-center gap-3 rounded-[8px] border-[3px] border-neutral-off-white px-5 py-3`,
            form.watch('track') === 'Fully On-chain Game'
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
