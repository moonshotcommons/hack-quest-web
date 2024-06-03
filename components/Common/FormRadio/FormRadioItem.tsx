import { cn } from '@/helper/utils';

import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form';

interface FormRadioItemProps<TFieldValues extends FieldValues = FieldValues> {
  form?: UseFormReturn<TFieldValues, any, undefined>;
  name?: Path<TFieldValues>;
  value: PathValue<TFieldValues, Path<TFieldValues>>;
  label: string;
  multiple?: boolean;
  select?: any[];
  disable?: boolean;
  setSelect?: (v: any[]) => void;
}

const FormRadioItem = <TFieldValues extends FieldValues = FieldValues>({
  form,
  name,
  value,
  label,
  select = [] as any[],
  setSelect = () => {},
  multiple = false,
  disable = false
}: FormRadioItemProps<TFieldValues>) => {
  if (!form || !name) {
    console.error('FormRadioItem 组件必须包裹FormRadio组件');
    return null;
  }
  return (
    <div
      onClick={() => {
        if (disable) return;
        if (multiple) {
          let newSelect = [...select!];
          if (select.includes(value)) {
            newSelect = select.filter((t) => t !== value);
            form.setValue(name, newSelect.join(',') as PathValue<TFieldValues, Path<TFieldValues>>);
          } else {
            newSelect = select.concat(value);
            form.setValue(name, newSelect.join(',') as PathValue<TFieldValues, Path<TFieldValues>>);
          }
          setSelect(newSelect);
        } else {
          form.setValue(name, value);
          form.trigger(name);
        }
      }}
      className={cn(
        `body-m flex h-[50px]  w-full items-center justify-center gap-3 rounded-[8px] border-[3px] border-neutral-off-white bg-neutral-white px-5 py-3`,
        (multiple ? select.includes(value) : form.watch(name) === value)
          ? 'border-yellow-dark bg-yellow-extra-light shadow-[0px_0px_8px_0px_rgba(249,216,28,0.30)]'
          : '',
        disable ? 'cursor-not-allowed' : 'cursor-pointer'
      )}
    >
      <span>{label}</span>
    </div>
  );
};

export default FormRadioItem;
