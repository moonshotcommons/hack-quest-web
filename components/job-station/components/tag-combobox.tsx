'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/helper/utils';
import webApi from '@/service';

export function TagCombobox({ value, onValueChange }: { value: string[]; onValueChange: (value: string) => void }) {
  const [open, setOpen] = React.useState(false);
  const [tag, setTag] = React.useState('');

  const { data } = useQuery({
    queryKey: ['tags'],
    staleTime: Infinity,
    queryFn: () => webApi.jobApi.getJobTags()
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          aria-controls="content"
          className="flex min-h-[50px] w-full items-center justify-between rounded-[8px] px-3 py-1.5 outline-none ring-1 ring-inset ring-neutral-light-gray transition-all duration-300 aria-expanded:shadow-field-valid aria-expanded:ring-neutral-medium-gray sm:w-96"
        >
          {value.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {value.map((val) => (
                <span
                  className="inline-flex items-center rounded-[4px] bg-neutral-off-white px-1 py-px text-sm"
                  key={val}
                >
                  {val}
                  <span
                    className="cursor-pointer pl-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      onValueChange(val);
                    }}
                  >
                    <XIcon className="h-3.5 w-3.5 text-neutral-medium-gray transition-colors duration-300 hover:text-neutral-off-black" />
                  </span>
                </span>
              ))}
            </div>
          ) : (
            'Add or select a tag...'
          )}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-96 overflow-hidden rounded-[8px] border border-neutral-light-gray p-0">
        <Command>
          <CommandInput
            placeholder="Search tags..."
            className="h-9"
            value={tag}
            onValueChange={setTag}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && tag) {
                e.preventDefault();
                onValueChange(tag);
                setTag('');
              }
            }}
          />
          <CommandList>
            <CommandGroup>
              {tag && (
                <CommandItem
                  value={tag}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue);
                    setTag('');
                  }}
                >
                  {tag}
                </CommandItem>
              )}
              {data?.map((item, index) => (
                <CommandItem
                  key={index}
                  value={item}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue);
                  }}
                >
                  {item}
                  <CheckIcon className={cn('ml-auto h-4 w-4', value.includes(item) ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
