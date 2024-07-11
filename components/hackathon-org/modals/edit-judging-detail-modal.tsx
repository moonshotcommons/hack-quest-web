'use client';

import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../common/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { TextField } from '@/components/ui/text-field';
import { AddJudgeAccounts } from './add-judge-accounts';
import webApi from '@/service';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import TextEditor, { TEXT_EDITOR_TYPE, transformTextToEditorValue } from '@/components/Common/TextEditor';

const formSchema = z
  .object({
    criteria: z
      .string()
      .min(1, {
        message: 'Field is required'
      })
      .max(360, {
        message: 'Field cannot exceed 360 characters'
      }),
    judgeMode: z.enum(['all', 'judges']).nullable().default(null).optional(),
    disableJudge: z.boolean().default(false).optional(),
    voteMode: z.enum(['fixed', 'score']).optional(),
    judgeTotalVote: z.string().optional(),
    judgeProjectVote: z.string().optional(),
    projectJudgeCount: z.string().optional(),
    judgeAccount: z.string().email().optional().or(z.literal(''))
  })
  .superRefine((data, ctx) => {
    if (!data.disableJudge) {
      if (!data.judgeMode) {
        ctx.addIssue({
          path: ['judgeMode'],
          code: z.ZodIssueCode.custom,
          message: 'Please select judging mode'
        });
      } else if (data.judgeMode === 'all') {
        if (!data.voteMode) {
          ctx.addIssue({
            path: ['voteMode'],
            code: z.ZodIssueCode.custom,
            message: 'Please select voting mode'
          });
        } else {
          if (!data.judgeTotalVote) {
            ctx.addIssue({
              path: ['judgeTotalVote'],
              code: z.ZodIssueCode.custom,
              message: 'Field is required'
            });
          }
          if (!data.judgeProjectVote) {
            ctx.addIssue({
              path: ['judgeProjectVote'],
              code: z.ZodIssueCode.custom,
              message: 'Field is required'
            });
          }
        }
      } else {
        if (!data.voteMode) {
          ctx.addIssue({
            path: ['voteMode'],
            code: z.ZodIssueCode.custom,
            message: 'Please select voting mode'
          });
        } else {
          if (data.voteMode === 'fixed') {
            if (!data.judgeTotalVote) {
              ctx.addIssue({
                path: ['judgeTotalVote'],
                code: z.ZodIssueCode.custom,
                message: 'Field is required'
              });
            }
            if (!data.judgeProjectVote) {
              ctx.addIssue({
                path: ['judgeProjectVote'],
                code: z.ZodIssueCode.custom,
                message: 'Field is required'
              });
            }
          }
          if (data.voteMode === 'score') {
            if (!data.judgeProjectVote) {
              ctx.addIssue({
                path: ['judgeProjectVote'],
                code: z.ZodIssueCode.custom,
                message: 'Field is required'
              });
            }
            if (!data.projectJudgeCount) {
              ctx.addIssue({
                path: ['projectJudgeCount'],
                code: z.ZodIssueCode.custom,
                message: 'Field is required'
              });
            }
          }
        }
      }
    }
  });

export type JudgeAccount = {
  id: string;
  email: string;
  nickname: string;
  avatar: string;
};

