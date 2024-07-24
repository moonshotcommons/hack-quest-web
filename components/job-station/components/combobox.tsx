'use client';

import * as React from 'react';

import { cn } from '@/helper/utils';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react';

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js'
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit'
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js'
  },
  {
    value: 'remix',
    label: 'Remix'
  },
  {
    value: 'astro',
    label: 'Astro'
  }
];

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState('');
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          aria-controls="content"
          className="flex w-96 items-center justify-between rounded-[8px] border border-neutral-light-gray p-3 outline-none"
        >
          {value.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {value.map((val) => (
                <span
                  className="inline-flex items-center rounded-[4px] bg-neutral-off-white px-1 py-px text-sm"
                  key={val}
                >
                  {val}
                  <span className="cursor-pointer pl-1">
                    <XIcon className="h-3.5 w-3.5 text-neutral-medium-gray transition-colors duration-300 hover:text-neutral-off-black" />
                  </span>
                </span>
              ))}
            </div>
          ) : (
            'Select framework...'
          )}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-96 overflow-hidden rounded-[8px] border border-neutral-light-gray p-0">
        <Command>
          <CommandInput
            placeholder="Search framework..."
            className="h-9"
            value={state}
            onValueChange={setState}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                setValue((prev) => {
                  if (prev.includes(state)) {
                    return prev.filter((val) => val !== state);
                  }
                  return [...prev, state];
                });
                setState('');
              }
            }}
          />
          <CommandList>
            <CommandGroup>
              {state && (
                <CommandItem
                  value={state}
                  onSelect={(currentValue) => {
                    setValue((prev) => {
                      if (prev.includes(currentValue)) {
                        return prev.filter((val) => val !== currentValue);
                      }
                      return [...prev, currentValue];
                    });
                    setState('');
                  }}
                >
                  {state}
                </CommandItem>
              )}
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue((prev) => {
                      if (prev.includes(currentValue)) {
                        return prev.filter((val) => val !== currentValue);
                      }
                      return [...prev, currentValue];
                    });
                  }}
                >
                  {framework.label}
                  <CheckIcon
                    className={cn('ml-auto h-4 w-4', value.includes(framework.value) ? 'opacity-100' : 'opacity-0')}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
