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
import webApi from '@/service';
import { cn, separationNumber } from '@/helper/utils';
import { RadioGroup, RadioGroupItem } from '../common/radio-group';
import { CustomTextField } from '../common/custom-text-field';
import { AddFieldButton } from '../common/add-field-button';
import { numberToOrdinalWord } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/listbox';
import { CURRENCIES } from '../constants/currency';
import { useRouter } from 'next/navigation';
import { TEXT_EDITOR_TYPE, transformTextToEditorValue } from '@/components/Common/TextEditor';

import dynamic from 'next/dynamic';
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
const TextEditor = dynamic(() => import('@/components/Common/TextEditor'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

const rewardSchema = z.object({
  id: z.string().uuid(),
  value: z.string().optional()
});

const baseSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Track name is required' })
    .max(120, { message: 'Track name cannot exceed 120 characters' }),
  mode: z.enum(['RANK', 'OTHERS']),
  currency: z.string({
    required_error: 'Please select a currency'
  }),
  rewards: z.array(rewardSchema).optional(),
  totalRewards: z.string().optional(),
  rule: z.string().optional()
});

const formSchema = baseSchema.superRefine((data, ctx) => {
  if (data.mode === 'RANK') {
    if (!data.rewards || data.rewards.length === 0) {
      ctx.addIssue({
        path: ['rewards'],
        code: z.ZodIssueCode.custom,
        message: 'Rewards options must have at least one option'
      });
    } else {
      data.rewards.forEach((reward, index) => {
        if (!reward.value) {
          ctx.addIssue({
            path: ['rewards', index, 'value'],
            code: z.ZodIssueCode.custom,
            message: 'Reward value is required'
          });
        }
      });
    }
  } else if (data.mode === 'OTHERS') {
    if (!data.totalRewards) {
      ctx.addIssue({
        path: ['totalRewards'],
        code: z.ZodIssueCode.custom,
        message: 'Total rewards is required'
      });
    }
    if (!data.rule) {
      ctx.addIssue({
        path: ['rule'],
        code: z.ZodIssueCode.custom,
        message: 'Distribution rule is required'
      });
    }
    // else if (data.rule.length > 6000 ) {
    //   ctx.addIssue({
    //     path: ['rule'],
    //     code: z.ZodIssueCode.custom,
    //     message: 'Distribution rule cannot exceed 600 characters'
    //   });
    // }
  }
});

type FormValues = z.infer<typeof formSchema>;

function RankingForm({ totalRewards, form }: { form: UseFormReturn<FormValues>; totalRewards?: number }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'rewards'
  });

  const currency = useWatch<z.infer<typeof formSchema>>({
    control: form.control,
    name: 'currency'
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
              placeholder="e.g. 5000"
              error={form.formState.errors.rewards?.[index]?.value?.message}
            />
          ))}
          <AddFieldButton variant="outline" onClick={() => append({ id: v4(), value: '' })}>
            Add a ranking
          </AddFieldButton>
        </div>
        {form.formState.errors.rewards?.root?.message && (
          <p className="inline-flex items-center text-base text-status-error-dark">
            <InfoIcon className="mr-1.5 h-4 w-4" />
            <span>{form.formState.errors.rewards?.root?.message}</span>
          </p>
        )}
      </div>
      <div className="body-m flex flex-col gap-2.5">
        <label className="text-neutral-rich-gray">Total Rewards*</label>
        <p className="font-bold text-neutral-off-black">
          {totalRewards ? `${separationNumber(totalRewards || 0)} ${currency ?? ''}` : '-'}
        </p>
      </div>
    </div>
  );
}

