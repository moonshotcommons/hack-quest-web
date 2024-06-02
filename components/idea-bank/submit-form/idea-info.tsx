import * as React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/listbox';
import Button from '@/components/Common/Button';
import { TextField } from '@/components/ui/text-field';
import { cn } from '@/helper/utils';
import { useSubmitModal } from '../submit/store';

const formSchema = z.object({
  ideaName: z
    .string()
    .min(1, {
      message: 'Idea name is a required input'
    })
    .max(60, {
      message: 'Idea name cannot exceed 60 characters'
    }),
  ecosystem: z.string({
    required_error: 'Please select an ecosystem'
  }),
  tracks: z.string({
    required_error: 'Please select a track'
  })
});

export function IdeaInfo() {
  const modal = useSubmitModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ideaName: modal.values.ideaName || '',
      ecosystem: modal.values.ecosystem,
      tracks: modal.values.tracks
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
          name="ideaName"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="sm:body-m body-s text-neutral-rich-gray">Idea Name*</span>
                </FormLabel>
                <span className="sm:caption-14pt caption-12pt text-neutral-rich-gray">
                  <span className={cn({ 'text-status-error': form.watch('ideaName')?.length > 60 })}>
                    {form.watch('ideaName')?.length}
                  </span>
                  /60
                </span>
              </div>
              <FormControl>
                <TextField
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    modal.setValues({ ideaName: e.target.value });
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
            name="ecosystem"
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
                    modal.setValues({ ecosystem: value });
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Chain-Ignostic">Chain-Ignostic</SelectItem>
                    <SelectItem value="Solana">Solana</SelectItem>
                    <SelectItem value="Mantle">Mantle</SelectItem>
                    <SelectItem value="Ethereum">Ethereum</SelectItem>
                    <SelectItem value="Arbitrum">Arbitrum</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tracks"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <div className="flex items-center justify-between">
                  <FormLabel>
                    <span className="sm:body-m body-s text-neutral-rich-gray">Tracks*</span>
                  </FormLabel>
                </div>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    modal.setValues({ tracks: value });
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DeFi">DeFi</SelectItem>
                    <SelectItem value="DAO">DAO</SelectItem>
                    <SelectItem value="DePIN">DePIN</SelectItem>
                    <SelectItem value="AI">AI</SelectItem>
                    <SelectItem value="NFT">NFT</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="[&>button]:button-text-m mt-auto flex flex-col gap-4 sm:mt-0 sm:flex-row sm:justify-end [&>button]:h-12 [&>button]:w-full [&>button]:py-4 [&>button]:uppercase [&>button]:sm:w-[10.25rem]">
          <Button htmlType="button" ghost onClick={modal.onClose}>
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
