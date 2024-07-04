'use client';

import * as React from 'react';
import * as z from 'zod';
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
    timeZone: z.string({
      required_error: 'Timezone is required'
    }),
    openReviewSame: z.enum(['true', 'false']),
    openTime: z.string({
      required_error: 'Registration open time is required'
    }),
    openTimeEnd: z.string().optional(),
    reviewTime: z.string().optional(),
    reviewTimeEnd: z.string({
      required_error: 'Submission close time is required'
    }),
    rewardTime: z.string({
      required_error: 'Reward announcement is required'
    })
  })
  .superRefine((data, ctx) => {
    if (data.openReviewSame === 'false') {
      if (!data.openTimeEnd) {
        ctx.addIssue({
          path: ['openTimeEnd'],
          code: z.ZodIssueCode.custom,
          message: 'Registration close time is required'
        });
      }
      if (!data.reviewTime) {
        ctx.addIssue({
          path: ['reviewTime'],
          code: z.ZodIssueCode.custom,
          message: 'Submission open time is required'
        });
      }
    }
  });

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
  const { updateStatus, onStepChange } = useHackathonOrgState();

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
      openReviewSame: 'false',
      openTime: '',
      openTimeEnd: '',
      reviewTime: '',
      reviewTimeEnd: '',
      rewardTime: ''
    }
  });

  const mutation = useMutation({
    mutationFn: (data: any) => webApi.hackathonV2Api.updateHackathon(data, 'timeline'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hackathon'] });
      isEditMode ? onSave?.() : onStepChange(Steps.APPLICATION);
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
    if (timezone && !initialValues?.timeline) {
      form.reset({ timeZone: timezone, openReviewSame: 'false' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timezone, initialValues?.timeline]);

  const openReviewSame = form.watch('openReviewSame');

  function onSubmit(data: z.infer<typeof formSchema>) {
    const isSame = data.openReviewSame === 'true';
    const values = {
      id: initialValues?.id,
      timeZone: data.timeZone,
      openReviewSame: isSame,
      openTime: new Date(data.openTime).toJSON(),
      openTimeEnd: isSame ? new Date(data.reviewTimeEnd).toJSON() : new Date(data.openTimeEnd!).toJSON(),
      reviewTime: isSame ? new Date(data.openTime).toJSON() : new Date(data.reviewTime!).toJSON(),
      reviewTimeEnd: new Date(data.reviewTimeEnd).toJSON(),
      rewardTime: new Date(data.rewardTime).toJSON()
    };
    // mutation.mutate(values);
    console.log(values);
  }

  function onCancelOrBack() {
    isEditMode ? onCancel?.() : onStepChange(Steps.COVER);
  }

  React.useEffect(() => {
    if (initialValues?.timeline) {
      form.reset({
        openReviewSame: initialValues?.timeline?.openReviewSame?.toString(),
        timeZone: initialValues?.timeline?.timeZone,
        openTime: new Date(initialValues?.timeline?.openTime).toISOString().slice(0, 16),
        openTimeEnd: new Date(initialValues?.timeline?.openTimeEnd).toISOString().slice(0, 16),
        reviewTime: new Date(initialValues?.timeline?.reviewTime).toISOString().slice(0, 16),
        reviewTimeEnd: new Date(initialValues?.timeline?.reviewTimeEnd).toISOString().slice(0, 16),
        rewardTime: new Date(initialValues?.timeline?.rewardTime).toISOString().slice(0, 16)
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues?.timeline]);

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
                    form.clearErrors();
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