export function EditJudgingDetailModal({
  open,
  initialValues,
  onClose,
  refresh
}: {
  open?: boolean;
  initialValues?: any;
  onClose?: () => void;
  refresh?: () => void;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const submitInputRef = React.useRef<HTMLInputElement>(null);
  const [userVotes, setUserVotes] = React.useState<string | number>(50);
  const [judgeVotes, setJudgeVotes] = React.useState<string | number>(50);
  const [sliderValue, setSliderValue] = React.useState(50);
  const [judgeAccounts, setJudgeAccounts] = React.useState<JudgeAccount[]>([]);
  const [key, setKey] = React.useState<number>(+new Date());
  const latestJudgeMode = React.useRef<string | undefined>(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      criteria: '',
      disableJudge: false
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (email: string) => webApi.hackathonV2Api.addJudgeAccount(email),
    onSuccess: (data) => {
      // 判断是否为重复账号
      if (judgeAccounts.some((judge) => judge.email === data.email)) {
        message.error('Already exists');
        return;
      }
      setJudgeAccounts((prev) => [...prev, data]);
      form.resetField('judgeAccount', { defaultValue: '' });
    },
    onError: (error: any) => {
      if (error.code === 404) {
        form.setError('judgeAccount', {
          message: 'Please enter a valid email address that has been registered in HackQuest.'
        });
      }
    }
  });

  const mutation = useMutation({
    mutationKey: ['updateJudge', initialValues?.id],
    mutationFn: (data: any) => webApi.hackathonV2Api.updateHackathonJudge(initialValues?.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hackathon'] });
      refresh?.();
      router.refresh();
      message.success('Success');
      handleClose();
    }
  });

  const disableJudge = form.watch('disableJudge');
  const judgeMode = form.watch('judgeMode');
  const voteMode = form.watch('voteMode');
  const judgeAccount = form.watch('judgeAccount');

  const [criteria, setCriteria] = React.useState<{ type: string; content: object }>();

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

  async function addJudgeAccount() {
    const isValid = await form.trigger('judgeAccount');
    const email = form.getValues('judgeAccount');
    if (email && isValid) {
      mutate(email);
    }
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    let values: any = {
      rewardId: initialValues?.rewardId,
      hackathonId: initialValues?.hackathonId,
      criteria: criteria,
      disableJudge: data.disableJudge,
      judgeMode: null,
      voteMode: null,
      judgeTotalVote: null,
      judgeProjectVote: null,
      projectJudgeCount: null,
      votesProportion: [],
      judgeAccounts: []
    };
    if (!data.disableJudge) {
      values = {
        ...values,
        judgeMode: data.judgeMode,
        voteMode: data.voteMode
      };
      if (data.judgeMode === 'all') {
        values = {
          ...values,
          judgeTotalVote: z.coerce.number().parse(data.judgeTotalVote),
          judgeProjectVote: z.coerce.number().parse(data.judgeProjectVote),
          votesProportion: [userVotes, judgeVotes],
          judgeAccounts: judgeAccounts.map((account) => account.id)
        };
      } else {
        if (judgeAccounts.length === 0) {
          form.setError('judgeAccount', {
            message: 'Please add at least one judge account'
          });
          return;
        }
        if (data.voteMode === 'fixed') {
          values = {
            ...values,
            judgeTotalVote: z.coerce.number().parse(data.judgeTotalVote),
            judgeProjectVote: z.coerce.number().parse(data.judgeProjectVote),
            judgeAccounts: judgeAccounts.map((account) => account.id)
          };
        } else {
          values = {
            ...values,
            judgeProjectVote: z.coerce.number().parse(data.judgeProjectVote),
            projectJudgeCount: z.coerce.number().parse(data.projectJudgeCount),
            judgeAccounts: judgeAccounts.map((account) => account.id)
          };
        }
      }
    }
    mutation.mutate(values);
  }

  function onReset() {
    form.reset();
    latestJudgeMode.current = undefined;
    setUserVotes(50);
    setJudgeVotes(50);
    setSliderValue(50);
    setJudgeAccounts([]);
  }

  function handleClose() {
    onReset();
    onClose?.();
  }

  React.useEffect(() => {
    if (initialValues && open && initialValues?.disableJudge !== null) {
      if (!initialValues?.disableJudge) {
        latestJudgeMode.current = initialValues?.judgeMode;
        if (initialValues?.judgeMode === 'all') {
          form.reset({
            // criteria: initialValues?.criteria || '',
            criteria: '',
            disableJudge: initialValues?.disableJudge,
            judgeMode: initialValues?.judgeMode,
            voteMode: initialValues?.voteMode,
            judgeTotalVote: z.coerce.string().parse(initialValues?.judgeTotalVote || ''),
            judgeProjectVote: z.coerce.string().parse(initialValues?.judgeProjectVote || '')
          });
        } else {
          if (initialValues?.voteMode === 'fixed') {
            form.reset({
              // criteria: initialValues?.criteria || '',
              criteria: '',
              disableJudge: initialValues?.disableJudge,
              judgeMode: initialValues?.judgeMode,
              voteMode: initialValues?.voteMode,
              judgeTotalVote: z.coerce.string().parse(initialValues?.judgeTotalVote || ''),
              judgeProjectVote: z.coerce.string().parse(initialValues?.judgeProjectVote || '')
            });
          } else {
            form.reset({
              // criteria: initialValues?.criteria || '',
              criteria: '',
              disableJudge: initialValues?.disableJudge,
              judgeMode: initialValues?.judgeMode,
              voteMode: initialValues?.voteMode,
              projectJudgeCount: z.coerce.string().parse(initialValues?.projectJudgeCount || ''),
              judgeProjectVote: z.coerce.string().parse(initialValues?.judgeProjectVote || '')
            });
          }
        }
      } else {
        form.reset({
          criteria: initialValues?.criteria || '',
          disableJudge: initialValues?.disableJudge
        });
      }
      setUserVotes(initialValues?.votesProportion?.[0] || 50);
      setJudgeVotes(initialValues?.votesProportion?.[1] || 50);
      setSliderValue(initialValues?.votesProportion?.[0] || 50);
      setJudgeAccounts(initialValues?.judgeAccounts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues, open]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="flex w-[888px] max-w-[888px] flex-col gap-6 overflow-y-auto px-10 pb-10 pt-[60px] shadow-modal"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <h1 className="headline-h3 relative shrink-0 pl-[21px] text-neutral-black before:absolute before:left-0 before:top-1/2 before:h-[34px] before:w-[5px] before:-translate-y-1/2 before:transform before:rounded-full before:bg-yellow-dark before:content-['']">
          {initialValues?.rewardName}
        </h1>
        <Form {...form}>
          <form
            className="no-scrollbar flex flex-1 flex-col items-center space-y-6 overflow-y-auto"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="criteria"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>
                      <span className="body-m text-neutral-rich-gray">Judging Criteria*</span>
                    </FormLabel>
                    {/* <span className="caption-14pt text-neutral-rich-gray">
                      <span className={cn({ 'text-status-error': form.watch('criteria')?.length > 360 })}>
                        {form.watch('criteria')?.length}
                      </span>
                      /360
                    </span> */}
                  </div>
                  <FormControl>
                    <Textarea
                      {...field}
                      authHeight={false}
                      autoComplete="off"
                      placeholder="Write a judging criteria for the hackathon"
                      className="hidden h-28 border-neutral-light-gray p-3 text-base text-neutral-black transition-colors placeholder:text-neutral-medium-gray focus:border-neutral-medium-gray focus-visible:ring-0 aria-[invalid=true]:border-status-error-dark"
                    />
                  </FormControl>
                  <TextEditor
                    simpleModel
                    onCreated={(editor) => {
                      const text = editor.getText().replace(/\n|\r/gm, '');
                      setCriteria({ type: TEXT_EDITOR_TYPE, content: editor.children });
                      form.setValue('criteria', text);
                    }}
                    defaultContent={transformTextToEditorValue(initialValues?.criteria)}
                    onChange={(editor) => {
                      const text = editor.getText().replace(/\n|\r/gm, '');
                      form.setValue('criteria', text);
                      setCriteria({ type: TEXT_EDITOR_TYPE, content: editor.children });
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="judgeMode"
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
                      value={field.value as string}
                      onValueChange={(value) => {
                        field.onChange(value as any);
                        latestJudgeMode.current = value;
                        if (value === 'all') {
                          form.resetField('voteMode', { defaultValue: 'fixed' });
                        }
                      }}
                      className="w-full grid-cols-2"
                    >
                      <FormControl>
                        <RadioGroupItem disabled={disableJudge || initialValues?.disabledAll} value="all">
                          Users + Judges
                        </RadioGroupItem>
                      </FormControl>
                      <FormControl>
                        <RadioGroupItem disabled={disableJudge} value="judges">
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
              name="disableJudge"
              render={({ field }) => (
                <FormItem className="!mt-3 flex w-full flex-row items-start space-x-2.5 space-y-0">
                  <FormControl>
                    <Checkbox
                      id="disableJudge"
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked as boolean);
                        setKey(+new Date());
                        if (checked) {
                          form.resetField('judgeMode', { defaultValue: null });
                        } else {
                          if (latestJudgeMode.current) {
                            // @ts-expect-error
                            form.resetField('judgeMode', { defaultValue: latestJudgeMode.current });
                          }
                        }
                      }}
                    />
                  </FormControl>
                  <FormLabel
                    htmlFor="disableJudge"
                    className="select-none text-sm text-neutral-medium-gray peer-data-[state=checked]:text-neutral-black"
                  >
                    We are not going to use HackQuest voting and judging system for this track
                  </FormLabel>
                </FormItem>
              )}
            />
            {!!judgeMode && (
              <>
                <Separator />
                <FormField
                  control={form.control}
                  name="voteMode"
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
                              disabled={judgeMode === 'all'}
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
                {voteMode === 'fixed' && (
                  <FormField
                    control={form.control}
                    name="judgeTotalVote"
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
                {!!voteMode && (
                  <FormField
                    control={form.control}
                    name="judgeProjectVote"
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
                {voteMode === 'score' && (
                  <FormField
                    control={form.control}
                    name="projectJudgeCount"
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
                {judgeMode === 'all' && (
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
                        <span className="body-m text-neutral-rich-gray">
                          Judge Accounts{judgeMode === 'judges' && '*'}
                        </span>
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
                            placeholder="e.g. example@gmail.com"
                            className="flex-1 outline-none"
                          />
                          <Button
                            disabled={!judgeAccount}
                            size="small"
                            type="button"
                            className="w-[140px]"
                            isLoading={isPending}
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
                <AddJudgeAccounts judgeAccounts={judgeAccounts} setJudgeAccounts={setJudgeAccounts} />
              </>
            )}
            <input ref={submitInputRef} type="submit" className="hidden" />
          </form>
        </Form>
        <div className="flex shrink-0 justify-end gap-4">
          <Button className="w-[165px]" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className="w-[165px]"
            // disabled={!isValid}
            isLoading={mutation.isPending}
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
