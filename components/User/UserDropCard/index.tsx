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
interface UserDropCardProps {
  // children: ReactNode;
  userInfo: LoginResponse;
  onClose: () => void;
}

const UserInfo: FC<Omit<UserDropCardProps, 'onClose'>> = ({ userInfo }) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* <div className="w-[7.5rem] h-[7.5rem] rounded-full bg-white"> */}
      <div className="relative w-[7.5rem] h-[7.5rem] overflow-hidden rounded-full">
        <Image
          src={userInfo?.avatar}
          alt="avatar"
          fill
          className="object-cover"
        ></Image>
      </div>
      {/* </div> */}
      <div className="font-next-poster-Bold text-[1.5rem] font-bold leading-[110%] tracking-[0.03rem] mt-[0.75rem] text-text-default-color">
        {userInfo?.name}
      </div>
      <div className="text-setting-dropcard-text-color text-[1rem] font-next-book leading-[120%] mt-[0.5rem]">
        {userInfo?.email}
      </div>
    </div>
  );
};

const UserDropCard: FC<UserDropCardProps> = (props) => {
  const { userInfo, onClose } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const { setTheme, theme } = useContext(ThemeContext);
  const signOut = () => {
    dispatch(userSignOut());
    router.reload();
  };

  return (
    <div className="w-[25.875rem] p-[2.5rem] pb-0 bg-setting-dropcard-bg border border-solid border-setting-dropcard-border-color rounded-[2.5rem]">
      <UserInfo userInfo={userInfo}></UserInfo>
      <div
        className="relative mt-[2rem] w-full py-[2rem] top-line flex justify-start items-center gap-[1.25rem] cursor-pointer"
        onClick={() => {
          onClose();
          dispatch(setSettingsOpen(true));
        }}
      >
        <span className="text-setting-dropcard-text-color">
          <SettingIcon size={24} color="currentColor"></SettingIcon>
        </span>
        <span className="text-setting-dropcard-text-color font-next-book text-[1rem] leading-[120%]">
          Settings
        </span>
      </div>
      <div
        className="relative w-full py-[2rem] top-line flex justify-start items-center gap-[1.25rem] cursor-pointer"
        onClick={() => {
          signOut();
          onClose();
        }}
      >
        <span className="text-text-default-color">
          <SignOutIcon color="currentColor" size={24}></SignOutIcon>
        </span>
        <span className="text-setting-dropcard-text-color font-next-book text-[1rem] leading-[120%]">
          Sign out
        </span>
      </div>
      <div className="relative w-full py-[2rem] top-line flex justify-start gap-[1.25rem] items-center cursor-pointer">
        <span className="text-text-default-color">
          <ThemeIcon size={24} color="currentColor"></ThemeIcon>
        </span>
        <span className="text-setting-dropcard-text-color font-next-book text-[1rem] leading-[120%]">
          Dark theme
        </span>
        <div className="flex-1 flex justify-end mr-2">
          <span>
            <Switch
              defaultValue={theme === Theme.Dark}
              onChange={(v) => {
                if (v) setTheme(Theme.Dark);
                else setTheme(Theme.Light);
              }}
            ></Switch>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserDropCard;
