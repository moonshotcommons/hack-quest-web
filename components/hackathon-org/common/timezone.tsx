'use client';

import * as React from 'react';
import { CheckIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from '@/components/ui/combobox';
import { useControllableState } from '@/hooks/state/use-controllable-state';
import { noop } from '@/lib/utils';
import { getTimezones } from '../actions';

interface TimezoneProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function Timezone(props: TimezoneProps) {
  const { onValueChange = noop, value, defaultValue, ...rest } = props;

  const { data: timezones } = useQuery({
    staleTime: Infinity,
    queryKey: ['timezones'],
    queryFn: () => getTimezones(),
    select: (data) => data.map((item) => ({ id: item, name: item }))
  });

  const [state, setState] = useControllableState(props, 'value', onValueChange);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [query, setQuery] = React.useState('');

  const filteredTimezones = React.useMemo(() => {
    return query === ''
      ? timezones
      : timezones?.filter((timezone) =>
          timezone.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );
  }, [query, timezones]);

  function onSelect(timezone: string) {
    const input = inputRef.current;
    const length = timezone?.length;
    if (input) {
      input.setSelectionRange(length, length);
    }
    return timezone;
  }

  return (
    <Combobox defaultValue={state} value={state} onChange={setState}>
      <div className="group relative" {...rest}>
        <div className="relative h-[50px] w-full overflow-hidden rounded-[8px] border border-neutral-light-gray p-3 text-neutral-black outline-none transition-colors focus-within:border-neutral-medium-gray group-aria-[invalid=true]:border-status-error-dark">
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
              <ComboboxOption key={timezone.id} value={timezone.name}>
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
