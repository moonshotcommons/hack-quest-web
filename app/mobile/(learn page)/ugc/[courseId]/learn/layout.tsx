import { FC, ReactNode } from 'react';
import UgcProvider from './components/UgcProvider';
import UgcSidebar from './components/UgcSidebar';

interface LearnLayoutProps {
  children: ReactNode;
}

const LearnLayout: FC<LearnLayoutProps> = async ({ children }) => {
  return (
    <UgcProvider>
      <div className="flex h-full w-full flex-col">
        <div className="relative flex w-full flex-1 overflow-hidden">
          <UgcSidebar />
          {children}
        </div>
      </div>
    </UgcProvider>
  );
};

export default LearnLayout;
