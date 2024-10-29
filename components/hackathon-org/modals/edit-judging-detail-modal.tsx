'use client';

import * as React from 'react';
import * as z from 'zod';
import { FieldErrors, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../common/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { TextField } from '@/components/ui/text-field';
import { AddJudgeAccounts } from './add-judge-accounts';
import webApi from '@/service';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { TEXT_EDITOR_TYPE, transformTextToEditorValue } from '@/components/Common/TextEditor';
import { Slider } from '../common/slider';

import dynamic from 'next/dynamic';
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoIcon } from 'lucide-react';
const TextEditor = dynamic(() => import('@/components/Common/TextEditor'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

const formSchema = z
  .object({
    criteria: z.string().min(1, {
      message: 'Field is required'
    }),
    judgeMode: z.enum(['all', 'judges']).nullable().default(null).optional(),
    disableJudge: z.boolean().default(false).optional(),
    voteMode: z.enum(['fixed', 'score']).optional(),
    totalVote: z.string().optional(),
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
          if (!data.totalVote) {
            ctx.addIssue({
              path: ['totalVote'],
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
  const [userVotes, setUserVotes] = React.useState<string | number>(0);
  const [judgeVotes, setJudgeVotes] = React.useState<string | number>(0);
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

  const checkJudgeAccount = useMutation({
    mutationFn: (email: string) => webApi.hackathonV2Api.checkJudgeAccount(initialValues?.hackathonId, email),
    onSuccess: () => {
      const email = form.getValues('judgeAccount');
      if (email) {
        mutate(email);
      }
    },
    onError: (error: any) => {
      if (error.code === 404) {
        form.setError('judgeAccount', {
          message: 'Please enter a valid email address that has been registered in HackQuest.'
        });
      }
      if (error.code === 400) {
        form.setError('judgeAccount', {
          message: 'This account has been added as a judge in this hackathon. Please try another email.'
        });
      }
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (email: string) => webApi.hackathonV2Api.addJudgeAccount(email),
    onSuccess: (data) => {
      setJudgeAccounts((prev) => [...prev, data]);
      form.resetField('judgeAccount', { defaultValue: '' });
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

  function onSliderValueChange(value: number) {
    const totalVote = form.getValues('totalVote') || 0;
    setSliderValue(value);
    setUserVotes(Math.round((value / 100) * Number(totalVote)));
    setJudgeVotes(Math.round(((100 - value) / 100) * Number(totalVote)));
  }

  async function addJudgeAccount() {
    const isValid = await form.trigger('judgeAccount');
    const email = form.getValues('judgeAccount');
    if (judgeAccounts.some((judge) => judge.email === email)) {
      form.setError('judgeAccount', {
        message: 'This account has been added in this hackathon. Please try another email.'
      });
      return;
    }
    if (email && isValid) {
      checkJudgeAccount.mutate(email);
    }
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    let values: any = {
      // rewardId: initialValues?.rewardId,
      hackathonId: initialValues?.hackathonId,
      criteria: criteria,
      disableJudge: data.disableJudge,
      judgeMode: null,
      voteMode: null,
      totalVote: null,
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
          totalVote: z.coerce.number().parse(data.totalVote),
          judgeProjectVote: z.coerce.number().parse(data.judgeProjectVote),
          votesProportion: [sliderValue, 100 - sliderValue],
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

  function onInvalid(error: FieldErrors<z.infer<typeof formSchema>>) {
    const firstError = Object.keys(error)[0];
    const firstErrorElement = document.querySelector(`#${firstError}-item`);
    if (firstErrorElement) {
      firstErrorElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function onReset() {
    form.reset();
    latestJudgeMode.current = undefined;
    setUserVotes(0);
    setJudgeVotes(0);
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
            criteria: '',
            disableJudge: initialValues?.disableJudge,
            judgeMode: initialValues?.judgeMode,
            voteMode: initialValues?.voteMode,
            totalVote: z.coerce.string().parse(initialValues?.totalVote || initialValues?.judgeTotalVote || ''),
            judgeProjectVote: z.coerce.string().parse(initialValues?.judgeProjectVote || '')
          });
        } else {
          if (initialValues?.voteMode === 'fixed') {
            form.reset({
              criteria: '',
              disableJudge: initialValues?.disableJudge,
              judgeMode: initialValues?.judgeMode,
              voteMode: initialValues?.voteMode,
              judgeTotalVote: z.coerce.string().parse(initialValues?.judgeTotalVote || ''),
              judgeProjectVote: z.coerce.string().parse(initialValues?.judgeProjectVote || '')
            });
          } else {
            form.reset({
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
      setUserVotes((initialValues?.votesProportion?.[0] / 100) * initialValues?.totalVote || 0);
      setJudgeVotes((initialValues?.votesProportion?.[1] / 100) * initialValues?.totalVote || 0);
      setSliderValue(initialValues?.votesProportion?.[0] || 50);
      setJudgeAccounts(initialValues?.judgeAccounts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues, open]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="flex flex-col gap-6 pb-10 pt-[60px] shadow-modal sm:w-[888px] sm:max-w-[888px] sm:px-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="shrink-0 px-10">
          <h1 className="headline-h3 relative pl-[21px] text-neutral-black before:absolute before:left-0 before:top-1/2 before:h-[34px] before:w-[5px] before:-translate-y-1/2 before:transform before:rounded-full before:bg-yellow-dark before:content-['']">
            {initialValues?.rewardName}
          </h1>
        </div>
        <Form {...form}>
          <form
            className="documentation-scrollbar flex flex-1 flex-col items-center space-y-6 overflow-y-auto px-10"
            onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          >
            <FormField
              control={form.control}
              name="criteria"
              render={({ field }) => (
                <FormItem className="w-full space-y-1" id="criteria-item">
                  <div className="flex items-center justify-between">
                    <FormLabel>
                      <span className="body-m text-neutral-rich-gray">Judging Criteria*</span>
                    </FormLabel>
                  </div>
                  <FormControl>
                    <div className="group relative">
                      <Textarea
                        {...field}
                        className="absolute -z-10 h-0 max-h-0 min-h-0 opacity-0 focus-visible:ring-0"
                      />
                      <TextEditor
                        simpleModel
                        onCreated={(editor) => {
                          const text = editor.getText().replace(/\n|\r/gm, '');
                          setCriteria({ type: TEXT_EDITOR_TYPE, content: editor.children });
                          form.setValue('criteria', text);
                        }}
                        className="overflow-hidden rounded-[8px] group-data-[invalid=true]:!border-status-error-dark"
                        defaultContent={transformTextToEditorValue(initialValues?.criteria)}
                        onChange={(editor) => {
                          const text = editor.getText().replace(/\n|\r/gm, '');
                          form.setValue('criteria', text);
                          if (text) {
                            form.clearErrors('criteria');
                          }
                          setCriteria({ type: TEXT_EDITOR_TYPE, content: editor.children });
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="judgeMode"
              render={({ field }) => (
                <FormItem className="w-full space-y-1" id="judgeMode-item">
                  <div className="flex items-center gap-3">
                    <FormLabel>
                      <span className="text-base text-neutral-rich-gray">Judging Mode*</span>
                    </FormLabel>
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-5 w-5 text-neutral-off-black" />
                        </TooltipTrigger>
                        <TooltipContent className="flex max-w-[256px] flex-col gap-2 bg-yellow-extra-light p-4 text-xs font-light text-neutral-rich-gray">
                          <TooltipArrow className="fill-yellow-extra-light" />
                          <p>
                            Users + Judges: Accounts set as judges by organizers and all HackQuest users can participate
                            the voting stage of the hackathon;
                          </p>
                          <p>
                            Judges Only: Only accounts set as judges by organizers can participate the voting stage of
                            the hackathon.
                          </p>
                          <p>
                            If this hackathon will not be voted and judged by HackQuest system, organizers need to
                            upload the final reward list at the end of it.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
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
                <FormItem
                  className="!mt-3 flex w-full flex-row items-start space-x-2.5 space-y-0"
                  id="disableJudge-item"
                >
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
                    <FormItem className="w-full space-y-1" id="voteMode-item">
                      <div className="flex items-center gap-3">
                        <FormLabel>
                          <span className="text-base text-neutral-rich-gray">Voting Mode*</span>
                        </FormLabel>
                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger>
                              <InfoIcon className="h-5 w-5 text-neutral-off-black" />
                            </TooltipTrigger>
                            <TooltipContent className="flex max-w-[256px] flex-col gap-2 bg-yellow-extra-light p-4 text-xs font-light text-neutral-rich-gray">
                              <TooltipArrow className="fill-yellow-extra-light" />
                              <p>
                                Fixed Number of Vote: Organizers need to set the total votes and votes proportion for
                                users and judges. In voting stage, users and judges can vote for projects they like with
                                the votes they have;
                              </p>
                              <p>
                                Project Scoring: This is only available to Judges Only. Organizers need to set a perfect
                                score, and the judges will give each project a score in the voting stage.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
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
                {voteMode === 'fixed' && judgeMode === 'all' && (
                  <FormField
                    control={form.control}
                    name="totalVote"
                    render={({ field }) => (
                      <FormItem className="w-full space-y-1" id="totalVote-item">
                        <div className="flex items-center justify-between">
                          <FormLabel>
                            <span className="body-m text-neutral-rich-gray">How many votes does each person get?*</span>
                          </FormLabel>
                        </div>
                        <FormControl>
                          <TextField
                            {...field}
                            type="number"
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              setUserVotes(Math.round(Number(e.target.value) * (sliderValue / 100)));
                              setJudgeVotes(Math.round(Number(e.target.value) * (1 - sliderValue / 100)));
                            }}
                            autoComplete="off"
                            placeholder="e.g. 100000"
                            className="aria-[invalid=true]:border-status-error-dark"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {voteMode === 'fixed' && judgeMode === 'judges' && (
                  <FormField
                    control={form.control}
                    name="judgeTotalVote"
                    render={({ field }) => (
                      <FormItem className="w-full space-y-1" id="judgeTotalVote-item">
                        <div className="flex items-center justify-between">
                          <FormLabel>
                            <span className="body-m text-neutral-rich-gray">How many votes does each person get?*</span>
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
                      <FormItem className="w-full space-y-1" id="projectJudgeCount-item">
                        <div className="flex items-center gap-3">
                          <FormLabel>
                            <span className="body-m text-neutral-rich-gray">
                              How many judges are needed to vote for each project?*
                            </span>
                          </FormLabel>
                          <TooltipProvider delayDuration={0}>
                            <Tooltip>
                              <TooltipTrigger>
                                <InfoIcon className="h-5 w-5 text-neutral-off-black" />
                              </TooltipTrigger>
                              <TooltipContent className="flex max-w-[256px] flex-col gap-2 bg-yellow-extra-light p-4 text-xs font-light text-neutral-rich-gray">
                                <TooltipArrow className="fill-yellow-extra-light" />
                                <p>
                                  This is the number of judges required for voting each project. There will be more work
                                  for judges if the number if higher.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
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
                {judgeMode === 'all' && voteMode === 'fixed' && (
                  <div className="w-full space-y-1" id="votesProportion-item">
                    <label className="body-m text-neutral-rich-gray">Votes Proportion*</label>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-light text-neutral-rich-gray">Total User Votes</span>
                        <span className="text-sm">{userVotes}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{judgeVotes}</span>
                        <span className="text-xs font-light text-neutral-rich-gray">Total Judge Votes</span>
                      </div>
                    </div>
                    <div className="!mt-4 w-full">
                      <Slider
                        value={[sliderValue]}
                        onValueChange={(value) => onSliderValueChange(value[0])}
                        max={100}
                        step={1}
                      />
                    </div>
                  </div>
                )}
                {!!voteMode && (
                  <FormField
                    control={form.control}
                    name="judgeProjectVote"
                    render={({ field }) => (
                      <FormItem className="w-full space-y-1" id="judgeProjectVote-item">
                        <div className="flex items-center gap-3">
                          <FormLabel>
                            <span className="body-m text-neutral-rich-gray">
                              The maximum number of votes each {judgeMode === 'all' ? 'user/judge' : 'judge'} can cast
                              for each project*
                            </span>
                          </FormLabel>
                          <TooltipProvider delayDuration={0}>
                            <Tooltip>
                              <TooltipTrigger>
                                <InfoIcon className="h-5 w-5 text-neutral-off-black" />
                              </TooltipTrigger>
                              <TooltipContent className="flex max-w-[256px] flex-col gap-2 bg-yellow-extra-light p-4 text-xs font-light text-neutral-rich-gray">
                                <TooltipArrow className="fill-yellow-extra-light" />
                                <p>
                                  In order to ensure the fairness of the voting, organizers need to set a limit for the
                                  votes if Fixed Number of Vote is selected. For example, if a user/judge has 1000
                                  votes, but the maximum number of votes each user/judge can cast for each project is
                                  100, the user/judge can only cast 100 or less to each project.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
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
                <FormField
                  control={form.control}
                  name="judgeAccount"
                  render={({ field }) => (
                    <FormItem className="w-full space-y-1" id="judgeAccount-item">
                      <FormLabel>
                        <span className="body-m text-neutral-rich-gray">
                          Judge Accounts{judgeMode === 'judges' && '*'}
                          {judgeMode === 'all' && `(${judgeAccounts.length})`}
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
                            isLoading={checkJudgeAccount.isPending || isPending}
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
                {judgeMode === 'all' && judgeAccounts.length > 0 && (
                  <div className="flex w-full items-center justify-center rounded-[4px] bg-neutral-off-white p-2 text-xs text-neutral-rich-gray">
                    {Number(judgeVotes) / judgeAccounts.length} votes for each judge
                  </div>
                )}
                <AddJudgeAccounts judgeAccounts={judgeAccounts} setJudgeAccounts={setJudgeAccounts} />
              </>
            )}
            <input ref={submitInputRef} type="submit" className="hidden" />
          </form>
        </Form>
        <div className="flex shrink-0 justify-end gap-4 px-10">
          <Button className="w-[165px]" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className="w-[165px]"
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
