import { cn } from '@/helper/utils';
import { UseFormReturn } from 'react-hook-form';
import { BioFormSchema } from '..';

interface ProjectTypeRadioProps {
  form: UseFormReturn<BioFormSchema, any, undefined>;
}

const EnrolledSingaporeRadio = ({ form }: ProjectTypeRadioProps) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="body-s text-left text-neutral-rich-gray">
        Are you currently enrolled at any universities in Singapore?
      </p>
      <div className="flex w-full justify-between gap-5">
        <div
          onClick={() => {
            form.setValue('isEnrolledSingapore', true);
            form.trigger('isEnrolledSingapore');
          }}
          className={cn(
            `body-s flex h-[50px]  w-full cursor-pointer items-center justify-center gap-3 rounded-[8px] border-[3px] border-neutral-off-white px-5 py-3`,
            form.watch('isEnrolledSingapore') === true
              ? 'border-yellow-dark bg-yellow-extra-light shadow-[0px_0px_8px_0px_rgba(249,216,28,0.30)]'
              : ''
          )}
        >
          <span>Yes</span>
        </div>
        <div
          onClick={() => {
            form.setValue('isEnrolledSingapore', false);
            form.trigger('isEnrolledSingapore');
          }}
          className={cn(
            `body-m flex h-[50px]  w-full cursor-pointer items-center justify-center gap-3 rounded-[8px] border-[3px] border-neutral-off-white px-5 py-3`,
            form.watch('isEnrolledSingapore') === false
              ? 'border-yellow-dark bg-yellow-extra-light shadow-[0px_0px_8px_0px_rgba(249,216,28,0.30)]'
              : ''
          )}
        >
          <span>No</span>
        </div>
      </div>
    </div>
  );
};

export default EnrolledSingaporeRadio;
