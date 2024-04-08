import { FC, ReactNode } from 'react';
import Layout from '@/components/Web/Layout/PressKitPage';
interface WebLayoutProps {
  children: ReactNode;
}

const WebLayout: FC<WebLayoutProps> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default WebLayout;
