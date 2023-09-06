import { useGetUserInfo, useGetUserUnLoginType } from '@/hooks/useGetUserInfo';
import { setUnLoginType } from '@/store/redux/modules/user';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Settings from './Settings';
import UserDropCard from './UserDropCard';
import { unLoginTab } from './data';
interface UserProps {
  // children: ReactNode;
}

const User: FC<UserProps> = (props) => {
  const [showUserDropCard, setShowUserDropCard] = useState(false);
  const userDropCardRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const userInfo = useGetUserInfo();
  const unLoginType = useGetUserUnLoginType();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) setIsLogin(true);
  }, [userInfo]);

  return (
    <div className="relative h-full">
      <div
        className="h-full  flex items-center justify-end relative"
        ref={userDropCardRef as any}
        onMouseEnter={(e) => setShowUserDropCard(true)}
        onMouseLeave={(e) => setShowUserDropCard(false)}
      >
        <div className="cursor-pointer h-full flex items-center justify-end">
          {isLogin && (
            <div className="relative w-[34px] h-[34px] bg-[#8d8d8d] overflow-hidden rounded-full flex justify-center items-center">
              <Image
                src={userInfo?.avatar as string}
                alt="avatar"
                fill
                className="object-cover"
              ></Image>
            </div>
          )}
          {!isLogin && (
            <div className="flex gap-[30px] h-full">
              {unLoginTab.map((tab) => (
                <div
                  className={`text-sm h-full flex items-center text-white hover:font-bold border-b-4 tracking-[0.28px] cursor-pointer ${
                    tab.value === unLoginType.type
                      ? 'font-next-book-bold text-text-default-color font-bold  border-[#FFD850]'
                      : 'font-next-book font-normal border-transparent'
                  }`}
                  key={tab.value}
                  onClick={() => dispatch(setUnLoginType(tab.value))}
                >
                  {tab.label}
                </div>
              ))}
            </div>
          )}
        </div>
        {userInfo && showUserDropCard ? (
          <div className="absolute z-[999] -right-[0.75rem] top-[60px] pt-[20px]">
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
