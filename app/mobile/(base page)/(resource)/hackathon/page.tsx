'use client';
import { FC } from 'react';
import { useNeedPCRedirect } from '@/hooks/useNeedPCRedirect';

// export const metadata: Metadata = {
//   title: 'Hackathons'
// };

interface HackathonProps {}

const Hackathon: FC<HackathonProps> = (props) => {
  useNeedPCRedirect();
  return <>{/* <HackathonPage /> */}</>;
};

export default Hackathon;
