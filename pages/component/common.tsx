import Button, { ButtonProps } from '@/components/Common/Button';
import Dropdown, { ChildrenDropDown } from '@/components/Common/DropDown';
import Modal from '@/components/Common/Modal';
import { render } from '@testing-library/react';
import { NextPage } from 'next';
import Image from 'next/image';
import { FC, useState } from 'react';
import Congrats from '@/public/images/course/congrats.svg';
import MoonLeft from '@/public/images/other/moon_left.svg';
import MoonRight from '@/public/images/other/moon_right.png';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
interface HomeProps {
  children: React.ReactNode;
}

const CustomButton: FC<ButtonProps> = (props) => {
  const { children } = props;
  return (
    <Button
      padding="px-[2.5rem] py-[1.25rem]"
      fontStyle="font-Sofia-Pro-Light-Az font-normal"
      textStyle="text-[1rem] text-white leading-[1.25rem]"
      {...props}
    >
      {children}
    </Button>
  );
};

const Home: NextPage<HomeProps> = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {/* <Button onClick={() => setOpen(true)}>测试打开</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-[74.0625rem] h-[35.6875rem] bg-[#141414] rounded-[2.5rem] m-auto flex flex-col items-center relative overflow-hidden">
          <div className="absolute left-0 top-0">
            <Image src={MoonLeft} alt="bg"></Image>
          </div>
          <div className="absolute right-0 top-0">
            <Image src={MoonRight} alt="bg"></Image>
          </div>
          <div className="absolute top-[7.375rem] left-[50%] -translate-x-[50%]">
            <Image
              src={Congrats}
              alt="completed"
              width={45}
              height={50}
            ></Image>
          </div>
          <h1
            className="
            relative text-center w-[34.625rem] font-next-poster-Bold
            text-[2.2021rem] leading-[100%] text-[#f2f2f2] mt-[11.6875rem]
            after:absolute after:h-[1px] after:scale-y-[1] after:w-[27.75rem] after:bg-[#282828] after:-top-[1.5625rem] after:left-[50%] after:-translate-x-[50%]
            before:absolute before:h-[1px] before:scale-y-[1] before:w-full before:bg-[#282828] before:-bottom-[1.3125rem] before:left-0
            "
          >
            Congrats!
          </h1>
          <p className="font-next-book text-[1.25rem] text-[#F2F2F2] mt-[2.375rem] leading-[128%]">{`By this point, you've completed the guided project!`}</p>
          <div className="flex gap-[1.25rem] mt-[3.75rem]">
            <CustomButton className="border solid border-[#2A2A2A]">
              Close
            </CustomButton>
            <CustomButton className="border solid border-white">
              All Course
            </CustomButton>
          </div>
        </div>
      </Modal> */}
      <Player
        autoplay
        loop
        src="/test.json"
        // style={{ height: '300px', width: '300px' }}
      >
        {/* <Controls
          visible={true}
          buttons={['play', 'repeat', 'frame', 'debug']}
        /> */}
      </Player>
    </div>
  );
};

export default Home;
