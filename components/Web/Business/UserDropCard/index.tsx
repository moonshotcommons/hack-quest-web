import { BurialPoint } from '@/helper/burialPoint';
import { useRedirect } from '@/hooks/useRedirect';
import { LoginResponse } from '@/service/webApi/user/type';
import Image from 'next/image';
import Link from 'next/link';
import { useShallow } from 'zustand/react/shallow';

import { FC } from 'react';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { BiUser, BiLockAlt, BiLogInCircle } from 'react-icons/bi';
interface UserDropCardProps {
  // children: ReactNode;
  userInfo: LoginResponse;
  onClose: () => void;
}

const UserInfo: FC<Omit<UserDropCardProps, 'onClose'>> = ({ userInfo }) => {
  return (
    <div className="w-full flex flex-col items-center px-[30px]">
      <div className="relative w-[80px] h-[80px]  overflow-hidden rounded-full">
        <Image
          src={userInfo?.avatar}
          alt="avatar"
          fill
          className="object-cover"
        ></Image>
      </div>
      <div className="text-h5 mt-[10px] text-neutral-black">
        {userInfo?.nickname}
      </div>
      <div className="body-s text-neutral-medium-gray mt-[5px]">
        {userInfo?.email}
      </div>
    </div>
  );
};

const UserDropCard: FC<UserDropCardProps> = (props) => {
  const { userInfo, onClose } = props;
  const { setAuthType, userSignOut, setSettingsOpen } = useUserStore(
    useShallow((state) => ({
      setAuthType: state.setAuthType,
      userSignOut: state.userSignOut,
      setSettingsOpen: state.setSettingsOpen
    }))
  );
  const { redirectToUrl } = useRedirect();
  const signOut = () => {
    setAuthType(AuthType.LOGIN);
    userSignOut();
    BurialPoint.track('登出');
  };

  return (
    <div className="relative  py-[20px] bg-neutral-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] rounded-[10px]">
      <div className="min-w-[220px] flex flex-col text-neutral-black body-s">
        <UserInfo userInfo={userInfo}></UserInfo>
        <Link href={'/user/profile'} className="w-full">
          <div
            className="w-full mt-[8px] py-[12px] px-[30px]  flex items-center gap-[12px] cursor-pointer hover:bg-neutral-off-white"
            onClick={() => {
              onClose();
              BurialPoint.track('profile');
            }}
          >
            <span>
              <BiUser size={24}></BiUser>
            </span>
            <span className="">Profile</span>
          </div>
        </Link>
        <div
          className="w-full py-[12px] px-[30px] flex items-center gap-[12px] cursor-pointer hover:bg-neutral-off-white"
          onClick={() => {
            onClose();
            setSettingsOpen(true);
            BurialPoint.track('settings');
          }}
        >
          <span>
            <BiLockAlt size={24}></BiLockAlt>
          </span>
          <span className="">Change Password</span>
        </div>
        <div
          className="w-full py-[12px] px-[30px] flex items-center gap-[12px] cursor-pointer hover:bg-neutral-off-white"
          onClick={() => {
            signOut();
            onClose();
          }}
        >
          <span>
            <BiLogInCircle size={24}></BiLogInCircle>
          </span>
          <span className="">Sign Out</span>
        </div>
      </div>
    </div>
  );
};

export default UserDropCard;
