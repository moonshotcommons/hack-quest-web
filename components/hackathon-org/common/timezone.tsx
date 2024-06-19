'use client';

import * as React from 'react';
import { CheckIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from '@/components/ui/combobox';
import { getTimezone, getTimezones } from '../actions';

export function Timezone() {
  const { data: timezone } = useQuery({
    staleTime: Infinity,
    queryKey: ['timezone'],
    queryFn: () => getTimezone(),
    select: (data) => ({
      id: data?.timezone,
      name: data?.timezone
    })
  });

  const { data: timezones } = useQuery({
    staleTime: Infinity,
    queryKey: ['timezones'],
    queryFn: () => getTimezones(),
    select: (data) => data.map((item) => ({ id: item, name: item }))
  });

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [selected, setSelected] = React.useState({});
  const [query, setQuery] = React.useState('');

  const filteredTimezones = React.useMemo(() => {
    return query === ''
      ? timezones
      : timezones?.filter((timezone) =>
          timezone.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );
  }, [query, timezones]);

  function onSelect(timezone: any) {
    const input = inputRef.current;
    const length = timezone.name?.length;
    if (input) {
      input.setSelectionRange(length, length);
    }
    return timezone.name;
  }

  React.useEffect(() => {
    if (timezone) {
      setSelected(timezone);
    }
  }, [timezone]);

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className="relative">
        <div className="relative h-[50px] w-full overflow-hidden rounded-[8px] border border-neutral-light-gray p-3 text-neutral-black outline-none transition-colors focus-within:border-neutral-medium-gray">
          <ComboboxInput ref={inputRef} displayValue={onSelect} onChange={(event) => setQuery(event.target.value)} />
          <ComboboxButton />
        </div>
        <ComboboxOptions afterLeave={() => setQuery('')}>
          {filteredTimezones?.length === 0 && query !== '' ? (
            <div className="relative cursor-default select-none p-4 text-center text-neutral-off-black">
              Nothing found.
            </div>
          ) : (
            filteredTimezones?.map((timezone) => (
              <ComboboxOption key={timezone.id} value={timezone}>
                {({ selected }) => (
                  <>
                    <span>{timezone.name}</span>
                    {selected ? (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-off-black">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
}
