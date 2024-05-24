import { cn } from '@/helper/utils';
import { UseFormReturn } from 'react-hook-form';
import { FormSchema } from '../../constants';

interface ProjectTypeRadioProps {
  form: UseFormReturn<FormSchema, any, undefined>;
  isClose: boolean;
}

const IsPublicRadio = ({ form, isClose }: ProjectTypeRadioProps) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="body-m text-left text-neutral-rich-gray">Is This An Open Source Project</p>
      <div className="flex w-full justify-between gap-5">
        <div
          onClick={() => {
            debugger;
            form.watch('isPublic') === true;
            form.setValue('isPublic', true);
            form.trigger('isPublic');
          }}
          className={cn(
            `body-m flex h-[50px]  w-full  items-center justify-center gap-3 rounded-[8px] border-[3px] border-neutral-off-white px-5 py-3`,
            form.watch('isPublic') === true
              ? 'border-yellow-dark bg-yellow-extra-light shadow-[0px_0px_8px_0px_rgba(249,216,28,0.30)]'
              : 'bg-neutral-white',
            isClose ? 'cursor-not-allowed' : 'cursor-pointer'
          )}
        >
          <span>Yes</span>
        </div>
        <div
          onClick={() => {
            form.setValue('isPublic', false);
            form.trigger('isPublic');
          }}
          className={cn(
            `body-m flex h-[50px]  w-full cursor-pointer items-center justify-center gap-3 rounded-[8px] border-[3px] border-neutral-off-white px-5 py-3`,
            form.watch('isPublic') === false
              ? 'border-yellow-dark bg-yellow-extra-light shadow-[0px_0px_8px_0px_rgba(249,216,28,0.30)]'
              : 'bg-neutral-white',
            isClose ? 'cursor-not-allowed' : 'cursor-pointer'
          )}
        >
          <span>No</span>
        </div>
      </div>
    </div>
  );
};

export default IsPublicRadio;
