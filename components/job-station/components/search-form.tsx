'use client';

import * as React from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createUrl } from '@/helper/utils';

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const keyword = searchParams.get('keyword');

  const [value, setValue] = React.useState('');

  const currentParams = new URLSearchParams(searchParams.toString());

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (value) {
      currentParams.set('keyword', value);
      const url = createUrl(pathname, currentParams);
      router.replace(url, { scroll: false });
    }
  }

  function onClear() {
    setValue('');
    currentParams.delete('keyword');
    const url = createUrl(pathname, currentParams);
    router.replace(url);
    router.refresh();
  }

  React.useEffect(() => {
    if (keyword) {
      setValue(keyword);
    }
  }, [keyword]);

  return (
    <form
      className="inline-flex w-full items-center gap-3 rounded-full border border-neutral-light-gray bg-neutral-white px-3 transition-colors duration-300 focus-within:border-neutral-medium-gray sm:w-[800px] sm:gap-5 sm:px-5"
      onSubmit={onSubmit}
    >
      <SearchIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      <input
        type="text"
        className="h-[38px] flex-1 bg-transparent outline-none sm:h-[60px]"
        placeholder="Search for positions, companies, keywords, etc..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <button aria-label="Clear" className="ml-auto outline-none">
          <XIcon className="h-5 w-5 sm:h-6 sm:w-6" onClick={onClear} />
        </button>
      )}
    </form>
  );
}
