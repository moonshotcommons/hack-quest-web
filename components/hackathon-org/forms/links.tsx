'use client';

import * as React from 'react';
import * as z from 'zod';
import { omit } from 'lodash-es';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { VerifyEmailModal } from '@/components/hackathon-org/modals/verify-email-modal';
import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/text-field';
import { useToggle } from '@/hooks/utils/use-toggle';
import { ActionButtons } from './action-buttons';
import { useUserStore } from '@/store/zustand/userStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import webApi from '@/service';
import { useHackathonOrgState } from '../constants/state';
import { Steps } from '../constants/steps';
import { flattenObj } from '../constants/utils';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address'
  }),
  website: z
    .string()
    .url({
      message: 'Please enter a valid URL'
    })
    .optional()
    .or(z.literal('')),
  instagram: z
    .string()
    .url({
      message: 'Please enter a valid URL'
    })
    .optional()
    .or(z.literal('')),
  twitter: z
    .string()
    .url({
      message: 'Please enter a valid URL'
    })
    .optional()
    .or(z.literal('')),
  discord: z
    .string()
    .url({
      message: 'Please enter a valid URL'
    })
    .optional()
    .or(z.literal('')),
  slack: z
    .string()
    .url({
      message: 'Please enter a valid URL'
    })
    .optional()
    .or(z.literal('')),
  farcaster: z
    .string()
    .url({
      message: 'Please enter a valid URL'
    })
    .optional()
    .or(z.literal('')),
  telegram: z
    .string()
    .url({
      message: 'Please enter a valid URL'
    })
    .optional()
    .or(z.literal(''))
});

export function LinksForm({
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
  const queryClient = useQueryClient();
  const { updateStatus, onStepChange } = useHackathonOrgState();
  const user = useUserStore((state) => state.userInfo);

  const mutation = useMutation({
    mutationFn: (data: any) => webApi.hackathonV2Api.updateHackathon(data, 'links'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hackathon'] });
      isEditMode ? onSave?.() : onStepChange(Steps.COVER);
    }
  });

  const sendEmailMutation = useMutation({
    mutationFn: (email: string) => webApi.hackathonV2Api.sendVerifyEmail(initialValues?.id, email),
    onSuccess: () => {
      toggle(true);
    }
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email || '',
      website: '',
      instagram: '',
      twitter: '',
      discord: '',
      slack: '',
      farcaster: '',
      telegram: ''
    }
  });

  const email = form.watch('email');
  const isValid = form.formState.isValid;

  React.useEffect(() => {
    if (!isEditMode) {
      if (isValid) {
        updateStatus(Steps.LINKS, true);
      } else {
        updateStatus(Steps.LINKS, false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid, isEditMode]);

  React.useEffect(() => {
    if (initialValues?.links) {
      const values = flattenObj(initialValues?.links);
      form.reset(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues?.links]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    const values = {
      id: initialValues?.id,
      email: data.email,
      website: data.website,
      links: omit(data, 'email', 'website')
    };
    mutation.mutate(values);
  }

  function onCancelOrBack() {
    isEditMode ? onCancel?.() : onStepChange(Steps.BASIC_INFO);
  }

  return (
    <>
      <Form {...form}>
        <form className="flex flex-col items-center space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <FormLabel>
                    <span className="body-m text-neutral-rich-gray">Personal Contact Email*</span>
                  </FormLabel>
                  <FormControl>
                    <TextField
                      {...field}
                      readOnly={!!user?.email}
                      autoComplete="off"
                      placeholder="Enter your contact email"
                      className="aria-[invalid=true]:border-status-error-dark"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!user?.email && (
              <Button
                size="small"
                disabled={!form.formState.isValid}
                type="button"
                isLoading={sendEmailMutation.isPending}
                className="w-[140px] self-end"
                onClick={() => {
                  const email = form.getValues('email');
                  sendEmailMutation.mutate(email);
                }}
              >
                Verify
              </Button>
            )}
          </div>
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="w-full space-y-1">
                <FormLabel>
                  <span className="body-m text-neutral-rich-gray">Hackathon’s Website</span>
                </FormLabel>
                <FormControl>
                  <TextField
                    {...field}
                    autoComplete="off"
                    placeholder="Enter your hackathon website"
                    className="aria-[invalid=true]:border-status-error-dark"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid w-full grid-cols-2 gap-x-3 gap-y-6">
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <FormLabel>
                    <span className="body-m text-neutral-rich-gray">Instagram</span>
                  </FormLabel>
                  <FormControl>
                    <TextField
                      {...field}
                      autoComplete="off"
                      placeholder="Enter hackathon Instagram account"
                      className="aria-[invalid=true]:border-status-error-dark"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <FormLabel>
                    <span className="body-m text-neutral-rich-gray">Twitter</span>
                  </FormLabel>
                  <FormControl>
                    <TextField
                      {...field}
                      autoComplete="off"
                      placeholder="Enter hackathon Twitter account"
                      className="aria-[invalid=true]:border-status-error-dark"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discord"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <FormLabel>
                    <span className="body-m text-neutral-rich-gray">Discord</span>
                  </FormLabel>
                  <FormControl>
                    <TextField
                      {...field}
                      autoComplete="off"
                      placeholder="Enter hackathon Discord account"
                      className="aria-[invalid=true]:border-status-error-dark"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slack"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <FormLabel>
                    <span className="body-m text-neutral-rich-gray">Slack</span>
                  </FormLabel>
                  <FormControl>
                    <TextField
                      {...field}
                      autoComplete="off"
                      placeholder="Enter hackathon Slack account"
                      className="aria-[invalid=true]:border-status-error-dark"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="farcaster"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <FormLabel>
                    <span className="body-m text-neutral-rich-gray">Farcaster</span>
                  </FormLabel>
                  <FormControl>
                    <TextField
                      {...field}
                      autoComplete="off"
                      placeholder="Enter hackathon Farcaster account"
                      className="aria-[invalid=true]:border-status-error-dark"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telegram"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <FormLabel>
                    <span className="body-m text-neutral-rich-gray">Telegram</span>
                  </FormLabel>
                  <FormControl>
                    <TextField
                      {...field}
                      autoComplete="off"
                      placeholder="Enter hackathon Telegram account"
                      className="aria-[invalid=true]:border-status-error-dark"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ActionButtons
            isLoading={mutation.isPending}
            isEditMode={isEditMode}
            isValid={isValid}
            onCancelOrBack={onCancelOrBack}
          />
        </form>
      </Form>
      <VerifyEmailModal email={email} hackathonId={initialValues?.id} open={open} onClose={() => toggle(false)} />
    </>
  );
}
