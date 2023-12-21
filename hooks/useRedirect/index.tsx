import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const redirectToUrl = useCallback((url: string, isReplace = false) => {
    // if (isMobile) {
    //   if (isReplace) router.replace(`/mobile${url}`);
    //   else router.push(`/mobile${url}`);
    //   return;
    // }
    if (isReplace) {
      router.replace(url);
    } else {
      router.push(url);
    }
  }, []);

  return {
    redirectToUrl
  };
};
