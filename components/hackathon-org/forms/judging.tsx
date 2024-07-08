'use client';

import * as React from 'react';
import * as z from 'zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/helper/utils';
import webApi from '@/service';
import { ActionButtons } from './action-buttons';
import { useHackathonOrgState } from '../constants/state';

type JudgeAccount = {
  id: string;
  email: string;
  nickname: string;
  avatar: string;
};

const formSchema = z.object({
  resource: z
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

export function JudgingForm({
  isEditMode = false,
  initialValues,
  onCancel,
  onSave
}: {
  isEditMode?: boolean;
  initialValues?: any;
  onCancel?: () => void;
  onSave?: () => void;
}) {
  const [userVotes, setUserVotes] = React.useState<string | number>(50);
  const [judgeVotes, setJudgeVotes] = React.useState<string | number>(50);
  const [sliderValue, setSliderValue] = React.useState(50);
  const [judgeAccounts, setJudgeAccounts] = React.useState<JudgeAccount[]>([]);

  const { updateStatus, onPrevious, onNext } = useHackathonOrgState();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => webApi.hackathonV2Api.updateHackathon(data, 'judging'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hackathon'] });
      isEditMode ? onSave?.() : onNext();
    }
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resource: ''
    }
  });

  const isValid = form.formState.isValid;

  const judgeAccount = form.watch('judgeAccount');

  // React.useEffect(() => {
  //   if (!isEditMode) {
  //     if (isValid) {
  //       updateStatus(Steps.JUDGING, true);
  //     } else {
  //       updateStatus(Steps.JUDGING, false);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isValid, isEditMode]);

  React.useEffect(() => {
    if (initialValues?.judge) {
      form.resetField('resource', {
        defaultValue: initialValues?.judge.resource
      });
      setUserVotes(initialValues?.judge.votesProportion[0]);
      setJudgeVotes(initialValues?.judge.votesProportion[1]);
      setSliderValue(initialValues?.judge.votesProportion[0]);
      setJudgeAccounts(initialValues?.judge.judgeAccounts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues?.judge]);

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
    const values = {
      id: initialValues?.id,
      resource: data.resource,
      votesProportion: [userVotes, judgeVotes],
      judgeAccounts: judgeAccounts?.map((account) => account.id)
    };
    mutation.mutate(values);
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (email: string) => webApi.hackathonV2Api.addJudgeAccount(email),
    onSuccess: (data) => {
      setJudgeAccounts((prev) => [...prev, data]);
      form.resetField('judgeAccount');
    },
    onError: (error: any) => {
      if (error.code === 404) {
        form.setError('judgeAccount', {
          message: 'Please enter a valid email address that has been registered in HackQuest.'
        });
      }
    }
  });

  async function addJudgeAccount() {
    const isValid = await form.trigger('judgeAccount');
    const email = form.getValues('judgeAccount');
    if (email && isValid) {
      mutate(email);
    }
  }

  function removeJudgeAccount(email: string) {
    setJudgeAccounts((prev) => prev.filter((judge) => judge.email !== email));
  }

  function onCancelOrBack() {
    isEditMode ? onCancel?.() : onPrevious();
  }

  return (
    <Form {...form}>
      <form className="flex flex-col items-center space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      form.clearErrors('judgeAccount');
                    }}
                    type="text"
                    placeholder="e.g. bob@gmail.com"
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
        <div className="w-full">
          {judgeAccounts.length > 0 && (
            <React.Fragment>
              {judgeAccounts.map((account) => (
                <div className="flex items-center" key={account.email}>
                  <div className="relative h-[50px] w-[50px] rounded-full bg-yellow-dark">
                    <Image src={account.avatar} alt="avatar" className="rounded-full" fill />
                  </div>
                  <span className="body-m ml-3 text-neutral-off-black">{account.nickname}</span>
                  <span className="body-m ml-auto text-neutral-medium-gray">{account.email}</span>
                  <button
                    type="button"
                    className="body-m ml-10 text-neutral-off-black underline"
                    onClick={() => removeJudgeAccount(account.email)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </React.Fragment>
          )}
        </div>
        <ActionButtons
          isLoading={mutation.isPending}
          isEditMode={isEditMode}
          isValid={true}
          onCancelOrBack={onCancelOrBack}
        />
      </form>
    </Form>
  );
}
