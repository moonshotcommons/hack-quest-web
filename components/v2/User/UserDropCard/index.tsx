import SettingIcon from '@/components/Common/Icon/Setting';
import SignOutIcon from '@/components/Common/Icon/SignOut';
import { BurialPoint } from '@/helper/burialPoint';
import { LoginResponse } from '@/service/webApi/user/type';
import {
  UnLoginType,
  setSettingsOpen,
  setUnLoginType,
  userSignOut
} from '@/store/redux/modules/user';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { AiFillCaretUp } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import ArrowUp from '@/public/images/user/arrow_up.png';
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
    router.push('/');
    dispatch(setUnLoginType(UnLoginType.LOGIN));
    dispatch(userSignOut());
    BurialPoint.track('登出');
  };

  return (
    <div className="w-[25.875rem] relative p-[2.5rem] pb-0 bg-[#0b0b0b] font-next-book shadow-[0_0_6px_rgba(255,255,255,0.3)] rounded-[10px]">
      {/* <AiFillCaretUp
        size={40}
        style={{
          color: 'red',
          // filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15))',
          textShadow: '0px 4px 8px red'
        }}
        className="absolute -top-[27px] right-[10px]"
      /> */}
      <div className="absolute -top-[21px] right-[10px] ">
        <Image src={ArrowUp} alt="arrow" width={47}></Image>
      </div>

      <UserInfo userInfo={userInfo}></UserInfo>
      <div
        className="relative mt-[2rem] w-full py-[2rem] text-setting-drop-handler-color border-t border-setting-drop-user-border flex justify-start items-center gap-[1.25rem] cursor-pointer"
        onClick={() => {
          onClose();
          dispatch(setSettingsOpen(true));
          BurialPoint.track('settings');
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
