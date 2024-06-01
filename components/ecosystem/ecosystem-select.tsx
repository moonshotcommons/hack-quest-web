'use client';

import * as React from 'react';
import Image from 'next/image';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { Listbox, Transition } from '@headlessui/react';
import webApi from '@/service';
import { EcosystemType } from '@/service/webApi/ecosystem/type';
import { MoveRightIcon } from 'lucide-react';

const allEcosystem = {
  id: 'system',
  name: 'All Ecosystem',
  image: null,
  icon: null,
  switch: false
};

const exploreMore = {
  id: 'ecosystem-explore',
  name: 'Explore More',
  image: null,
  icon: MoveRightIcon,
  switch: false
};

function convertString(input?: string) {
  const lowerCaseString = input?.toLowerCase();
  const result = lowerCaseString?.replace(' developer', '');
  return result;
}

export function EcosystemSelect() {
  const router = useRouter();
  const params = useParams();
  const [_, startTransition] = React.useTransition();

  const { data } = useQuery({
    queryKey: ['myEcosystems'],
    staleTime: Infinity,
    queryFn: () => webApi.ecosystemApi.getMyEcosystems(),
    select: (data) => {
      return [allEcosystem, ...data, exploreMore];
    }
  });

  const mutation = useMutation({
    mutationKey: ['switchEcosystem'],
    mutationFn: (ecosystemId: string) => webApi.ecosystemApi.switchEcosystem({ ecosystemId })
  });

  const selected = data?.find((e) => e.id === params.ecosystemId) || allEcosystem;

  function handleChange(value: EcosystemType | typeof allEcosystem | typeof exploreMore) {
    startTransition(() => {
      if ('switch' in value && !value.switch) {
        router.push(`/${value.id}`);
      } else {
        mutation.mutate(value.id);
        router.push(`/system/${value.id}`);
      }
    });
  }

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className="relative w-full rounded-full border border-neutral-light-gray sm:w-[16.25rem]">
        <Listbox.Button className="relative flex w-full cursor-pointer items-center rounded-full bg-neutral-white py-2 pl-5 pr-10 text-left focus:outline-none">
          {selected.image && (
            <div className="relative h-6 w-6">
              <Image src={selected.image} alt={selected.name} fill />
            </div>
          )}
          <span className="body-m-bold ml-2 block truncate text-neutral-rich-gray">{selected.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5">
            <Image src="/images/ecosystem/arrow-right-left.svg" width={20} height={20} alt="arrow-right-left" />
          </span>
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-50 mt-px max-h-60 w-full overflow-auto rounded-[0.625rem] bg-neutral-white p-2 text-neutral-off-black ring-1 ring-neutral-light-gray focus:outline-none">
            {data?.map((ecosystem) => (
              <Listbox.Option
                key={ecosystem.id}
                className="relative flex cursor-pointer select-none items-center gap-2 rounded-[0.5rem] px-3 py-2 transition-colors hover:bg-neutral-off-white aria-selected:bg-neutral-off-white"
                value={ecosystem}
              >
                {ecosystem.image && (
                  <div className="relative h-6 w-6">
                    <Image src={ecosystem.image} alt={ecosystem.name} fill className="rounded-full" />
                  </div>
                )}
                <span className="block truncate">{ecosystem.name}</span>
                {'icon' in ecosystem && ecosystem.icon && <ecosystem.icon className="h-4 w-4 text-neutral-rich-gray" />}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}