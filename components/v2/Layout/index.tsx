import { FC, ReactNode } from 'react';

import { NavBarProps } from './Navbar';
import V2BaseLayout from './V2BaseLayout';
import V2FullLayout from './V2FullLayout';
import V2HomeLayout from './V2HomeLayout';

export interface LayoutProps {
  navbarData: NavBarProps;
  children: ReactNode;
  pathname: string;
}

const V2Layout: FC<LayoutProps> = (props) => {
  let { pathname, children, navbarData } = props;
  const regex = /\/[^/]+\/\[courseId\]\/learn\/\[lessonId\]/;

  switch (true) {
    case regex.test(pathname):
      return <V2FullLayout navbarData={navbarData}>{children}</V2FullLayout>;
    case ['/', ''].includes(pathname):
      return <V2HomeLayout navbarData={navbarData}>{children}</V2HomeLayout>;
    default:
      return <V2BaseLayout navbarData={navbarData}>{children}</V2BaseLayout>;
  }
};
export default V2Layout;
