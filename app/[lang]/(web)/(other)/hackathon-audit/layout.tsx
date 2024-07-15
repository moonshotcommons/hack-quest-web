import { FC, ReactNode } from 'react';
import PressKitSidebar from './components/PressKitSidebar';
import Layout from '@/components/Web/Layout/HackathonAuditPage';
interface WebLayoutProps {
  children: ReactNode;
}

const PressKitLayout: FC<WebLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <div className="flex h-full bg-neutral-white">
        <PressKitSidebar />
        <div className="scroll-wrap-y relative flex h-full flex-1 justify-center  ">
          <div className="w-[808px] ">
            <div className="py-[40px]">{children}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PressKitLayout;
