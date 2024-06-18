'use client';

import * as React from 'react';
import * as z from 'zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import * as ResizablePanel from '@/components/shared/resizable-panel';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { TextField } from '@/components/ui/text-field';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/helper/utils';
import { RadioGroup, RadioGroupItem } from '../common/radio-group';
import { CustomFieldInput } from '../common/custom-field-input';
import { AddFieldButton } from '../common/add-field-button';

const formSchema = z.object({
  trackName: z
    .string()
    .min(1, {
      message: 'Track name is a required input'
    })
    .max(120, {
      message: 'Track name cannot exceed 120 characters'
    }),
  distributionMethod: z.enum(['ranking', 'others'], {
    required_error: 'Please select a distribution method'
  }),
  totalRewards: z.string().min(1, {
    message: 'Total rewards is a required input'
  }),
  distributionRule: z
    .string()
    .min(1, {
      message: 'Distribution rule is a required input'
    })
    .max(600, {
      message: 'Distribution rule cannot exceed 600 characters'
    })
});

function RankingForm({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) {
  const [rewards, setRewards] = React.useState([
    { id: 1, value: '' },
    { id: 2, value: '' }
  ]);

  function onChange(id: number, value: string) {
    setRewards((prev) => {
      return prev.map((reward) => {
        if (reward.id === id) {
          return {
            ...reward,
            value
          };
        }
        return reward;
      });
    });
  }

  function addReward() {
    setRewards([...rewards, { id: rewards.length + 1, value: '' }]);
  }
  return (
    <div>
      <div className="flex w-full flex-col gap-3">
        <label className="body-m text-neutral-rich-gray">Options*</label>
        <div className="grid grid-cols-2 gap-3">
          {rewards.map((reward) => (
            <CustomFieldInput
              key={reward.id}
              value={reward.value}
              onChange={onChange}
              index={reward.id}
              placeholder="e.g. 5,000 USD"
            />
          ))}
          <AddFieldButton variant="outline" onClick={addReward}>
            Add a ranking
          </AddFieldButton>
        </div>
      </div>
    </div>
  );
}

function OthersForm({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) {
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
                onChange={(e) => {
                  field.onChange(e);
                }}
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
        name="distributionRule"
        render={({ field }) => (
          <FormItem className="w-full space-y-1">
            <div className="flex items-center justify-between">
              <FormLabel>
                <span className="sm:body-m body-s text-neutral-rich-gray">Distribution Rule*</span>
              </FormLabel>
              <span className="sm:caption-14pt caption-12pt text-neutral-rich-gray">
                <span className={cn({ 'text-status-error': (form.watch('distributionRule')?.length ?? 0) > 600 })}>
                  {form.watch('distributionRule')?.length}
                </span>
                /600
              </span>
            </div>
            <FormControl>
              <Textarea
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
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
  onConfirm,
  onClose
}: {
  open?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
}) {
  const [value, setValue] = React.useState('ranking');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trackName: '',
      distributionMethod: 'ranking',
      totalRewards: '',
      distributionRule: ''
    }
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[888px] max-w-[888px] gap-6 px-10 pb-10 pt-[60px] shadow-modal">
        <h1 className="headline-h3 relative pl-[21px] text-neutral-black before:absolute before:left-0 before:top-1/2 before:h-[34px] before:w-[5px] before:-translate-y-1/2 before:transform before:rounded-full before:bg-yellow-dark before:content-['']">
          Add a New Track
        </h1>
        <Form {...form}>
          <form className="flex flex-col items-center space-y-6">
            <FormField
              control={form.control}
              name="trackName"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>
                      <span className="body-m text-neutral-rich-gray">Prize Track Name*</span>
                    </FormLabel>
                    <span className="caption-14pt text-neutral-rich-gray">
                      <span className={cn({ 'text-status-error': form.watch('trackName')?.length > 60 })}>
                        {form.watch('trackName')?.length}
                      </span>
                      /60
                    </span>
                  </div>
                  <FormControl>
                    <TextField
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
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
              name="distributionMethod"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
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
                        <RadioGroupItem value="ranking">By Ranking</RadioGroupItem>
                      </FormControl>
                      <FormControl>
                        <RadioGroupItem value="others">By Others</RadioGroupItem>
                      </FormControl>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ResizablePanel.Root value={value} className="w-full pb-2">
              <ResizablePanel.Content value="ranking">
                <RankingForm form={form} />
              </ResizablePanel.Content>
              <ResizablePanel.Content value="others">
                <OthersForm form={form} />
              </ResizablePanel.Content>
            </ResizablePanel.Root>
            <div className="flex w-full items-center justify-end gap-2">
              <Button variant="outline" type="button" className="w-[165px]" onClick={onClose}>
                Cancel
              </Button>
              <Button
                className="w-[165px]"
                disabled={!form.formState.isValid}
                onClick={() => {
                  onConfirm?.();
                  onClose?.();
                }}
              >
                Add
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
