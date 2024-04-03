'use client';
import { FC, useEffect, useState } from 'react';

interface HeaderBgProps {}

const HeaderBg: FC<HeaderBgProps> = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      className="absolute left-0 top-0 min-h-[400px] w-full bg-neutral-off-white py-5"
      style={{
        height: isMounted ? document.querySelector(`#detail-header`)?.clientHeight : '400px',
        opacity: isMounted ? 1 : 0
      }}
    ></div>
  );
};

export default HeaderBg;
