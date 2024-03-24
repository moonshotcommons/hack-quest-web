'use client';

import { useEffect, useState } from 'react';

const useIsPc = () => {
  const [pc, setPc] = useState(true);
  const isPc = () => {
    return pc;
  };
  useEffect(() => {
    const handleResize = () => {
      setPc(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return isPc;
};

export default useIsPc;
