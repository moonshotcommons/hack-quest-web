'use client';

import * as React from 'react';
import { XIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMediaQuery } from '@/hooks/dom/use-media-query';
import { useToggle } from '@/hooks/utils/use-toggle';
import { Checkbox } from '@/components/ui/checkbox';
import { FilterIcon } from '@/components/Common/Icon/Filter';
import { createUrl } from '@/helper/utils';
import { DropdownFilter } from './dropdown';
import { SortByFilter } from './sort';
import { MobileFilters } from './mobile';
import { useIdeas } from '../submit/store';

export function FilterPanel() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, toggleOpen] = useToggle(false);

  const { tracks, ecosystems } = useIdeas();

  const isLargeScreen = useMediaQuery('(min-width: 640px)');

  const currentParams = new URLSearchParams(searchParams.toString());

  const teamUp = currentParams.get('teamUp') ?? 'false';
  const ecosystemOptions = currentParams.getAll('ecosystemId');
  const tracksOptions = currentParams.getAll('tracks');

  const [checked, toggleChecked] = useToggle(teamUp === 'true');
  const [selectedEcosystems, setSelectedEcosystems] = React.useState(ecosystemOptions);
  const [selectedTracks, setSelectedTracks] = React.useState(tracksOptions);

  const filteredParams = [...selectedEcosystems, ...selectedTracks];

  const filteredEcosystems = ecosystems?.filter((item) => filteredParams.includes(item.value));
  const filteredTracks = tracks?.filter((item) => filteredParams.includes(item.value));

  const filteredOptions = filteredEcosystems?.concat(filteredTracks || []);

  function onValueChange(value: string, type: 'ecosystemId' | 'tracks') {
    const isEcosystem = type === 'ecosystemId';
    const selectedValues = isEcosystem ? selectedEcosystems : selectedTracks;
    const setSelectedValues = isEcosystem ? setSelectedEcosystems : setSelectedTracks;
    const paramName = isEcosystem ? 'ecosystemId' : 'tracks';

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
    const index = selectedEcosystems.indexOf(value);
    if (index !== -1) {
      onValueChange(value, 'ecosystemId');
    } else {
      onValueChange(value, 'tracks');
    }
  }

  function onCheckedChange(checked: boolean) {
    toggleChecked(checked);
    if (checked) {
      currentParams.set('teamUp', 'true');
    } else {
      currentParams.delete('teamUp');
    }
    router.replace(`${pathname}?${currentParams.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        className="button-text-s mt-5 flex h-[2.125rem] w-full items-center justify-center gap-3 rounded-full bg-yellow-primary p-4 uppercase text-neutral-black outline-none sm:hidden"
        onClick={toggleOpen}
      >
        <FilterIcon />
        <span>Filter</span>
      </button>
      <div className="flex items-center justify-between gap-8 sm:items-start sm:pt-8">
        <div className="flex flex-wrap items-center gap-4">
          <DropdownFilter
            label="ecosystem"
            values={selectedEcosystems}
            onValueChange={(value) => onValueChange(value, 'ecosystemId')}
            options={ecosystems}
          />
          <DropdownFilter
            label="tracks"
            values={selectedTracks}
            onValueChange={(value) => onValueChange(value, 'tracks')}
            options={tracks}
          />
          <div className="flex items-center space-x-2.5 sm:ml-6">
            <Checkbox
              id="team"
              size="large"
              className="h-5 w-5 sm:h-6 sm:w-6"
              checked={checked}
              onCheckedChange={onCheckedChange}
            />
            <label
              htmlFor="team"
              aria-checked={checked}
              data-state={checked ? 'checked' : 'unchecked'}
              className="sm:body-m body-s select-none text-neutral-medium-gray peer-data-[state=checked]:text-neutral-black"
            >
              Team wanted only
            </label>
          </div>
          {isLargeScreen &&
            filteredOptions?.map((option) => (
              <button
                key={option.value}
                className="inline-flex items-center justify-between gap-2.5 rounded-full bg-yellow-primary px-4 py-1.5 text-neutral-off-black"
              >
                <span className="body-m">{option.label}</span>
                <XIcon className="h-5 w-5" onClick={() => onRemove(option.value)} />
              </button>
            ))}
        </div>
        <SortByFilter />
      </div>
      <MobileFilters open={open} onClose={() => toggleOpen(false)} />
    </div>
  );
}
