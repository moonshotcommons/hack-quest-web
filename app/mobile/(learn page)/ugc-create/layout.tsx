'use client';
import { FC, ReactNode } from 'react';
import { useNeedPCRedirect } from '@/hooks/useNeedPCRedirect';

interface LearnLayoutProps {
  children: ReactNode;
}

const LearnLayout: FC<LearnLayoutProps> = ({ children }) => {
  useNeedPCRedirect();
  return <></>;
};

export default LearnLayout;
