import AIFloatButton from '@/components/Mobile/MobAI/AIFloatButton';
import { FC, PropsWithChildren } from 'react';

interface HomeLayoutProps {}

const HomeLayout: FC<HomeLayoutProps & PropsWithChildren> = ({ children }) => {
  return <AIFloatButton>{children}</AIFloatButton>;
};

export default HomeLayout;
