import { cn } from '@/helper/utils';
import React, { FC, ReactElement, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface FormRadioProps {
  children: ReactElement | ReactElement[];
  name: string;
  form: UseFormReturn<any, any, undefined>;
  label: string;
  multiple?: boolean;
  disable?: boolean;
  className?: string;
  description?: string;
}

export type SelectType = string[] | boolean[] | number[];

export const FormRadio: FC<FormRadioProps> = ({
  form,
  label,
  name,
  children,
  multiple,
  disable,
  className,
  description
}) => {
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
      <div className="">
        <p className="body-m text-left leading-[160%] text-neutral-rich-gray">{label}</p>
        {description && <p className="body-m leading-[160%] text-neutral-medium-gray">{description}</p>}
      </div>
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
