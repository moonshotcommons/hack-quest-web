import { FC, ReactNode } from 'react';
import UgcProvider from './components/UgcProvider';
import UgcSidebar from './components/UgcSidebar';
import UgcFooter from './components/UgcFooter';

interface LearnLayoutProps {
  children: ReactNode;
}

const LearnLayout: FC<LearnLayoutProps> = async ({ children }) => {
  return (
    <UgcProvider>
      <div className="flex h-full w-full flex-col">
        <div className="flex w-full flex-1 overflow-hidden">
          <UgcSidebar />
          {children}
        </div>
        <UgcFooter />
      </div>
    </UgcProvider>
  );
};

export default LearnLayout;
