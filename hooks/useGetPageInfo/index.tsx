import { useMemo } from 'react';

export const useGetPageInfo = () => {
  const pageInfo = useMemo(() => {
    if (typeof window === 'undefined') {
      return {
        windowWidth: 0,
        windowHeight: 0
      };
    }

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    if (typeof windowWidth !== 'number') {
      if (document.compatMode === 'CSS1Compat') {
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
      } else {
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
      }
    }
    return {
      windowWidth: windowWidth,
      windowHeight: windowHeight
    };
  }, []);

  return pageInfo;
};
