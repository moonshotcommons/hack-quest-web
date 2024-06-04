import * as React from 'react';
import { cn } from '@/helper/utils';

////////////////////////
// TODO: orientation
////////////////////////

export interface StepperContextValue {
  activeStep: number;
  orientation: 'horizontal' | 'vertical';
}

const StepperContext = React.createContext<StepperContextValue>({
  activeStep: 0,
  orientation: 'horizontal'
});

export function useStepperContext() {
  return React.useContext(StepperContext);
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  activeStep?: number;
  orientation?: 'horizontal' | 'vertical';
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ activeStep = 0, orientation = 'horizontal', children, className, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);

    const steps = childrenArray.map((child, index) => {
      return React.cloneElement(child as React.ReactElement, {
        index,
        last: index + 1 === childrenArray.length,
        // @ts-ignore
        ...child.props
      });
    });

    const contextValue = React.useMemo(() => ({ activeStep, orientation }), [activeStep, orientation]);
    return (
      <StepperContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-orientation={orientation}
          className={cn('group flex items-start gap-1', className)}
          {...props}
        >
          {steps}
        </div>
      </StepperContext.Provider>
    );
  }
);

Stepper.displayName = 'Stepper';

const StepConnector = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useStepperContext();
    const { active, completed } = useStepContext();
    return (
      <div
        ref={ref}
        className="absolute left-[calc(-50%+20px)] right-[calc(50%+20px)] top-1 flex-auto sm:left-[calc(-50%+43.5px)] sm:right-[calc(50%+43.5px)] sm:top-1.5"
        {...props}
      >
        <span
          className={cn('block h-[0.1875rem] w-full rounded-full bg-neutral-light-gray', {
            'bg-yellow-dark': active || completed
          })}
        ></span>
      </div>
    );
  }
);

StepConnector.displayName = 'StepConnector';

export interface StepContextValue {
  index: number;
  last: boolean;
  active: boolean;
  completed: boolean;
}

const StepContext = React.createContext<StepContextValue>({
  index: 0,
  last: false,
  active: false,
  completed: false
});

export function useStepContext() {
  return React.useContext(StepContext);
}

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: number;
  last?: boolean;
  active?: boolean;
  completed?: boolean;
}

const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ index = 0, last = false, active: activeProp, completed: completedProp, children, className, ...props }, ref) => {
    const { activeStep, orientation } = useStepperContext();

    let [active = false, completed = false] = [activeProp, completedProp];

    if (activeStep === index) {
      active = activeProp !== undefined ? activeProp : true;
    } else if (activeStep > index) {
      completed = completedProp !== undefined ? completedProp : true;
    }

    const contextValue = React.useMemo(() => ({ index, last, active, completed }), [index, last, active, completed]);

    return (
      <StepContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-orientation={orientation}
          data-state={active ? 'active' : 'inactive'}
          className={cn('relative flex-1', className)}
          {...props}
        >
          {index !== 0 ? <StepConnector /> : null}
          {children}
        </div>
      </StepContext.Provider>
    );
  }
);

Step.displayName = 'Step';

const StepLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { orientation } = useStepperContext();
    const { active, completed } = useStepContext();
    return (
      <div ref={ref} className={cn('group flex flex-col items-center', className)} {...props}>
        <span
          className={cn(
            'relative h-3 w-3 rounded-full border border-neutral-light-gray bg-neutral-off-white sm:h-4 sm:w-4',
            {
              'border-yellow-extra-light bg-yellow-dark': active,
              'border-transparent bg-yellow-dark': completed
            }
          )}
        >
          <span
            className={cn(
              'absolute left-1/2 top-1/2 hidden h-[1.125rem] w-[1.125rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-neutral-rich-gray sm:h-6 sm:w-6',
              {
                block: active && !completed
              }
            )}
          />
        </span>
        <span
          className={cn('mt-2 text-center text-xs font-light text-neutral-medium-gray', {
            'text-neutral-off-black': active || completed
          })}
        >
          {children}
        </span>
      </div>
    );
  }
);

StepLabel.displayName = 'StepLabel';

export { Stepper, Step, StepLabel };
