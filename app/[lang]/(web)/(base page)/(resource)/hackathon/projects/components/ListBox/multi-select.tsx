import * as React from 'react';
import { cn } from '@/helper/utils';
import { Popover, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function MultiSelect({ queryKey, name, options }: { queryKey: string; name: string; options?: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

  const selectedOptions = currentParams.getAll(queryKey);

  const [selected, setSelected] = React.useState(selectedOptions);

  const toggleSelection = (option: any) => {
    const newSelection = selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option];

    setSelected(newSelection);

    if (newSelection.length > 0) {
      currentParams.delete(queryKey);
      newSelection.forEach((value) => currentParams.append(queryKey, value));
    } else {
      currentParams.delete(queryKey);
    }

    setTimeout(() => {
      router.replace(`${pathname}?${currentParams.toString()}`);
    }, 500);
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={cn(
              'group inline-flex h-11 items-center gap-2.5 rounded-full border border-neutral-off-black bg-neutral-white px-4 py-2 outline-none',
              {
                'bg-yellow-light': selected.length > 0
              }
            )}
          >
            <span className="whitespace-nowrap">{name}</span>
            <ChevronDownIcon size={20} className={cn('transition-transform', { 'rotate-180': open })} />
          </Popover.Button>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-1 w-full max-w-sm -translate-x-1/2 transform">
              <div className="max-h-96 overflow-auto rounded-[0.625rem] bg-neutral-white ring-1 ring-neutral-light-gray">
                <ul className="flex flex-col">
                  {options?.map((option) => (
                    <li
                      className="flex cursor-pointer items-center justify-between whitespace-nowrap px-3 py-2"
                      key={option}
                      onClick={() => toggleSelection(option)}
                    >
                      {option} {selected.includes(option) && <CheckIcon size={20} />}
                    </li>
                  ))}
                </ul>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
