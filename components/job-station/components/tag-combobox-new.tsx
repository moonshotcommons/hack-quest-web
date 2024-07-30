'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { CheckIcon, ChevronsUpDownIcon, PlusIcon, XIcon } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/helper/utils';
import webApi from '@/service';
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

function Tags({ value, onValueChange }: { value: string[]; onValueChange: (value: string[]) => void }) {
  const [inputVisible, setInputVisible] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [editInputIndex, setEditInputIndex] = React.useState(-1);
  const [editInputValue, setEditInputValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const editInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  React.useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  function handleRemove(removedTag: string) {
    const newTags = value?.filter((tag) => tag !== removedTag);
    onValueChange(newTags);
  }

  function showInput() {
    setInputVisible(true);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleInputConfirm() {
    if (inputValue && !value?.includes(inputValue)) {
      const newTags = [...value, inputValue];
      onValueChange(newTags);
    }
    setInputVisible(false);
    setInputValue('');
  }

  function handleEditInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditInputValue(e.target.value);
  }

  function handleEditInputConfirm() {
    const newValue = [...value];
    newValue[editInputIndex] = editInputValue;
    onValueChange(newValue);
    setEditInputIndex(-1);
    setEditInputValue('');
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {value?.map<React.ReactNode>((item, index) => {
        if (editInputIndex === index) {
          return (
            <input
              ref={editInputRef}
              key={item}
              type="text"
              className="inline-flex w-16 items-center justify-center gap-2 rounded-full border border-neutral-rich-gray px-3.5 py-1.5"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleEditInputConfirm();
                }
              }}
            />
          );
        }

        const isLongSkill = item.length > 20;
        const skillElement = (
          <button
            key={item}
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-rich-gray px-3.5 py-1.5"
          >
            <XIcon size={20} onClick={() => handleRemove(item)} />
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(item);
                  e.preventDefault();
                }
              }}
            >
              {isLongSkill ? `${item.slice(0, 20)}...` : item}
            </span>
          </button>
        );

        return isLongSkill ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>{skillElement}</TooltipTrigger>
              <TooltipContent>
                <p>{item}</p>
                <TooltipArrow />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          skillElement
        );
      })}
      {inputVisible ? (
        <input
          ref={inputRef}
          type="text"
          className="w-16 rounded-full border border-neutral-rich-gray px-3.5 py-1.5 outline-none"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleInputConfirm();
            }
          }}
        />
      ) : (
        <button
          className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-rich-gray px-3.5 py-1.5"
          type="button"
          onClick={showInput}
        >
          <PlusIcon size={20} />
          <span>Add</span>
        </button>
      )}
    </div>
  );
}

export function TagCombobox({ value, onValueChange }: { value: string[]; onValueChange: (value: string[]) => void }) {
  const [open, setOpen] = React.useState(false);

  const { data } = useQuery({
    queryKey: ['tags'],
    staleTime: Infinity,
    queryFn: () => webApi.jobApi.getJobTags()
  });

  return (
    <div className="flex flex-col gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            role="combobox"
            aria-expanded={open}
            aria-controls="content"
            className="flex min-h-[50px] w-full items-center justify-between rounded-[8px] px-3 py-1.5 outline-none ring-1 ring-inset ring-neutral-light-gray transition-all duration-300 aria-expanded:shadow-field-valid aria-expanded:ring-neutral-medium-gray sm:w-96"
          >
            <span>Please select tags</span>
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-96 overflow-hidden rounded-[8px] border border-neutral-light-gray p-0">
          <Command>
            <CommandInput placeholder="Search tags..." className="h-9" />
            <CommandEmpty>No tags found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {data?.map((item, index) => (
                  <CommandItem
                    key={index}
                    value={item}
                    onSelect={(currentValue) => {
                      const newValue = value?.includes(currentValue)
                        ? value?.filter((val) => val !== currentValue)
                        : [...value, currentValue];
                      onValueChange(newValue);
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
      <Tags value={value} onValueChange={onValueChange} />
    </div>
  );
}
