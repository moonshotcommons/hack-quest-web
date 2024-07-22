'use client';

import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn, isUuid } from '@/helper/utils';
import { isMobile } from 'react-device-detect';
import { ReactNode } from 'react';

interface FormInputProps<TFieldValues extends FieldValues = FieldValues> {
  form: UseFormReturn<TFieldValues, any, undefined>;
  label: ReactNode;
  placeholder: string;
  name: Path<TFieldValues>;
  className?: string;
  onBlur?: () => void;
}

export const FormInput = <TFieldValues extends FieldValues = FieldValues>({
  form,
  label,
  name,
  placeholder,
  className,
  onBlur
}: FormInputProps<TFieldValues>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full text-left" onBlur={onBlur}>
          <FormLabel
            className={cn(
              'font-normal leading-[160%] text-neutral-rich-gray',
              isMobile ? 'body-s text-[14px]' : 'body-m text-[16px]'
            )}
          >
            {label}
          </FormLabel>
          {isUuid(name) && placeholder && (
            <p className="body-s !-mt-[2px] !mb-2.5 text-left text-[14px] text-neutral-medium-gray">{placeholder}</p>
          )}
          <FormControl>
            <Input
              placeholder={!isUuid(name) ? placeholder : ''}
              {...field}
              className={cn(
                '!mt-1 h-[50px] border-neutral-light-gray px-6 py-3 font-normal leading-[160%] text-neutral-medium-gray',
                isMobile ? 'body-s text-[14px]' : 'body-m text-[16px]',
                className
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
