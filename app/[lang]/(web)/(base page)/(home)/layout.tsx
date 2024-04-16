import AIFloatButton from '@/components/AI/AIFloatButton';
import { FC, PropsWithChildren } from 'react';

interface HomeLayoutProps {}

const HomeLayout: FC<HomeLayoutProps & PropsWithChildren> = ({ children }) => {
  return <AIFloatButton>{children}</AIFloatButton>;
};

export default HomeLayout;
