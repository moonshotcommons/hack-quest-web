'use client';
import { FC, ReactNode } from 'react';
import Layout from '@/components/Mobile/MobLayout/PressKitPage';
import PressKitSidebar from './components/PressKitSidebar';
import useGetHeight from '@/hooks/dom/useGetHeight';
interface WebLayoutProps {
  children: ReactNode;
}

const PressKitLayout: FC<WebLayoutProps> = ({ children }) => {
  const { pageHeight } = useGetHeight();
  return (
    <Layout>
      <div className="relative bg-neutral-white" style={{ height: pageHeight }}>
        <PressKitSidebar />
        <div className="scroll-wrap-y absolute left-0 top-0 h-full w-full p-[1.25rem]">{children}</div>
      </div>
    </Layout>
  );
};

export default PressKitLayout;
