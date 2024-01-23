import { FC, ReactNode } from 'react';
import UgcProvider from './components/UgcProvider';
import UgcSidebar from './components/UgcSidebar';

interface LearnLayoutProps {
  children: ReactNode;
}

const LearnLayout: FC<LearnLayoutProps> = async ({ children }) => {
  return (
    <UgcProvider>
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex-1 flex overflow-hidden relative">
          <UgcSidebar />
          {children}
        </div>
      </div>
    </UgcProvider>
  );
};

export default LearnLayout;
