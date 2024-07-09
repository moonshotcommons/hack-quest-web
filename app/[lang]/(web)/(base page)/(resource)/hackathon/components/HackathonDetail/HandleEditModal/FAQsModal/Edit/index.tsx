import React, { useContext } from 'react';
import { UseFieldArrayRemove, UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { FormValueType } from '../../../../../constants/data';

interface EditProp {
  form: UseFormReturn<FormValueType>;
  index: number;
  remove: UseFieldArrayRemove;
}

const Edit: React.FC<EditProp> = ({ form, index, remove }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className="flex flex-col gap-6 border-b border-neutral-medium-gray pb-6">
      <FormField
        control={form.control}
        name={`items.${index}.question`}
        render={({ field }) => (
          <FormItem className="w-full text-left">
            <div className="flex w-full justify-between">
              <FormLabel className="body-m text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
                {'Question*'}
              </FormLabel>
              <span className="caption-14pt text-neutral-rich-gray">
                <span className={form.watch('items')[index]['question'].length > 120 ? 'text-status-error' : ''}>
                  {form.watch('items')[index]['question'].length}
                </span>
                /120
              </span>
            </div>
            <FormControl>
              <Input maxLength={130} placeholder={'Enter the question'} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`items.${index}.answer`}
        render={({ field }) => (
          <FormItem className="w-full text-left">
            <div className="flex w-full justify-between">
              <FormLabel className="body-m text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
                {'Answer*'}
              </FormLabel>
              <span className="caption-14pt text-neutral-rich-gray">
                <span className={form.watch('items')[index]['answer'].length > 6000 ? 'text-status-error' : ''}>
                  {form.watch('items')[index]['answer'].length}
                </span>
                /6000
              </span>
            </div>
            <FormControl>
              <Textarea
                maxLength={6000}
                authHeight={false}
                placeholder={'Write the answer'}
                {...field}
                className="body-m h-[128px] "
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="">
        <span className="underline-m cursor-pointer text-neutral-off-black" onClick={() => remove(index)}>
          {t('hackathonDetail.removeEvent')}
        </span>
      </div>
    </div>
  );
};

export default Edit;
