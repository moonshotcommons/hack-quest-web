'use client';
import { useEffect, useState } from 'react';
import CountUpComponent, { CountUpProps } from 'react-countup';

const CountUp = (props: CountUpProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return `0 `;

  return <CountUpComponent {...props} />;
};

export default CountUp;
