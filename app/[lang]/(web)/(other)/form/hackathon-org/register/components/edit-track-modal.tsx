'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import * as z from 'zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { TextField } from '@/components/ui/text-field';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/helper/utils';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { PlusIcon } from '@/components/ui/icons/plus';
import { currencyWithoutSymbol } from '@/lib/currency';

const formSchema = z.object({
  trackName: z
    .string()
    .min(1, {
      message: 'Track name is a required input'
    })
    .max(120, {
      message: 'Track name cannot exceed 120 characters'
    }),
  totalRewards: z.string().min(1, {
    message: 'Total rewards is a required input'
  }),
  rule: z
    .string()
    .min(1, {
      message: 'Distribution rule is a required input'
    })
    .max(600, {
      message: 'Distribution rule cannot exceed 600 characters'
    })
});

type Ranking = {
  id: number;
  reward: string;
};

function RankForm({ rankings, setRankings }: { rankings: Ranking[]; setRankings: (ranks: Ranking[]) => void }) {
  const totalRewards = rankings.reduce((total, ranking) => total + (Number(ranking.reward) ?? 0), 0);

  function onValueChange(id: number, value: string) {
    const updatedRankings = rankings.map((ranking) => (ranking.id === id ? { ...ranking, reward: value } : ranking));
    setRankings(updatedRankings);
  }

  function addRanking() {
    const newRanking = { id: rankings.length + 1, reward: '' };
    setRankings([...rankings, newRanking]);
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full flex-col gap-3">
        <label className="body-m text-neutral-rich-gray">Ranking & Rewards*</label>
        <div className="grid grid-cols-2 gap-3">
          {rankings.map((ranking) => (
            <div
              key={ranking.id}
              className="flex items-center gap-5 rounded-[10px] border border-neutral-light-gray px-6 py-5"
            >
              <span className="body-m inline-flex h-8 w-8 items-center justify-center rounded-[4px] border-2 border-neutral-light-gray text-neutral-off-black">
                {ranking.id}
              </span>
              <input
                value={ranking.reward}
                onChange={(e) => onValueChange(ranking.id, e.target.value)}
                type="number"
                className="flex-1 outline-none"
                placeholder="e.g. 5,000 USD"
              />
            </div>
          ))}
          <button
            type="button"
            className="body-s inline-flex items-center justify-center gap-1 rounded-[10px] border border-dashed border-neutral-medium-gray p-6 text-neutral-medium-gray outline-none"
            onClick={addRanking}
          >
            <PlusIcon />
            <span>Add a ranking</span>
          </button>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2.5">
        <label className="body-m text-neutral-rich-gray">Total Rewards*</label>
        <p className="body-m-bold text-neutral-off-black">{totalRewards ? currencyWithoutSymbol(totalRewards) : '-'}</p>
      </div>
    </div>
  );
}

const OthersForm = ({ form }: { form: UseFormReturn<z.infer<typeof formSchema>, any, undefined> }) => {
  return (
    <div className="flex w-full flex-col gap-6">
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
                value={field.value}
                type="number"
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
        name="rule"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <div className="flex items-center justify-between">
              <FormLabel>
                <span className="sm:body-m body-s text-neutral-rich-gray">Distribution Rule*</span>
              </FormLabel>
              <span className="sm:caption-14pt caption-12pt text-neutral-rich-gray">
                <span className={cn({ 'text-status-error': (form.watch('rule')?.length ?? 0) > 600 })}>
                  {form.watch('rule')?.length}
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
                className="body-m h-[128px] border-neutral-light-gray p-3 text-neutral-black placeholder:text-neutral-medium-gray focus-visible:ring-0 aria-[invalid=true]:border-status-error-dark"
                placeholder="Please describe how the rewards will be distributed"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

function FormContent({ onClose, onSubmit }: { onClose: () => void; onSubmit: (values: any) => void }) {
  const [method, setMethod] = React.useState('ranking');
  const [rankings, setRankings] = React.useState([
    { id: 1, reward: '' },
    { id: 2, reward: '' }
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trackName: ''
    }
  });

  const totalRewards = rankings.reduce((acc, curr) => acc + (Number(curr.reward) ?? 0), 0);

  const isRankingMethod = method === 'ranking';

  const disabled = isRankingMethod
    ? Boolean(form.formState.errors.trackName) || rankings.some((ranking) => !ranking.reward)
    : form.formState.isValid === false;

  function handleSubmit(data: z.infer<typeof formSchema>) {
    let values = {} as any;
    if (isRankingMethod) {
      values = {
        trackName: data.trackName,
        totalRewards: totalRewards.toString(),
        rankings
      };
    } else {
      values = {
        ...data
      };
    }
    onSubmit({ ...values, method });
  }

  React.useEffect(() => {
    if (method === 'ranking') {
      form.setValue('totalRewards', '1');
      form.setValue('rule', '1');
    } else {
      form.setValue('totalRewards', '');
      form.setValue('rule', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method]);

  return (
    <Form {...form}>
      <form className="flex flex-col items-center space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
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
                  <span className={cn({ 'text-status-error': form.watch('trackName')?.length > 120 })}>
                    {form.watch('trackName')?.length}
                  </span>
                  /120
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
        <div className="flex w-full flex-col gap-1">
          <label className="body-m text-neutral-rich-gray">Distribution Method (Select one)*</label>
          <RadioGroup value={method} onValueChange={setMethod} className="w-full grid-cols-2">
            <RadioGroupItem value="ranking">By Ranking</RadioGroupItem>
            <RadioGroupItem value="others">By Others</RadioGroupItem>
          </RadioGroup>
        </div>
        {isRankingMethod && <RankForm rankings={rankings} setRankings={setRankings} />}
        {!isRankingMethod && <OthersForm form={form} />}
        <div className="flex w-full items-center justify-end gap-4">
          <Button variant="outline" className="w-[165px]" onClick={onClose}>
            Cancel
          </Button>
          <Button className="w-[165px]" disabled={disabled}>
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
}

export function EditTrackModal({
  open,
  onAddTrack,
  onClose
}: {
  open: boolean;
  onAddTrack: (track: any) => void;
  onClose: () => void;
}) {
  function onSubmit(values: any) {
    onAddTrack(values);
    onClose();
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[888px] max-w-[888px] gap-6 px-10 pb-10 pt-[60px] shadow-modal">
        <h1 className="headline-h3 relative pl-[21px] text-neutral-black before:absolute before:left-0 before:top-1/2 before:h-[34px] before:w-[5px] before:-translate-y-1/2 before:transform before:rounded-full before:bg-yellow-dark before:content-['']">
          Add a New Track
        </h1>
        <FormContent onClose={onClose} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
