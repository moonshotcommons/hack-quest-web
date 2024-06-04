'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { GoArrowRight, GoArrowLeft } from 'react-icons/go';

export function Pagination() {
  const searchParams = useSearchParams();
  const [value, setValue] = React.useState(1);
  const currentPage = searchParams.get('page') || 1;

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {}

  return (
    <div className="flex w-full items-center justify-center sm:mt-20 sm:gap-[3.125rem] sm:pb-20">
      <button
        aria-label="Go to previous page"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-black outline-none"
      >
        <GoArrowLeft size={24} />
      </button>
      <div className="inline-flex items-center text-2xl">
        <span>Page</span>
        <input
          type="text"
          value={value}
          onBlur={onBlur}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-10 appearance-none bg-transparent text-center underline outline-none"
        />
        <span className="mr-2">of</span>
        <span>100</span>
      </div>
      <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-black outline-none">
        <GoArrowRight size={24} />
      </button>
    </div>
  );
}
