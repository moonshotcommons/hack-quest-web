import * as React from 'react';
import { z } from 'zod';
import { InfoIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/Common/Button';
import { Textarea } from '@/components/ui/textarea';
import { TextField } from '@/components/ui/text-field';
import { useToggle } from '@/hooks/utils/use-toggle';
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/listbox';
import { cn } from '@/helper/utils';
import { useSubmitModal } from '../submit/store';
import { ConfirmModal } from '../submit/confirm';

const formSchema = z.object({
  information: z
    .string()
    .max(600, {
      message: 'Information cannot exceed 600 characters'
    })
    .optional(),
  contactType: z.string({
    required_error: 'Please select a contact type'
  }),
  contactInfo: z.string().min(1, 'Contact info is required'),
  teamup: z.string({
    required_error: 'Please select an option'
  })
});

export function Others() {
  const [open, toggle] = useToggle(false);
  const modal = useSubmitModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      information: modal.values.information || '',
      contactType: modal.values.contactType,
      contactInfo: modal.values.contactInfo || '',
      teamup: modal.values.teamup
    }
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const values = { ...modal.values, ...data };
    modal.setValues(values);
    console.log(values);
    toggle(true);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 flex flex-1 flex-col gap-6">
          <FormField
            control={form.control}
            name="information"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <div className="flex items-end justify-between sm:items-center">
                  <FormLabel>
                    <span className="sm:body-m body-s text-neutral-rich-gray">
                      Is there any other information you want to share? (Optional)
                    </span>
                  </FormLabel>
                  <span className="sm:caption-14pt caption-12pt text-neutral-rich-gray">
                    <span className={cn({ 'text-status-error': (form.watch('information')?.length || 0) > 600 })}>
                      {form.watch('information')?.length}
                    </span>
                    /600
                  </span>
                </div>
                <FormControl>
                  <Textarea
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      modal.setValues({ information: e.target.value });
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
                name="contactType"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        modal.setValues({ contactType: value });
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Please select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Email">Email</SelectItem>
                        <SelectItem value="Telegram">Telegram</SelectItem>
                        <SelectItem value="WeChat">WeChat</SelectItem>
                        <SelectItem value="Phone">Phone</SelectItem>
                        <SelectItem value="Discord">Discord</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextField
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          modal.setValues({ contactInfo: e.target.value });
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
            name="teamup"
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
                    modal.setValues({ teamup: value });
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
              Submit
            </Button>
          </div>
        </form>
      </Form>
      <ConfirmModal open={open} onClose={() => toggle(false)} />
    </>
  );
}
