import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRequest } from 'ahooks';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { scheduleFormSchema } from '../../../../constants/data';
import Button from '@/components/Common/Button';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface EditProp {}

const Edit: React.FC<EditProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const defaultValues: z.infer<typeof scheduleFormSchema> = {
    eventName: ''
    // startTime: '',
    // endTime: '',
    // speakerNames: '',
    // description: '',
    // link: '',
    // address: ''
  };

  const form = useForm<z.infer<typeof scheduleFormSchema>>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: defaultValues
  });

  const { run: submitRequest, loading } = useRequest(
    async (values: z.infer<typeof scheduleFormSchema>) => {
      console.info(values);
    },
    {
      manual: true,
      onSuccess() {},
      onError(err) {}
    }
  );

  const handleRemoveEvent = () => {};
  return (
    <Form {...form}>
      <form className="flex h-full w-full flex-col gap-6" onSubmit={form.handleSubmit(submitRequest)}>
        <div className="flex  flex-col gap-4 text-left">
          <FormField
            control={form.control}
            name={'eventName'}
            render={({ field }) => (
              <FormItem className="w-full text-left">
                <div className="flex w-full justify-between">
                  <FormLabel className="body-m text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
                    {'Event Name*'}
                  </FormLabel>
                  <span className="caption-14pt text-neutral-rich-gray">
                    <span className={form.watch('eventName').length > 80 ? 'text-status-error' : ''}>
                      {form.watch('eventName').length}
                    </span>
                    /80
                  </span>
                </div>
                <FormControl>
                  <Input placeholder={'Enter Event name'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name={'eventName'}
            render={({ field }) => (
              <FormItem className="w-full text-left">
                <div className="flex w-full justify-between">
                  <FormLabel className="body-m text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
                    {'Event Name'}
                  </FormLabel>
                  <span className="caption-14pt text-neutral-rich-gray">
                    <span className={form.watch('eventName').length > 80 ? 'text-status-error' : ''}>
                      {form.watch('eventName').length}
                    </span>
                    /80
                  </span>
                </div>
                <FormControl>
                  <Textarea
                    authHeight={false}
                    placeholder={'Enter Event name'}
                    {...field}
                    className="body-m h-[128px] border-neutral-light-gray px-6 py-3 text-[16px] font-normal leading-[160%] text-neutral-medium-gray"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>
      </form>
      <div className="flex items-center justify-between">
        <span className="underline-m cursor-pointer text-neutral-off-black" onClick={handleRemoveEvent}>
          {t('hackathonDetail.removeEvent')}
        </span>
        <div className="flex gap-[16px]">
          <Button
            type="primary"
            className="button-text-s h-[34px] w-[140px] uppercase"
            onClick={() => {
              console.info(form.formState.isValid);
            }}
          >
            {t('add')}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Edit;
