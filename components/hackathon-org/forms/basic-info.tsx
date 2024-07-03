'use client';

import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/hackathon-org/common/radio-group';
import { TextField } from '@/components/ui/text-field';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/helper/utils';
import { ActionButtons } from './action-buttons';
import { Steps } from '../constants/steps';
import { useHackathonOrgState } from '../constants/state';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import webApi from '@/service';

const formSchema = z
  .object({
    name: z
      .string()
      .min(1, {
        message: 'Hackathon name is a required input'
      })
      .max(80, {
        message: 'Hackathon name cannot exceed 80 characters'
      }),
    host: z
      .string()
      .min(1, {
        message: 'Organization name is a required input'
      })
      .max(80, {
        message: 'Organization name cannot exceed 80 characters'
      }),
    intro: z
      .string()
      .min(1, {
        message: 'One line intro is a required input'
      })
      .max(120, {
        message: 'One line intro cannot exceed 120 characters'
      }),
    description: z
      .string()
      .min(1, {
        message: 'Description is a required input'
      })
      .max(360, {
        message: 'Description cannot exceed 360 characters'
      }),
    conduct: z
      .string()
      .url({
        message: 'Please enter a valid URL'
      })
      .optional()
      .or(z.literal('')),
    mode: z.enum(['HYBRID', 'ONLINE'], {
      required_error: 'You need to select a hackathon mode'
    }),
    address: z.string().optional()
  })
  .refine((data) => data.mode === 'ONLINE' || (data.mode === 'HYBRID' && data.address), {
    message: 'Venue is a required input for hybrid mode',
    path: ['address']
  });

export function BasicInfoForm({
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
  const { updateStatus, onNext } = useHackathonOrgState();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      host: '',
      intro: '',
      description: '',
      conduct: '',
      mode: 'HYBRID',
      address: ''
    }
  });

  const isValid = form.formState.isValid;

  const isHybridMode = form.watch('mode') === 'HYBRID';

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => webApi.hackathonV2Api.updateHackathon(data, 'info'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hackathon'] });
      isEditMode ? onSave?.() : onNext();
    }
  });

  React.useEffect(() => {
    if (!isEditMode) {
      if (isValid) {
        updateStatus(Steps.BASIC_INFO, true);
      } else {
        updateStatus(Steps.BASIC_INFO, false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid, isEditMode]);

  React.useEffect(() => {
    if (initialValues) {
      form.reset({
        name: initialValues?.name,
        ...initialValues?.info
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutation.mutate({
      id: initialValues?.id,
      ...data,
      address: data.mode === 'HYBRID' ? data.address : ''
    });
  }

  function onCancelOrBack() {
    if (isEditMode) {
      onCancel?.();
    } else {
    }
  }

  return (
    <Form {...form}>
      <form className="flex flex-col items-center space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="body-m text-neutral-rich-gray">Hackathon Name*</span>
                </FormLabel>
                <span className="caption-14pt text-neutral-rich-gray">
                  <span className={cn({ 'text-status-error': form.watch('name')?.length > 80 })}>
                    {form.watch('name')?.length}
                  </span>
                  /80
                </span>
              </div>
              <FormControl>
                <TextField
                  {...field}
                  autoComplete="off"
                  placeholder="Enter your hackathon name"
                  className="aria-[invalid=true]:border-status-error-dark"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="host"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="body-m text-neutral-rich-gray">Organization Name*</span>
                </FormLabel>
                <span className="caption-14pt text-neutral-rich-gray">
                  <span className={cn({ 'text-status-error': form.watch('host')?.length > 80 })}>
                    {form.watch('host')?.length}
                  </span>
                  /80
                </span>
              </div>
              <FormControl>
                <TextField
                  {...field}
                  autoComplete="off"
                  placeholder="e.g. Harvard University / Meta Platforms, Inc."
                  className="aria-[invalid=true]:border-status-error-dark"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="intro"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="sm:body-m body-s text-neutral-rich-gray">One Line Intro*</span>
                </FormLabel>
                <span className="sm:caption-14pt caption-12pt text-neutral-rich-gray">
                  <span className={cn({ 'text-status-error': form.watch('intro')?.length > 120 })}>
                    {form.watch('intro')?.length}
                  </span>
                  /120
                </span>
              </div>
              <FormControl>
                <TextField
                  {...field}
                  autoComplete="off"
                  placeholder="e.g. Biggest hackathon in Shanghai"
                  className="aria-[invalid=true]:border-status-error-dark"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="body-m text-neutral-rich-gray">Description*</span>
                </FormLabel>
                <span className="caption-14pt text-neutral-rich-gray">
                  <span className={cn({ 'text-status-error': form.watch('description')?.length > 360 })}>
                    {form.watch('description')?.length}
                  </span>
                  /360
                </span>
              </div>
              <FormControl>
                <Textarea
                  {...field}
                  authHeight={false}
                  autoComplete="off"
                  placeholder="Write a brief description for your hackathon"
                  className="h-[76px] border-neutral-light-gray p-3 text-base text-neutral-black transition-colors placeholder:text-neutral-medium-gray focus:border-neutral-medium-gray focus-visible:ring-0 aria-[invalid=true]:border-status-error-dark"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="conduct"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="body-m text-neutral-rich-gray">Code of Conduct</span>
                </FormLabel>
              </div>
              <FormControl>
                <TextField
                  {...field}
                  autoComplete="off"
                  placeholder="Enter a URL"
                  className="aria-[invalid=true]:border-status-error-dark"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mode"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="body-m text-neutral-rich-gray">Hackathon Mode (Select One)*</span>
                </FormLabel>
              </div>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value as any);
                  }}
                  className="w-full grid-cols-2"
                >
                  <FormControl>
                    <RadioGroupItem value="HYBRID">Hybrid</RadioGroupItem>
                  </FormControl>
                  <FormControl>
                    <RadioGroupItem value="ONLINE">Online</RadioGroupItem>
                  </FormControl>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isHybridMode && (
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full space-y-1">
                <div className="flex items-center justify-between">
                  <FormLabel>
                    <span className="body-m text-neutral-rich-gray">Venue*</span>
                  </FormLabel>
                </div>
                <FormControl>
                  <TextField
                    {...field}
                    autoComplete="off"
                    placeholder="Enter Venue Name"
                    className="aria-[invalid=true]:border-status-error-dark"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <ActionButtons
          isLoading={mutation.isPending}
          isEditMode={isEditMode}
          isValid={form.formState.isValid}
          onCancelOrBack={onCancelOrBack}
        />
      </form>
    </Form>
  );
}