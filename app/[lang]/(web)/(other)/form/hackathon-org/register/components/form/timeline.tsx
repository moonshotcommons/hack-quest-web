'use client';

import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/listbox';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '../radio-group';
import { getTimezone, getTimezones } from './actions';
import * as DateTime from '../datetime';

const formSchema = z.object({
  timezone: z.string({
    required_error: 'Please select a timezone'
  }),
  simultaneous: z.enum(['yes', 'no'], {
    required_error: 'You need to select whether you want simultaneous hackathons'
  })
});

export function Timeline() {
  const { data: timezone } = useQuery({
    staleTime: Infinity,
    queryKey: ['timezone'],
    queryFn: () => getTimezone()
  });

  const { data } = useQuery({
    staleTime: Infinity,
    queryKey: ['timezones'],
    queryFn: () => getTimezones()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      timezone: timezone?.timezone,
      simultaneous: 'no'
    }
  });

  // React.useEffect(() => {
  //   console.log(timezone);
  //   if (timezone) {
  //     form.setValue('timezone', timezone.timezone);
  //   }
  // }, [timezone]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center space-y-6">
        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="body-m text-neutral-rich-gray">Timezone*</span>
                </FormLabel>
              </div>
              <Select
                defaultValue={timezone?.timezone}
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Please select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent side="bottom">
                  {data?.map((timezone) => (
                    <SelectItem key={timezone} value={timezone}>
                      {timezone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="simultaneous"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="body-m text-neutral-rich-gray">
                    Do the registration and submission periods start and end simultaneously?
                  </span>
                </FormLabel>
              </div>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value as 'yes' | 'no');
                  }}
                  className="w-full grid-cols-2"
                >
                  <FormControl>
                    <RadioGroupItem value="no">No, their open and close time is different</RadioGroupItem>
                  </FormControl>
                  <FormControl>
                    <RadioGroupItem value="yes">Yes, their open and close time is the same</RadioGroupItem>
                  </FormControl>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <DateTime.Root>
          <DateTime.Label>Registration Open*</DateTime.Label>
          <div className="flex items-center gap-20">
            <div className="flex items-center gap-2">
              <DateTime.Input min={1} max={31} />
              <DateTime.Separator />
              <DateTime.Input />
              <DateTime.Separator />
              <DateTime.Input />
            </div>
            <div className="flex items-center gap-2">
              <DateTime.Input />
              <DateTime.Separator />
              <DateTime.Input />
            </div>
          </div>
        </DateTime.Root>
      </form>
    </Form>
  );
}
