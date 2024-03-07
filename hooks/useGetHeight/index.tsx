import { useEffect, useState } from 'react';
import { useGetPageInfo } from '../useGetPageInfo';
import { MOBILE_NAVBAR_HEIGHT } from '@/components/Mobile/MobLayout/BasePage/Navbar/constant';

const useGetHeight = () => {
  const pageInfo = useGetPageInfo();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return {
    bodyHeight: isMounted ? `${pageInfo.windowHeight}px` : '100vh',
    pageHeight: isMounted
      ? `${pageInfo.windowHeight - MOBILE_NAVBAR_HEIGHT}px`
      : `calc(100vh-${MOBILE_NAVBAR_HEIGHT}px)`
  };
};

export default useGetHeight;
