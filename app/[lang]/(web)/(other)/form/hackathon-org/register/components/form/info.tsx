'use client';

import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { TextField } from '@/components/ui/text-field';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/helper/utils';
import { RadioGroup, RadioGroupItem } from '../radio-group';
import { ActionButtons } from './action-buttons';

const formSchema = z.object({
  hackathonName: z
    .string()
    .min(1, {
      message: 'Hackathon name is a required input'
    })
    .max(80, {
      message: 'Hackathon name cannot exceed 80 characters'
    }),
  organizationName: z
    .string()
    .min(1, {
      message: 'Organization name is a required input'
    })
    .max(80, {
      message: 'Organization name cannot exceed 80 characters'
    }),
  oneLineIntro: z
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
  hackathonMode: z.enum(['hybrid', 'online'], {
    required_error: 'You need to select a hackathon mode'
  })
});

export function Info() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hackathonName: '',
      organizationName: '',
      oneLineIntro: '',
      description: '',
      conduct: ''
    }
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form className="flex flex-col items-center space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="hackathonName"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="sm:body-m body-s text-neutral-rich-gray">Hackathon Name*</span>
                </FormLabel>
                <span className="sm:caption-14pt caption-12pt text-neutral-rich-gray">
                  <span className={cn({ 'text-status-error': form.watch('hackathonName')?.length > 80 })}>
                    {form.watch('hackathonName')?.length}
                  </span>
                  /80
                </span>
              </div>
              <FormControl>
                <TextField
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
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
          name="organizationName"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="sm:body-m body-s text-neutral-rich-gray">Organization Name*</span>
                </FormLabel>
                <span className="sm:caption-14pt caption-12pt text-neutral-rich-gray">
                  <span className={cn({ 'text-status-error': form.watch('organizationName')?.length > 80 })}>
                    {form.watch('organizationName')?.length}
                  </span>
                  /80
                </span>
              </div>
              <FormControl>
                <TextField
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
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
          name="oneLineIntro"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="sm:body-m body-s text-neutral-rich-gray">One Line Intro*</span>
                </FormLabel>
                <span className="sm:caption-14pt caption-12pt text-neutral-rich-gray">
                  <span className={cn({ 'text-status-error': form.watch('oneLineIntro')?.length > 120 })}>
                    {form.watch('oneLineIntro')?.length}
                  </span>
                  /120
                </span>
              </div>
              <FormControl>
                <TextField
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
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
                  <span className="sm:body-m body-s text-neutral-rich-gray">Description*</span>
                </FormLabel>
                <span className="sm:caption-14pt caption-12pt text-neutral-rich-gray">
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
                  onChange={(e) => {
                    field.onChange(e);
                  }}
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
                  onChange={(e) => {
                    field.onChange(e);
                  }}
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
          name="hackathonMode"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="sm:body-m body-s text-neutral-rich-gray">Hackathon Mode (Select One)*</span>
                </FormLabel>
              </div>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value as 'hybrid' | 'online');
                  }}
                  className="w-full grid-cols-2"
                >
                  <FormControl>
                    <RadioGroupItem value="hybrid">Hybrid</RadioGroupItem>
                  </FormControl>
                  <FormControl>
                    <RadioGroupItem value="online">Online</RadioGroupItem>
                  </FormControl>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ActionButtons isValid={form.formState.isValid} onBack={() => {}} />
      </form>
    </Form>
  );
}
