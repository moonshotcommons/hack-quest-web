'use client';

import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/helper/utils';

const formSchema = z.object({
  judgingCriteria: z
    .string()
    .min(1, {
      message: 'Judging criteria is a required input'
    })
    .max(360, {
      message: 'Judging criteria cannot exceed 360 characters'
    })
});

export function Judging() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      judgingCriteria: ''
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
          name="judgingCriteria"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="body-m text-neutral-rich-gray">Judging Criteria*</span>
                </FormLabel>
                <span className="caption-14pt text-neutral-rich-gray">
                  <span className={cn({ 'text-status-error': form.watch('judgingCriteria')?.length > 360 })}>
                    {form.watch('judgingCriteria')?.length}
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
                  placeholder="Write a judging criteria for the hackathon"
                  className="h-[76px] border-neutral-light-gray p-3 text-base text-neutral-black transition-colors placeholder:text-neutral-medium-gray focus:border-neutral-medium-gray focus-visible:ring-0 aria-[invalid=true]:border-status-error-dark"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full space-y-1">
          <label className="body-m text-neutral-rich-gray">Votes Proportion (%)*</label>
          <div className="flex justify-between gap-10">
            <div className="flex flex-col items-center justify-center gap-1">
              <input
                type="text"
                className="h-[46px] w-[58px] rounded-[8px] border border-neutral-light-gray bg-neutral-off-white"
              />
              <span className="caption-12pt whitespace-nowrap text-neutral-rich-gray">User Votes</span>
            </div>
            <Slider defaultValue={[33]} max={100} step={1} />
            <div className="flex flex-col items-center justify-center gap-1">
              <input
                type="text"
                className="h-[46px] w-[58px] rounded-[8px] border border-neutral-light-gray bg-neutral-off-white"
              />
              <span className="caption-12pt whitespace-nowrap text-neutral-rich-gray">Judge Votes</span>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
