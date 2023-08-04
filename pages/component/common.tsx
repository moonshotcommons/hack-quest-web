import Button, { ButtonProps } from '@/components/Common/Button';
import Dropdown, { ChildrenDropDown } from '@/components/Common/DropDown';
import Modal from '@/components/Common/Modal';
import { render } from '@testing-library/react';
import { NextPage } from 'next';
import Image from 'next/image';
import { FC, Suspense, lazy, useEffect, useState } from 'react';
import Congrats from '@/public/images/course/congrats.svg';
import MoonLeft from '@/public/images/other/moon_left.svg';
import MoonRight from '@/public/images/other/moon_right.png';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { useRouter } from 'next/router';

interface HomeProps {
  children: React.ReactNode;
}

const config = [
  {
    title: 'Button组件',
    examples: [lazy(() => import('@/components/Common/Button/example'))]
  },
  {
    title: 'Icon组件',
    examples: [lazy(() => import('@/components/Common/Icon/example'))]
  }
];

const Home: NextPage<HomeProps> = (props) => {
  const [selectIndex, setSelectIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!process.env.IS_DEV && router.pathname === '/component/common') {
      router.push('/404');
    }
  }, [router]);
  if (!process.env.IS_DEV && router.pathname === '/component/common')
    return null;
  return (
    <div className="flex flex-row min-h-[50vh]">
      <div className="w-20% ">
        {config.map((cfg, index) => {
          return (
            <div
              key={index}
              className={`px-8 py-6 cursor-pointer ${
                index === selectIndex ? 'bg-primary-color' : ''
              }`}
              onClick={() => setSelectIndex(index)}
            >
              {cfg.title}
            </div>
          );
        })}
      </div>
      <div className="flex-1 px-8 py-6">
        {config[selectIndex].examples.map((Item, index) => {
          return (
            <div key={index}>
              <Suspense fallback={<div>loading...</div>}>
                {<Item></Item>}
              </Suspense>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
