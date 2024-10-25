import React, { useContext, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { scheduleFormSchema } from '../../../../../constants/data';
import Button from '@/components/Common/Button';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { Textarea } from '@/components/ui/textarea';
import { cloneDeep } from 'lodash-es';
import { HackathonScheduleType, HackathonType } from '@/service/webApi/resourceStation/type';
import { HackathonEditContext } from '../../../../../constants/type';
import { DatePicker } from '@/components/hackathon-org/common/date-picker';
import dayjs from '@/components/Common/Dayjs';
import { InfoIcon } from 'lucide-react';
import { TEXT_EDITOR_TYPE, transformTextToEditorValue } from '@/components/Common/TextEditor';

import dynamic from 'next/dynamic';
const TextEditor = dynamic(() => import('@/components/Common/TextEditor'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

interface EditProp {
  hackathon: HackathonType;
  schedule: HackathonScheduleType;
  handleRemoveEvent: VoidFunction;
  handleAdd: (schedule: HackathonScheduleType) => void;
}

const Edit: React.FC<EditProp> = ({ hackathon, schedule, handleRemoveEvent, handleAdd }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);

  const defaultValues: z.infer<typeof scheduleFormSchema> = cloneDeep({
    ...schedule,
    description: ''
  });
  const { loading } = useContext(HackathonEditContext);
  const [timeError, setTimeError] = useState('');

  const [description, setDescription] = useState<{ type: string; content: object }>();

  const form = useForm<z.infer<typeof scheduleFormSchema>>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: defaultValues
  });
  const cantSubmit = useMemo(() => {
    const { eventName, startTime, endTime } = form?.getValues() || {};
    return !eventName || !startTime || !endTime;
  }, [form.watch()]);

  const add = async () => {
    const isValid = await form.trigger();
    if (cantSubmit || !isValid) return;
    const value = form?.getValues();
    (value as any).description = description;
    const { startTime, endTime } = value;
    if (dayjs(startTime).isAfter(endTime)) {
      // form.setError('endTime', {
      //   type: 'manual',
      //   message: 'The end time must be longer than the start time'
      // });
      setTimeError('The end time must be longer than the start time');
      return;
    }
    setTimeError('');
    handleAdd(value as HackathonScheduleType);
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
            <FormLabel>
              <span className="body-m text-neutral-rich-gray">Timezone*</span>
            </FormLabel>
            <Input
              disabled
              className="body-m bg-neutral-light-gray text-neutral-medium-gray"
              value={hackathon.timeline?.timeZone}
            />
          </div>
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="flex items-center justify-between">
                  <FormLabel className="body-m text-neutral-rich-gray">{'Start Time*'}</FormLabel>
                </div>
                <FormControl>
                  <DatePicker {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem className="w-full ">
                <div className="flex items-center justify-between">
                  <FormLabel className="body-m text-neutral-rich-gray">{'End Time*'}</FormLabel>
                </div>
                <FormControl>
                  <DatePicker {...field} />
                </FormControl>
                <FormMessage />
                {timeError && (
                  <div className={`body-s flex items-center text-status-error-dark`}>
                    <InfoIcon className="mr-1.5 h-4 w-4" />
                    {timeError}
                  </div>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'speakerNames'}
            render={({ field }) => (
              <FormItem className="w-full text-left">
                <div className="flex w-full justify-between">
                  <FormLabel className="body-m text-neutral-rich-gray">{'Speaker Names'}</FormLabel>
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
                  {/* <span className="caption-14pt text-neutral-rich-gray">
                    <span className={form.watch('description').length > 360 ? 'text-status-error' : ''}>
                      {form.watch('description').length}
                    </span>
                    /360
                  </span> */}
                </div>
                <FormControl>
                  <Textarea
                    authHeight={false}
                    placeholder={'Write a brief description for your hackathon'}
                    {...field}
                    className="body-m body-m hidden h-[128px] border-neutral-light-gray py-3"
                  />
                </FormControl>
                <TextEditor
                  simpleModel
                  onCreated={(editor) => {
                    const text = editor.getText().replace(/\n|\r/gm, '');
                    setDescription({ type: TEXT_EDITOR_TYPE, content: editor.children });
                    form.setValue('description', text);
                  }}
                  defaultContent={transformTextToEditorValue(schedule?.description)}
                  onChange={(editor) => {
                    const text = editor.getText().replace(/\n|\r/gm, '');
                    form.setValue('description', text);
                    setDescription({ type: TEXT_EDITOR_TYPE, content: editor.children });
                  }}
                />
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
            disabled={cantSubmit}
            className={`button-text-s h-[34px] w-[140px] uppercase ${cantSubmit && 'bg-neutral-light-gray text-neutral-medium-gray'}`}
            loading={loading}
            onClick={() => {
              add();
            }}
          >
            {hackathon.info?.sections?.schedule?.list?.some((v) => v.id === schedule.id) ? t('change') : t('add')}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Edit;
