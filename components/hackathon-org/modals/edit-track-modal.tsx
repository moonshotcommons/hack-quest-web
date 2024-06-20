'use client';

import * as React from 'react';
import * as z from 'zod';
import { v4 } from 'uuid';
import { message } from 'antd';
import { omit } from 'lodash-es';
import { InfoIcon } from 'lucide-react';
import { useFieldArray, useForm, UseFormReturn, useWatch } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import * as ResizablePanel from '@/components/shared/resizable-panel';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { TextField } from '@/components/ui/text-field';
import { Textarea } from '@/components/ui/textarea';
import { currencyWithoutSymbol } from '@/lib/currency';
import webApi from '@/service';
import { cn } from '@/helper/utils';
import { RadioGroup, RadioGroupItem } from '../common/radio-group';
import { CustomTextField } from '../common/custom-text-field';
import { AddFieldButton } from '../common/add-field-button';

const rewardSchema = z.object({
  id: z.string().uuid(),
  value: z.string().min(1, { message: 'Option is required' })
});

const formSchema = z
  .object({
    name: z
      .string()
      .min(1, {
        message: 'Track name is a required input.'
      })
      .max(120, {
        message: 'Track name cannot exceed 120 characters.'
      }),
    mode: z.enum(['RANK', 'OTHERS'], {
      required_error: 'Please select a distribution method.'
    }),
    totalRewards: z
      .string({
        required_error: 'Total rewards is a required input.'
      })
      .optional(),
    rule: z
      .string()
      .max(600, {
        message: 'Distribution rule cannot exceed 600 characters.'
      })
      .optional(),
    rewards: z.array(rewardSchema).optional()
  })
  .superRefine((data, ctx) => {
    if (data.mode === 'RANK' && (!data.rewards || data.rewards.length === 0)) {
      ctx.addIssue({
        path: ['rewards'],
        message: 'Please add at least one option.',
        code: z.ZodIssueCode.custom
      });
    } else if (data.mode === 'OTHERS') {
      if (!data.totalRewards) {
        ctx.addIssue({
          path: ['totalRewards'],
          message: 'Total rewards is a required input.',
          code: z.ZodIssueCode.custom
        });
      }

      if (!data.rule) {
        ctx.addIssue({
          path: ['rule'],
          message: 'Distribution rule is a required input.',
          code: z.ZodIssueCode.custom
        });
      }
    }
  });

type FormValues = z.infer<typeof formSchema>;

function RankingForm({ totalRewards, form }: { form: UseFormReturn<FormValues>; totalRewards?: number }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'rewards'
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full flex-col gap-3">
        <label className="body-m text-neutral-rich-gray">Options*</label>
        <div className="grid grid-cols-2 gap-3">
          {fields.map((field, index) => (
            <CustomTextField
              key={field.id}
              name={`rewards.${index}.value`}
              register={form.register}
              index={index}
              remove={remove}
              placeholder="e.g. 5,000 USD"
            />
          ))}
          <AddFieldButton variant="outline" onClick={() => append({ id: v4(), value: '' })}>
            Add a ranking
          </AddFieldButton>
        </div>
        {form.formState.errors.rewards?.message && (
          <p className="inline-flex items-center text-base text-status-error-dark">
            <InfoIcon className="mr-1.5 h-4 w-4" />
            <span>{form.formState.errors.rewards?.message}</span>
          </p>
        )}
      </div>
      <div className="body-m flex flex-col gap-2.5">
        <label className="text-neutral-rich-gray">Total Rewards*</label>
        <p className="font-bold text-neutral-off-black">{totalRewards ? currencyWithoutSymbol(totalRewards) : '-'}</p>
      </div>
    </div>
  );
}

