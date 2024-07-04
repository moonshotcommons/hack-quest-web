'use client';

import * as React from 'react';
import Link from 'next/link';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoveRightIcon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { TextField } from '@/components/ui/text-field';
import { Button } from '@/components/ui/button';
import { cn } from '@/helper/utils';
import { HACKQUEST_DISCORD } from '@/constants/links';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Hackathon name is required'
    })
    .max(80, {
      message: 'Hackathon name cannot exceed 80 characters'
    })
});

interface StartModalProps {
  open: boolean;
  onClose: VoidFunction;
}

export function StartModal({ open, onClose }: StartModalProps) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  });

  const mutation = useMutation({
    mutationFn: (data: { name: string }) => webApi.hackathonV2Api.createHackathon(data),
    onSuccess: (data) => {
      startTransition(() => {
        router.push(`/form/hackathon/organizer/${data.alias}/create`);
      });
    },
    onError: (error) => {
      errorMessage(error);
    }
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutation.mutate(data);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[808px] max-w-[808px] gap-8 px-10 py-16 [&_.close-icon]:right-7 [&_.close-icon]:top-7">
        <DialogHeader className="space-y-4">
          <DialogTitle>Name Your Hackathon!</DialogTitle>
          <DialogDescription>You’ll be able to change the hackathon name later.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col items-center space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="relative w-full space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>
                      <span className="sm:body-m body-s text-neutral-rich-gray">Hackathon Name*</span>
                    </FormLabel>
                    <span className="sm:caption-14pt caption-12pt text-neutral-rich-gray">
                      <span className={cn({ 'text-status-error': form.watch('name')?.length > 80 })}>
                        {form.watch('name')?.length}
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
            <Button
              type="submit"
              isLoading={mutation.isPending || isPending}
              disabled={!form.formState.isValid}
              className="w-60"
            >
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
