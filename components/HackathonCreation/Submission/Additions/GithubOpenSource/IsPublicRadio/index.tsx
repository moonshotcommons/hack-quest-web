import { cn } from '@/helper/utils';
import { UseFormReturn } from 'react-hook-form';

interface ProjectTypeRadioProps {
  form: UseFormReturn<any, any, undefined>;
  requiredTag: string;
}

const IsPublicRadio = ({ form, requiredTag }: ProjectTypeRadioProps) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="body-m text-left text-neutral-rich-gray">{'Is This An Open Source Project' + requiredTag}</p>
      <div className="flex w-full justify-between gap-5">
        <div
          onClick={() => {
            form.setValue('isOpenSource', true);
            form.trigger('isOpenSource');
          }}
          className={cn(
            `body-m flex h-[50px]  w-full cursor-pointer items-center justify-center gap-3 rounded-[8px] border-[3px] border-neutral-off-white px-5 py-3`,
            form.watch('isOpenSource') === true
              ? 'border-yellow-dark bg-yellow-extra-light shadow-[0px_0px_8px_0px_rgba(249,216,28,0.30)]'
              : ''
          )}
        >
          <span>Yes</span>
        </div>
        <div
          onClick={() => {
            form.setValue('isOpenSource', false);
            form.trigger('isOpenSource');
          }}
          className={cn(
            `body-m flex h-[50px]  w-full cursor-pointer items-center justify-center gap-3 rounded-[8px] border-[3px] border-neutral-off-white px-5 py-3`,
            form.watch('isOpenSource') === false
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

export default IsPublicRadio;
