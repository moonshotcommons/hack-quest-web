import { RefObject, useEffect } from 'react';

export const useScrollReset = <T extends HTMLElement>(ref: RefObject<T>, deps: any[]) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, 0);
    }
  }, [...deps, ref]);
};
