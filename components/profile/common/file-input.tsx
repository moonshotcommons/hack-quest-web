import { EditIcon } from '@/components/ui/icons/edit';
import { cn } from '@/helper/utils';
import * as React from 'react';

export function FileInput({ className, onFileChange }: { className?: string; onFileChange?: (url: string) => void }) {
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        if (event.target?.result) {
          const result = event.target?.result;
          if (typeof result === 'string') {
            onFileChange?.(result);
          }
        }
      };
      event.target.value = '';
    }
  }
  return (
    <label className={cn('inline-flex cursor-pointer items-center justify-center text-neutral-white', className)}>
      <input type="file" accept="image/*" className="hidden" onChange={onChange} />
      <EditIcon className="h-6 w-6" />
    </label>
  );
}
