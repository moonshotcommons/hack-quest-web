import { FC, ReactNode } from 'react';
interface WebLayoutProps {
  children: ReactNode;
}

const WebLayout: FC<WebLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default WebLayout;
