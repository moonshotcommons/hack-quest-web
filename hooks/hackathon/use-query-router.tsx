import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createUrl } from '@/helper/utils';

export function useQueryRouter({ queryKey, defaultValue }: { queryKey: string; defaultValue: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();

  const value = searchParams.get(queryKey) || defaultValue;

  function onValueChange(value: string) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === defaultValue) {
        params.delete(queryKey);
      } else {
        params.set(queryKey, value);
      }
      const url = createUrl(pathname, params);
      router.replace(url, { scroll: false });
    });
  }

  return { value, isPending, onValueChange };
}
