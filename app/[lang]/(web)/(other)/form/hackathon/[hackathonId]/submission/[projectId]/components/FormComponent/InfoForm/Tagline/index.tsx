import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { InfoFormSchema } from '..';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface TaglineProps {
  form: UseFormReturn<InfoFormSchema, any, undefined>;
}

const Tagline: FC<TaglineProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name={'tagline'}
      render={({ field }) => (
        <FormItem className="w-full text-left">
          <div className="flex w-full justify-between">
            <FormLabel className="body-m text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
              {'Tagline'}
            </FormLabel>
            <span className="caption-14pt text-neutral-rich-gray">
              <span className={form.watch('tagline').length > 600 ? 'text-status-error' : ''}>
                {form.watch('tagline').length}
              </span>
              /600
            </span>
          </div>
          <FormControl>
            <Textarea
              placeholder={'An elevator pitch of your project'}
              {...field}
              className="body-m !mt-1 box-border flex h-[76px] min-h-[76px] items-center border-neutral-light-gray !py-[11px] px-6 text-[16px] font-normal leading-[160%] text-neutral-medium-gray"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Tagline;
