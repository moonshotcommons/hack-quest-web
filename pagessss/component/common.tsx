import { NextPage } from 'next';
import { Suspense, lazy, useEffect, useState } from 'react';
// import MoonLeft from '@/public/images/other/moon_left.svg';
// import MoonRight from '@/public/images/other/moon_right.png';
import { useRedirect } from '@/hooks/useRedirect';
import { usePathname } from 'next/navigation';

interface HomeProps {
  children: React.ReactNode;
}

const config = [
  {
    title: 'Button组件',
    examples: [lazy(() => import('@/components/v2/Common/Button/example'))]
  },
  {
    title: 'Icon组件',
    examples: [lazy(() => import('@/components/v2/Common/Icon/example'))]
  }
];

const Home: NextPage<HomeProps> = (props) => {
  const [selectIndex, setSelectIndex] = useState(0);
  const { redirectToUrl } = useRedirect();
  const pathname = usePathname();

  useEffect(() => {
    if (!process.env.IS_DEV && pathname === '/component/common') {
      redirectToUrl('/404');
    }
  }, []);
  if (!process.env.IS_DEV && pathname === '/component/common') return null;
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
