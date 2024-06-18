import * as React from 'react';
import { Combobox as HeadlessCombobox, Transition } from '@headlessui/react';
import { cn } from '@/helper/utils';

const Combobox = HeadlessCombobox;

const ComboboxInput = React.forwardRef<
  React.ElementRef<typeof HeadlessCombobox.Input>,
  React.ComponentPropsWithoutRef<typeof HeadlessCombobox.Input>
>(({ className, ...props }, ref) => (
  <HeadlessCombobox.Input
    ref={ref}
    className={cn('w-full border-none outline-none focus:ring-0', className)}
    {...props}
  />
));

ComboboxInput.displayName = HeadlessCombobox.Input.displayName;

const ComboboxButton = React.forwardRef<
  React.ElementRef<typeof HeadlessCombobox.Button>,
  React.ComponentPropsWithoutRef<typeof HeadlessCombobox.Button>
>(({ className, ...props }, ref) => (
  <HeadlessCombobox.Button
    ref={ref}
    className={cn('group absolute inset-y-0 right-0 flex items-center pr-3 outline-none', className)}
    {...props}
  >
    <svg
      width="16"
      height="8"
      viewBox="0 0 16 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="ml-1 text-neutral-light-gray transition-all group-aria-expanded:rotate-180 group-aria-expanded:text-neutral-black"
    >
      <path d="M8 8L0 0L16 0L8 8Z" fill="currentColor" />
    </svg>
  </HeadlessCombobox.Button>
));

ComboboxButton.displayName = HeadlessCombobox.Button.displayName;

const ComboboxOptions = React.forwardRef<
  React.ElementRef<typeof HeadlessCombobox.Options>,
  React.ComponentPropsWithoutRef<typeof HeadlessCombobox.Options> & {
    afterLeave?: () => void;
  }
>(({ className, afterLeave, ...props }, ref) => (
  <Transition
    as={React.Fragment}
    enter="transition duration-100 ease-out"
    enterFrom="transform scale-95 opacity-0"
    enterTo="transform scale-100 opacity-100"
    leave="transition duration-75 ease-out"
    leaveFrom="transform scale-100 opacity-100"
    leaveTo="transform scale-95 opacity-0"
    afterLeave={afterLeave}
  >
    <HeadlessCombobox.Options
      ref={ref}
      className={cn(
        'no-scrollbar absolute z-[9999] mt-1 max-h-60 w-full overflow-auto rounded-[8px] border border-neutral-light-gray bg-neutral-white py-1 text-base focus:outline-none',
        className
      )}
      {...props}
    />
  </Transition>
));

ComboboxOptions.displayName = HeadlessCombobox.Options.displayName;

const ComboboxOption = React.forwardRef<
  React.ElementRef<typeof HeadlessCombobox.Option>,
  React.ComponentPropsWithoutRef<typeof HeadlessCombobox.Option>
>(({ className, ...props }, ref) => (
  <HeadlessCombobox.Option
    ref={ref}
    className={cn(
      'relative cursor-pointer select-none px-3 py-2 text-neutral-black aria-selected:bg-neutral-off-white data-[headlessui-state=active]:bg-neutral-off-white',
      className
    )}
    {...props}
  />
));

ComboboxOption.displayName = HeadlessCombobox.Option.displayName;

export { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption };
