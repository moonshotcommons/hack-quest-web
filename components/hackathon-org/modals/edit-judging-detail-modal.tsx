'use client';

import * as React from 'react';
import * as z from 'zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/helper/utils';
import { RadioGroup, RadioGroupItem } from '../common/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { TextField } from '@/components/ui/text-field';

const formSchema = z
  .object({
    resource: z
      .string()
      .min(1, {
        message: 'Field is required'
      })
      .max(360, {
        message: 'Field cannot exceed 360 characters'
      }),
    judgingMode: z.enum(['all', 'judges']).optional(),
    useVoting: z.boolean().default(false).optional(),
    votingMode: z.enum(['fixed', 'score']).optional(),
    judgeVotes: z.string().optional(),
    maxVotes: z.string().optional(),
    requiredJudges: z.string().optional(),
    judgeAccount: z.string().email().optional().or(z.literal(''))
  })
  .superRefine((data, ctx) => {
    if (!data.useVoting) {
      if (!data.judgingMode) {
        ctx.addIssue({
          path: ['judgingMode'],
          code: z.ZodIssueCode.custom,
          message: 'Please select judging mode'
        });
      } else if (data.judgingMode === 'all') {
        if (!data.votingMode) {
          ctx.addIssue({
            path: ['votingMode'],
            code: z.ZodIssueCode.custom,
            message: 'Please select voting mode'
          });
        } else {
          if (!data.judgeVotes) {
            ctx.addIssue({
              path: ['judgeVotes'],
              code: z.ZodIssueCode.custom,
              message: 'Field is required'
            });
          }
          if (!data.maxVotes) {
            ctx.addIssue({
              path: ['maxVotes'],
              code: z.ZodIssueCode.custom,
              message: 'Field is required'
            });
          }
        }
      } else {
        if (!data.votingMode) {
          ctx.addIssue({
            path: ['votingMode'],
            code: z.ZodIssueCode.custom,
            message: 'Please select voting mode'
          });
        } else {
          if (data.votingMode === 'fixed') {
            if (!data.maxVotes) {
              ctx.addIssue({
                path: ['maxVotes'],
                code: z.ZodIssueCode.custom,
                message: 'Field is required'
              });
            }
          }
          if (data.votingMode === 'score') {
            if (!data.maxVotes) {
              ctx.addIssue({
                path: ['maxVotes'],
                code: z.ZodIssueCode.custom,
                message: 'Field is required'
              });
            }
            if (!data.requiredJudges) {
              ctx.addIssue({
                path: ['requiredJudges'],
                code: z.ZodIssueCode.custom,
                message: 'Field is required'
              });
            }
          }
        }
      }
    }
  });

