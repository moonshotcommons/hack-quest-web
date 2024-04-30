import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select } from '@/components/ui/select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface CustomSelectFieldProps<TFieldValues extends FieldValues = FieldValues> {
  form: UseFormReturn<TFieldValues, any, undefined>;
  label: string;
  placeholder: string;
  name: Path<TFieldValues>;
  className?: string;
  onBlur?: () => void;
  items: { label: string; value: any }[];
}

const CustomSelectField = <TFieldValues extends FieldValues = FieldValues>({
  form,
  label,
  name,
  placeholder,
  className,
  items,
  onBlur
}: CustomSelectFieldProps<TFieldValues>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem onChange={() => {}}>
          <FormLabel className="body-m inline-block w-full text-left text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
            {label}
          </FormLabel>
          <Select onValueChange={field.onChange as any} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="!body-m h-[50px] px-3 text-[16px] leading-[160%]">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
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
      )}
    />
  );
};

export default CustomSelectField;
