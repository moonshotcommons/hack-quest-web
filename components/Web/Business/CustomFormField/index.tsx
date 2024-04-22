'use client';

import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/helper/utils';

interface FormFieldProps<TFieldValues extends FieldValues = FieldValues> {
  form: UseFormReturn<TFieldValues, any, undefined>;
  label: string;
  placeholder: string;
  name: Path<TFieldValues>;
  className?: string;
}

const CustomFormField = <TFieldValues extends FieldValues = FieldValues>({
  form,
  label,
  name,
  placeholder,
  className
}: FormFieldProps<TFieldValues>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full text-left">
          <FormLabel className="body-m text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
            {label}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className={cn(
                'body-m !mt-1 h-[50px] border-neutral-light-gray px-6 py-3 text-[16px] font-normal leading-[160%] text-neutral-medium-gray',
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

export default CustomFormField;
