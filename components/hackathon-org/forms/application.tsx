'use client';

import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/hackathon-org/common/radio-group';
import { Separator } from '@/components/ui/separator';
import { TextField } from '@/components/ui/text-field';
import { About } from './applications/about';
import { OnlineProfile } from './applications/online-profile';
import { Contact } from './applications/contact';
import { ActionButtons } from './action-buttons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useHackathonOrgState } from '../constants/state';
import webApi from '@/service';
import { useApplicationState } from './applications/state';
import { v4 } from 'uuid';
import { Steps } from '../constants/steps';
import { updateState } from '../constants/utils';

const formSchema = z
  .object({
    applicationType: z.enum(['Solo or Group', 'Solo Only', 'Group Only'], {
      required_error: 'Please select an application type'
    }),
    minimumTeamSize: z.string().optional(),
    maximumTeamSize: z.string().optional()
  })
  .refine(
    (data) => {
      if (data.applicationType !== 'Solo Only') {
        return data.minimumTeamSize && data.minimumTeamSize.length > 0;
      }
      return true;
    },
    {
      message: 'Minimum team size is required',
      path: ['minimumTeamSize']
    }
  )
  .refine(
    (data) => {
      if (data.applicationType !== 'Solo Only') {
        return data.maximumTeamSize && data.maximumTeamSize.length > 0;
      }
      return true;
    },
    {
      message: 'Maximum team size is required',
      path: ['maximumTeamSize']
    }
  );

export function ApplicationForm({
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
  const { application } = initialValues?.info;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicationType: 'Solo or Group',
      minimumTeamSize: '',
      maximumTeamSize: ''
    }
  });

  const queryClient = useQueryClient();
  const { aboutState, onlineProfileState, contactState, setAboutState, setOnlineProfileState, setContactState } =
    useApplicationState();
  const { updateStatus, onPrevious, onNext } = useHackathonOrgState();

  const mutation = useMutation({
    mutationFn: (data: any) => webApi.hackathonV2Api.updateHackathon(data, 'application'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hackathon'] });
      isEditMode ? onSave?.() : onNext();
    }
  });

  const disabled = form.watch('applicationType') === 'Solo Only';
  const isValid = form.formState.isValid;

  function onSubmit(data: z.infer<typeof formSchema>) {
    const values = {
      id: initialValues?.id,
      application: {
        ApplicationType: {
          id: v4(),
          type: 'ApplicationType',
          property: {
            type: data.applicationType,
            ...(!disabled && {
              minSize: Number(data.minimumTeamSize),
              maxSize: Number(data.maximumTeamSize)
            })
          }
        },
        About: aboutState.filter((i) => i.selected),
        OnlineProfiles: onlineProfileState.filter((i) => i.selected),
        Contact: contactState.filter((i) => i.selected)
      }
    };
    mutation.mutate(values);
  }

  function onCancelOrBack() {
    isEditMode ? onCancel?.() : onPrevious();
  }

  React.useEffect(() => {
    if (!isEditMode) {
      if (isValid) {
        updateStatus(Steps.APPLICATION, true);
      } else {
        updateStatus(Steps.APPLICATION, false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid, isEditMode]);

  React.useEffect(() => {
    if (Object.keys(application || {}).length > 0) {
      setAboutState(updateState(aboutState, application?.About || []));
      setOnlineProfileState(updateState(onlineProfileState, application?.OnlineProfiles || []));
      setContactState(updateState(contactState, application?.Contact || []));

      form.reset({
        applicationType: application?.ApplicationType?.property?.type || 'Solo or Group',
        minimumTeamSize: String(application?.ApplicationType?.property?.minSize || ''),
        maximumTeamSize: String(application?.ApplicationType?.property?.maxSize || '')
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [application]);

  return (
    <div className="flex flex-col gap-6">
      <p className="body-l text-neutral-off-black">Set the hackathon application type and team size</p>
      <Form {...form}>
        <form className="flex flex-col items-center space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="applicationType"
            render={({ field }) => (
              <FormItem className="w-full space-y-1">
                <div className="flex items-center justify-between">
                  <FormLabel>
                    <span className="sm:body-m body-s text-neutral-rich-gray">Application Type (Select One)*</span>
                  </FormLabel>
                </div>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value as any);
                    }}
                    className="w-full grid-cols-3"
                  >
                    <FormControl>
                      <RadioGroupItem value="Solo or Group">Solo or Group</RadioGroupItem>
                    </FormControl>
                    <FormControl>
                      <RadioGroupItem value="Solo Only">Solo Only</RadioGroupItem>
                    </FormControl>
                    <FormControl>
                      <RadioGroupItem value="Group Only">Group Only</RadioGroupItem>
                    </FormControl>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid w-full grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="minimumTeamSize"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>
                      <span className="sm:body-m body-s text-neutral-rich-gray">MIN. Team Size Allowed*</span>
                    </FormLabel>
                  </div>
                  <FormControl>
                    <TextField
                      {...field}
                      disabled={disabled}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      autoComplete="off"
                      placeholder="e.g. 2"
                      className="aria-[invalid=true]:border-status-error-dark"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maximumTeamSize"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>
                      <span className="sm:body-m body-s text-neutral-rich-gray">MAX. Team Size Allowed*</span>
                    </FormLabel>
                  </div>
                  <FormControl>
                    <TextField
                      {...field}
                      disabled={disabled}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      autoComplete="off"
                      placeholder="e.g. 4"
                      className="aria-[invalid=true]:border-status-error-dark"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <p className="body-l text-neutral-off-black">
            Select the profile fields you wish to make mandatory in your hackathon application. The shorter your form
            is, the faster you stack up the applications.
          </p>
          <About />
          <OnlineProfile />
          <Contact />
          <ActionButtons
            isEditMode={isEditMode}
            isValid={isValid}
            isLoading={mutation.isPending}
            onCancelOrBack={onCancelOrBack}
          />
        </form>
      </Form>
    </div>
  );
}
