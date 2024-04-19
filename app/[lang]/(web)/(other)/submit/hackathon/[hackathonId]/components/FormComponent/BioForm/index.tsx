'use client';
import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FormComponentProps } from '..';
import Button from '@/components/Common/Button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/helper/utils';

const formSchema = z.object({
  bio: z
    .string()
    .min(16, {
      message: 'Bio must be at least 16 characters.'
    })
    .max(360, {
      message: 'Bio cannot exceed 360 characters.'
    })
});

const BioForm: FC<Omit<FormComponentProps, 'type'>> = ({ onNext, onBack }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: ''
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onNext();
  }

  console.log(form);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 text-left">
            <FormField
              control={form.control}
              name={'bio'}
              render={({ field }) => (
                <FormItem className="w-full text-left">
                  <div className="flex w-full justify-between">
                    <FormLabel className="body-m text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
                      {'Bio'}
                    </FormLabel>
                    <span className="caption-14pt text-neutral-rich-gray">
                      <span className={form.watch('bio').length > 360 ? 'text-status-error' : ''}>
                        {form.watch('bio').length}
                      </span>
                      /360
                    </span>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder={'Add a bio.'}
                      {...field}
                      className="body-m h-[128px] border-neutral-light-gray px-6 py-3 text-[16px] font-normal leading-[160%] text-neutral-medium-gray"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button ghost className="w-[165px] px-0 py-4 uppercase" onClick={onBack}>
              Back
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              className={cn('w-[165px] px-0 py-4 uppercase', !form.formState.isValid ? 'bg-neutral-light-gray' : '')}
              disabled={!form.formState.isValid}
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BioForm;
