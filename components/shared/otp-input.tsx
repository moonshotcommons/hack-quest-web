'use client';

import * as React from 'react';
import { cn } from '@/helper/utils';

const allowedCharactersValues = ['alpha', 'numeric', 'alphanumeric'] as const;

export interface OTPInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'value'> {
  allowedCharacters?: (typeof allowedCharactersValues)[number];
  autoFocus?: boolean;
  containerClassName?: string;
  disabled?: boolean;
  inputClassName?: string;
  isPassword?: boolean;
  length?: number;
  placeholder?: string;
  onValueChange?: (value: string) => void;
}

type InputMode = 'text' | 'numeric';

type InputType = 'text' | 'tel' | 'password';

type InputProps = {
  type: InputType;
  inputMode: InputMode;
  pattern: string;
  min?: string;
  max?: string;
};

export type OTPInputRef = {
  focus: () => void;
  clear: () => void;
};

const propsMap: { [key: string]: InputProps } = {
  alpha: {
    type: 'text',
    inputMode: 'text',
    pattern: '[a-zA-Z]{1}'
  },
  alphanumeric: {
    type: 'text',
    inputMode: 'text',
    pattern: '[a-zA-Z0-9]{1}'
  },
  numeric: {
    type: 'tel',
    inputMode: 'numeric',
    pattern: '[0-9]{1}',
    min: '0',
    max: '9'
  }
};

const OTPInput = React.forwardRef<OTPInputRef, OTPInputProps>(
  (
    {
      allowedCharacters = 'numeric',
      autoFocus = true,
      containerClassName,
      disabled,
      inputClassName,
      isPassword = false,
      length = 6,
      placeholder,
      onValueChange,
      ...props
    },
    ref
  ) => {
    if (isNaN(length) || length < 1) {
      throw new Error('Length should be a number and greater than 0');
    }

    if (!allowedCharactersValues.some((value) => value === allowedCharacters)) {
      throw new Error('Invalid value for allowedCharacters. Use alpha, numeric, or alphanumeric');
    }

    const inputsRef = React.useRef<Array<HTMLInputElement>>([]);
    const inputProps = propsMap[allowedCharacters];
    const inputType = isPassword ? 'password' : 'text';

    function onInputChange() {
      const value = inputsRef.current.map((input) => input.value).join('');
      onValueChange && onValueChange(value);
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
      const {
        target: { value, nextElementSibling }
      } = e;
      if (value.length > 1) {
        e.target.value = value.charAt(0);
        if (nextElementSibling !== null) {
          (nextElementSibling as HTMLInputElement).focus();
        }
      } else {
        if (value.match(inputProps.pattern)) {
          if (nextElementSibling !== null) {
            (nextElementSibling as HTMLInputElement).focus();
          }
        } else {
          e.target.value = '';
        }
      }
      onInputChange();
    }

    function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      const { key } = e;
      const target = e.target as HTMLInputElement;
      if (key === 'Backspace') {
        if (target.value === '') {
          if (target.previousElementSibling !== null) {
            const t = target.previousElementSibling as HTMLInputElement;
            t.value = '';
            t.focus();
            e.preventDefault();
          }
        } else {
          target.value = '';
        }
        onInputChange();
      }
    }

    function onFocus(e: React.FocusEvent<HTMLInputElement>) {
      e.target.select();
    }

    function onPaste(e: React.ClipboardEvent<HTMLInputElement>) {
      const pastedValue = e.clipboardData.getData('Text');
      let currentInput = 0;
      for (let i = 0; i < pastedValue.length; i++) {
        const pastedCharacter = pastedValue.charAt(i);
        const currentValue = inputsRef.current[currentInput].value;
        if (pastedCharacter.match(inputProps.pattern)) {
          if (!currentValue) {
            inputsRef.current[currentInput].value = pastedCharacter;
            if (inputsRef.current[currentInput].nextElementSibling !== null) {
              (inputsRef.current[currentInput].nextElementSibling as HTMLInputElement).focus();
              currentInput++;
            }
          }
        }
      }
      onInputChange();
      e.preventDefault();
    }

    React.useEffect(() => {
      if (autoFocus) {
        inputsRef.current[0].focus();
      }
    }, [autoFocus]);

    React.useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputsRef.current) {
          inputsRef.current[0].focus();
        }
      },
      clear: () => {
        if (inputsRef.current) {
          for (let i = 0; i < inputsRef.current.length; i++) {
            inputsRef.current[i].value = '';
          }
          inputsRef.current[0].focus();
        }
        onInputChange();
      }
    }));

    const inputs = [];
    for (let i = 0; i < length; i++) {
      inputs.push(
        <input
          key={i}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={1}
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onPaste={onPaste}
          ref={(element: HTMLInputElement) => {
            inputsRef.current[i] = element;
          }}
          className={cn(
            'h-[3.75rem] w-10 self-center justify-self-center rounded-[0.25rem] text-center text-2xl text-neutral-black outline-none ring-1 ring-neutral-medium-gray transition-all duration-200 focus:appearance-none focus:ring-yellow-dark group-aria-[invalid=true]:ring-status-error',
            inputClassName
          )}
          {...inputProps}
          type={inputType}
        />
      );
    }

    return (
      <div className={cn('group flex w-full items-center justify-center gap-2', containerClassName)} {...props}>
        {inputs}
      </div>
    );
  }
);

OTPInput.displayName = 'OTPInput';

export { OTPInput };
