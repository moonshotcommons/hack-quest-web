import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCustomPathname } from '@/hooks/router/useCheckPathname';

export function useQueryRouter({ queryKey, defaultValue }: { queryKey: string; defaultValue: string }) {
  const router = useRouter();
  const pathname = useCustomPathname();
  const searchParams = useSearchParams();

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
    router.push(pathname + '?' + createQueryString(queryKey, value));
  }

  return { value, onValueChange };
}