export function EditJudgingDetailModal({
  open,
  initialValues,
  onOpenChange
}: {
  open?: boolean;
  initialValues?: any;
  onOpenChange?: (open: boolean) => void;
}) {
  const submitInputRef = React.useRef<HTMLInputElement>(null);
  const [userVotes, setUserVotes] = React.useState<string | number>(50);
  const [judgeVotes, setJudgeVotes] = React.useState<string | number>(50);
  const [sliderValue, setSliderValue] = React.useState(50);
  const [judgeAccounts, setJudgeAccounts] = React.useState<any[]>([]);
  const [key, setKey] = React.useState<number>(+new Date());
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resource: ''
    }
  });

  const useVoting = form.watch('useVoting');
  const judgingMode = form.watch('judgingMode');
  const votingMode = form.watch('votingMode');
  const judgeAccount = form.watch('judgeAccount');

  const isValid = form.formState.isValid;

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex w-[888px] max-w-[888px] flex-col gap-6 overflow-y-auto px-10 pb-10 pt-[60px] shadow-modal"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <h1 className="headline-h3 relative shrink-0 pl-[21px] text-neutral-black before:absolute before:left-0 before:top-1/2 before:h-[34px] before:w-[5px] before:-translate-y-1/2 before:transform before:rounded-full before:bg-yellow-dark before:content-['']">
          Web3 Track
        </h1>
        <Form {...form}>
          <form
            className="no-scrollbar flex flex-1 flex-col items-center space-y-6 overflow-y-auto"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="resource"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>
                      <span className="body-m text-neutral-rich-gray">Judging Criteria*</span>
                    </FormLabel>
                    <span className="caption-14pt text-neutral-rich-gray">
                      <span className={cn({ 'text-status-error': form.watch('resource')?.length > 360 })}>
                        {form.watch('resource')?.length}
                      </span>
                      /360
                    </span>
                  </div>
                  <FormControl>
                    <Textarea
                      {...field}
                      authHeight={false}
                      autoComplete="off"
                      placeholder="Write a judging criteria for the hackathon"
                      className="h-28 border-neutral-light-gray p-3 text-base text-neutral-black transition-colors placeholder:text-neutral-medium-gray focus:border-neutral-medium-gray focus-visible:ring-0 aria-[invalid=true]:border-status-error-dark"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="judgingMode"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>
                      <span className="text-base text-neutral-rich-gray">Judging Mode*</span>
                    </FormLabel>
                  </div>
                  <p className="text-sm text-neutral-medium-gray">
                    The &quot;Users + Judges&quot; category can be applied to only one track in this hackathon.
                  </p>
                  <FormControl>
                    <RadioGroup
                      key={key}
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value as any);
                      }}
                      className="w-full grid-cols-2"
                    >
                      <FormControl>
                        <RadioGroupItem disabled={useVoting} value="all">
                          Users + Judges
                        </RadioGroupItem>
                      </FormControl>
                      <FormControl>
                        <RadioGroupItem disabled={useVoting} value="judges">
                          Judges Only
                        </RadioGroupItem>
                      </FormControl>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="useVoting"
              render={({ field }) => (
                <FormItem className="!mt-3 flex w-full flex-row items-start space-x-2.5 space-y-0">
                  <FormControl>
                    <Checkbox
                      id="useVoting"
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked as boolean);
                        if (checked) {
                          form.resetField('judgingMode');
                          setKey(+new Date());
                        }
                      }}
                    />
                  </FormControl>
                  <FormLabel
                    htmlFor="useVoting"
                    className="select-none text-sm text-neutral-medium-gray peer-data-[state=checked]:text-neutral-black"
                  >
                    We are not going to use HackQuest voting and judging system for this track
                  </FormLabel>
                </FormItem>
              )}
            />
            {!!judgingMode && (
              <>
                <Separator />
                <FormField
                  control={form.control}
                  name="votingMode"
                  render={({ field }) => (
                    <FormItem className="w-full space-y-1">
                      <div className="flex items-center justify-between">
                        <FormLabel>
                          <span className="text-base text-neutral-rich-gray">Voting Mode*</span>
                        </FormLabel>
                      </div>
                      <p className="text-sm text-neutral-medium-gray">
                        Only ‘Fixed Number of Vote’ is available to ‘Users + Judges’ category.
                      </p>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value as any);
                          }}
                          className="w-full grid-cols-2"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value="fixed"
                              className="flex h-[86px] flex-col items-center justify-center gap-1 px-8"
                            >
                              <span className="text-neutral-black">Fixed Number of Vote</span>
                              <span className="text-xs font-light text-neutral-rich-gray">
                                Each user/judge has a certain number of votes to distribute among the projects
                              </span>
                            </RadioGroupItem>
                          </FormControl>
                          <FormControl>
                            <RadioGroupItem
                              value="score"
                              disabled={judgingMode === 'all'}
                              className="flex h-[86px] flex-col items-center justify-center gap-1 px-8"
                            >
                              <span className="text-neutral-black">Project Scoring</span>
                              <span className="text-xs font-light text-neutral-rich-gray">
                                Each project needs to be voted on by a certain number of judges within a specified range
                              </span>
                            </RadioGroupItem>
                          </FormControl>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {judgingMode === 'all' && votingMode === 'fixed' && (
                  <FormField
                    control={form.control}
                    name="judgeVotes"
                    render={({ field }) => (
                      <FormItem className="w-full space-y-1">
                        <div className="flex items-center justify-between">
                          <FormLabel>
                            <span className="body-m text-neutral-rich-gray">How many votes does each judge have?*</span>
                          </FormLabel>
                        </div>
                        <FormControl>
                          <TextField
                            {...field}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            autoComplete="off"
                            placeholder="e.g. 100"
                            className="aria-[invalid=true]:border-status-error-dark"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {!!votingMode && (
                  <FormField
                    control={form.control}
                    name="maxVotes"
                    render={({ field }) => (
                      <FormItem className="w-full space-y-1">
                        <div className="flex items-center justify-between">
                          <FormLabel>
                            <span className="body-m text-neutral-rich-gray">
                              The maximum number of votes each judge can cast for each project*
                            </span>
                          </FormLabel>
                        </div>
                        <FormControl>
                          <TextField
                            {...field}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            autoComplete="off"
                            placeholder="e.g. 100"
                            className="aria-[invalid=true]:border-status-error-dark"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {votingMode === 'score' && (
                  <FormField
                    control={form.control}
                    name="requiredJudges"
                    render={({ field }) => (
                      <FormItem className="w-full space-y-1">
                        <div className="flex items-center justify-between">
                          <FormLabel>
                            <span className="body-m text-neutral-rich-gray">
                              How many judges are needed to vote for each project?*
                            </span>
                          </FormLabel>
                        </div>
                        <FormControl>
                          <TextField
                            {...field}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            autoComplete="off"
                            placeholder="e.g. 5"
                            className="aria-[invalid=true]:border-status-error-dark"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {judgingMode === 'all' && (
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
                      <Slider
                        value={[sliderValue]}
                        onValueChange={(value) => onSliderValueChange(value[0])}
                        max={100}
                        step={1}
                      />
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
                )}
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
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              form.clearErrors('judgeAccount');
                            }}
                            type="text"
                            placeholder="e.g. bob@gmail.com"
                            className="flex-1 outline-none"
                          />
                          <Button
                            disabled={!judgeAccount || !!form.formState.errors.judgeAccount}
                            size="small"
                            type="button"
                            className="w-[140px]"
                            // isLoading={isPending}
                            // onClick={addJudgeAccount}
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
                  {judgeAccounts.length > 0 && (
                    <React.Fragment>
                      {judgeAccounts.map((account) => (
                        <div className="flex items-center" key={account.email}>
                          <div className="relative h-[50px] w-[50px] rounded-full bg-yellow-dark">
                            <Image src={account.avatar} alt="avatar" fill />
                          </div>
                          <span className="body-m ml-3 text-neutral-off-black">{account.nickname}</span>
                          <span className="body-m ml-auto text-neutral-medium-gray">{account.email}</span>
                          <button
                            type="button"
                            className="body-m ml-10 text-neutral-off-black underline"
                            // onClick={() => removeJudgeAccount(account.email)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </React.Fragment>
                  )}
                </div>
              </>
            )}
            <input ref={submitInputRef} type="submit" className="hidden" />
          </form>
        </Form>
        <div className="flex shrink-0 justify-end gap-4">
          <Button className="w-[165px]" variant="outline">
            Cancel
          </Button>
          <Button
            className="w-[165px]"
            disabled={!form.formState.isValid}
            onClick={() => {
              submitInputRef.current?.click();
            }}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
