import { FC, ReactNode } from 'react';
import PressKitSidebar from './components/PressKitSidebar';
interface WebLayoutProps {
  children: ReactNode;
}

const PressKitLayout: FC<WebLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-full bg-neutral-white">
      <PressKitSidebar />
      <div className="scroll-wrap-y relative flex h-full flex-1 justify-center  ">
        <div className="w-[808px] ">
          <div className="py-[40px]">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PressKitLayout;
