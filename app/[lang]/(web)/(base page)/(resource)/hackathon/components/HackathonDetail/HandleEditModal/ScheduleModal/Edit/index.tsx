import React, { useContext, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRequest } from 'ahooks';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { scheduleFormSchema } from '../../../../../constants/data';
import Button from '@/components/Common/Button';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { Textarea } from '@/components/ui/textarea';
import { v4 } from 'uuid';
import { cloneDeep } from 'lodash-es';
import { HackathonScheduleType, HackathonType } from '@/service/webApi/resourceStation/type';
import { HackathonEditContext } from '../../../../../constants/type';

interface EditProp {
  hackathon: HackathonType;
  schedule: HackathonScheduleType;
  handleRemoveEvent: VoidFunction;
  handleAdd: (schedule: HackathonScheduleType) => void;
}

const Edit: React.FC<EditProp> = ({ hackathon, schedule, handleRemoveEvent, handleAdd }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const defaultValues: z.infer<typeof scheduleFormSchema> = cloneDeep(schedule);
  const { loading } = useContext(HackathonEditContext);
  const form = useForm<z.infer<typeof scheduleFormSchema>>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: defaultValues
  });
  const cantSubmit = useMemo(() => {
    const { eventName, startTime, endTime } = form?.getValues() || {};
    return !eventName || !startTime || !endTime;
  }, [form.watch()]);

  const add = () => {
    form.trigger();
    if (cantSubmit || !form.formState.isValid) return;
    const value = form?.getValues();
    handleAdd(value);
  };

  return (
    <Form {...form}>
      <form className="flex h-full w-full flex-col gap-6">
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
                  <Input placeholder={'Enter Event name'} className="body-m" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <label className="body-m text-neutral-off-black">Timezone*</label>
            <Input
              disabled
              className="body-m bg-neutral-light-gray text-neutral-medium-gray"
              value={hackathon.timeline?.timeZone}
            />
          </div>
          <FormField
            control={form.control}
            name={'eventName'}
            render={({ field }) => (
              <FormItem className="w-full text-left">
                <div className="flex w-full justify-between">
                  <FormLabel className="body-m text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
                    {'Speaker Names'}
                  </FormLabel>
                </div>
                <FormControl>
                  <Input placeholder={'Enter the names of all speakers'} className="body-m" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'description'}
            render={({ field }) => (
              <FormItem className="w-full text-left">
                <div className="flex w-full justify-between">
                  <FormLabel className="body-m text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
                    {'Description'}
                  </FormLabel>
                  <span className="caption-14pt text-neutral-rich-gray">
                    <span className={form.watch('description').length > 360 ? 'text-status-error' : ''}>
                      {form.watch('description').length}
                    </span>
                    /360
                  </span>
                </div>
                <FormControl>
                  <Textarea
                    authHeight={false}
                    placeholder={'Write a brief description for your hackathon'}
                    {...field}
                    className="body-m body-m h-[128px] border-neutral-light-gray py-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'speakerNames'}
            render={({ field }) => (
              <FormItem className="w-full text-left">
                <div className="flex w-full justify-between">
                  <FormLabel className="body-m text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
                    {'Speaker Names'}
                  </FormLabel>
                </div>
                <FormControl>
                  <Input placeholder={'Enter the names of all speakers'} className="body-m" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'link'}
            render={({ field }) => (
              <FormItem className="w-full text-left">
                <div className="flex w-full justify-between">
                  <FormLabel className="body-m text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
                    {'Online Meeting URL'}
                  </FormLabel>
                </div>
                <FormControl>
                  <Input placeholder={'Enter the online meeting url'} className="body-m" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'address'}
            render={({ field }) => (
              <FormItem className="w-full text-left">
                <div className="flex w-full justify-between">
                  <FormLabel className="body-m text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
                    {'Online Meeting Address'}
                  </FormLabel>
                </div>
                <FormControl>
                  <Input placeholder={'Enter the online meeting address'} className="body-m" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            loading={loading}
            onClick={() => {
              add();
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
