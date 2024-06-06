import * as React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/helper/utils';
import { useSubmitModal } from '../submit/store';
import { ActionButtons } from './action-buttons';

const formSchema = z.object({
  solve: z
    .string()
    .min(1, {
      message: 'Solve is a required input'
    })
    .max(600, {
      message: 'Solve cannot exceed 600 characters'
    }),
  solution: z
    .string()
    .min(1, {
      message: 'Solution is a required input'
    })
    .max(600, {
      message: 'Solution cannot exceed 600 characters'
    })
});

export function Problem() {
  const modal = useSubmitModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      solve: modal.values.solve || '',
      solution: modal.values.solution || ''
    }
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const values = { ...modal.values, ...data };
    modal.setValues(values);
    modal.onNext();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 flex flex-1 flex-col gap-6">
        <FormField
          control={form.control}
          name="solve"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="sm:body-m body-s text-neutral-rich-gray">
                    What current problem you want to solve?*
                  </span>
                </FormLabel>
                <span className="sm:caption-14pt caption-12pt text-neutral-rich-gray">
                  <span className={cn({ 'text-status-error': form.watch('solve')?.length > 600 })}>
                    {form.watch('solve')?.length}
                  </span>
                  /600
                </span>
              </div>
              <FormControl>
                <Textarea
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    modal.setValues({ solve: e.target.value });
                  }}
                  authHeight={false}
                  className="sm:body-m body-s h-[5.625rem] border-neutral-light-gray p-3 text-neutral-black placeholder:text-neutral-medium-gray focus-visible:ring-0 aria-[invalid=true]:border-status-error-dark sm:h-[8.25rem]"
                  placeholder="Please describe the problem you want to solve."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="solution"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="sm:body-m body-s text-neutral-rich-gray">What’s your solution?*</span>
                </FormLabel>
                <span className="sm:caption-14pt caption-12pt text-neutral-rich-gray">
                  <span className={cn({ 'text-status-error': form.watch('solution')?.length > 600 })}>
                    {form.watch('solution')?.length}
                  </span>
                  /600
                </span>
              </div>
              <FormControl>
                <Textarea
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    modal.setValues({ solution: e.target.value });
                  }}
                  authHeight={false}
                  className="sm:body-m body-s h-[5.625rem] border-neutral-light-gray p-3 text-neutral-black placeholder:text-neutral-medium-gray focus-visible:ring-0 aria-[invalid=true]:border-status-error-dark sm:h-[8.25rem]"
                  placeholder="Please describe your solution."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ActionButtons isValid={form.formState.isValid} onBack={modal.onBack} />
      </form>
    </Form>
  );
}
