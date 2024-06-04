'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import useResizeObserver from 'use-resize-observer';
import { cn } from '@/helper/utils';

interface Tab {
  value: string;
  label: string;
}

interface LineTabsProps {
  tabs: Tab[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  tablistClassName?: string;
  labelClassName?: string;
}

export function LineTabs({ tabs, value, onValueChange, className, tablistClassName, labelClassName }: LineTabsProps) {
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

  React.useEffect(() => {
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
      <div role="tablist" className={cn('flex gap-[1.875rem]', tablistClassName)} ref={ref}>
        {tabs.map((tab) => (
          <button
            role="tab"
            type="button"
            tabIndex={-1}
            aria-selected={tab.value === value}
            data-state={tab.value === value ? 'active' : 'inactive'}
            key={tab.value}
            onClick={() => onValueChange(tab.value)}
            className={cn(
              'text-lg leading-[160%] text-neutral-off-black outline-none data-[state=active]:font-bold',
              labelClassName
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {bounds.measured && (
        <motion.div
          className="pointer-events-none absolute -bottom-1 h-[0.1875rem] bg-yellow-dark"
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
