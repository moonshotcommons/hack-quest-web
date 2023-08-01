import SettingIcon from '@/components/Common/Icon/Setting';
import SignOutIcon from '@/components/Common/Icon/SignOut';
import { LoginResponse } from '@/service/webApi/user/type';
import { setSettingsOpen, userSignOut } from '@/store/redux/modules/user';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '@/public/images/user/login_avatar.svg';
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
      <div className="font-next-poster-Bold text-[1.5rem] font-bold leading-[110%] tracking-[0.03rem] mt-[0.75rem] text-white">
        {userInfo?.name}
      </div>
      <div className="text-[#676767] text-[1rem] font-next-book leading-[120%] mt-[0.5rem]">
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
    <div className="w-[25.875rem] h-[27.5625rem] p-[2.5rem] bg-[#131313] border border-solid border-[#5B5B5B] rounded-[2.5rem]">
      <UserInfo userInfo={userInfo}></UserInfo>
      <div
        className="relative mt-[2rem] w-full py-[2rem] top-line flex justify-start gap-[1.25rem] cursor-pointer"
        onClick={() => {
          onClose();
          dispatch(setSettingsOpen(true));
        }}
      >
        <span>
          <SettingIcon size={24} color="#EDEDED"></SettingIcon>
        </span>
        <span className="text-[#676767] font-next-book text-[1rem] leading-[120%]">
          Settings
        </span>
      </div>
      <div
        className="relative w-full py-[2rem] top-line flex justify-start gap-[1.25rem] cursor-pointer"
        onClick={() => {
          signOut();
          onClose();
        }}
      >
        <span>
          <SignOutIcon color="white" size={24}></SignOutIcon>
        </span>
        <span className="text-[#676767] font-next-book text-[1rem] leading-[120%]">
          Sign out
        </span>
      </div>
    </div>
  );
};

export default UserDropCard;
