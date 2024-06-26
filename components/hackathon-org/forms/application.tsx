'use client';

import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/hackathon-org/common/radio-group';
import { Separator } from '@/components/ui/separator';
import { TextField } from '@/components/ui/text-field';
import { useToggle } from '@/hooks/utils/use-toggle';
import { About } from './applications/about';
import { OnlineProfile } from './applications/online-profile';
import { Contact } from './applications/contact';
import { ActionButtons } from './action-buttons';

const formSchema = z.object({
  applicationType: z.enum(['solo-or-group', 'solo-only', 'group-only'], {
    required_error: 'Please select an application type'
  }),
  minimumTeamSize: z.string().min(1, {
    message: 'Minimum team size is a required input'
  }),
  maximumTeamSize: z.string().min(1, {
    message: 'Maximum team size is a required input'
  })
});

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
  const [open, toggle] = useToggle(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicationType: 'solo-or-group',
      minimumTeamSize: '',
      maximumTeamSize: ''
    }
  });

  const disabled = form.watch('applicationType') === 'solo-only';

  return (
    <div className="flex flex-col gap-6">
      <p className="body-l text-neutral-off-black">Set the hackathon application type and team size</p>
      <Form {...form}>
        <form className="flex flex-col items-center space-y-6">
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
                      <RadioGroupItem value="solo-or-group">Solo or Group</RadioGroupItem>
                    </FormControl>
                    <FormControl>
                      <RadioGroupItem value="solo-only">Solo Only</RadioGroupItem>
                    </FormControl>
                    <FormControl>
                      <RadioGroupItem value="group-only">Group Only</RadioGroupItem>
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
          <ActionButtons isEditMode={false} isValid />
        </form>
      </Form>
    </div>
  );
}
