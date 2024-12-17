import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select } from '@/components/ui/select';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { useEffect, useState } from 'react';

interface FormSelectProps<TFieldValues extends FieldValues = FieldValues> {
  form: UseFormReturn<TFieldValues, any, undefined>;
  label: string;
  placeholder: string;
  name: Path<TFieldValues>;
  className?: string;
  onBlur?: () => void;
  items: { label: string; value: any }[];
}

export const FormSelect = <TFieldValues extends FieldValues = FieldValues>({
  form,
  label,
  name,
  placeholder,
  className,
  items,
  onBlur
}: FormSelectProps<TFieldValues>) => {
  const [defaultValue, setDefaultValue] = useState();

  useEffect(() => {
    setTimeout(() => {
      const defaultValue = form.getValues(name);
      if (defaultValue) {
        setDefaultValue(defaultValue);
        form.setValue(name, defaultValue);
        form.trigger(name);
      }
    }, 300);
  }, [form, name]);

  console.log(name);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem onChange={() => {}}>
            <FormLabel className="body-m inline-block w-full text-left text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
              {label}
            </FormLabel>
            <Select onValueChange={field.onChange as any}>
              {/* <FormControl> */}
              <SelectTrigger className="!body-m h-[50px] bg-neutral-off-white px-3 text-[16px] leading-[160%] focus:bg-neutral-white">
                <SelectValue
                  placeholder={defaultValue ? items.find((item) => item.value === defaultValue)?.label : placeholder}
                />
              </SelectTrigger>
              {/* </FormControl> */}
              <SelectContent className="">
                {items.map((item) => {
                  return (
                    <SelectItem key={item.value} className="body-m text-[16px] leading-[160%]" value={item.value}>
                      {item.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <FormMessage className="w-full text-left" />
          </FormItem>
        );
      }}
    />
  );
};

export default FormSelect;
