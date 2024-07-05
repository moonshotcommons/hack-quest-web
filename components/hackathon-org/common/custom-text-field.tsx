import * as React from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { XIcon } from 'lucide-react';
import { cn } from '@/helper/utils';

export function CustomTextField<T extends FieldValues>({
  name,
  register,
  placeholder,
  type = 'text',
  error = '',
  required = false,
  valueAsNumber = false,
  index = 1,
  remove
}: {
  name: Path<T>;
  register: UseFormRegister<T>;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  valueAsNumber?: boolean;
  required?: boolean;
  error?: string;
  index?: number;
  remove?: (index: number) => void;
}) {
  return (
    <section
      className={cn(
        'group relative flex items-center gap-5 rounded-[10px] border border-neutral-light-gray px-6 py-5',
        {
          'border-status-error-dark': error
        }
      )}
    >
      <span className="body-m inline-flex h-8 w-8 items-center justify-center rounded-[4px] border-2 border-neutral-light-gray text-neutral-off-black">
        {index + 1}
      </span>
      <input
        type={type}
        className="flex-1 outline-none"
        {...register(name, { required, valueAsNumber })}
        autoComplete="off"
        placeholder={placeholder}
      />
      <button
        type="button"
        aria-label="Remove option"
        onClick={() => remove?.(index)}
        className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-status-error opacity-0 outline-none transition-opacity group-hover:opacity-100"
      >
        <XIcon size={20} className="text-neutral-white" />
      </button>
    </section>
  );
}
