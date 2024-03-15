import HackLogo from '@/public/images/logo/hack_logo.png';
import Image from 'next/image';
import React from 'react';

import { useRedirect } from '@/hooks/useRedirect';
import { IoExitOutline, IoPlayOutline } from 'react-icons/io5';
import { MenuLink } from '../../BasePage/Navbar/type';
import { LearnPageType, useCourseStore } from '@/store/zustand/courseStore';
import { FiSave } from 'react-icons/fi';
import { useShallow } from 'zustand/react/shallow';
import {
  CreationHandle,
  useUgcCreationStore
} from '@/store/zustand/ugcCreationStore';

export interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const { redirectToUrl } = useRedirect();
  const { learnPageType, learnPageTitle } = useCourseStore(
    useShallow((state) => ({
      learnPageTitle: state.learnPageTitle,
      learnPageType: state.learnPageType
    }))
  );
  const { loading, setHandle, handle } = useUgcCreationStore(
    useShallow((state) => ({
      loading: state.loading,
      setHandle: state.setHandle,
      handle: state.handle
    }))
  );
  const logoClick = () => {
    redirectToUrl(MenuLink.DASHBOARD);
  };
  const ugcCreateSave = () => {
    if (loading) return;
    setHandle(CreationHandle.ON_SAVE);
  };
  const renderRight = () => {
    switch (learnPageType) {
      case LearnPageType.UGC_CREATION:
        return (
          <div className="flex w-[123px] cursor-pointer items-center justify-end gap-[20px]">
            <FiSave
              size={26}
              onClick={ugcCreateSave}
              className={`${loading || handle === CreationHandle.ON_SAVE ? 'cursor-not-allowed' : ''}`}
            />
            <IoPlayOutline size={26} />
            <div className="h-[24px] w-[0.5px] bg-neutral-white"></div>
            <IoExitOutline
              size={26}
              onClick={() => redirectToUrl(MenuLink.INSTRUCTOR)}
            />
          </div>
        );
      default:
        return (
          <div
            className="flex w-[123px] cursor-pointer items-center justify-end"
            onClick={logoClick}
          >
            <IoExitOutline size={24} />
            <span className="body-l ml-[7px]">Exit</span>
          </div>
        );
    }
  };
  return (
    <nav className="flex h-[64px] w-full items-center px-[40px] text-neutral-white">
      <Image
        src={HackLogo}
        alt="log"
        width={133}
        className="cursor-pointer"
        onClick={logoClick}
      ></Image>
      <div className="text-h4 flex-1 text-center">{learnPageTitle}</div>
      {renderRight()}
    </nav>
  );
};

export default NavBar;
