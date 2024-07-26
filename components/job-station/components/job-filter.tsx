'use client';

import * as React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckboxTag, CheckboxTagItem } from './checkbox-tag';
import { workModes as WORK_MODES, workTypes as WORK_TYPES } from '../validations';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createUrl } from '@/helper/utils';

function JobType() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentParams = new URLSearchParams(searchParams.toString());
  const workTypes = currentParams.getAll('workTypes');

  function onCheckedChange(value: string) {
    const newSelection = workTypes?.includes(value)
      ? workTypes?.filter((item) => item !== value)
      : [...(workTypes || []), value];

    currentParams.delete('workTypes');
    newSelection.forEach((value) => currentParams.append('workTypes', value));

    const url = createUrl(pathname, currentParams);
    router.replace(url, { scroll: false });
  }

  return (
    <div className="flex flex-col space-y-4">
      {WORK_TYPES.map((item) => (
        <div className="flex items-center space-x-2.5" key={item.id}>
          <Checkbox
            size="large"
            id={item.id}
            checked={workTypes?.includes(item.id)}
            onCheckedChange={() => onCheckedChange(item.id)}
          />
          <label
            htmlFor={item.id}
            className="text-sm leading-none text-neutral-medium-gray peer-aria-checked:text-neutral-black"
          >
            {item.label}
          </label>
        </div>
      ))}
    </div>
  );
}

function JobLocation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentParams = new URLSearchParams(searchParams.toString());
  const workModes = currentParams.getAll('workModes');

  function onCheckedChange(value: string) {
    const newSelection = workModes?.includes(value)
      ? workModes?.filter((item) => item !== value)
      : [...(workModes || []), value];

    currentParams.delete('workModes');
    newSelection.forEach((value) => currentParams.append('workModes', value));

    const url = createUrl(pathname, currentParams);
    router.replace(url, { scroll: false });
  }
  return (
    <div className="flex flex-col space-y-4">
      {WORK_MODES.map((item) => (
        <div className="flex items-center space-x-2.5" key={item.id}>
          <Checkbox
            size="large"
            id={item.id}
            checked={workModes?.includes(item.id)}
            onCheckedChange={() => onCheckedChange(item.id)}
          />
          <label
            htmlFor={item.id}
            className="text-sm leading-none text-neutral-medium-gray peer-aria-checked:text-neutral-black"
          >
            {item.label}
          </label>
        </div>
      ))}
    </div>
  );
}

function JobKeyword() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <CheckboxTag>
      <CheckboxTagItem value="Smart Contract">Smart Contract</CheckboxTagItem>
      <CheckboxTagItem value="Rust">Rust</CheckboxTagItem>
      <CheckboxTagItem value="Solidity">Solidity</CheckboxTagItem>
      <CheckboxTagItem value="NFT">NFT</CheckboxTagItem>
      <CheckboxTagItem value="Solana">Solana</CheckboxTagItem>
    </CheckboxTag>
  );
}

export function JobFilter() {
  return (
    <div className="hidden w-full self-start rounded-2xl bg-neutral-white sm:block sm:p-6">
      <h2 className="mb-4 font-next-book-bold text-lg font-bold">Job Type</h2>
      <JobType />
      <h2 className="mb-4 mt-12 font-next-book-bold text-lg font-bold">Job Location</h2>
      <JobLocation />
      <h2 className="mb-4 mt-12 font-next-book-bold text-lg font-bold">Keyword</h2>
      <JobKeyword />
    </div>
  );
}
