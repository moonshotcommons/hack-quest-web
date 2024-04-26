import { FC, ReactNode } from 'react';
import Layout from '@/components/Web/Layout/PressKitPage';
import PressKitSidebar from './components/PressKitSidebar';
interface WebLayoutProps {
  children: ReactNode;
  params: {
    pressKitId: string;
  };
}

const PressKitLayout: FC<WebLayoutProps> = ({ params, children }) => {
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
