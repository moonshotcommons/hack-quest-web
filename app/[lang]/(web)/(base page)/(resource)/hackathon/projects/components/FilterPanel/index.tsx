'use client';

import * as React from 'react';
import { useDebounceFn } from 'ahooks';
import { motion } from 'framer-motion';
import { useRouter } from 'next-nprogress-bar';
import { CheckIcon, SearchIcon, XIcon } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { SortIcon } from '@/components/Common/Icon/Sort';
import { createUrl } from '@/helper/utils';
import { animateProps } from '../../../constants/data';
import { Checkbox } from '@/components/ui/checkbox';
import { useQueries } from '@tanstack/react-query';
import webApi from '@/service';
import { DropdownFilter } from '@/components/idea-bank/filters/dropdown';

const options = [
  { label: 'Latest to oldest', value: '-createdAt' },
  { label: 'Oldest to latest', value: 'createdAt' }
] as const;

export function Sort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

  const selected = currentParams.get('sort') || '-createdAt';

  const [hovered, setHovered] = React.useState(false);

  const { run: onMouseLeave } = useDebounceFn(
    () => {
      setHovered(false);
    },
    { wait: 100 }
  );

  function toggleSelection(value: string) {
    if (value === 'createdAt') {
      currentParams.set('sort', value);
    } else {
      currentParams.delete('sort');
    }

    const url = createUrl(pathname, currentParams);

    router.replace(url, { scroll: false });
  }

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => {
        onMouseLeave.cancel();
        setHovered(true);
      }}
      onMouseLeave={onMouseLeave}
    >
      <button
        data-state={hovered ? 'open' : 'closed'}
        className="group inline-flex items-center justify-center gap-2 rounded-full py-1.5 pr-0 text-neutral-off-black data-[state=open]:bg-neutral-off-white sm:px-4"
      >
        <SortIcon className="h-5 w-5" />
        <span className="body-l whitespace-nowrap capitalize">Sort by</span>
      </button>
      {hovered && (
        <motion.ul
          {...animateProps}
          className="absolute -bottom-[0.1875rem] left-0 z-50 flex w-48 flex-col rounded-[0.625rem] border border-neutral-light-gray bg-neutral-white px-0 py-2"
        >
          {options.map((option) => (
            <li
              key={option.value}
              className="flex cursor-pointer items-center justify-between whitespace-nowrap px-3 py-2 text-neutral-off-black transition-colors hover:bg-neutral-off-white data-[selected=true]:bg-neutral-off-white"
              onClick={() => selected !== option.value && toggleSelection(option.value)}
              data-selected={selected === option.value}
            >
              <span className="body-m">{option.label}</span>
              {selected === option.value && <CheckIcon className="ml-2 h-5 w-5" />}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}

function ViewBy() {
  return <div>View By</div>;
}

export function WinnersOnly() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

  const view = currentParams.get('view');

  const winner = currentParams.get('winner') ?? 'false';

  function onCheckedChange(checked: boolean) {
    if (checked) {
      currentParams.set('winner', 'true');
    } else {
      currentParams.delete('winner');
    }
    const url = createUrl(pathname, currentParams);
    router.replace(url, { scroll: false });
  }
  return (
    <div className="flex items-center space-x-2.5 sm:ml-6">
      <Checkbox
        id="winner"
        size="large"
        disabled={view === 'hackathon'}
        checked={winner === 'true'}
        onCheckedChange={onCheckedChange}
      />
      <label
        htmlFor="winner"
        className="body-m cursor-pointer select-none text-neutral-medium-gray peer-data-[state=checked]:text-neutral-black"
      >
        Winners only
      </label>
    </div>
  );
}

export function Unqualified() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

  const invalid = currentParams.get('invalid') ?? 'false';

  function onCheckedChange(checked: boolean) {
    if (checked) {
      currentParams.set('invalid', 'true');
    } else {
      currentParams.delete('invalid');
    }
    const url = createUrl(pathname, currentParams);
    router.replace(url, { scroll: false });
  }
  return (
    <div className="flex items-center space-x-2.5 sm:ml-6">
      <Checkbox id="unqualified" size="large" checked={invalid === 'true'} onCheckedChange={onCheckedChange} />
      <label
        htmlFor="unqualified"
        className="body-m cursor-pointer select-none text-neutral-medium-gray peer-data-[state=checked]:text-neutral-black"
      >
        Unqualified
      </label>
    </div>
  );
}

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [value, setValue] = React.useState(searchParams.get('keyword') || '');

  const currentParams = new URLSearchParams(searchParams.toString());

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (value) {
      currentParams.set('keyword', value);
      const url = createUrl(pathname, currentParams);
      router.replace(url, { scroll: false });
      const element = document.querySelector('h1[data-id="all-ideas"]');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  function onClear() {
    setValue('');
    currentParams.delete('keyword');
    const url = createUrl(pathname, currentParams);
    router.replace(url);
  }
  return (
    <form
      className="flex min-w-[630px] items-center gap-3 rounded-full border border-neutral-light-gray bg-neutral-white px-5 py-3 transition-colors duration-300 focus-within:border-neutral-medium-gray"
      onSubmit={onSubmit}
    >
      <SearchIcon />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value.trim())}
        placeholder="Search for keywords, topics, etc..."
        className="flex-1 bg-transparent outline-none placeholder:text-neutral-medium-gray"
      />
      {value && (
        <button type="button" className="outline-none">
          <XIcon className="h-5 w-5 sm:h-6 sm:w-6" onClick={onClear} />
        </button>
      )}
    </form>
  );
}

