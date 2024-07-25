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
import { useMutation } from '@tanstack/react-query';

const formSchema = z.object({
  judgeAccount: z.string().email()
});
interface JudgesModalProp {
  open: boolean;
  onClose: () => void;
}

const JudgesModal: React.FC<JudgesModalProp> = ({ open, onClose }) => {
  const [removeJudge, setRemoveJudge] = useState<any>(null);
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
      console.info(data);
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
  async function addJudgeAccount() {
    const isValid = await form.trigger('judgeAccount');
    const email = form.getValues('judgeAccount');
    if (email && isValid) {
      mutate(email);
    }
  }
  return (
    <Modal open={open} onClose={onClose} showCloseIcon icon={<FiX size={26} />}>
      <div className="flex max-h-[80vh] w-[888px] flex-col rounded-[16px] bg-neutral-white pb-[20px] pt-[60px]">
        <div className="flex flex-col gap-[20px] px-[40px]">
          <Title title="Judges" />
          <div className="flex flex-col gap-[8px]">
            <p>{`Judge Accounts (${10})`}</p>
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
                          isLoading={isPending}
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
              {`10,000 votes for each judge`}
            </div>
          </div>
        </div>
        <div className="scroll-wrap-y flex-1 px-[40px] py-[24px]">
          <div className="flex flex-col gap-[24px]">
            {Array.from({ length: 30 }).map((v, i) => (
              <JudgeCard
                key={i}
                handleRemove={() => {
                  setRemoveJudge(i);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <ConfirmModal
        open={!!removeJudge}
        onClose={() => setRemoveJudge(null)}
        onConfirm={() => {
          setRemoveJudge(null);
        }}
      >
        {`Do you want to remove this judge 1111?`}
      </ConfirmModal>
    </Modal>
  );
};

export default JudgesModal;
