import { FC, ReactNode } from 'react';
import Layout from '@/components/Web/Layout/HackathonManagePage';
interface WebLayoutProps {
  children: ReactNode;
}

const PressKitLayout: FC<WebLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <div className="flex h-full bg-neutral-white">
        <div className="h-full flex-1">
          <div className="scroll-wrap-y flex h-full flex-col gap-[40px] p-[40px]">{children}</div>
        </div>
      </div>
    </Layout>
  );
};

export default PressKitLayout;
