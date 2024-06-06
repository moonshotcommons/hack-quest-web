'use client';

import * as React from 'react';
import Image from 'next/image';
import { MoveRightIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { EcosystemType } from '@/service/webApi/ecosystem/type';
import webApi from '@/service';

const allEcosystem = {
  id: 'dashboard',
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

export function EcosystemSelect() {
  const router = useRouter();
  const params = useParams();

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
    mutationFn: (ecosystemId: string | {}) =>
      webApi.ecosystemApi.switchEcosystem(typeof ecosystemId === 'string' ? { ecosystemId } : {})
  });

  const selected = data?.find((e) => e.id === params.ecosystemId) || allEcosystem;

  function handleChange(value: EcosystemType | typeof allEcosystem | typeof exploreMore) {
    if ('switch' in value && !value.switch) {
      if (value.id === 'dashboard') {
        mutation.mutateAsync({}).then(() => {
          router.replace(`/${value.id}`);
        });
      } else {
        router.replace(`/${value.id}`);
      }
    } else {
      // mutation.mutateAsync(value.id).then(() => {
      //   router.replace(`/dashboard/${value.id}`);
      // });
      router.replace(`/dashboard/${value.id}`);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="inline-flex items-center rounded-full px-4 py-2 sm:h-[42px]">
          <div className="relative h-6 w-6"></div>
          <span className="sm:body-m-bold ml-2 text-neutral-rich-gray">Ethereum Ecosystem</span>
          <span className="pointer-events-none ml-auto">
            <Image src="/images/ecosystem/arrow-right-left.svg" width={20} height={20} alt="arrow-right-left" />
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  );
}
