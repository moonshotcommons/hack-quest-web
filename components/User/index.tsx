import { FC, ReactNode, RefObject, useRef, useState } from 'react';
import Avatar from '@/public/images/user/login_avatar.svg';
import Image from 'next/image';
import UserDropCard from './UserDropCard';
import { useClickAway } from 'ahooks';
import { shallowEqual, useSelector } from 'react-redux';
import { AppRootState } from '@/store/redux';
import Link from 'next/link';
interface UserProps {
  // children: ReactNode;
}

const User: FC<UserProps> = (props) => {
  const [showUserDropCard, setShowUserDropCard] = useState(false);
  const userDropCardRef = useRef();

  const userInfo = useSelector((state: AppRootState) => {
    return state.user.userInfo;
  }, shallowEqual);
  // useClickAway(() => {
  //   if (showUserDropCard) {
  //     setShowUserDropCard(false);
  //   }
  // }, userDropCardRef);

  return (
    <div
      className="relative h-full flex items-center"
      ref={userDropCardRef as any}
      onMouseEnter={(e) => setShowUserDropCard(true)}
      onMouseLeave={(e) => setShowUserDropCard(false)}
    >
      <div
        className="cursor-pointer"
        // onMouseEnter={(e) => setShowUserDropCard(true)}
        // onMouseLeave={(e) => setShowUserDropCard(false)}
        // onClick={(e) => setShowUserDropCard(!showUserDropCard)}
      >
        {userInfo ? (
          <Image src={userInfo.avatar || Avatar} alt="avatar"></Image>
        ) : (
          <Link href={'/login'} className="text-[#F2F2F2] font-next-book-bold">
            Login
          </Link>
        )}
      </div>
      {userInfo && showUserDropCard ? (
        <div className="absolute z-[9999] -right-[0.75rem] top-[4.75rem]">
          <UserDropCard
            userInfo={userInfo}
            onClose={() => setShowUserDropCard(false)}
          ></UserDropCard>
        </div>
      ) : null}
    </div>
  );
};

export default User;
