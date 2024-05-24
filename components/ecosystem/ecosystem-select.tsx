'use client';

import * as React from 'react';
import Image from 'next/image';
import { ArrowRightLeftIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Listbox, Transition } from '@headlessui/react';

// const defaultEcosystem = [
//   { id: 'all', name: 'All Ecosystem', icon: null, default: true, background: '#8C8C8C' },
//   { id: 'solana', name: 'Solana Ecosystem', icon: 'solana', background: 'linear-gradient(to right, #8e2de2, #00f260)' },
//   { id: 'ethereum', name: 'Ethereum Ecosystem', icon: 'ethereum', background: '#8A92B2' },
//   { id: 'mantle', name: 'Mantle Ecosystem', icon: 'mantle', background: '#0B0B0B' },
//   { id: 'arbitrum', name: 'Arbitrum Ecosystem', icon: 'arbitrum', background: '#12AAFF' }
// ];
const defaultEcosystem = {
  id: 'all',
  name: 'All Ecosystem',
  image: null,
  default: true
};

function convertString(input?: string) {
  const lowerCaseString = input?.toLowerCase();
  const result = lowerCaseString?.replace(' developer', '');
  return result;
}

export function EcosystemSelect({ ecosystems }: { ecosystems: any[] }) {
  const router = useRouter();
  const params = useParams();
  const [_, startTransition] = React.useTransition();

  const selected = ecosystems.find((e) => e.id === params.ecosystemId) || defaultEcosystem;

  function handleChange(value: (typeof ecosystems)[number]) {
    startTransition(() => {
      router.push(`/dashboard/${value.id}`);
    });
  }

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className="relative w-full rounded-full border border-neutral-medium-gray sm:w-[16.25rem]">
        <Listbox.Button className="relative flex w-full cursor-pointer items-center rounded-full bg-neutral-white py-2 pl-5 pr-10 text-left focus:outline-none">
          {selected.image && (
            <div className="relative h-6 w-6">
              <Image src={`/images/ecosystem/${convertString(selected.name)}-logo.svg`} alt={selected.name} fill />
            </div>
          )}
          <span className="ml-2 block truncate text-base font-bold text-neutral-rich-gray">{selected.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5">
            <ArrowRightLeftIcon className="h-4 w-4 text-neutral-black" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-50 mt-px max-h-60 w-full overflow-auto rounded-[0.625rem] bg-neutral-white p-2 text-neutral-off-black ring-1 ring-neutral-light-gray focus:outline-none">
            {ecosystems.map((ecosystem) => (
              <Listbox.Option
                key={ecosystem.id}
                className="relative flex cursor-pointer select-none items-center gap-2 rounded-[0.5rem] px-3 py-2 transition-colors hover:bg-neutral-off-white aria-selected:bg-neutral-off-white"
                value={ecosystem}
              >
                <div className="relative h-6 w-6">
                  <Image
                    src={`/images/ecosystem/${convertString(ecosystem.name)}-logo.svg`}
                    alt={ecosystem.name}
                    fill
                  />
                </div>
                <span className="block truncate">{ecosystem.name}</span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
