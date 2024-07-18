'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '../common/textarea';
import { Input } from '../common/input';
import { hackathonSchema, type HackathonSchema } from '../validations/hackathon';
import { Checkbox } from '@/components/ui/checkbox';

export function EditHackathonModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const form = useForm<HackathonSchema>({
    resolver: zodResolver(hackathonSchema),
    defaultValues: {
      title: '',
      name: '',
      description: '',
      winner: false
    }
  });

  function onSubmit(values: HackathonSchema) {
    console.log(values);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex w-[900px] max-w-[900px] flex-col gap-6 px-8 py-16 pb-8">
        <DialogHeader className="shrink-0 text-left">
          <DialogTitle className="text-[22px]">Edit Hackathon</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="no-scrollbar flex-1 space-y-6 overflow-y-auto px-0.5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title*</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hackathon Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Hackathon Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea maxLength={600} placeholder="Description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="winner"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2.5 space-y-0">
                  <FormControl>
                    <Checkbox
                      size="large"
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked as any)}
                    />
                  </FormControl>
                  <FormLabel className="text-neutral-medium-gray peer-aria-checked:text-neutral-off-black">
                    I am the winner of the Hackathon
                  </FormLabel>
                </FormItem>
              )}
            />
            <input ref={inputRef} type="submit" className="hidden" />
          </form>
          <Button className="w-[165px] shrink-0 self-end" onClick={() => inputRef.current?.click()}>
            Save Changes
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
