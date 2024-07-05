'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import useResizeObserver from 'use-resize-observer';
import { cn } from '@/helper/utils';

const StepperContext = React.createContext<{ value: string | number | undefined }>({ value: '' });

interface StepperProps<T extends string | number> extends React.HTMLAttributes<HTMLDivElement> {
  value?: T;
}

export function Root<T extends string | number>(props: StepperProps<T>) {
  const { value, className, children, ...rest } = props;
  const ref = React.useRef<HTMLDivElement>(null);

  const childrenArray = React.Children.toArray(children) as React.ReactElement[];

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
        const parentBounds = ref.current.getBoundingClientRect();
        const activeBounds =
          ref.current.children[childrenArray.findIndex((t) => t.props?.value === value)].getBoundingClientRect();

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
      const parentBounds = ref.current.getBoundingClientRect();
      const activeBounds =
        ref.current.children[childrenArray.findIndex((t) => t.props?.value === value)].getBoundingClientRect();

      setBounds({
        measured: true,
        animate: true,
        width: activeBounds.width,
        left: activeBounds.left - parentBounds.left
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <StepperContext.Provider value={{ value }}>
      <div className={cn('relative mt-7', className)} {...rest}>
        <div className="relative z-[1] flex items-center justify-between" ref={ref}>
          {children}
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
    </StepperContext.Provider>
  );
}

export interface StepperItemProps<T extends string | number> extends React.HTMLAttributes<HTMLButtonElement> {
  value?: T;
  completed?: boolean;
}

export function Item<T extends string | number>(props: StepperItemProps<T>) {
  const { value, completed = false, className, onClick, children, ...rest } = props;

  const stepperContext = React.useContext(StepperContext);
  const isActive = stepperContext.value === value;

  return (
    <button
      role="tab"
      type="button"
      tabIndex={-1}
      aria-selected={isActive}
      data-state={isActive ? 'active' : 'inactive'}
      onClick={onClick}
      className="flex flex-1 items-center justify-center rounded-t-2xl py-5 text-base leading-[160%] text-neutral-medium-gray outline-none data-[state=active]:font-bold data-[state=active]:text-neutral-off-black"
    >
      {children}
      <span
        className={cn('ml-1.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-neutral-light-gray', {
          'bg-status-success': completed
        })}
      >
        {completed && <CheckIcon className="h-2.5 w-2.5 text-neutral-white" />}
      </span>
    </button>
  );
}