function OthersForm({
  form,
  initialValues,
  setRule
}: {
  form: UseFormReturn<FormValues>;
  initialValues: any;
  setRule: (rule: { type: string; content: object }) => void;
}) {
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
                placeholder="e.g. 10000"
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
            </div>
            <FormControl>
              <div className="group relative">
                <Textarea {...field} className="absolute -z-10 h-0 max-h-0 min-h-0 opacity-0 focus-visible:ring-0" />
                <TextEditor
                  onCreated={(editor) => {
                    const text = editor.getText().replace(/\n|\r/gm, '');
                    setRule({ type: TEXT_EDITOR_TYPE, content: editor.children });
                    form.setValue('rule', text);
                  }}
                  simpleModel
                  defaultContent={transformTextToEditorValue(initialValues.rule)}
                  className="overflow-hidden rounded-[8px] group-data-[invalid=true]:!border-status-error-dark"
                  onChange={(editor) => {
                    const text = editor.getText().replace(/\n|\r/gm, '');
                    form.setValue('rule', text);
                    if (text) {
                      form.clearErrors('rule');
                    }
                    setRule({ type: TEXT_EDITOR_TYPE, content: editor.children });
                  }}
                />
              </div>
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
  onClose,
  refresh
}: {
  open?: boolean;
  initialValues?: any;
  onClose?: () => void;
  refresh?: () => void;
}) {
  const router = useRouter();
  const submitInputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState('RANK');

  const queryClient = useQueryClient();

  function handleClose() {
    onClose?.();
    setValue('RANK');
    form.reset();
  }

  const createMutation = useMutation({
    mutationFn: (data: any) => webApi.hackathonV2Api.createHackathonRewards(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hackathon'] });
      message.success('Rewards created successfully');
      router.refresh();
      refresh?.();
      handleClose();
    }
  });

  const updateMutation = useMutation({
    mutationKey: ['updateHackathonRewards', initialValues?.id],
    mutationFn: (data: any) => webApi.hackathonV2Api.updateHackathonRewards(initialValues?.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hackathon'] });
      message.success('Rewards updated successfully');
      refresh?.();
      router.refresh();
      handleClose();
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

  const [rule, setRule] = React.useState<{ type: string; content: object }>();

  function onSubmit(values: FormValues) {
    const id = initialValues?.isEditing ? initialValues?.hackathonId : initialValues?.id;
    let data = {};
    if (values.mode === 'OTHERS') {
      data = {
        id,
        ...omit(values, 'rewards', 'totalRewards'),
        totalRewards: z.coerce.number().parse(values.totalRewards),
        rule
      };
    } else {
      data = {
        id,
        totalRewards,
        ...omit(values, 'totalRewards', 'rule'),
        rewards: values.rewards?.map((r, index) => ({
          id: r.id,
          value: z.coerce.number().parse(r.value),
          label: `${numberToOrdinalWord(index + 1)} Place`
        }))
      };
    }

    if (initialValues?.isEditing) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  }

  React.useEffect(() => {
    if (open && initialValues && initialValues?.isEditing) {
      if (initialValues?.mode === 'RANK') {
        setValue('RANK');
        form.reset({
          name: initialValues?.name,
          mode: initialValues?.mode,
          currency: initialValues?.currency,
          rewards: initialValues?.rewards.map((r: any) => ({
            id: r.id,
            value: String(r.value)
          }))
        });
      } else {
        setValue('OTHERS');
        form.reset({
          name: initialValues?.name,
          mode: initialValues?.mode,
          currency: initialValues?.currency,
          rewards: [
            { id: v4(), value: '' },
            { id: v4(), value: '' }
          ],
          totalRewards: String(initialValues?.totalRewards),
          // rule: initialValues?.rule
          rule: ''
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues, open]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="flex flex-col gap-6 px-8 pb-10 pt-[60px] shadow-modal sm:w-[888px] sm:max-w-[888px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="shrink-0 px-2">
          <h1 className="headline-h3 relative pl-[21px] text-neutral-black before:absolute before:left-0 before:top-1/2 before:h-[34px] before:w-[5px] before:-translate-y-1/2 before:transform before:rounded-full before:bg-yellow-dark before:content-['']">
            {initialValues?.isEditing ? 'Edit' : 'Add a New'} Track
          </h1>
        </div>
        <Form {...form}>
          <form
            className="no-scrollbar flex flex-1 flex-col items-center space-y-6 overflow-y-auto"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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
                  <div className="flex items-center gap-3">
                    <FormLabel>
                      <span className="body-m text-neutral-rich-gray">Distribution Method (Select one)*</span>
                    </FormLabel>
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-5 w-5 text-neutral-off-black" />
                        </TooltipTrigger>
                        <TooltipContent className="flex max-w-[256px] flex-col gap-2 bg-yellow-extra-light p-4 text-xs font-light text-neutral-rich-gray">
                          <TooltipArrow className="fill-yellow-extra-light" />
                          <p>
                            If the reward will be distributed by ranking, organizers can set the rewards for each
                            ranking here; If it will be distributed by other ways, organizers need to describe the rule
                            here and more details need to be provided at the end of hackathon voting stage.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
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
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>
                      <span className="body-m text-neutral-rich-gray">Reward Currency*</span>
                    </FormLabel>
                  </div>
                  <Select
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
                    <SelectContent>
                      {CURRENCIES.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ResizablePanel.Root value={value} className="w-full overflow-visible px-2 pb-2">
              <ResizablePanel.Content value="RANK">
                <RankingForm form={form} totalRewards={Number(totalRewards?.toFixed(2))} />
              </ResizablePanel.Content>
              <ResizablePanel.Content value="OTHERS">
                <OthersForm form={form} initialValues={initialValues} setRule={setRule} />
              </ResizablePanel.Content>
            </ResizablePanel.Root>
            <input ref={submitInputRef} type="submit" className="hidden" />
          </form>
        </Form>
        <div className="flex w-full shrink-0 items-center justify-end gap-2 px-2">
          <Button variant="outline" type="button" className="w-[165px]" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="w-[165px]"
            // disabled={!form.formState.isValid}
            isLoading={createMutation.isPending || updateMutation.isPending}
            onClick={() => {
              submitInputRef.current?.click();
            }}
          >
            {initialValues?.isEditing ? 'Save Changes' : 'Add'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
