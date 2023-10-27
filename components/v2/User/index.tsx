import { BurialPoint } from '@/helper/burialPoint';
import { useGetUserInfo, useGetUserUnLoginType } from '@/hooks/useGetUserInfo';
import { UnLoginType, setUnLoginType } from '@/store/redux/modules/user';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Settings from './Settings';
import UserDropCard from './UserDropCard';
import { unLoginTab } from './data';
import IconCoin from '@/public/images/mission-center/icon_coin.png';
import { AppRootState } from '@/store/redux';
import { useRouter } from 'next/router';
interface UserProps {}

const User: FC<UserProps> = (props) => {
  const [showUserDropCard, setShowUserDropCard] = useState(false);
  const userDropCardRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const userInfo = useGetUserInfo();
  const unLoginType = useGetUserUnLoginType();
  const dispatch = useDispatch();
  const router = useRouter();
  const { userLevel, userCoin } = useSelector((state: AppRootState) => {
    return {
      userLevel: state.missionCenter?.userLevel,
      userCoin: state.missionCenter?.userCoin
    };
  });
  useEffect(() => {
    if (userInfo) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [userInfo]);

  return (
    <div className="relative h-full">
      <div
        className="h-full  flex items-center justify-end relative"
        ref={userDropCardRef as any}
      >
        <div className="cursor-pointer h-full flex items-center justify-end">
          {isLogin && (
            <div className="flex-row-center">
              <div
                className="h-[30px] text-[#fff] flex-row-center"
                onClick={() => router.push('/mission-center')}
              >
                <div className="w-[115px] h-full bg-[#3E3E3E] rounded-[20px] flex-row-center justify-between mr-[20px] pr-[15px]">
                  <Image src={IconCoin} width={30} alt="iconCredits" />
                  <span>{userCoin.coin}</span>
                </div>
                <div className="w-[170px] h-full relative flex-center rounded-[20px] bg-[#8C8C8C] ">
                  <div
                    className="absolute left-[0] top-[0] h-full bg-[#3E3E3E] rounded-[20px]"
                    style={{
                      width: `${
                        (userLevel.expCurrentLevel / userLevel.expNextLevel) *
                        100
                      }%`
                    }}
                  ></div>
                  <div className="absolute w-full h-full flex-row-center justify-between text-[#0b0b0b]">
                    <div className="w-[30px] h-[30px] flex-center rounded-[50%] bg-[#FFD850]">
                      <div className="w-[24px] h-[24px] flex-center rounded-[50%] bg-[#E7A600] ">
                        {userLevel.level}
                      </div>
                    </div>
                    <div className="flex-1 flex-shrink-0 flex-center text-[#fff]">
                      {`${userLevel.expCurrentLevel}/${userLevel.expNextLevel}`}
                    </div>
                    <div className="w-[30px] h-[30px] flex-center rounded-[50%] bg-[#FFD850] opacity-50">
                      {userLevel.level + 1}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="relative w-[54px] h-[64px] flex items-center justify-end"
                onMouseEnter={(e) => setShowUserDropCard(true)}
                onMouseLeave={(e) => setShowUserDropCard(false)}
              >
                <div className="relative w-[34px] h-[34px] bg-[#8d8d8d] overflow-hidden rounded-full flex justify-center items-center">
                  <Image
                    src={userInfo?.avatar as string}
                    alt="avatar"
                    fill
                    className="object-cover"
                    onError={() => {
                      BurialPoint.track('头像加载失败', {
                        userId: userInfo?.id || ''
                      });
                    }}
                  ></Image>
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
            </div>
          )}
          {!isLogin && (
            <div className="flex gap-[30px] h-full">
              {unLoginTab.map((tab) => (
                <div
                  className={`text-sm h-full flex items-center text-white hover:font-bold border-b-4 tracking-[0.28px] cursor-pointer ${
                    tab.value === unLoginType?.type ||
                    (tab.value === UnLoginType.SIGN_UP &&
                      unLoginType.type === UnLoginType.INVITE_CODE)
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
      </div>
      <Settings></Settings>
    </div>
  );
};

export default User;
