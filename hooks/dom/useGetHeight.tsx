import { useEffect, useState } from 'react';
import { useGetPageInfo } from '@/hooks/dom/useGetPageInfo';

const useGetHeight = () => {
  const pageInfo = useGetPageInfo();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return {
    bodyHeight: isMounted ? `${pageInfo.windowHeight}px` : '100vh',
    pageHeight: isMounted ? `calc(${pageInfo.windowHeight}px - 4rem)` : `calc(100vh - 4rem)`
  };
};

export default useGetHeight;
