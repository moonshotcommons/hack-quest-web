import React, { ReactNode } from 'react';
import PressKitSidebar from './components/PressKitSidebar';

interface PressKitLayoutProp {
  children: ReactNode;
}

const PressKitLayout: React.FC<PressKitLayoutProp> = ({ children }) => {
  return (
    <div className="flex h-full">
      <PressKitSidebar />
      <div className="scroll-wrap-y flex h-full flex-1 justify-center py-[40px]">
        <div className="w-[808px]">{children}</div>
      </div>
    </div>
  );
};

export default PressKitLayout;
