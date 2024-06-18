import React, { FC, ReactElement, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface FormRadioProps {
  children: ReactElement | ReactElement[];
  name: string;
  form: UseFormReturn<any, any, undefined>;
  label: string;
  multiple?: boolean;
  disable?: boolean;
}

export type SelectType = string[] | boolean[] | number[];

const FormRadio: FC<FormRadioProps> = ({ form, label, name, children, multiple, disable }) => {
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
      <div className="flex w-full justify-between gap-5">
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          return React.cloneElement(child, { name, form, disable, ...multipleProps } as any);
        })}
      </div>
    </div>
  );
};

export default FormRadio;
