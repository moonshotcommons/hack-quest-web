import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useQueryRouter({ queryKey, defaultValue }: { queryKey: string; defaultValue: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [_, startTransition] = React.useTransition();

  const value = searchParams.get(queryKey) || defaultValue;

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function onValueChange(value: string) {
    startTransition(() => {
      if (value === defaultValue) {
        router.replace(pathname);
      } else {
        router.replace(pathname + '?' + createQueryString(queryKey, value));
      }
    });
  }

  return { value, onValueChange };
}
