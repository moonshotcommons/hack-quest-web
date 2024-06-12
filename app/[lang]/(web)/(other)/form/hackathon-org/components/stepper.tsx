'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import useResizeObserver from 'use-resize-observer';
import { cn } from '@/helper/utils';
import { CheckIcon } from 'lucide-react';

interface Item<T> {
  value: T;
  label: string;
  component: React.ReactNode;
  completed?: boolean;
}

interface StepperProps<T extends string | number> {
  items: Item<T>[];
  value: T;
  onValueChange: (value: T) => void;
  className?: string;
}

export function Stepper<T extends string | number>({ items, value, onValueChange, className }: StepperProps<T>) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = React.useState({
    measured: false,
    animate: false,
    width: 0,
    left: 0
  });

  useResizeObserver<HTMLDivElement>({
    ref,
    onResize: () => {
      if (ref.current) {
        let parentBounds = ref.current.getBoundingClientRect();
        let activeBounds = ref.current.children[items.findIndex((t) => t.value === value)].getBoundingClientRect();

        setBounds({
          measured: true,
          animate: false,
          width: activeBounds.width,
          left: activeBounds.left - parentBounds.left
        });
      }
    }
  });

  React.useLayoutEffect(() => {
    if (ref.current) {
      let parentBounds = ref.current.getBoundingClientRect();
      let activeBounds = ref.current.children[items.findIndex((t) => t.value === value)].getBoundingClientRect();

      setBounds({
        measured: true,
        animate: true,
        width: activeBounds.width,
        left: activeBounds.left - parentBounds.left
      });
    }
  }, [items, value]);

  const Component = items[items.findIndex((t) => t.value === value)].component;

  return (
    <div className="mt-7">
      <div className={cn('relative', className)}>
        <div className="relative z-[1] flex items-center justify-between" ref={ref}>
          {items.map((item) => (
            <button
              role="tab"
              type="button"
              tabIndex={-1}
              aria-selected={item.value === value}
              data-state={item.value === value ? 'active' : 'inactive'}
              key={item.value}
              onClick={() => onValueChange(item.value)}
              className="flex flex-1 items-center justify-center rounded-t-2xl py-5 text-base leading-[160%] text-neutral-medium-gray outline-none data-[state=active]:font-bold data-[state=active]:text-neutral-off-black"
            >
              {item.label}
              <span
                className={cn(
                  'ml-1.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-neutral-light-gray',
                  {
                    'bg-status-success': item?.completed
                  }
                )}
              >
                {item?.completed && <CheckIcon className="h-2.5 w-2.5 text-neutral-white" />}
              </span>
            </button>
          ))}
        </div>
        {bounds.measured && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-0 rounded-t-2xl bg-neutral-white sm:rounded-t-3xl"
            transition={{
              type: 'spring',
              bounce: 0.2,
              duration: bounds.animate ? 0.6 : 0
            }}
            initial={false}
            animate={{
              left: bounds.left,
              width: bounds.width
            }}
          />
        )}
      </div>
      <div
        role="tabpanel"
        data-first={items[0].value === value}
        data-last={items[items.length - 1].value === value}
        className="w-full rounded-2xl bg-neutral-white p-10 data-[first=true]:rounded-tl-none data-[last=true]:rounded-tr-none"
      >
        {Component}
      </div>
    </div>
  );
}
