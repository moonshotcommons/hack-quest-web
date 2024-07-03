'use client';
import { FC } from 'react';
import { useNeedPCRedirect } from '@/hooks/router/useNeedPCRedirect';

// export const metadata: Metadata = {
//   title: 'Mission Center'
// };

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
