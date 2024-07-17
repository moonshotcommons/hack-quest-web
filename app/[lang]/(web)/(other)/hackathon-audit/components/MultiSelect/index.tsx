import * as React from 'react';
import { cn } from '@/helper/utils';
import { Popover, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

export interface MultiSelectOption {
  label: string;
  value: string;
  disable?: boolean;
}
export function MultiSelect({
  name,
  options,
  value,
  type = 'select',
  onSelect
}: {
  name: string;
  options: MultiSelectOption[];
  value: string[];
  type: 'select' | 'checkbox';
  onSelect: (value: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelection = (option: MultiSelectOption) => {
    const newSelection = selected.includes(option.value)
      ? selected.filter((item) => item !== option.value)
      : [...selected, option.value];
    onSelect(newSelection);
  };

  const isBgYellow = React.useMemo(() => {
    return selected.length > options?.filter((v) => v.disable)?.length;
  }, [selected, options]);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={cn(
              'group inline-flex h-11 items-center gap-2.5 rounded-full border border-neutral-off-black bg-neutral-white px-4 py-2 outline-none',
              {
                'bg-yellow-light': isBgYellow
              }
            )}
          >
            <span className="whitespace-nowrap">{name}</span>
            <ChevronDownIcon size={20} className={cn('transition-transform', { 'rotate-180': open })} />
          </Popover.Button>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-1 min-w-full  -translate-x-1/2 transform">
              <div className="max-h-96 overflow-auto rounded-[0.625rem] bg-neutral-white ring-1 ring-neutral-light-gray">
                <ul className="flex flex-col">
                  {options?.map((option) => (
                    <li
                      className={`flex  items-center justify-between gap-[20px] whitespace-nowrap px-3 py-2 ${option.disable ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      key={option.value}
                      onClick={() => {
                        if (option.disable) return;
                        toggleSelection(option);
                      }}
                    >
                      {option.label} {type === 'select' && selected.includes(option.value) && <CheckIcon size={20} />}
                      {type === 'checkbox' && (
                        <Checkbox checked={selected.includes(option.value)} disabled={option.disable} />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
