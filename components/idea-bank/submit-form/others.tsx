import * as React from 'react';
import { z } from 'zod';
import { InfoIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { TextField } from '@/components/ui/text-field';
import { useToggle } from '@/hooks/utils/use-toggle';
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/listbox';
import { cn } from '@/helper/utils';
import { useSubmitModal } from '../submit/store';
import { ConfirmModal } from '../submit/confirm';
import { ActionButtons } from './action-buttons';

const contractOptions = [
  { label: 'Email', value: 'email' },
  { label: 'Telegram', value: 'telegram' },
  { label: 'WeChat', value: 'wechat' },
  { label: 'Phone', value: 'phone' },
  { label: 'Discord', value: 'discord' }
];

const formSchema = z.object({
  otherInfo: z
    .string()
    .max(600, {
      message: 'Other info cannot exceed 600 characters'
    })
    .optional(),
  contractKey: z.string({
    required_error: 'Please select a contact type'
  }),
  contractValue: z.string().min(1, 'Contact info is required'),
  teamUp: z.string({
    required_error: 'Please select an option'
  })
});

export function Others() {
  const [open, toggle] = useToggle(false);
  const modal = useSubmitModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otherInfo: modal.values.otherInfo || '',
      contractKey: modal.values.contractKey,
      contractValue: modal.values.contractValue || '',
      teamUp: modal.values.teamUp
    }
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const values = {
      ...modal.values,
      ...data,
      teamUp: data?.teamUp === 'true' ? true : false
    };
    modal.setValues(values);
    toggle(true);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 flex flex-1 flex-col gap-6">
          <FormField
            control={form.control}
            name="otherInfo"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <div className="flex items-end justify-between sm:items-center">
                  <FormLabel>
                    <span className="sm:body-m body-s text-neutral-rich-gray">
                      Is there any other information you want to share? (Optional)
                    </span>
                  </FormLabel>
                  <span className="sm:caption-14pt caption-12pt text-neutral-rich-gray">
                    <span className={cn({ 'text-status-error': (form.watch('otherInfo')?.length || 0) > 600 })}>
                      {form.watch('otherInfo')?.length}
                    </span>
                    /600
                  </span>
                </div>
                <FormControl>
                  <Textarea
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      modal.setValues({ otherInfo: e.target.value });
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
          <div className="flex flex-col gap-1">
            <p className="sm:body-m body-s text-neutral-rich-gray">Contact Info*</p>
            <div className="grid w-full grid-cols-[8rem_1fr] gap-2 sm:grid-cols-[10.5rem_1fr] sm:gap-5">
              <FormField
                control={form.control}
                name="contractKey"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        modal.setValues({ contractKey: value });
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Please select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {contractOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
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
                name="contractValue"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextField
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          modal.setValues({ contractValue: e.target.value });
                        }}
                        placeholder="Enter your contact info"
                        className="aria-[invalid=true]:border-status-error-dark"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="teamUp"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <div className="flex items-center justify-between">
                  <FormLabel>
                    <span className="sm:body-m body-s text-neutral-rich-gray">Are you open to team up*</span>
                  </FormLabel>
                </div>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    modal.setValues({ teamUp: value });
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="true">Yes, I’m open to team up.</SelectItem>
                    <SelectItem value="false">No, I just want to share my idea.</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="flex items-start gap-2 text-neutral-medium-gray sm:items-center">
                  <InfoIcon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
                  <span>Your contact info will be visible to other users if you are open to team up.</span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <ActionButtons isLast isValid={form.formState.isValid} onBack={modal.onBack} />
        </form>
      </Form>
      <ConfirmModal open={open} onClose={() => toggle(false)} />
    </>
  );
}
