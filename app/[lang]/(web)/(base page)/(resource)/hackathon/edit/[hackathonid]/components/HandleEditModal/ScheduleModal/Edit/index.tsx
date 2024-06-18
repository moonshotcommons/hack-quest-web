import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRequest } from 'ahooks';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { scheduleFormSchema } from '../../../../constants/data';

interface EditProp {}

const Edit: React.FC<EditProp> = () => {
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
  console.info(form);

  const { run: submitRequest, loading } = useRequest(async (values: z.infer<typeof scheduleFormSchema>) => {}, {
    manual: true,
    onSuccess() {},
    onError(err) {}
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitRequest)} className="flex h-full w-full flex-col gap-6">
        <div className="flex  flex-col gap-4 text-left">
          <FormField
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
                  <Input placeholder={'Enter Event name'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
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
          />
        </div>
      </form>
    </Form>
  );
};

export default Edit;
