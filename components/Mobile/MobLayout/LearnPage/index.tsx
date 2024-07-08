import { FC, ReactNode } from 'react';
import BaseLayout from './BaseLayout';
export interface LayoutProps {
  children: ReactNode;
}

const V2Layout: FC<LayoutProps> = (props) => {
  let { children } = props;
  return <BaseLayout>{children}</BaseLayout>;
};
export default V2Layout;
