import * as React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Button from '@/components/Common/Button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/helper/utils';
import { useSubmitModal } from '../submit/store';

const formSchema = z.object({
  inspiration: z
    .string()
    .min(1, {
      message: 'Inspiration is a required input'
    })
    .max(600, {
      message: 'Inspiration cannot exceed 600 characters'
    })
});

export function Inspiration() {
  const modal = useSubmitModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inspiration: modal.values.inspiration || ''
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
          name="inspiration"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="sm:body-m body-s text-neutral-rich-gray">What’s your inspiration?*</span>
                </FormLabel>
                <span className="sm:caption-14pt caption-12pt text-neutral-rich-gray">
                  <span className={cn({ 'text-status-error': form.watch('inspiration')?.length > 600 })}>
                    {form.watch('inspiration')?.length}
                  </span>
                  /600
                </span>
              </div>
              <FormControl>
                <Textarea
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    modal.setValues({ inspiration: e.target.value });
                  }}
                  authHeight={false}
                  className="sm:body-m body-s h-[5.625rem] border-neutral-light-gray p-3 text-neutral-black placeholder:text-neutral-medium-gray focus-visible:ring-0 aria-[invalid=true]:border-status-error-dark sm:h-[8.25rem]"
                  placeholder="Please share your inspiration. You can add relevant links if helpful."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="[&>button]:button-text-m mt-auto flex flex-col gap-4 sm:mt-0 sm:flex-row sm:justify-end [&>button]:h-12 [&>button]:w-full [&>button]:py-4 [&>button]:uppercase [&>button]:sm:w-[10.25rem]">
          <Button htmlType="button" ghost onClick={modal.onBack}>
            Back
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            className={cn({
              'bg-neutral-light-gray': !form.formState.isValid
            })}
            disabled={!form.formState.isValid}
          >
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
