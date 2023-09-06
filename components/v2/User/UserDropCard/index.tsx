import SettingIcon from '@/components/Common/Icon/Setting';
import SignOutIcon from '@/components/Common/Icon/SignOut';
import { LoginResponse } from '@/service/webApi/user/type';
import { setSettingsOpen, userSignOut } from '@/store/redux/modules/user';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, ReactNode, useContext } from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '@/public/images/user/login_avatar.svg';
import { ThemeContext } from '@/store/context/theme';
import { Theme } from '@/constants/enum';
import ThemeIcon from '@/components/Common/Icon/Theme';
import Switch from '@/components/Common/Switch';
import { AiFillCaretUp } from 'react-icons/ai';
interface UserDropCardProps {
  // children: ReactNode;
  userInfo: LoginResponse;
  onClose: () => void;
}

const UserInfo: FC<Omit<UserDropCardProps, 'onClose'>> = ({ userInfo }) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* <div className="w-[7.5rem] h-[7.5rem] rounded-full bg-white"> */}
      <div className="relative w-[7.5rem] bg-[#8d8d8d] h-[7.5rem] overflow-hidden rounded-full">
        <Image
          src={userInfo?.avatar}
          alt="avatar"
          fill
          className="object-cover"
        ></Image>
      </div>
      {/* </div> */}
      <div className="font-next-poster-Bold text-[1.5rem] leading-[110%] tracking-[0.03rem] mt-[0.75rem] text-setting-drop-user-name-color">
        {userInfo?.name}
      </div>
      <div className="text-setting-drop-user-color text-[1rem] font-next-book leading-[120%] mt-[0.5rem]">
        {userInfo?.email}
      </div>
    </div>
  );
};

const UserDropCard: FC<UserDropCardProps> = (props) => {
  const { userInfo, onClose } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const signOut = () => {
    dispatch(userSignOut());
    router.reload();
  };

  return (
    <div className="w-[25.875rem] relative p-[2.5rem] pb-10 bg-setting-drop-card-bg font-next-book box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);   rounded-[10px]">
      <AiFillCaretUp
        size={40}
        className="absolute -top-[27px] right-[10px] text-setting-drop-card-bg"
      />
      <UserInfo userInfo={userInfo}></UserInfo>
      <div
        className="relative mt-[2rem] w-full py-[2rem] text-setting-drop-handler-color border-t border-setting-drop-user-border flex justify-start items-center gap-[1.25rem] cursor-pointer"
        onClick={() => {
          onClose();
          dispatch(setSettingsOpen(true));
        }}
      >
        <span>
          <SettingIcon size={24} color="currentColor"></SettingIcon>
        </span>
        <span className="text-[1rem] leading-[120%]">Settings</span>
      </div>
      <div
        className="relative w-full text-setting-drop-handler-color py-[2rem] border-t border-setting-drop-user-border  flex justify-start items-center gap-[1.25rem] cursor-pointer"
        onClick={() => {
          signOut();
          onClose();
        }}
      >
        <span>
          <SignOutIcon color="currentColor" size={24}></SignOutIcon>
        </span>
        <span className="text-[1rem] leading-[120%]">Sign out</span>
      </div>
    </div>
  );
};

export default UserDropCard;
