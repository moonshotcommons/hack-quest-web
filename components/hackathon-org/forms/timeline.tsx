'use client';

import * as React from 'react';
import * as z from 'zod';
import { omit } from 'lodash-es';
import { useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/hackathon-org/common/radio-group';
import { Timezone } from '@/components/hackathon-org/common/timezone';
import { Separator } from '@/components/ui/separator';
import webApi from '@/service';
import { getTimezone } from '../actions';
import { ActionButtons } from './action-buttons';
import { DatePicker } from '../common/date-picker';
import { useHackathonOrgState } from '../constants/state';
import { Steps } from '../constants/steps';

const formSchema = z
  .object({
    timeZone: z.string().min(1, {
      message: 'Timezone is required'
    }),
    openReviewSame: z.enum(['true', 'false']),
    openTime: z.string().min(1, {
      message: 'Registration open time is required'
    }),
    openTimeEnd: z.string().optional(),
    reviewTime: z.string().optional(),
    reviewTimeEnd: z.string().min(1, {
      message: 'Submission close time is required'
    }),
    rewardTime: z.string().min(1, {
      message: 'Reward announcement is required'
    })
  })
  .refine(
    (data) => {
      if (data.openReviewSame === 'false') {
        return !!data.openTimeEnd;
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
        return !!data.reviewTime;
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
          name="openTime"
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
          name="openTimeEnd"
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
          name="reviewTime"
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
          name="reviewTimeEnd"
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
        name="openTime"
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
        name="reviewTimeEnd"
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
  const queryClient = useQueryClient();
  const { updateStatus, onPrevious, onNext } = useHackathonOrgState();

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

  const mutation = useMutation({
    mutationFn: (data: any) => webApi.hackathonV2Api.updateHackathon(data, 'timeline'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hackathon'] });
      isEditMode ? onSave?.() : onNext();
    }
  });

  const isValid = form.formState.isValid;

  React.useEffect(() => {
    if (!isEditMode) {
      if (isValid) {
        updateStatus(Steps.TIMELINE, true);
      } else {
        updateStatus(Steps.TIMELINE, false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid, isEditMode]);

  React.useEffect(() => {
    if (timezone) {
      form.reset({ timeZone: timezone, openReviewSame: 'false' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timezone]);

  const openReviewSame = form.watch('openReviewSame');

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (data.openReviewSame === 'true') {
      data = omit(data, 'openTimeEnd', 'reviewTime');
    }
    const values = {
      id: initialValues?.id,
      ...data,
      openReviewSame: data.openReviewSame === 'true'
    };
    mutation.mutate(values);
  }

  function onCancelOrBack() {
    isEditMode ? onCancel?.() : onPrevious();
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
          isLoading={mutation.isPending}
          isEditMode={isEditMode}
          isValid={isValid}
          onCancelOrBack={onCancelOrBack}
        />
      </form>
    </Form>
  );
}
