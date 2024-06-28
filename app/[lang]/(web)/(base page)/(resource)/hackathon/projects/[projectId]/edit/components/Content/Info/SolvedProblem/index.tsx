import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { FormSchema } from '../../constants';

interface SolvedProblemProps {
  form: UseFormReturn<FormSchema, any, undefined>;
}

const SolvedProblem: FC<SolvedProblemProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name={'solvedProblem'}
      render={({ field }) => (
        <FormItem className="w-full text-left">
          <div className="flex w-full justify-between">
            <FormLabel className="body-m text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
              {'The problem it solves'}
            </FormLabel>
            <span className="caption-14pt text-neutral-rich-gray">
              <span className={form.watch('solvedProblem').length > 600 ? 'text-status-error' : ''}>
                {form.watch('solvedProblem').length}
              </span>
              /600
            </span>
          </div>
          <FormControl>
            <Textarea
              placeholder={'The aim and objectives of your project, and why should people use it?'}
              {...field}
              className="body-m !mt-1 box-border flex h-[76px] min-h-[76px] items-center border-neutral-light-gray bg-neutral-off-white !py-[11px] px-6 text-[16px] font-normal leading-[160%] text-neutral-medium-gray focus:bg-neutral-white"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SolvedProblem;
