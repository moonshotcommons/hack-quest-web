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
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoIcon } from 'lucide-react';
import { dateToUTC, timelineDateFormat } from '@/components/Common/Dayjs';

const formSchema = z
  .object({
    timeZone: z.string().min(1, {
      message: 'Timezone is required'
    }),
    openReviewSame: z.enum(['true', 'false']),
    registrationOpen: z.string().min(1, {
      message: 'Registration open time is required'
    }),
    registrationClose: z.string().optional(),
    submissionOpen: z.string().optional(),
    submissionClose: z.string().min(1, {
      message: 'Submission close time is required'
    }),
    rewardTime: z.string().min(1, {
      message: 'Reward announcement is required'
    })
  })
  .superRefine((data, ctx) => {
    if (data.openReviewSame === 'false') {
      if (!data.registrationClose) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Registration close time is required',
          path: ['registrationClose']
        });
      }
      if (!data.submissionOpen) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Submission open time is required',
          path: ['submissionOpen']
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
          name="registrationOpen"
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
          name="registrationClose"
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
          name="submissionOpen"
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
          name="submissionClose"
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
                  <span className="body-m text-neutral-rich-gray">Judging Ends*</span>
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
        name="registrationOpen"
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
        name="submissionClose"
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
                <span className="body-m text-neutral-rich-gray">Judging Ends*</span>
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
  const { onStepChange } = useHackathonOrgState();

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
      registrationOpen: '',
      registrationClose: '',
      submissionOpen: '',
      submissionClose: '',
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
      registrationOpen: dateToUTC(data.registrationOpen, data.timeZone),
      registrationClose: isSame
        ? dateToUTC(data.submissionClose, data.timeZone)
        : dateToUTC(data.registrationClose!, data.timeZone),
      submissionOpen: isSame
        ? dateToUTC(data.registrationOpen, data.timeZone)
        : dateToUTC(data.submissionOpen!, data.timeZone),
      submissionClose: dateToUTC(data.submissionClose, data.timeZone),
      rewardTime: dateToUTC(data.rewardTime, data.timeZone)
    };
    mutation.mutate(values);
  }

  function onCancelOrBack() {
    isEditMode ? onCancel?.() : onStepChange(Steps.COVER);
  }

  React.useEffect(() => {
    if (initialValues?.timeline) {
      form.reset({
        openReviewSame: initialValues?.timeline?.openReviewSame?.toString(),
        timeZone: initialValues?.timeline?.timeZone,
        registrationOpen: timelineDateFormat(
          initialValues?.timeline?.registrationOpen,
          initialValues?.timeline?.timeZone
        ),
        registrationClose: timelineDateFormat(
          initialValues?.timeline?.registrationClose,
          initialValues?.timeline?.timeZone
        ),
        submissionOpen: timelineDateFormat(initialValues?.timeline?.submissionOpen, initialValues?.timeline?.timeZone),
        submissionClose: timelineDateFormat(
          initialValues?.timeline?.submissionClose,
          initialValues?.timeline?.timeZone
        ),
        rewardTime: timelineDateFormat(initialValues?.timeline?.rewardTime, initialValues?.timeline?.timeZone)
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
            <FormItem className="w-full space-y-1">
              <div className="flex items-center gap-3">
                <FormLabel>
                  <span className="body-m text-neutral-rich-gray">
                    Do the registration and submission periods start and end simultaneously?
                  </span>
                </FormLabel>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-5 w-5 text-neutral-off-black" />
                    </TooltipTrigger>
                    <TooltipContent className="flex max-w-[256px] flex-col gap-2 bg-yellow-extra-light p-4 text-xs font-light text-neutral-rich-gray">
                      <TooltipArrow className="fill-yellow-extra-light" />
                      <p>
                        For online hackathons, the registration and submission usually start and end at the same time;
                        for hybrid/offline hackathons, registration period usually ends before the start of submission,
                        so that organizers can manage and control the number of applicants on site.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
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
