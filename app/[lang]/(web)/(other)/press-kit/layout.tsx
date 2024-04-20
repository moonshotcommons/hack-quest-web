import { FC, ReactNode } from 'react';
import Layout from '@/components/Web/Layout/PressKitPage';
import PressKitSidebar from './components/PressKitSidebar';
interface WebLayoutProps {
  children: ReactNode;
}

const PressKitLayout: FC<WebLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <div className="flex h-full">
        <PressKitSidebar />
        <div className="scroll-wrap-y flex h-full flex-1 justify-center py-[40px]">
          <div className="w-[808px]">{children}</div>
        </div>
      </div>
    </Layout>
  );
};

export default PressKitLayout;
