'use client';

import * as React from 'react';
import { useDebounceFn } from 'ahooks';
import { motion, type MotionProps } from 'framer-motion';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { useToggle } from '@/hooks/utils/use-toggle';

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

export function DropdownFilter({
  label,
  values,
  options,
  onValueChange
}: {
  label: string;
  values: string[];
  options?: string[];
  onValueChange: (value: string) => void;
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
          className="absolute -bottom-[0.1875rem] left-0 z-50 flex w-40 flex-col rounded-[0.625rem] border border-neutral-light-gray bg-neutral-white px-0 py-2"
        >
          {options?.map((option) => (
            <li
              key={option}
              className="flex cursor-pointer items-center justify-between whitespace-nowrap px-3 py-2 text-neutral-off-black hover:bg-neutral-off-white"
              onClick={() => onValueChange(option)}
              data-selected={values.includes(option)}
            >
              <span className="body-m">{option}</span>
              {values.includes(option) && <CheckIcon className="ml-2 h-4 w-4" />}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
