'use client';
import { FC } from 'react';
import { useNeedPCRedirect } from '@/hooks/router/useNeedPCRedirect';

interface HackathonProps {}

const Hackathon: FC<HackathonProps> = (props) => {
  useNeedPCRedirect();
  return (
    <>
      <div></div>
    </>
  );
};

export default Hackathon;
