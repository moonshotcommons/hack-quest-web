import * as React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/listbox';
import { TextField } from '@/components/ui/text-field';
import { cn } from '@/helper/utils';
import { useIdeas, useSubmitModal } from '../submit/store';
import { ActionButtons } from './action-buttons';

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Idea name is a required input'
    })
    .max(60, {
      message: 'Idea name cannot exceed 60 characters'
    }),
  ecosystemId: z.string({
    required_error: 'Please select an ecosystem'
  }),
  track: z.string({
    required_error: 'Please select a track'
  })
});

export function IdeaInfo() {
  const modal = useSubmitModal();
  const { tracks, ecosystems } = useIdeas();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: modal.values.name || '',
      ecosystemId: modal.values.ecosystemId,
      track: modal.values.track
    }
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    modal.setValues(data);
    modal.onNext();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 flex flex-1 flex-col gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="sm:body-m body-s text-neutral-rich-gray">Idea Name*</span>
                </FormLabel>
                <span className="sm:caption-14pt caption-12pt text-neutral-rich-gray">
                  <span className={cn({ 'text-status-error': form.watch('name')?.length > 60 })}>
                    {form.watch('name')?.length}
                  </span>
                  /60
                </span>
              </div>
              <FormControl>
                <TextField
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    modal.setValues({ name: e.target.value });
                  }}
                  autoComplete="off"
                  placeholder="Enter your idea name"
                  className="aria-[invalid=true]:border-status-error-dark"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="ecosystemId"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <div className="flex items-center justify-between">
                  <FormLabel>
                    <span className="sm:body-m body-s text-neutral-rich-gray">Ecosystem*</span>
                  </FormLabel>
                </div>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    modal.setValues({ ecosystemId: value });
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ecosystems?.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="track"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <div className="flex items-center justify-between">
                  <FormLabel>
                    <span className="sm:body-m body-s text-neutral-rich-gray">Track*</span>
                  </FormLabel>
                </div>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    modal.setValues({ track: value });
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent side="bottom">
                    {tracks?.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <ActionButtons isValid={form.formState.isValid} onBack={modal.onClose} />
      </form>
    </Form>
  );
}
