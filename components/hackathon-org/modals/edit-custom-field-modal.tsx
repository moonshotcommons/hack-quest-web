'use client';

import * as React from 'react';
import * as z from 'zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import * as ResizablePanel from '@/components/shared/resizable-panel';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/helper/utils';
import { TextField } from '@/components/ui/text-field';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../common/radio-group';
import { CustomFieldInput } from '../common/custom-field-input';
import { AddFieldButton } from '../common/add-field-button';

const formSchema = z.object({
  question: z
    .string()
    .min(1, {
      message: 'Question is a required input'
    })
    .max(60, {
      message: 'Question cannot exceed 60 characters'
    }),
  description: z
    .string()
    .min(1, {
      message: 'Description is a required input'
    })
    .max(120, {
      message: 'Description cannot exceed 120 characters'
    })
    .optional()
    .or(z.literal('')),
  questionType: z.enum(['single', 'multiple'], {
    required_error: 'Please select a question type'
  }),
  maxCharacters: z.string().min(1, {
    message: 'Maximum characters is a required input'
  })
});

function SelectionForm({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) {
  const [options, setOptions] = React.useState([{ id: 1, value: '' }]);

  function onChange(id: number, value: string) {
    setOptions((prev) => {
      return prev.map((option) => {
        if (option.id === id) {
          return {
            ...option,
            value
          };
        }
        return option;
      });
    });
  }

  function addOption() {
    setOptions([...options, { id: options.length + 1, value: '' }]);
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <FormField
        control={form.control}
        name="questionType"
        render={({ field }) => (
          <FormItem className="w-full space-y-1">
            <div className="flex items-center justify-between">
              <FormLabel>
                <span className="sm:body-m body-s text-neutral-rich-gray">
                  Is this a single-choice or a multiple-choice selection?*
                </span>
              </FormLabel>
            </div>
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value as any);
                }}
                className="w-full grid-cols-2"
              >
                <FormControl>
                  <RadioGroupItem value="single">Single</RadioGroupItem>
                </FormControl>
                <FormControl>
                  <RadioGroupItem value="multiple">Multiple</RadioGroupItem>
                </FormControl>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex w-full flex-col gap-3">
        <label className="body-m text-neutral-rich-gray">Options*</label>
        <div className="grid grid-cols-2 gap-3">
          {options.map((option) => (
            <CustomFieldInput key={option.id} value={option.value} onChange={onChange} index={option.id} />
          ))}
          <AddFieldButton variant="outline" onClick={addOption}>
            Add one option
          </AddFieldButton>
        </div>
      </div>
    </div>
  );
}

function QAForm({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) {
  return (
    <FormField
      control={form.control}
      name="maxCharacters"
      render={({ field }) => (
        <FormItem className="w-full space-y-1">
          <div className="flex items-center justify-between">
            <FormLabel>
              <span className="body-m text-neutral-rich-gray">MAX Character Count*</span>
            </FormLabel>
          </div>
          <FormControl>
            <TextField
              {...field}
              onChange={(e) => {
                field.onChange(e);
              }}
              autoComplete="off"
              placeholder="e.g. 120"
              className="aria-[invalid=true]:border-status-error-dark"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function EditCustomFieldModal({
  open,
  onConfirm,
  onClose
}: {
  open?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
}) {
  const [value, setValue] = React.useState('selection');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
      description: ''
    }
  });
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[888px] max-w-[888px] gap-6 px-10 pb-10 pt-[60px] shadow-modal">
        <h1 className="headline-h3 relative pl-[21px] text-neutral-black before:absolute before:left-0 before:top-1/2 before:h-[34px] before:w-[5px] before:-translate-y-1/2 before:transform before:rounded-full before:bg-yellow-dark before:content-['']">
          Add a New Field
        </h1>
        <RadioGroup value={value} onValueChange={setValue} className="w-full grid-cols-2">
          <RadioGroupItem className="headline-h5 h-[67px] rounded-2xl" value="selection">
            Selection
          </RadioGroupItem>
          <RadioGroupItem className="headline-h5 h-[67px] rounded-2xl" value="qa">
            Q&A
          </RadioGroupItem>
        </RadioGroup>
        <Separator />
        <Form {...form}>
          <form className="flex flex-col items-center space-y-6">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>
                      <span className="body-m text-neutral-rich-gray">Question*</span>
                    </FormLabel>
                    <span className="caption-14pt text-neutral-rich-gray">
                      <span className={cn({ 'text-status-error': form.watch('question')?.length > 60 })}>
                        {form.watch('question')?.length}
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
                      placeholder="Use several words to describe the selections you want users to choose"
                      className="aria-[invalid=true]:border-status-error-dark"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>
                      <span className="sm:body-m body-s text-neutral-rich-gray">Description</span>
                    </FormLabel>
                    <span className="sm:caption-14pt caption-12pt text-neutral-rich-gray">
                      <span className={cn({ 'text-status-error': (form.watch('description')?.length ?? 0) > 120 })}>
                        {form.watch('description')?.length}
                      </span>
                      /120
                    </span>
                  </div>
                  <FormControl>
                    <Textarea
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      authHeight={false}
                      className="h-16 border-neutral-light-gray p-3 text-base text-neutral-black placeholder:text-neutral-medium-gray focus-visible:ring-0 aria-[invalid=true]:border-status-error-dark"
                      placeholder="You can use one or two sentences to describe or explain the question"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ResizablePanel.Root value={value} className="w-full pb-2">
              <ResizablePanel.Content value="selection">
                <SelectionForm form={form} />
              </ResizablePanel.Content>
              <ResizablePanel.Content value="qa">
                <QAForm form={form} />
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
