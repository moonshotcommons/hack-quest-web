import Button, { ButtonProps } from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import { NextPage } from 'next';
import Image from 'next/image';
import { FC, useState } from 'react';
import Robot from '@/public/images/login/robot.svg';
import MoonLeft from '@/public/images/other/dark-moon_left.svg';
import MoonRight from '@/public/images/other/dark-moon_right.png';
import Link from 'next/link';
interface CompleteModalProps {
  open: boolean;
  onClose: () => void;
  // title: string;
}

// const CustomButton: FC<ButtonProps> = (props) => {
//   const { children } = props;
//   return (
//     <Button
//       padding="px-[2.5rem] py-[1.25rem]"
//       fontStyle="font-Sofia-Pro-Light-Az font-normal"
//       textStyle="text-[1rem] text-white leading-[1.25rem]"
//       {...props}
//     >
//       {children}
//     </Button>
//   );
// };

const WhiteListModal: NextPage<CompleteModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-[74.0625rem] h-[35.6875rem] bg-[#141414] rounded-[2.5rem] m-auto flex flex-col items-center relative overflow-hidden">
        <div className="absolute left-0 top-0">
          <Image src={MoonLeft} alt="bg"></Image>
        </div>
        <div className="absolute right-0 top-0">
          <Image src={MoonRight} alt="bg"></Image>
        </div>
        <div className="absolute top-[7.375rem] left-[50%] -translate-x-[50%]">
          <Image src={Robot} alt="completed" width={45} height={50}></Image>
        </div>
        <h1
          className="
            relative text-center w-[34.625rem] font-next-poster-Bold
            text-[2.2021rem] leading-[100%] text-[#f2f2f2] mt-[11.6875rem]
            after:absolute after:h-[1px] after:scale-y-[1] after:w-[27.75rem] after:bg-[#282828] after:-top-[1.5625rem] after:left-[50%] after:-translate-x-[50%]
            before:absolute before:h-[1px] before:scale-y-[1] before:w-full before:bg-[#282828] before:-bottom-[1.3125rem] before:left-0
            "
        >
          MVP Invitation Needed
        </h1>
        <p className="w-[29.1875rem] font-next-book text-center text-[1.25rem] text-[#F2F2F2] mt-[2.375rem] leading-[110%] z-[51]">
          Sorry our site is currently only available for invited MVP user. If
          you’d like to join our whitelist, please email us at
          <a
            href="mailto:founder@hackquest.io"
            className="ml-2 cursor-pointer underline"
            target="_blank"
          >
            founder@hackquest.io.
          </a>
        </p>
        <div className="flex gap-[1.25rem] mt-[3.75rem]">
          <Button
            className="border solid border-[#2A2A2A] hover:bg-white hover:text-black"
            onClick={onClose}
          >
            Close
          </Button>
          <Link
            href={'mailto:founder@hackquest.io'}
            onClick={onClose}
            target="_blank"
          >
            <Button className="border solid border-white hover:bg-white hover:text-black">
              Email Us
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default WhiteListModal;
