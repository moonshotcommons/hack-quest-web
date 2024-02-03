'use client';
import Modal from '@/components/Common/Modal';
import { ForwardRefRenderFunction, forwardRef } from 'react';
import { IDE_LIST } from './constant';
import Image from 'next/image';
import Link from 'next/link';
import { HACKQUEST_DISCORD } from '@/constants/links';
import { useGlobalStore } from '@/store/zustand/globalStore';

interface PlaygroundSelectModalProps {}

const PlaygroundSelectModal: ForwardRefRenderFunction<
  unknown,
  PlaygroundSelectModalProps
> = (props, ref) => {
  const playgroundSelectModalOpen = useGlobalStore(
    (state) => state.playgroundSelectModalOpen
  );
  const setPlaygroundSelectModalOpen = useGlobalStore(
    (state) => state.setPlaygroundSelectModalOpen
  );

  return (
    <Modal
      open={playgroundSelectModalOpen}
      onClose={() => {
        setPlaygroundSelectModalOpen(false);
      }}
      showCloseIcon
      icon={
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -right-2 -top-2"
        >
          <path
            d="M21.7099 20.29C21.8993 20.4778 22.0057 20.7334 22.0057 21C22.0057 21.2666 21.8993 21.5222 21.7099 21.71C21.5222 21.8993 21.2666 22.0058 20.9999 22.0058C20.7333 22.0058 20.4777 21.8993 20.2899 21.71L11.9999 13.41L3.70994 21.71C3.52217 21.8993 3.26658 22.0058 2.99994 22.0058C2.7333 22.0058 2.47771 21.8993 2.28994 21.71C2.10063 21.5222 1.99414 21.2666 1.99414 21C1.99414 20.7334 2.10063 20.4778 2.28994 20.29L10.5899 12L2.28994 3.70999C2.03628 3.45634 1.93722 3.08662 2.03006 2.74012C2.12291 2.39361 2.39356 2.12296 2.74006 2.03012C3.08657 1.93727 3.45628 2.03634 3.70994 2.28999L11.9999 10.59L20.2899 2.28999C20.6821 1.89787 21.3178 1.89787 21.7099 2.28999C22.1021 2.68212 22.1021 3.31787 21.7099 3.70999L13.4099 12L21.7099 20.29Z"
            fill="#231F20"
          />
        </svg>
      }
    >
      <div className="mx-auto w-[67.75rem] rounded-[1rem] bg-neutral-white px-[8rem] py-[4rem] text-center">
        <h3 className="text-h3 text-neutral-black">Playground - Online IDE</h3>
        <p className="body-s mt-4 text-neutral-black ">
          Please choose a Web3 language you want to try.
        </p>
        <div className="my-8 flex gap-3 ">
          {IDE_LIST.map((ide) => {
            return (
              <Link
                href={ide.link}
                key={ide.title}
                target="_blank"
                className="group w-[calc(50%-12px)] cursor-pointer rounded-[16px] border-[3px] border-neutral-off-white bg-neutral-white p-6
                transition-all hover:border-neutral-medium-gray hover:bg-neutral-off-white focus:outline-none
                "
                onClick={() => {
                  // setPlaygroundSelectModalOpen(false);
                }}
              >
                <div className="flex items-center justify-between">
                  <h5 className="text-h5 text-neutral-black">{ide.title}</h5>
                  <div className="relative flex h-[48px] w-[48px] items-center justify-center rounded-full border border-neutral-medium-gray group-hover:border-neutral-black group-hover:bg-neutral-white">
                    <Image
                      src={ide.icon}
                      width={ide.iconWidth}
                      height={ide.iconHeight}
                      alt={ide.title}
                      className="contrast-0 group-hover:contrast-100"
                    ></Image>
                  </div>
                </div>
                <p className="body-s mt-6 text-left text-neutral-black">
                  {ide.description}
                </p>
              </Link>
            );
          })}
        </div>
        <div className="caption-14pt flex justify-center gap-4 pt-4 text-neutral-black">
          <span>Need any help?</span>
          <Link
            href={HACKQUEST_DISCORD}
            className="flex items-center hover:underline"
            target="_blank"
          >
            <span className="mr-[6px]">Join Discord</span>
            <svg
              width="12"
              height="9"
              viewBox="0 0 12 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4C0.723858 4 0.5 4.22386 0.5 4.5C0.5 4.77614 0.723858 5 1 5L1 4ZM11.3536 4.85356C11.5488 4.65829 11.5488 4.34171 11.3536 4.14645L8.17157 0.964467C7.97631 0.769205 7.65973 0.769205 7.46447 0.964467C7.2692 1.15973 7.2692 1.47631 7.46447 1.67157L10.2929 4.5L7.46447 7.32843C7.2692 7.52369 7.2692 7.84027 7.46447 8.03554C7.65973 8.2308 7.97631 8.2308 8.17157 8.03554L11.3536 4.85356ZM1 5L11 5L11 4L1 4L1 5Z"
                fill="#0B0B0B"
              />
            </svg>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default forwardRef(PlaygroundSelectModal);
