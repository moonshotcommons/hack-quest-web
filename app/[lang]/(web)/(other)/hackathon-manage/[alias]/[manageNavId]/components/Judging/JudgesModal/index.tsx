import Modal from '@/components/Common/Modal';
import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import Title from '../../Title';
import JudgeCard from './JudgeCard';
import { ConfirmModal } from '@/components/hackathon-org/modals/confirm-modal';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import webApi from '@/service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HackathonJudgeAccountType, HackathonJugingInfoRewardType } from '@/service/webApi/resourceStation/type';
import { message } from 'antd';

const formSchema = z.object({
  judgeAccount: z.string().email()
});
interface JudgesModalProp {
  open: boolean;
  onClose: () => void;
  judgeReward: HackathonJugingInfoRewardType;
  refresh: VoidFunction;
}

const JudgesModal: React.FC<JudgesModalProp> = ({ open, onClose, judgeReward, refresh }) => {
  const judgeAccounts = judgeReward?.judge?.judgeAccounts || [];
  const [removeJudge, setRemoveJudge] = useState<HackathonJudgeAccountType | null>(null);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      judgeAccount: ''
    }
  });
  const judgeAccount = form.watch('judgeAccount');

  const { mutate, isPending } = useMutation({
    mutationFn: (email: string) => webApi.hackathonV2Api.addJudgeAccount(email),
    onSuccess: (data) => {
      if (judgeAccounts.some((judge) => judge.email === data.email)) {
        message.error('Already exists');
        return;
      }
      changeAccounts([...judgeAccounts.map((v) => v.id), data.id]);
    },
    onError: (error: any) => {
      if (error.code === 404) {
        form.setError('judgeAccount', {
          message: 'Please enter a valid email address that has been registered in HackQuest.'
        });
      }
    }
  });
  const { mutate: changeAccounts, isPending: changePending } = useMutation({
    mutationKey: ['updateJudge', judgeReward?.id],
    mutationFn: (accounts: string[]) =>
      webApi.hackathonV2Api.updateHackathonJudge(judgeReward?.id, {
        hackathonId: judgeReward?.hackathonId,
        judgeAccounts: accounts
      }),
    onSuccess: () => {
      message.success('Success');
      form.resetField('judgeAccount', { defaultValue: '' });
      refresh();
      setRemoveJudge(null);
    },
    onError: (error: any) => {
      message.error(error);
    }
  });
  async function addJudgeAccount() {
    const isValid = await form.trigger('judgeAccount');
    const email = form.getValues('judgeAccount');
    if (email && isValid) {
      mutate(email);
    }
  }

  const handleRemove = () => {
    changeAccounts(judgeAccounts.filter((v) => v.id !== removeJudge?.id).map((v) => v.id));
  };

  return (
    <Modal open={open} onClose={onClose} showCloseIcon icon={<FiX size={26} />}>
      <div className="flex max-h-[80vh] w-[888px] flex-col rounded-[16px] bg-neutral-white pb-[20px] pt-[60px]">
        <div className="flex flex-col gap-[20px] px-[40px]">
          <Title title="Judges" />
          <div className="flex flex-col gap-[8px]">
            <p>{`Judge Accounts (${judgeAccounts.length})`}</p>
            <Form {...form}>
              <FormField
                control={form.control}
                name="judgeAccount"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <div className="body-m flex items-center justify-between gap-[40px] rounded-[8px] border border-neutral-light-gray p-[10px] text-neutral-medium-gray">
                        <input
                          {...field}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            form.clearErrors('judgeAccount');
                          }}
                          autoComplete="off"
                          placeholder="e.g. example@gmail.com"
                          className="h-[26px] flex-1 border-none outline-none"
                        />
                        <Button
                          disabled={!judgeAccount}
                          isLoading={isPending || changePending}
                          size={'small'}
                          className="w-[140px] flex-shrink-0"
                          onClick={addJudgeAccount}
                        >
                          Add
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </Form>
            <div className="body-xs flex-center rounded-[4px] bg-neutral-off-white py-[8px] text-neutral-rich-gray">
              {`${judgeReward?.judge?.judgeProjectVote} votes for each judge`}
            </div>
          </div>
        </div>
        <div className="scroll-wrap-y flex-1 px-[40px] py-[24px]">
          <div className="flex flex-col gap-[24px]">
            {judgeAccounts?.map((v, i) => (
              <JudgeCard
                key={i}
                judgeAccount={v}
                handleRemove={() => {
                  setRemoveJudge(v);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <ConfirmModal
        open={!!removeJudge}
        isLoading={changePending}
        autoClose={false}
        onClose={() => setRemoveJudge(null)}
        onConfirm={() => {
          handleRemove();
        }}
      >
        {`Do you want to remove this judge ${removeJudge?.nickname}?`}
      </ConfirmModal>
    </Modal>
  );
};

export default JudgesModal;
