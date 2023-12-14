import React, { ReactNode } from 'react';
import NavBar from '../Navbar';
import Footer from '../Footer';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Logo from '@/public/images/logo/home_nav_logo.svg';
import User from '@/components/User';
const inter = Inter({ subsets: ['latin'] });
export interface HomeLayoutProps {
  // footerData: IFooterProps;
  children: ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div
      className={`w-full min-h-screen bg-default-global-bg ${inter.className} overflow-x-scroll`}
    >
      <div className="container m-auto">
        <NavBar
          navList={[
            {
              name: 'All Courses',
              path: '/courses'
            }
          ]}
          logo={<Image src={Logo} alt="logo"></Image>}
        >
          {/* <Link href={'/courses'}>
            <div className="flex items-center  px-8 py-3 font-next-book text-[#F5F5F5] text-[1rem] rounded-[5rem] border border-solid border-[#F5F5F5] gap-[0.62rem]">
              <div>Start Learning Now</div>
              <RightIcon></RightIcon>
            </div>
          </Link> */}
          <User></User>
        </NavBar>
        <main className="w-[79.5rem] m-auto">{children}</main>
        {/* <Footer {...footerData} /> */}
        <Footer></Footer>
      </div>
    </div>
  );
};

export default HomeLayout;
