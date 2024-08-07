'use client';

import * as React from 'react';
import * as z from 'zod';
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form';
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
import { AddFieldButton } from '../common/add-field-button';
import { v4 } from 'uuid';
import { CustomTextField } from '../common/custom-text-field';
import { InfoIcon } from 'lucide-react';
import { TEXT_EDITOR_TYPE, transformTextToEditorValue } from '@/components/Common/TextEditor';

import dynamic from 'next/dynamic';
const TextEditor = dynamic(() => import('@/components/Common/TextEditor'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

const optionSchema = z.object({
  value: z.string().optional()
});

const baseSchema = z.object({
  type: z.enum(['radio', 'input']),
  label: z
    .string()
    .min(1, {
      message: 'Question is required'
    })
    .max(300, {
      message: 'Question cannot exceed 300 characters'
    }),
  placeholder: z
    .string()
    // .max(300, {
    //   message: 'Description cannot exceed 300 characters'
    // })
    .optional()
    .or(z.literal('')),
  multiple: z.enum(['false', 'true']).optional(),
  options: z.array(optionSchema).optional(),
  maxCharacters: z.string().optional()
});

const formSchema = baseSchema.superRefine((data, ctx) => {
  if (data.type === 'radio') {
    if (!data.options || data.options.length === 0) {
      ctx.addIssue({
        path: ['options'],
        code: z.ZodIssueCode.custom,
        message: 'Selection options must have at least one option'
      });
    } else {
      data.options.forEach((option, index) => {
        if (!option.value) {
          ctx.addIssue({
            path: ['options', index, 'value'],
            code: z.ZodIssueCode.custom,
            message: 'Option value is required'
          });
        }
      });
    }
  } else if (data.type === 'input') {
    if (!data.maxCharacters) {
      ctx.addIssue({
        path: ['maxCharacters'],
        code: z.ZodIssueCode.custom,
        message: 'Maximum characters is required'
      });
    }
  }
});

function SelectionForm({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'options'
  });

  return (
    <div className="flex w-full flex-col gap-6">
      <FormField
        control={form.control}
        name="multiple"
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
                  <RadioGroupItem value="false">Single</RadioGroupItem>
                </FormControl>
                <FormControl>
                  <RadioGroupItem value="true">Multiple</RadioGroupItem>
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
          {fields.map((field, index) => (
            <CustomTextField
              key={index}
              name={`options.${index}.value`}
              register={form.register}
              index={index}
              remove={remove}
              placeholder="Option one starts here..."
              error={form.formState.errors.options?.[index]?.value?.message}
            />
          ))}
          <AddFieldButton variant="outline" onClick={() => append({ value: '' })}>
            Add one option
          </AddFieldButton>
        </div>
        {form.formState.errors.options?.root?.message && (
          <p className="inline-flex items-center text-base text-status-error-dark">
            <InfoIcon className="mr-1.5 h-4 w-4" />
            <span>{form.formState.errors.options?.root?.message}</span>
          </p>
        )}
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
  initialValues,
  onConfirm,
  onClose
}: {
  open?: boolean;
  initialValues?: any;
  onConfirm?: (data: any) => void;
  onClose?: () => void;
}) {
  const submitInputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState('radio');

  const [placeholder, setPlaceholder] = React.useState<{ type: string; content: object }>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: '',
      placeholder: '',
      type: 'radio',
      multiple: 'false',
      options: [{ value: '' }, { value: '' }],
      maxCharacters: ''
    }
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const values = {
      id: initialValues?.id || v4(),
      type: data.type,
      optional: false,
      selected: true,
      property: {
        label: data.label,
        placeholder: placeholder,
        ...(data.type === 'radio' && {
          multiple: data.multiple === 'true',
          options: data.options?.map((option) => option.value)
        }),
        ...(data.type === 'input' && {
          maxCharacters: data.maxCharacters
        })
      }
    };
    onConfirm?.(values);
    handleClose();
  }

  React.useEffect(() => {
    if (open && initialValues) {
      if (initialValues.type === 'radio') {
        setValue('radio');
        form.reset({
          label: initialValues?.property?.label,
          placeholder: '',
          type: initialValues?.type,
          multiple: initialValues?.property?.multiple?.toString(),
          options: initialValues?.property?.options?.map((option: string) => ({ value: option }))
        });
      } else {
        setValue('input');
        form.reset({
          label: initialValues?.property?.label,
          placeholder: '',
          type: initialValues?.type,
          multiple: 'false',
          options: [{ value: '' }, { value: '' }],
          maxCharacters: initialValues?.property?.maxCharacters
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues, open]);

  function handleClose() {
    form.reset({
      label: '',
      placeholder: '',
      type: 'radio',
      multiple: 'false',
      options: [{ value: '' }, { value: '' }],
      maxCharacters: ''
    });
    setValue('radio');
    onClose?.();
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="flex flex-col gap-6 px-8 pb-10 pt-[60px] shadow-modal sm:w-[888px] sm:max-w-[888px]">
        <div className="shrink-0 px-2">
          <h1 className="headline-h3 relative pl-[21px] text-neutral-black before:absolute before:left-0 before:top-1/2 before:h-[34px] before:w-[5px] before:-translate-y-1/2 before:transform before:rounded-full before:bg-yellow-dark before:content-['']">
            {initialValues ? 'Edit Field' : 'Add a New Field'}
          </h1>
        </div>
        <Form {...form}>
          <form
            className="no-scrollbar flex flex-1 flex-col items-center space-y-6 overflow-y-auto"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit(onSubmit)();
            }}
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="w-full space-y-1 px-2">
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
                        <RadioGroupItem className="headline-h5 h-[67px] rounded-2xl" value="radio">
                          Selection
                        </RadioGroupItem>
                      </FormControl>
                      <FormControl>
                        <RadioGroupItem className="headline-h5 h-[67px] rounded-2xl" value="input">
                          Q&A
                        </RadioGroupItem>
                      </FormControl>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem className="w-full space-y-1 px-2">
                  <div className="flex items-center justify-between">
                    <FormLabel>
                      <span className="body-m text-neutral-rich-gray">Question*</span>
                    </FormLabel>
                    <span className="caption-14pt text-neutral-rich-gray">
                      <span className={cn({ 'text-status-error': form.watch('label')?.length > 300 })}>
                        {form.watch('label')?.length}
                      </span>
                      /300
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
              name="placeholder"
              render={({ field }) => (
                <FormItem className="w-full space-y-1 px-2">
                  <div className="flex items-center justify-between">
                    <FormLabel>
                      <span className="sm:body-m body-s text-neutral-rich-gray">Description</span>
                    </FormLabel>
                    {/* <span className="sm:caption-14pt caption-12pt text-neutral-rich-gray">
                      <span className={cn({ 'text-status-error': (form.watch('placeholder')?.length ?? 0) > 300 })}>
                        {form.watch('placeholder')?.length}
                      </span>
                      /300
                    </span> */}
                  </div>
                  <FormControl>
                    <Textarea
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      authHeight={false}
                      className="hidden h-16 border-neutral-light-gray p-3 text-base text-neutral-black placeholder:text-neutral-medium-gray focus-visible:ring-0 aria-[invalid=true]:border-status-error-dark"
                      placeholder="You can use one or two sentences to describe or explain the question"
                    />
                  </FormControl>
                  <TextEditor
                    simpleModel
                    onCreated={(editor) => {
                      setPlaceholder({ type: TEXT_EDITOR_TYPE, content: editor.children });
                      form.setValue('placeholder', editor.getText().replace(/\n|\r/gm, ''));
                    }}
                    defaultContent={transformTextToEditorValue(initialValues?.property?.placeholder)}
                    onChange={(editor) => {
                      const text = editor.getText().replace(/\n|\r/gm, '');
                      form.setValue('placeholder', text);
                      setPlaceholder({ type: TEXT_EDITOR_TYPE, content: editor.children });
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <ResizablePanel.Root value={value} className="w-full overflow-visible px-2 pb-2">
              <ResizablePanel.Content value="radio">
                <SelectionForm form={form} />
              </ResizablePanel.Content>
              <ResizablePanel.Content value="input">
                <QAForm form={form} />
              </ResizablePanel.Content>
            </ResizablePanel.Root>
            <input ref={submitInputRef} type="submit" className="hidden" />
          </form>
        </Form>
        <div className="flex w-full items-center justify-end gap-2 px-2">
          <Button variant="outline" type="button" className="w-[165px]" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="w-[165px]"
            // disabled={!form.formState.isValid}
            onClick={() => {
              submitInputRef.current?.click();
            }}
          >
            {initialValues ? 'Save Changes' : 'Add'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
