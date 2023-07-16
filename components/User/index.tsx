import { FC, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import Avatar from '@/public/images/user/login_avatar.svg';
import Image from 'next/image';
import UserDropCard from './UserDropCard';
import { useClickAway } from 'ahooks';
import { shallowEqual, useSelector } from 'react-redux';
import { AppRootState } from '@/store/redux';
import Link from 'next/link';
import Settings from './Settings';
interface UserProps {
  // children: ReactNode;
}

const User: FC<UserProps> = (props) => {
  const [showUserDropCard, setShowUserDropCard] = useState(false);
  const userDropCardRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const userInfo = useSelector((state: AppRootState) => {
    return state.user.userInfo;
  }, shallowEqual);
  // useClickAway(() => {
  //   if (showUserDropCard) {
  //     setShowUserDropCard(false);
  //   }
  // }, userDropCardRef);
  useEffect(() => {
    if (userInfo) setIsLogin(true);
  }, []);

  return (
    <div className="relative h-full">
      <div
        className="h-full flex items-center"
        ref={userDropCardRef as any}
        onMouseEnter={(e) => setShowUserDropCard(true)}
        onMouseLeave={(e) => setShowUserDropCard(false)}
      >
        <div className="cursor-pointer h-full flex items-center w-[4rem] justify-end">
          {isLogin && (
            <Image
              src={userInfo?.avatar as string}
              alt="avatar"
              width={40}
              height={40}
            ></Image>
          )}
          {!isLogin && (
            <Link
              href={'/auth/login'}
              className="text-[#F2F2F2] font-next-book-bold"
            >
              Login
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
