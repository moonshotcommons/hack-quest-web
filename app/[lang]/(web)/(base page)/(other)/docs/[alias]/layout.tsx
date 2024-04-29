import { FC, ReactNode } from 'react';
import DocsSidebar from './components/DocsSidebar';

interface DocsLayoutProps {
  children: ReactNode;
  params: { alias: string };
}

const DocsLayout: FC<DocsLayoutProps> = ({ children, params: { alias } }) => {
  return (
    <div className="flex w-full justify-between bg-neutral-white">
      <DocsSidebar selectAlias={alias} />
      <div className="flex-1 pl-[296px]">{children}</div>
    </div>
  );
};

export default DocsLayout;
