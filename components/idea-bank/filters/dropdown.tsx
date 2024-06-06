'use client';

import * as React from 'react';
import { useDebounceFn } from 'ahooks';
import { motion, type MotionProps } from 'framer-motion';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { useToggle } from '@/hooks/utils/use-toggle';
import { cn } from '@/helper/utils';

export const animateProps: MotionProps = {
  initial: { scaleY: 0, opacity: 0, translateY: '95%' },
  animate: {
    opacity: 1,
    scaleY: 1,
    translateY: '100%',
    position: 'absolute'
  },
  exit: {
    opacity: 1,
    scaleY: 1,
    translateY: '100%',
    position: 'absolute'
  },
  transition: { duration: 0.5, type: 'spring' },
  style: { originY: 0 }
};

type Option = {
  label: string;
  value: string;
};

export function DropdownFilter({
  label,
  values,
  onValueChange,
  options,
  align = 'start'
}: {
  label: string;
  values: string[];
  onValueChange: (value: string) => void;
  options?: Option[];
  align?: 'start' | 'end';
}) {
  const [hovered, toggle] = useToggle(false);

  const { run: onMouseLeave } = useDebounceFn(
    () => {
      toggle(false);
    },
    { wait: 100 }
  );

  return (
    <div
      className="relative hidden sm:inline-flex"
      onMouseEnter={() => {
        onMouseLeave.cancel();
        toggle(true);
      }}
      onMouseLeave={onMouseLeave}
    >
      <button
        data-state={hovered ? 'open' : 'closed'}
        className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-neutral-off-black px-4 py-1.5 text-neutral-off-black data-[state=open]:bg-yellow-light"
      >
        <span className="body-l whitespace-nowrap capitalize">{label}</span>
        <ChevronDownIcon className="h-4 w-4 transition-all group-data-[state=open]:rotate-180" />
      </button>
      {hovered && (
        <motion.ul
          {...animateProps}
          className={cn(
            'absolute -bottom-[0.1875rem] z-50 flex max-h-64 w-40 flex-col overflow-y-auto rounded-[0.625rem] border border-neutral-light-gray bg-neutral-white px-0 py-2',
            {
              'left-0': align === 'start',
              'right-0': align === 'end'
            }
          )}
        >
          {options?.map((option) => (
            <li
              key={option.value}
              className="flex cursor-pointer items-center justify-between whitespace-nowrap px-3 py-2 text-neutral-off-black hover:bg-neutral-off-white"
              onClick={() => onValueChange(option.value)}
              data-selected={values.includes(option.value)}
            >
              <span className="body-m">{option.label}</span>
              {values.includes(option.value) && <CheckIcon className="ml-2 h-4 w-4" />}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
