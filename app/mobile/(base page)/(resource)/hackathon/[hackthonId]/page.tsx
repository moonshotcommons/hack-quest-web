'use client';
import { FC } from 'react';
import { useNeedPCRedirect } from '@/hooks/useNeedPCRedirect';

// export const metadata: Metadata = {
//   title: 'Hackathon Detail'
// };

interface HackathonIdProps {}

const HackathonId: FC<HackathonIdProps> = (props) => {
  useNeedPCRedirect();
  return <>{/* <HackathonIdPage /> */}</>;
};

export default HackathonId;
