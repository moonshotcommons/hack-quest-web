'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MoveRightIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToggle } from '@/hooks/utils/use-toggle';
import webApi from '@/service';
import { updateActiveEcosystem } from './actions';

export function EcosystemSelectNew() {
  const [open, toggle] = useToggle(false);
  const router = useRouter();
  const { ecosystemId, lang } = useParams<{ ecosystemId: string; lang: string }>();

  const { data } = useQuery({
    staleTime: Infinity,
    queryKey: ['enrolledEcosystems', lang],
    queryFn: () => webApi.ecosystemApi.getMyEcosystems({ lang })
  });

  const selected = data?.find((e) => e.id === ecosystemId);

  async function onClick(id: string | {}) {
    toggle(false);
    await updateActiveEcosystem(id);
    router.refresh();
  }

  return (
    <Popover open={open} onOpenChange={toggle}>
      <PopoverTrigger asChild>
        <button
          className="inline-flex h-[42px] w-full items-center rounded-full border border-neutral-light-gray bg-neutral-white px-4 py-2 outline-none sm:w-[260px]"
          onClick={toggle}
        >
          {selected?.image && (
            <div className="relative h-6 w-6">
              <Image src={selected.image} alt={selected?.name} fill className="object-contain" />
            </div>
          )}
          <span className="body-m-bold ml-2 text-neutral-rich-gray">{selected?.name || 'All Ecosystem'}</span>
          <span className="pointer-events-none ml-auto">
            <Image src="/images/ecosystem/arrow-right-left.svg" width={20} height={20} alt="arrow-right-left" />
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={0}
        className="w-[var(--radix-popper-anchor-width)] rounded-[10px] border border-neutral-light-gray p-2 shadow-none"
      >
        <ul className="flex flex-col gap-2">
          <li>
            <Link href="/dashboard" prefetch={false}>
              <button
                data-selected={!ecosystemId}
                className="inline-flex w-full items-center rounded-[8px] px-3 py-2 outline-none transition-colors hover:bg-neutral-off-white data-[selected=true]:bg-neutral-off-white"
                onClick={() => onClick({})}
              >
                <span className="body-m text-neutral-rich-gray">All Ecosystem</span>
              </button>
            </Link>
          </li>
          {data?.map((ecosystem) => (
            <li key={ecosystem.id}>
              <Link href={`/dashboard/${ecosystem.id}`}>
                <button
                  data-selected={ecosystem.id === ecosystemId}
                  className="inline-flex w-full items-center rounded-[8px] px-3 py-2 outline-none transition-colors hover:bg-neutral-off-white data-[selected=true]:bg-neutral-off-white"
                  onClick={() => onClick(ecosystem.id)}
                >
                  {ecosystem.image && (
                    <div className="relative h-6 w-6">
                      <Image src={ecosystem.image} alt={ecosystem.name} fill className="rounded-full object-contain" />
                    </div>
                  )}
                  <span className="body-m ml-2 text-neutral-rich-gray">{ecosystem.name}</span>
                </button>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/ecosystem-explore">
              <button
                data-selected={false}
                className="inline-flex w-full items-center rounded-[8px] px-3 py-2 outline-none transition-colors hover:bg-neutral-off-white data-[selected=true]:bg-neutral-off-white"
              >
                <span className="body-m mr-2 text-neutral-rich-gray">Explore More</span>
                <MoveRightIcon className="h-4 w-4 text-neutral-rich-gray" />
              </button>
            </Link>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
