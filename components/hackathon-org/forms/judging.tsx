'use client';

import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/helper/utils';
import { ActionButtons } from './action-buttons';

const formSchema = z.object({
  judgingCriteria: z
    .string()
    .min(1, {
      message: 'Judging criteria is a required input'
    })
    .max(360, {
      message: 'Judging criteria cannot exceed 360 characters'
    }),
  judgeAccount: z
    .string()
    .email({
      message: 'Please enter a valid email address'
    })
    .optional()
    .or(z.literal(''))
});

export function JudgingForm() {
  const [userVotes, setUserVotes] = React.useState<string | number>(50);
  const [judgeVotes, setJudgeVotes] = React.useState<string | number>(50);
  const [sliderValue, setSliderValue] = React.useState(50);

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      judgingCriteria: ''
    }
  });

  const judgeAccount = form.watch('judgeAccount');

  function onVotesChange(value: string, isUserVotes: boolean) {
    if (value === '') {
      setUserVotes('');
      setJudgeVotes('');
      return;
    }

    let numericValue = parseInt(value, 10);
    if (isNaN(numericValue) || numericValue < 0) numericValue = 0;
    if (numericValue > 100) numericValue = 100;

    if (isUserVotes) {
      setUserVotes(numericValue);
      setJudgeVotes(100 - numericValue);
    } else {
      setJudgeVotes(numericValue);
      setUserVotes(100 - numericValue);
    }
    setSliderValue(isUserVotes ? numericValue : 100 - numericValue);
  }

  function onSliderValueChange(value: number) {
    setSliderValue(value);
    setUserVotes(value);
    setJudgeVotes(100 - value);
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  function addJudgeAccount() {
    setTimeout(() => {
      form.setError('judgeAccount', {
        message: 'Please enter a valid email address that has been registered in HackQuest.'
      });
    }, 500);
  }

  return (
    <Form {...form}>
      <form className="flex flex-col items-center space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="judgingCriteria"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="body-m text-neutral-rich-gray">Judging Criteria*</span>
                </FormLabel>
                <span className="caption-14pt text-neutral-rich-gray">
                  <span className={cn({ 'text-status-error': form.watch('judgingCriteria')?.length > 360 })}>
                    {form.watch('judgingCriteria')?.length}
                  </span>
                  /360
                </span>
              </div>
              <FormControl>
                <Textarea
                  {...field}
                  authHeight={false}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  autoComplete="off"
                  placeholder="Write a judging criteria for the hackathon"
                  className="h-[76px] border-neutral-light-gray p-3 text-base text-neutral-black transition-colors placeholder:text-neutral-medium-gray focus:border-neutral-medium-gray focus-visible:ring-0 aria-[invalid=true]:border-status-error-dark"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full space-y-1">
          <label className="body-m text-neutral-rich-gray">Votes Proportion (%)*</label>
          <div className="flex justify-between gap-10">
            <div className="flex flex-col items-center justify-center gap-1">
              <input
                type="number"
                value={userVotes}
                onChange={(e) => onVotesChange(e.target.value, true)}
                min="0"
                max="100"
                className="body-s inline-flex h-[46px] w-[58px] items-center justify-center rounded-[8px] border border-neutral-light-gray bg-neutral-off-white text-center outline-none"
              />
              <span className="caption-12pt whitespace-nowrap text-neutral-rich-gray">User Votes</span>
            </div>
            <Slider value={[sliderValue]} onValueChange={(value) => onSliderValueChange(value[0])} max={100} step={1} />
            <div className="flex flex-col items-center justify-center gap-1">
              <input
                type="number"
                value={judgeVotes}
                onChange={(e) => onVotesChange(e.target.value, false)}
                min="0"
                max="100"
                className="body-s inline-flex h-[46px] w-[58px] items-center justify-center rounded-[8px] border border-neutral-light-gray bg-neutral-off-white text-center outline-none"
              />
              <span className="caption-12pt whitespace-nowrap text-neutral-rich-gray">Judge Votes</span>
            </div>
          </div>
        </div>
        <FormField
          control={form.control}
          name="judgeAccount"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <FormLabel>
                <span className="body-m text-neutral-rich-gray">Judge Accounts</span>
              </FormLabel>
              <FormControl>
                <div className="peer flex h-[50px] w-full items-center rounded-[8px] border border-neutral-light-gray p-3 transition-colors focus-within:border-neutral-medium-gray aria-[invalid=true]:border-status-error-dark">
                  <input
                    value={field.value}
                    onChange={field.onChange}
                    type="text"
                    placeholder="e.g. bob@gmail.com"
                    className="flex-1 outline-none"
                  />
                  <Button
                    disabled={!judgeAccount || !!form.formState.errors.judgeAccount}
                    size="small"
                    type="button"
                    className="w-[140px]"
                    onClick={addJudgeAccount}
                  >
                    Add
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full">
          <Separator />
          <div className="mt-5 flex items-center">
            <div className="relative h-[50px] w-[50px] rounded-full bg-yellow-dark"></div>
            <span className="body-m ml-3 text-neutral-off-black">Evan</span>
            <span className="body-m ml-auto text-neutral-medium-gray">evan@gmail.com</span>
            <button type="button" className="body-m ml-10 text-neutral-off-black underline">
              Remove
            </button>
          </div>
        </div>
        <ActionButtons isValid={form.formState.isValid} isEditMode={false} />
      </form>
    </Form>
  );
}
