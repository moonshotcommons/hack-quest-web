'use client';

import * as React from 'react';
import { InfoIcon } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';
import GraphemeSplitter from 'grapheme-splitter';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { useController, useWatch } from 'react-hook-form';
import { cn } from '@/helper/utils';

type FormElement = React.ElementRef<'form'>;
export interface FormProps extends React.ComponentPropsWithoutRef<'form'> {}

const Form = React.forwardRef<FormElement, FormProps>((props, forwardedRef) => {
  const { className, ...formProps } = props;
  return <form ref={forwardedRef} className={cn('flex flex-col space-y-6', className)} {...formProps} />;
});

Form.displayName = 'Form';

type FormControlOwnProps = React.ComponentPropsWithoutRef<typeof Slot>;
export interface FormControlProps<TValues extends FieldValues>
  extends Omit<FormControlOwnProps, 'defaultValue'>,
    UseControllerProps<TValues> {
  label?: React.ReactNode;
  /**
   * @default false
   * @description Show the character count, if `false` no count will be shown
   */
  charCount?: false | number;
  required?: boolean;
}

function FormControl<TValues extends FieldValues>(props: FormControlProps<TValues>) {
  const { className, style, control, name, label, charCount = false, required, ...slotProps } = props;

  const { fieldState, field } = useController(props);

  const value = useWatch({ control, name });

  const id = React.useId();

  const splitter = React.useMemo(() => new GraphemeSplitter(), []);

  const countGraphemes = React.useCallback(
    (value: string) => {
      return splitter.countGraphemes(value);
    },
    [splitter]
  );

  const labelId = label && id ? `${id}-label` : undefined;
  const errormessageId = label && id ? `${id}-errormessage` : undefined;

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target?.value;
    if (charCount) {
      if (countGraphemes(value) > charCount) return;
    }
    field.onChange(value as any);
  }

  return (
    <div
      className={cn('group relative inline-flex w-full flex-col space-y-1', className)}
      data-invalid={fieldState.invalid}
      style={style}
    >
      {(label || charCount) && (
        <div className="flex items-center">
          {label && (
            <label id={labelId} htmlFor={id} className="text-neutral-rich-gray">
              {label}
              {required ? ' *' : ''}
            </label>
          )}
          {charCount && (
            <span className="ml-auto self-end text-xs text-neutral-medium-gray">
              {countGraphemes(value) || 0} / {charCount}
            </span>
          )}
        </div>
      )}
      <Slot
        id={id}
        aria-invalid={fieldState.invalid}
        aria-errormessage={errormessageId}
        {...slotProps}
        {...field}
        onChange={onChange}
      />
      {fieldState.error && (
        <div id={errormessageId} className="flex items-center gap-1.5 text-sm text-status-error-dark">
          <InfoIcon size={16} />
          <p role="alert">{fieldState.error.message}</p>
        </div>
      )}
    </div>
  );
}

export { Form, FormControl };
