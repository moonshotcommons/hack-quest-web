import { cn } from '@/helper/utils';
import { UseFormReturn } from 'react-hook-form';
import { FormSchema } from '../../constants';

interface ProjectTypeRadioProps {
  form: UseFormReturn<FormSchema, any, undefined>;
  tracks: string[];
  isClose: boolean;
}

const ProjectPrizeTrackRadio = ({ form, tracks, isClose }: ProjectTypeRadioProps) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="body-m text-left text-neutral-rich-gray">Which Hackathon Track Do You Belong To</p>
      <div className="flex w-full justify-between gap-5">
        {tracks.map((track) => {
          return (
            <div
              key={track}
              onClick={() => {
                if (isClose) return;
                form.setValue('prizeTrack', track);
                form.trigger('prizeTrack');
              }}
              className={cn(
                `body-m flex h-[50px]  w-full  items-center justify-center gap-3 rounded-[8px] border-[3px] border-neutral-off-white px-5 py-3`,
                form.watch('prizeTrack') === track
                  ? 'border-yellow-dark bg-yellow-extra-light shadow-[0px_0px_8px_0px_rgba(249,216,28,0.30)]'
                  : 'bg-neutral-white',
                isClose ? 'cursor-not-allowed' : 'cursor-pointer'
              )}
            >
              <span>{track}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectPrizeTrackRadio;
