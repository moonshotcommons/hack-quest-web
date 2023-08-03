import Button, { ButtonProps } from '@/components/Common/Button';
import Dropdown, { ChildrenDropDown } from '@/components/Common/DropDown';
import Modal from '@/components/Common/Modal';
import { render } from '@testing-library/react';
import { NextPage } from 'next';
import Image from 'next/image';
import { FC, Suspense, lazy, useState } from 'react';
import Congrats from '@/public/images/course/congrats.svg';
import MoonLeft from '@/public/images/other/moon_left.svg';
import MoonRight from '@/public/images/other/moon_right.png';
import { Player, Controls } from '@lottiefiles/react-lottie-player';

interface HomeProps {
  children: React.ReactNode;
}

const config = [
  {
    title: 'Button组件',
    examples: [lazy(() => import('@/components/Common/Button/example'))]
  },
  {
    title: 'Button组件',
    examples: [lazy(() => import('@/components/Common/Button/example'))]
  },
  {
    title: 'Button组件',
    examples: [lazy(() => import('@/components/Common/Button/example'))]
  },
  {
    title: 'Button组件',
    examples: [lazy(() => import('@/components/Common/Button/example'))]
  },
  {
    title: 'Button组件',
    examples: [lazy(() => import('@/components/Common/Button/example'))]
  }
];

const Home: NextPage<HomeProps> = (props) => {
  const [selectIndex, setSelectIndex] = useState(0);
  return (
    <div className="flex flex-row">
      <div className="w-20% ">
        {config.map((cfg, index) => {
          return (
            <div
              key={index}
              className={`px-8 py-6 cursor-pointer ${
                index === selectIndex ? 'text-text-default-color' : '#c0c0c0'
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
