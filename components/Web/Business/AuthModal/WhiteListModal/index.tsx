import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import { NextPage } from 'next';
import Image from 'next/image';
import { useContext } from 'react';
import Robot from '@/public/images/login/robot.svg';
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
  // title: string;
}

const WhiteListModal: NextPage<CompleteModalProps> = ({ open, onClose }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative m-auto flex h-[35.6875rem] w-[74.0625rem] flex-col items-center overflow-hidden rounded-[2.5rem] bg-lesson-completed-modal-bg">
        <div className="absolute left-0 top-0">
          {theme === Theme.Dark && <Image src={DarkMoonLeft} alt="bg"></Image>}
          {theme === Theme.Light && <Image src={LightMoonLeft} alt="bg"></Image>}
        </div>
        <div className="absolute right-0 top-0">
          {theme === Theme.Dark && <Image src={DarkMoonRight} alt="bg"></Image>}
          {theme === Theme.Light && <Image src={LightMoonRight} alt="bg"></Image>}
        </div>
        <div className="absolute left-[50%] top-[7.375rem] -translate-x-[50%]">
          <Image src={Robot} alt="completed" width={45} height={50}></Image>
        </div>
        <h1
          className="
          text-h2 relative mt-[11.6875rem] w-[34.625rem]
          text-center text-text-default-color
          before:absolute before:-bottom-[1.3125rem] before:left-0 before:h-[1px] before:w-full before:scale-y-[1] before:bg-lesson-completed-modal-line-color after:absolute
          after:-top-[1.5625rem] after:left-[50%] after:h-[1px] after:w-[27.75rem] after:-translate-x-[50%]  after:scale-y-[1] after:bg-lesson-completed-modal-line-color
            "
        >
          MVP Invitation Needed
        </h1>
        <p className="body-l z-[51] mt-[2.375rem] w-[29.1875rem] text-center text-text-default-color">
          Sorry our site is currently only available for invited MVP user. If you’d like to join our whitelist, please
          email us at
          <a href="mailto:founder@hackquest.io" className="ml-2 cursor-pointer underline" target="_blank">
            founder@hackquest.io.
          </a>
        </p>
        <div className="mt-[3.75rem] flex gap-[1.25rem]">
          <Button
            className="border border-lesson-ghost-border-color bg-lesson-ghost-button-bg px-[3rem] py-[1rem] text-lesson-ghost-button-text-color"
            onClick={onClose}
          >
            Close
          </Button>
          <Link href={'mailto:founder@hackquest.io'} onClick={onClose} target="_blank">
            <Button className="border border-lesson-primary-button-border-color bg-lesson-primary-button-bg px-[3rem] py-[1rem]  text-lesson-primary-button-text-color">
              Email Us
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default WhiteListModal;
