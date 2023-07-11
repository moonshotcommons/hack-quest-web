import { Image, Space } from 'antd';
import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import celebrate from './celebrate.png';
import { Button } from '../Button';
import { CelebrateCardWrapper } from './style';
export interface IProps {
  children?: ReactElement;
  open: boolean;
  next: Function;
  close: Function;
  // ...
}
const Celebrate: FC<IProps> = memo(function (props) {
  const { children, next, close, open } = props;
  return (
    <CelebrateCardWrapper>
      {open && (
        <>
          <div className="h-[4.1rem]">
            <div
              className={`flex bg-black justify-between w-[12.11rem] h-[4.1rem] bg-contain bg-no-repeat rounded-[32px] cursor-pointer overflow-hidden z-40`}
            >
              <div className='left w-[2.94rem] float-left h-full bg-[url("/src/assets/image/guided-project/leftMoon.png")] z-20 animate__animated animate__fadeInLeft'></div>
              <div className="flex flex-col gap-1">
                <p className="ml-[1.5rem]">
                  <Image src={celebrate as any} preview={false}></Image>
                  <p style={{ border: '1px solid #202020' }}></p>
                </p>
                <p className="text-[.3rem] ml-[.3rem] text-white font-bold font-[NEXT-Book-Light-Trial]">
                  UNIT COMPLETE
                </p>
                <div className="mt-[20px] ml-[1rem] text-[.2rem]">
                  Chapter title
                </div>
                <Space size={'large'} className="mt-[.4rem]">
                  <button
                    style={{ borderRadius: '25px' }}
                    className="w-[1.5rem] h-[0.5rem] cursor-pointer border-[1px] border-[#FFFFFF] rounded-[4px] text-[.2rem] text-[#FFFFFF] font-bold font-[NEXT-Book-Light-Trial]"
                    onClick={() => {
                      close();
                    }}
                  >
                    Close
                  </button>
                  <button
                    style={{ borderRadius: '25px' }}
                    className="w-[1.5rem] h-[0.5rem] cursor-pointer border-[1px] border-[#FFFFFF] rounded-[4px] text-[.2rem] text-[#FFFFFF] font-bold font-[NEXT-Book-Light-Trial]"
                    onClick={() => {
                      next();
                    }}
                  >
                    Next
                  </button>
                </Space>
              </div>
              <div className='right w-[3.12rem] float-right h-full bg-[url("/src/assets/image/guided-project/rightMoon.png")] z-20 animate__animated animate__fadeInRight'></div>
            </div>
          </div>
          <div className="mask"></div>
        </>
      )}
    </CelebrateCardWrapper>
  );
});
export default Celebrate;
Celebrate.displayName = 'Celebrate';
