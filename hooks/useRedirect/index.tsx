import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { isMobile } from 'react-device-detect';

export const useRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  // const [isMounted, setIsMounted] = useState(false);
  const redirectToUrl = useCallback(
    (url: string, isReplace = false) => {
      // if (isMounted) return;
      // setIsMounted(true);
      if (isMobile && !pathname.startsWith('/mobile')) {
        if (isReplace) router.replace(`/mobile${url}`);
        else router.push(`/mobile${url}`);
        return;
      }
      if (isReplace) {
        router.replace(url);
      } else {
        router.push(url);
      }
    },
    [pathname, router]
  );

  return {
    redirectToUrl
  };
};
