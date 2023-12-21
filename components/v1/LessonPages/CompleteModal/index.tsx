import Button from '@/components/v2/Common/Button';
import Modal from '@/components/v2/Common/Modal';
import { NextPage } from 'next';
import Image from 'next/image';
import { useContext } from 'react';
import Congrats from '@/public/images/course/congrats.svg';
import DarkMoonLeft from '@/public/images/other/dark-moon_left.svg';
import LightMoonLeft from '@/public/images/other/light-moon_left.svg';
import DarkMoonRight from '@/public/images/other/dark-moon_right.png';
import LightMoonRight from '@/public/images/other/light-moon_right.png';
import Link from 'next/link';
import { ThemeContext } from '@/store/context/theme';
import { Theme } from '@/constants/enum';
interface CompleteModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
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

const CompleteModal: NextPage<CompleteModalProps> = ({
  open,
  onClose,
  title
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-[74.0625rem] h-[35.6875rem] bg-lesson-completed-modal-bg rounded-[2.5rem] m-auto flex flex-col items-center relative overflow-hidden">
        <div className="absolute left-0 top-0">
          {theme === Theme.Dark && <Image src={DarkMoonLeft} alt="bg"></Image>}
          {theme === Theme.Light && (
            <Image src={LightMoonLeft} alt="bg"></Image>
          )}
        </div>
        <div className="absolute right-0 top-0">
          {theme === Theme.Dark && <Image src={DarkMoonRight} alt="bg"></Image>}
          {theme === Theme.Light && (
            <Image src={LightMoonRight} alt="bg"></Image>
          )}
        </div>
        <div className="absolute top-[7.375rem] left-[50%] -translate-x-[50%]">
          <Image src={Congrats} alt="completed" width={45} height={50}></Image>
        </div>
        <h1
          className="
            relative text-center w-[34.625rem] font-next-poster-Bold
            text-[2.2021rem] leading-[100%] text-text-default-color mt-[11.6875rem]
            after:absolute after:h-[1px] after:scale-y-[1] after:w-[27.75rem] after:bg-lesson-completed-modal-line-color after:-top-[1.5625rem] after:left-[50%] after:-translate-x-[50%]
            before:absolute before:h-[1px] before:scale-y-[1] before:w-full before:bg-lesson-completed-modal-line-color  before:-bottom-[1.3125rem] before:left-0
            "
        >
          Congrats!
        </h1>
        <p className="font-next-book text-[1.25rem] text-text-default-color mt-[2.375rem] leading-[128%]">
          {title}
        </p>
        <div className="flex gap-[1.25rem] mt-[3.75rem]">
          <Button
            className="bg-lesson-ghost-button-bg text-lesson-ghost-button-text-color border border-lesson-ghost-border-color px-[3rem] py-[1rem]"
            onClick={onClose}
          >
            Close
          </Button>
          <Link href={'/courses'} onClick={onClose}>
            {/* <Button className="border solid border-white hover:bg-white hover:text-black">
              All Course
            </Button> */}
            <Button className="bg-lesson-primary-button-bg text-lesson-primary-button-text-color border border-lesson-primary-button-border-color font-next-book px-[3rem] py-[1rem]">
              All Course
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default CompleteModal;
