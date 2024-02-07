'use client';
import { FC } from 'react';
import { useNeedPCRedirect } from '@/hooks/useNeedPCRedirect';

// export const metadata: Metadata = {
//   title: 'Instructors'
// };

interface InstructorProps {}

const Instructor: FC<InstructorProps> = (props) => {
  useNeedPCRedirect();
  return <>{/* <InstructorPage /> */}</>;
};

export default Instructor;
