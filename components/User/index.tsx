import { FC, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import Avatar from '@/public/images/user/login_avatar.svg';
import Image from 'next/image';
import UserDropCard from './UserDropCard';
import { useClickAway } from 'ahooks';
import { shallowEqual, useSelector } from 'react-redux';
import { AppRootState } from '@/store/redux';
import Link from 'next/link';
import Settings from './Settings';
import RightIcon from '../Common/Icon/Right';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import Button from '../Common/Button';
interface UserProps {
  // children: ReactNode;
}

const User: FC<UserProps> = (props) => {
  const [showUserDropCard, setShowUserDropCard] = useState(false);
  const userDropCardRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const userInfo = useGetUserInfo();
  useEffect(() => {
    if (userInfo) setIsLogin(true);
  }, [userInfo]);

  return (
    <div className="relative h-full">
      <div
        className="h-full flex items-center"
        ref={userDropCardRef as any}
        onMouseEnter={(e) => setShowUserDropCard(true)}
        onMouseLeave={(e) => setShowUserDropCard(false)}
      >
        <div className="cursor-pointer h-full flex items-center justify-end">
          {isLogin && (
            <div className="relative w-[2.5rem] h-[40px] bg-[#8d8d8d] overflow-hidden rounded-full flex justify-center items-center">
              <Image
                src={userInfo?.avatar as string}
                alt="avatar"
                fill
                className="object-cover"
              ></Image>
            </div>
          )}
          {!isLogin && (
            <Link href={'/auth/login'}>
              {/* <div className="w-fit whitespace-nowrap flex items-center  px-8 py-3 font-next-book leading-[128%] text-[#F5F5F5] text-[.875rem] rounded-[5rem] border border-solid hover:bg-white hover:text-black border-[#F5F5F5] gap-[0.62rem]">
                <div>Login To Learn Now</div>
                <RightIcon></RightIcon>
              </div> */}
              <Button
                type="primary"
                className="bg-navbar-login-button-bg text-navbar-login-button-text-color font-next-book font-normal tracking-[.01rem] px-[2rem] py-[.75rem]"
                icon={<RightIcon />}
                iconPosition="right"
              >
                Login To Learn Now
              </Button>
            </Link>
          )}
        </div>
        {userInfo && showUserDropCard ? (
          <div className="absolute z-[999] -right-[0.75rem] top-[4.75rem]">
            <UserDropCard
              userInfo={userInfo || ({} as any)}
              onClose={() => setShowUserDropCard(false)}
            ></UserDropCard>
          </div>
        ) : null}
      </div>
      <Settings></Settings>
    </div>
  );
};

export default User;
