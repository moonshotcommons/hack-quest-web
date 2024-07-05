import { cn } from '@/helper/utils';
import React, { ReactElement, useState } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface FormRadioProps<TFieldValues extends FieldValues = FieldValues> {
  children: ReactElement | ReactElement[];
  form: UseFormReturn<TFieldValues, any, undefined>;
  name: Path<TFieldValues>;
  label: string;
  multiple?: boolean;
  disable?: boolean;
  className?: string;
}

export type SelectType = string[] | boolean[] | number[];

const FormRadio = <TFieldValues extends FieldValues = FieldValues>({
  form,
  label,
  name,
  children,
  multiple,
  disable,
  className
}: FormRadioProps<TFieldValues>) => {
  const defaultSelect: string[] =
    multiple && form.getValues(name)?.split ? (form.getValues(name) || '').split(',') : [];
  const [select, setSelect] = useState<SelectType>(defaultSelect);

  let multipleProps = {};

  if (multiple) {
    multipleProps = {
      multiple,
      select,
      setSelect
    };
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <p className="body-m text-left text-neutral-rich-gray">{label}</p>
      <div className={cn('flex w-full justify-between gap-5', className)}>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          return React.cloneElement(child, { name, form, disable, ...multipleProps } as any);
        })}
      </div>
    </div>
  );
};

export default FormRadio;
