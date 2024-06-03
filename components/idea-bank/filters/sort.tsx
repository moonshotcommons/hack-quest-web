'use client';

import * as React from 'react';
import { useDebounceFn } from 'ahooks';
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SortIcon } from '@/components/Common/Icon/Sort';
import { createUrl } from '@/helper/utils';
import { animateProps } from './dropdown';

const options = ['Creation Time', 'Upvote'];

export function SortByFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

  const selectedOption = currentParams.get('sortBy');

  const [hovered, setHovered] = React.useState(false);
  const [selected, setSelected] = React.useState(selectedOption);

  const { run: onMouseLeave } = useDebounceFn(
    () => {
      setHovered(false);
    },
    { wait: 100 }
  );

  function toggleSelection(option: string) {
    const newSelection = selected === option ? '' : option;

    setSelected(newSelection);

    if (newSelection) {
      currentParams.set('sortBy', newSelection);
    } else {
      currentParams.delete('sortBy');
    }

    const url = createUrl(pathname, currentParams);

    setTimeout(() => {
      router.replace(url, { scroll: false });
    }, 500);
  }

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => {
        onMouseLeave.cancel();
        setHovered(true);
      }}
      onMouseLeave={onMouseLeave}
    >
      <button
        data-state={hovered ? 'open' : 'closed'}
        className="group inline-flex items-center justify-center gap-2 rounded-full py-1.5 pr-0 text-neutral-off-black data-[state=open]:bg-neutral-off-white sm:px-4"
      >
        <SortIcon className="h-5 w-5" />
        <span className="sm:body-l body-s whitespace-nowrap capitalize">Sort By</span>
      </button>
      {hovered && (
        <motion.ul
          {...animateProps}
          className="absolute -bottom-[0.1875rem] right-0 z-50 flex w-40 flex-col rounded-[0.625rem] border border-neutral-light-gray bg-neutral-white px-0 py-2"
        >
          {options?.map((option) => (
            <li
              key={option}
              className="flex cursor-pointer items-center justify-between whitespace-nowrap px-3 py-2 text-neutral-off-black transition-colors hover:bg-neutral-off-white"
              onClick={() => toggleSelection(option)}
              data-selected={selected === option}
            >
              <span className="body-m">{option}</span>
              {selected === option && <CheckIcon className="ml-2 h-5 w-5" />}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
