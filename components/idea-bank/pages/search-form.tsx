'use client';

import * as React from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createUrl } from '@/helper/utils';

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [value, setValue] = React.useState('');

  const currentParams = new URLSearchParams(searchParams.toString());

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(value);
    if (value) {
      currentParams.set('keyword', value);
      const url = createUrl(pathname, currentParams);
      router.replace(url);
    }
  }

  function onClear() {
    setValue('');
    currentParams.delete('keyword');
    const url = createUrl(pathname, currentParams);
    router.replace(url);
  }

  return (
    <form
      className="mb-10 mt-5 flex w-full items-center gap-3 rounded-full bg-neutral-white px-3 py-2 transition-colors focus-within:border-neutral-medium-gray sm:mb-0 sm:mt-16 sm:gap-5 sm:border sm:border-neutral-light-gray sm:px-5 sm:py-4"
      onSubmit={onSubmit}
    >
      <label htmlFor="search">
        <SearchIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </label>
      <input
        id="search"
        type="text"
        value={value}
        autoComplete="off"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search for keywords, topics, etc..."
        className="body-s sm:body-l w-full flex-1 outline-none placeholder:text-neutral-medium-gray"
      />
      {value && (
        <button className="outline-none">
          <XIcon className="h-5 w-5 sm:h-6 sm:w-6" onClick={onClear} />
        </button>
      )}
    </form>
  );
}
