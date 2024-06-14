'use client';

import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { TextField } from '@/components/ui/text-field';
import { Button } from '@/components/ui/button';
import { useToggle } from '@/hooks/utils/use-toggle';
import { ActionButtons } from './action-buttons';
import { VerifyEmail } from '../verify-email';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address'
  }),
  website: z
    .string()
    .url({
      message: 'Please enter a valid website address'
    })
    .optional()
    .or(z.literal('')),
  instagram: z.string().optional().or(z.literal('')),
  twitter: z.string().optional().or(z.literal('')),
  discord: z.string().optional().or(z.literal('')),
  slack: z.string().optional().or(z.literal('')),
  farcaster: z.string().optional().or(z.literal('')),
  telegram: z.string().optional().or(z.literal(''))
});

export function Links() {
  const [open, toggle] = useToggle(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'evan@gmail.com',
      website: '',
      instagram: '',
      twitter: '',
      discord: '',
      slack: '',
      farcaster: '',
      telegram: ''
    }
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
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
                      readOnly
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      autoComplete="off"
                      placeholder="Enter your contact email"
                      className="aria-[invalid=true]:border-status-error-dark"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="small" type="button" className="w-[140px] self-end" onClick={toggle}>
              verify
            </Button>
          </div>
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="w-full space-y-1">
                <FormLabel>
                  <span className="sm:body-m body-s text-neutral-rich-gray">Hackathon’s Website</span>
                </FormLabel>
                <FormControl>
                  <TextField
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
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
                    <span className="sm:body-m body-s text-neutral-rich-gray">Instagram</span>
                  </FormLabel>
                  <FormControl>
                    <TextField
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
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
                    <span className="sm:body-m body-s text-neutral-rich-gray">Twitter</span>
                  </FormLabel>
                  <FormControl>
                    <TextField
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
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
                    <span className="sm:body-m body-s text-neutral-rich-gray">Discord</span>
                  </FormLabel>
                  <FormControl>
                    <TextField
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
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
                    <span className="sm:body-m body-s text-neutral-rich-gray">Slack</span>
                  </FormLabel>
                  <FormControl>
                    <TextField
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
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
                    <span className="sm:body-m body-s text-neutral-rich-gray">Farcaster</span>
                  </FormLabel>
                  <FormControl>
                    <TextField
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
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
                    <span className="sm:body-m body-s text-neutral-rich-gray">Telegram</span>
                  </FormLabel>
                  <FormControl>
                    <TextField
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
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
          <ActionButtons isValid={form.formState.isValid} onBack={() => {}} />
        </form>
      </Form>
      <VerifyEmail open={open} onClose={() => toggle(false)} />
    </>
  );
}