function OthersForm({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <div className="flex flex-col gap-6">
      <FormField
        control={form.control}
        name="totalRewards"
        render={({ field }) => (
          <FormItem className="w-full space-y-1">
            <div className="flex items-center justify-between">
              <FormLabel>
                <span className="body-m text-neutral-rich-gray">Total Rewards*</span>
              </FormLabel>
            </div>
            <FormControl>
              <TextField
                {...field}
                autoComplete="off"
                placeholder="e.g. 10,000 USD"
                className="aria-[invalid=true]:border-status-error-dark"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="rule"
        render={({ field }) => (
          <FormItem className="w-full space-y-1">
            <div className="flex items-center justify-between">
              <FormLabel>
                <span className="body-m text-neutral-rich-gray">Distribution Rule*</span>
              </FormLabel>
              <span className="caption-14pt text-neutral-rich-gray">
                <span className={cn({ 'text-status-error': (form.watch('rule')?.length ?? 0) > 600 })}>
                  {form.watch('rule')?.length}
                </span>
                /600
              </span>
            </div>
            <FormControl>
              <Textarea
                {...field}
                authHeight={false}
                className="h-20 border-neutral-light-gray p-3 text-base text-neutral-black placeholder:text-neutral-medium-gray focus-visible:ring-0 aria-[invalid=true]:border-status-error-dark"
                placeholder="Please describe how the rewards will be distributed"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export function EditTrackModal({
  open,
  initialValues,
  onClose
}: {
  open?: boolean;
  initialValues?: any;
  onClose?: () => void;
}) {
  const [value, setValue] = React.useState('RANK');

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: any) => webApi.hackathonV2Api.createHackathonRewards(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hackathon'] });
      message.success('Rewards created successfully');
      onClose?.();
    }
  });

  const updateMutation = useMutation({
    mutationKey: ['updateHackathonRewards', initialValues?.id],
    mutationFn: (data: any) => webApi.hackathonV2Api.updateHackathonRewards(initialValues?.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hackathon'] });
      message.success('Rewards updated successfully');
      onClose?.();
    }
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      mode: 'RANK',
      totalRewards: '',
      rule: '',
      rewards: [
        { id: v4(), value: '' },
        { id: v4(), value: '' }
      ]
    }
  });

  const rewards = useWatch({
    control: form.control,
    name: 'rewards'
  });

  const totalRewards = rewards?.reduce((acc, curr) => {
    return acc + Number(curr.value);
  }, 0);

  function onSubmit(values: FormValues) {
    const id = initialValues?.isEditing ? initialValues?.hackathonId : initialValues?.id;
    let data = {};
    if (values.mode === 'OTHERS') {
      data = {
        id,
        ...omit(values, 'rewards')
      };
    } else {
      data = {
        id,
        totalRewards,
        ...omit(values, 'totalRewards', 'rule')
      };
    }

    if (initialValues?.isEditing) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  }

  React.useEffect(() => {
    if (initialValues && initialValues?.isEditing) {
      if (initialValues?.mode === 'RANK') {
        form.reset({
          name: initialValues?.name,
          mode: initialValues?.mode,
          rewards: initialValues?.rewards
        });
      } else {
        form.reset({
          name: initialValues?.name,
          mode: initialValues?.mode,
          totalRewards: initialValues?.totalRewards,
          rule: initialValues?.rule
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="w-[888px] max-w-[888px] gap-6 px-8 pb-10 pt-[60px] shadow-modal"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <h1 className="headline-h3 relative pl-[21px] text-neutral-black before:absolute before:left-0 before:top-1/2 before:h-[34px] before:w-[5px] before:-translate-y-1/2 before:transform before:rounded-full before:bg-yellow-dark before:content-['']">
          {initialValues?.isEditing ? 'Edit' : 'Add a New'} Track
        </h1>
        <Form {...form}>
          <form className="flex flex-col items-center space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full space-y-1 px-2">
                  <div className="flex items-center justify-between">
                    <FormLabel>
                      <span className="body-m text-neutral-rich-gray">Prize Track Name*</span>
                    </FormLabel>
                    <span className="caption-14pt text-neutral-rich-gray">
                      <span className={cn({ 'text-status-error': form.watch('name')?.length > 60 })}>
                        {form.watch('name')?.length}
                      </span>
                      /60
                    </span>
                  </div>
                  <FormControl>
                    <TextField
                      {...field}
                      autoComplete="off"
                      placeholder="e.g. General Track"
                      className="aria-[invalid=true]:border-status-error-dark"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mode"
              render={({ field }) => (
                <FormItem className="w-full space-y-1 px-2">
                  <div className="flex items-center justify-between">
                    <FormLabel>
                      <span className="body-m text-neutral-rich-gray">Distribution Method (Select one)*</span>
                    </FormLabel>
                  </div>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value as any);
                        setValue(value);
                      }}
                      className="w-full grid-cols-2"
                    >
                      <FormControl>
                        <RadioGroupItem value="RANK">By Ranking</RadioGroupItem>
                      </FormControl>
                      <FormControl>
                        <RadioGroupItem value="OTHERS">By Others</RadioGroupItem>
                      </FormControl>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ResizablePanel.Root value={value} className="w-full px-2 pb-2">
              <ResizablePanel.Content value="RANK">
                <RankingForm form={form} totalRewards={totalRewards} />
              </ResizablePanel.Content>
              <ResizablePanel.Content value="OTHERS">
                <OthersForm form={form} />
              </ResizablePanel.Content>
            </ResizablePanel.Root>
            <div className="flex w-full items-center justify-end gap-2">
              <Button variant="outline" type="button" className="w-[165px]" onClick={onClose}>
                Cancel
              </Button>
              <Button
                className="w-[165px]"
                type="submit"
                disabled={!form.formState.isValid}
                isLoading={createMutation.isPending || updateMutation.isPending}
              >
                {initialValues?.isEditing ? 'Save' : 'Add'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
