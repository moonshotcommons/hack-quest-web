'use client';

import * as React from 'react';
import Link from 'next/link';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoveRightIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { TextField } from '@/components/ui/text-field';
import { Button } from '@/components/ui/button';
import { cn } from '@/helper/utils';
import { HACKQUEST_DISCORD } from '@/constants/links';

const formSchema = z.object({
  hackathonName: z
    .string()
    .min(1, {
      message: 'Hackathon name is a required input'
    })
    .max(60, {
      message: 'Hackathon name cannot exceed 80 characters'
    })
});

export function StartModal() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hackathonName: ''
    }
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }
  return (
    <Dialog open={false}>
      <DialogContent className="w-[808px] max-w-[808px] gap-8 px-10 py-16 [&_.close-icon]:right-7 [&_.close-icon]:top-7">
        <DialogHeader className="space-y-4">
          <DialogTitle>Name Your Hackathon!</DialogTitle>
          <DialogDescription>You’ll be able to change the hackathon name later.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col items-center space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
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
            <Button type="submit" disabled={!form.formState.isValid} className="w-60">
              start
            </Button>
          </form>
        </Form>
        <p className="flex items-center justify-center gap-4 text-center text-sm font-light text-neutral-black">
          Need any help?{' '}
          <Link
            aria-label="Join Discord"
            href={HACKQUEST_DISCORD}
            target="_blank"
            className="flex items-center gap-1.5"
          >
            Join Discord <MoveRightIcon className="h-4 w-4" />
          </Link>
        </p>
      </DialogContent>
    </Dialog>
  );
}
