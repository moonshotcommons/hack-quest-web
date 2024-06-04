'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import useResizeObserver from 'use-resize-observer';
import { cn } from '@/helper/utils';

interface Tab {
  value: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function CardTabs({ tabs, value, onValueChange, className }: TabsProps) {
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
        let activeBounds = ref.current.children[tabs.findIndex((t) => t.value === value)].getBoundingClientRect();

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
      let activeBounds = ref.current.children[tabs.findIndex((t) => t.value === value)].getBoundingClientRect();

      setBounds({
        measured: true,
        animate: true,
        width: activeBounds.width,
        left: activeBounds.left - parentBounds.left
      });
    }
  }, [tabs, value]);

  return (
    <div className={cn('relative', className)}>
      <div className="relative z-[1] flex items-center justify-between" ref={ref}>
        {tabs.map((tab) => (
          <button
            role="tab"
            type="button"
            tabIndex={-1}
            aria-selected={tab.value === value}
            data-state={tab.value === value ? 'active' : 'inactive'}
            key={tab.value}
            onClick={() => onValueChange(tab.value)}
            className="flex-1 rounded-t-2xl px-6 py-3 text-base leading-[160%] text-neutral-medium-gray outline-none data-[state=active]:font-bold data-[state=active]:text-neutral-off-black sm:rounded-t-3xl sm:px-10 sm:py-5 sm:text-lg"
          >
            {tab.label}
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
  );
}