export function FilterPanel() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

  const [{ data: tracks }, { data: prizeTracks }] = useQueries({
    queries: [
      {
        staleTime: Infinity,
        queryKey: ['tracks'],
        queryFn: () => webApi.resourceStationApi.getProjectTracksDict(),
        select: (data: string[]) => data?.map((item) => ({ label: item, value: item }))
      },
      {
        staleTime: Infinity,
        queryKey: ['prizeTracks'],
        queryFn: () => webApi.resourceStationApi.fetchHackathonPrizeTracks(),
        select: (data: string[]) => data?.map((item) => ({ label: item, value: item }))
      }
    ]
  });

  const view = currentParams.get('view') || 'project';
  const prizeTrackOptions = currentParams.getAll('prizeTrack');
  const trackOptions = currentParams.getAll('track');

  const [selectedPrizeTracks, setSelectedPrizeTracks] = React.useState(prizeTrackOptions);
  const [selectedTracks, setSelectedTracks] = React.useState(trackOptions);

  const filteredParams = [...selectedTracks, ...selectedPrizeTracks];

  const filteredPrizeTracks = prizeTracks?.filter((item) => filteredParams.includes(item.value));
  const filteredTracks = tracks?.filter((item) => filteredParams.includes(item.value));

  const filteredOptions = filteredPrizeTracks?.concat(filteredTracks || []);

  function onValueChange(value: string, type: 'prizeTrack' | 'track') {
    const isPrizeTrack = type === 'prizeTrack';
    const selectedValues = isPrizeTrack ? selectedPrizeTracks : selectedTracks;
    const setSelectedValues = isPrizeTrack ? setSelectedPrizeTracks : setSelectedTracks;
    const paramName = isPrizeTrack ? 'prizeTrack' : 'track';

    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];

    setSelectedValues(newValues);

    currentParams.delete(paramName);
    if (newValues.length > 0) {
      newValues.forEach((v) => currentParams.append(paramName, v));
    }

    const url = createUrl(pathname, currentParams);

    router.replace(url, { scroll: false });
  }

  function onRemove(value: string) {
    const index = selectedPrizeTracks.indexOf(value);
    if (index !== -1) {
      onValueChange(value, 'prizeTrack');
    } else {
      onValueChange(value, 'track');
    }
  }

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Sort />
          {view === 'project' && <WinnersOnly />}
        </div>
        <SearchForm />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <DropdownFilter
          label="Sector"
          values={selectedTracks}
          onValueChange={(value) => onValueChange(value, 'track')}
          options={tracks}
        />
        {filteredOptions?.map((option) => (
          <button
            key={option.value}
            className="inline-flex h-11 items-center justify-between gap-2.5 rounded-full bg-yellow-primary px-4 py-1.5 text-neutral-off-black"
          >
            <span className="body-m">{option.label}</span>
            <XIcon className="h-5 w-5" onClick={() => onRemove(option.value)} />
          </button>
        ))}
      </div>
    </section>
  );
}
