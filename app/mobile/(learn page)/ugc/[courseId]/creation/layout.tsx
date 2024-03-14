'use client';
import { useNeedPCRedirect } from '@/hooks/useNeedPCRedirect';
import { FC, ReactNode } from 'react';

interface LearnLayoutProps {
  children: ReactNode;
  params: {
    courseId: string;
  };
}

const LearnLayout: FC<LearnLayoutProps> = ({ params, children }) => {
  useNeedPCRedirect();
  return <></>;
};

export default LearnLayout;
