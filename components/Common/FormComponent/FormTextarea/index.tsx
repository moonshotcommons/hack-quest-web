import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/helper/utils';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface FormTextareaProps<TFieldValues extends FieldValues = FieldValues> {
  form: UseFormReturn<TFieldValues, any, undefined>;
  name: Path<TFieldValues>;
  label: string;
  placeholder: string;
  maxField: number;
  className?: string;
}

export const FormTextarea = <TFieldValues extends FieldValues = FieldValues>({
  form,
  name,
  label,
  placeholder,
  maxField,
  className
}: FormTextareaProps<TFieldValues>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full text-left">
          <div className="flex w-full justify-between">
            <FormLabel className="body-m text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
              {label}
            </FormLabel>
            <span className="caption-14pt text-neutral-rich-gray">
              <span className={(form.watch(name)?.length || 0) > maxField ? 'text-status-error' : ''}>
                {form.watch(name)?.length || 0}
              </span>
              /{maxField}
            </span>
          </div>
          <FormControl>
            <Textarea
              authHeight={false}
              placeholder={placeholder}
              {...field}
              className={cn(
                'body-m h-[128px] border-neutral-light-gray px-6 py-3 text-[16px] font-normal leading-[160%] text-neutral-medium-gray',
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

export default FormTextarea;
