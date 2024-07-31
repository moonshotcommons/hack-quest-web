'use client';

import * as React from 'react';
import { useKeyPress } from 'ahooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { GoArrowRight, GoArrowLeft } from 'react-icons/go';
import { createUrl } from '@/helper/utils';

export function Pagination({ total }: { total: number }) {
  const searchParams = useSearchParams();
  const [value, setValue] = React.useState(Number(searchParams.get('page') || 1));
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const currentParams = new URLSearchParams(searchParams.toString());

  const totalPages = Math.ceil(total / 12);

  function onBlur(value: string | number) {
    const page = Number(value);
    if (page > 0 && page <= totalPages) {
      updatePage(page);
    }
  }

  useKeyPress('enter', () => {
    if (inputRef.current) {
      const page = inputRef.current.value;
      onBlur(page);
      inputRef.current.blur();
    }
  });

  function updatePage(page: number) {
    setValue(page);
    if (page === 1) {
      currentParams.delete('page');
    } else {
      currentParams.set('page', String(page));
    }
    const url = createUrl(pathname, currentParams);
    router.replace(url);
  }

  return (
    <div className="flex w-full items-center justify-center gap-6 pb-10 sm:gap-[3.125rem] sm:pb-20">
      <button
        aria-disabled={value <= 1}
        disabled={value <= 1}
        aria-label="Go to previous page"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-neutral-black bg-neutral-black text-neutral-white outline-none transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:bg-transparent disabled:text-neutral-black sm:h-9 sm:w-9"
        onClick={() => updatePage(value > 1 ? value - 1 : 1)}
      >
        <GoArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      <div className="inline-flex items-center text-lg sm:text-2xl">
        <span>Page</span>
        <input
          type="text"
          ref={inputRef}
          value={value}
          onBlur={(e) => onBlur(e.target.value)}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-10 appearance-none bg-transparent text-center underline outline-none"
        />
        <span className="mr-2">of</span>
        <span>{totalPages}</span>
      </div>
      <button
        aria-disabled={value >= totalPages}
        disabled={value >= totalPages}
        aria-label="Go to next page"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-neutral-black bg-neutral-black text-neutral-white outline-none transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:bg-transparent disabled:text-neutral-black sm:h-9 sm:w-9"
        onClick={() => updatePage(value < totalPages ? value + 1 : total)}
      >
        <GoArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    </div>
  );
}
