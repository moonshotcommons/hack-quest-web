'use client';

import * as React from 'react';
import * as z from 'zod';
import { useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/hackathon-org/common/radio-group';
import { Timezone } from '@/components/hackathon-org/common/timezone';
import { Separator } from '@/components/ui/separator';
import { useQuery } from '@tanstack/react-query';
import { getTimezone } from '../actions';
import { ActionButtons } from './action-buttons';
import { DatePicker } from '../common/date-picker';
import { omit } from 'lodash-es';

const formSchema = z
  .object({
    timeZone: z.string().min(1, {
      message: 'Timezone is required'
    }),
    openReviewSame: z.enum(['true', 'false']),
    openStartTime: z.string().min(1, {
      message: 'Registration open time is required'
    }),
    openCloseTime: z.string().optional(),
    reviewStartTime: z.string().optional(),
    reviewCloseTime: z.string().min(1, {
      message: 'Submission close time is required'
    }),
    rewardTime: z.string().min(1, {
      message: 'Reward announcement is required'
    })
  })
  .refine(
    (data) => {
      if (data.openReviewSame === 'false') {
        return !!data.openCloseTime;
      }
      return true;
    },
    {
      message: 'Registration close time is required',
      path: ['openCloseTime']
    }
  )
  .refine(
    (data) => {
      if (data.openReviewSame === 'false') {
        return !!data.reviewStartTime;
      }
      return true;
    },
    {
      message: 'Submission start time is required',
      path: ['reviewStartTime']
    }
  );

function SameCloseTime() {
  const { control } = useFormContext<z.infer<typeof formSchema>>();
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={control}
          name="openStartTime"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="body-m text-neutral-rich-gray">Registration Open*</span>
                </FormLabel>
              </div>
              <FormControl>
                <DatePicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="openCloseTime"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="body-m text-neutral-rich-gray">Registration Close*</span>
                </FormLabel>
              </div>
              <FormControl>
                <DatePicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Separator />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={control}
          name="reviewStartTime"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="body-m text-neutral-rich-gray">Submission Open*</span>
                </FormLabel>
              </div>
              <FormControl>
                <DatePicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="reviewCloseTime"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="body-m text-neutral-rich-gray">Submission Close*</span>
                </FormLabel>
              </div>
              <FormControl>
                <DatePicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Separator />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={control}
          name="rewardTime"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="body-m text-neutral-rich-gray">Reward Announcement*</span>
                </FormLabel>
              </div>
              <FormControl>
                <DatePicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

function DifferentCloseTime() {
  const { control } = useFormContext<z.infer<typeof formSchema>>();
  return (
    <div className="flex flex-col gap-6">
      <FormField
        control={control}
        name="openStartTime"
        render={({ field }) => (
          <FormItem className="w-full space-y-1">
            <div className="flex items-center justify-between">
              <FormLabel>
                <span className="body-m text-neutral-rich-gray">Registration Open*</span>
              </FormLabel>
            </div>
            <FormControl>
              <DatePicker {...field} className="w-[calc(50%-0.5rem)]" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Separator />
      <FormField
        control={control}
        name="reviewCloseTime"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <div className="flex items-center justify-between">
              <FormLabel>
                <span className="body-m text-neutral-rich-gray">Submission Close*</span>
              </FormLabel>
            </div>
            <FormControl>
              <DatePicker {...field} className="w-[calc(50%-0.5rem)]" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Separator />
      <FormField
        control={control}
        name="rewardTime"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <div className="flex items-center justify-between">
              <FormLabel>
                <span className="body-m text-neutral-rich-gray">Reward Announcement*</span>
              </FormLabel>
            </div>
            <FormControl>
              <DatePicker {...field} className="w-[calc(50%-0.5rem)]" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export function TimelineForm({
  isEditMode = false,
  initialValues,
  onCancel,
  onSave
}: {
  isEditMode?: boolean;
  initialValues?: any;
  onCancel?: () => void;
  onSave?: () => void;
}) {
  const { data: timezone } = useQuery({
    staleTime: Infinity,
    queryKey: ['timezone'],
    queryFn: () => getTimezone(),
    select: (data) => data?.timezone
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      timeZone: timezone || '',
      openReviewSame: 'false'
    }
  });

  React.useEffect(() => {
    if (timezone) {
      form.reset({ timeZone: timezone });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timezone]);

  const openReviewSame = form.watch('openReviewSame');

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (data.openReviewSame === 'true') {
      data = omit(data, 'openCloseTime', 'reviewStartTime');
    }
    const values = {
      id: initialValues?.id,
      ...data,
      openReviewSame: data.openReviewSame === 'true'
    };
    console.log(values);
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="timeZone"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="body-m text-neutral-rich-gray">Timezone*</span>
                </FormLabel>
              </div>
              <FormControl>
                <Timezone value={field.value} onValueChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="openReviewSame"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value as any);
                  }}
                  className="w-full grid-cols-2"
                >
                  <FormControl>
                    <RadioGroupItem value="false">No, their open and close time is different</RadioGroupItem>
                  </FormControl>
                  <FormControl>
                    <RadioGroupItem value="true">Yes, their open and close time is the same</RadioGroupItem>
                  </FormControl>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <Separator />
        {openReviewSame === 'false' && <SameCloseTime />}
        {openReviewSame === 'true' && <DifferentCloseTime />}
        <ActionButtons
          // isLoading={mutation.isPending}
          isEditMode={isEditMode}
          isValid={form.formState.isValid}
          // onCancelOrBack={onCancelOrBack}
        />
      </form>
    </Form>
  );
}
