'use client';

import * as React from 'react';
import { useDebounceFn } from 'ahooks';
import { motion } from 'framer-motion';
import { useRouter } from 'next-nprogress-bar';
import { CheckIcon, SearchIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { SortIcon } from '@/components/Common/Icon/Sort';
import { createUrl } from '@/helper/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { useQuery } from '@tanstack/react-query';
import webApi from '@/service';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';

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
      </button>
      {hovered && (
        <motion.ul className="absolute -bottom-[0.1875rem] left-0 z-50 flex w-48 flex-col rounded-[0.625rem] border border-neutral-light-gray bg-neutral-white px-0 py-2">
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
    <div className="flex shrink-0 items-center space-x-2.5 sm:ml-6">
      <Checkbox
        id="winner"
        size="small"
        disabled={view === 'hackathon'}
        checked={winner === 'true'}
        onCheckedChange={onCheckedChange}
      />
      <label
        htmlFor="winner"
        className="body-s select-none text-neutral-medium-gray peer-data-[state=checked]:text-neutral-black"
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
    <div className="flex shrink-0 items-center space-x-2.5 sm:ml-6">
      <Checkbox id="unqualified" size="small" checked={invalid === 'true'} onCheckedChange={onCheckedChange} />
      <label
        htmlFor="unqualified"
        className="body-s select-none text-neutral-medium-gray peer-data-[state=checked]:text-neutral-black"
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
      className="flex w-full items-center gap-3 rounded-full border border-neutral-light-gray bg-neutral-white px-5 py-3 transition-colors duration-300 focus-within:border-neutral-medium-gray"
      onSubmit={onSubmit}
    >
      <SearchIcon size={20} />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value.trim())}
        placeholder="Search for keywords, topics, etc..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-medium-gray"
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
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());
  const view = currentParams.get('view');
  return (
    <section className="flex w-full flex-col gap-4">
      <SearchForm />
      <div className="flex items-center justify-between gap-4">
        <Sort />
        {view !== 'hackathon' && <WinnersOnly />}
        <FilterButton />
      </div>
    </section>
  );
}

function PrizeTrack() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

  const selectedPrizeTracks = currentParams.getAll('prizeTrack');

  const { data } = useQuery({
    staleTime: Infinity,
    queryKey: ['prizeTracks'],
    queryFn: () => webApi.resourceStationApi.fetchHackathonPrizeTracks()
  });

  function onCheckedChange(value: string) {
    const newValue = selectedPrizeTracks?.includes(value)
      ? selectedPrizeTracks?.filter((item) => item !== value)
      : [...(selectedPrizeTracks || []), value];

    currentParams.delete('prizeTrack');
    newValue.forEach((value) => currentParams.append('prizeTrack', value));

    const url = createUrl(pathname, currentParams);
    router.replace(url);
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="body-m-bold text-neutral-off-black">Prize Track</h2>
      <div className="flex flex-col gap-4">
        {data?.map((track) => (
          <div key={track} className="flex items-center gap-2.5">
            <Checkbox checked={selectedPrizeTracks.includes(track)} onCheckedChange={() => onCheckedChange(track)} />
            <span className="body-s text-neutral-off-black">{track}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Track() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

  const selectedTracks = currentParams.getAll('track');

  const { data } = useQuery({
    staleTime: Infinity,
    queryKey: ['tracks'],
    queryFn: () => webApi.resourceStationApi.getProjectTracksDict()
  });

  function onCheckedChange(value: string) {
    const newValue = selectedTracks?.includes(value)
      ? selectedTracks?.filter((item) => item !== value)
      : [...(selectedTracks || []), value];

    currentParams.delete('track');
    newValue.forEach((value) => currentParams.append('track', value));

    const url = createUrl(pathname, currentParams);
    router.replace(url);
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="body-m-bold text-neutral-off-black">Sector</h2>
      <div className="flex flex-col gap-4">
        {data?.map((track) => (
          <div key={track} className="flex items-center gap-2.5">
            <Checkbox checked={selectedTracks.includes(track)} onCheckedChange={() => onCheckedChange(track)} />
            <span className="body-s text-neutral-off-black">{track}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FilterButton() {
  const searchParams = useSearchParams();

  const currentParams = new URLSearchParams(searchParams.toString());

  const tracks = currentParams.getAll('track');
  const prizeTracks = currentParams.getAll('prizeTrack');

  const count = [...new Set(tracks), ...new Set(prizeTracks)]?.length ?? 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full max-w-[256px]" variant="outline" size="small">
          {count > 0 ? (
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-off-black text-neutral-white">
              {count}
            </span>
          ) : (
            <SlidersHorizontalIcon className="h-5 w-5" />
          )}
          <span className="ml-2 text-sm font-medium">Filter</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-96 w-[92.5%] gap-8 overflow-auto rounded-xl p-8">
        {/* <PrizeTrack /> */}
        <Track />
      </DialogContent>
    </Dialog>
  );
}
