import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import UserDropCard from '@/components/v2/Business/UserDropCard';
import { V2_LANDING_PATH } from '@/constants/nav';
import { BurialPoint } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import { useGetUserInfo, useGetUserUnLoginType } from '@/hooks/useGetUserInfo';
import IconCoin from '@/public/images/mission-center/icon_coin.png';
import { AppRootState } from '@/store/redux';
import { UnLoginType, setUnLoginType } from '@/store/redux/modules/user';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Settings from './Settings';
import { unLoginTab } from './data';
interface UserProps {}

const User: FC<UserProps> = () => {
  const [showUserDropCard, setShowUserDropCard] = useState(false);
  const userDropCardRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const userInfo = useGetUserInfo();
  const unLoginType = useGetUserUnLoginType();
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = router.pathname;
  const { userLevel, userCoin } = useSelector((state: AppRootState) => {
    return {
      userLevel: state.missionCenter?.userLevel,
      userCoin: state.missionCenter?.userCoin
    };
  });

  const unLoginTabClick = (value: UnLoginType) => {
    if (pathname !== V2_LANDING_PATH) {
      router.replace(`${V2_LANDING_PATH}?type=${value}`);
    }
    dispatch(setUnLoginType(value));
  };
  useEffect(() => {
    if (userInfo) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [userInfo]);
  useEffect(() => {
    if (pathname === V2_LANDING_PATH) {
      setTabIndex(unLoginTab.findIndex((v) => v.value === unLoginType.type));
      return;
    }
    if (unLoginType.type === UnLoginType.INVITE_CODE) {
      setTabIndex(unLoginTab.findIndex((v) => v.value === UnLoginType.SIGN_UP));
      return;
    }
  }, [pathname, unLoginType.type]);

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
                <div className="w-[170px] h-full px-[15px]">
                  <div className="w-full h-full relative flex-center bg-[#8C8C8C]  ">
                    <div
                      className="absolute left-[0] top-[0] h-full bg-[#3E3E3E] rounded-r-[20px]"
                      style={{
                        width: `${
                          (userLevel.expCurrentLevel / userLevel.expNextLevel) *
                          100
                        }%`
                      }}
                    ></div>
                    <div className="absolute w-full h-full flex-row-center justify-between text-[#0b0b0b]">
                      <div className="w-[30px] ml-[-15px] h-[30px] flex-center rounded-[50%] bg-[#FFD850]">
                        <div className="w-[24px] h-[24px] flex-center rounded-[50%] bg-[#E7A600] ">
                          {userLevel.level}
                        </div>
                      </div>
                      <div className="flex-1 flex-shrink-0 flex-center text-[#fff]">
                        {`${userLevel.expCurrentLevel}/${userLevel.expNextLevel}`}
                      </div>
                      <div className="w-[30px]  mr-[-15px] h-[30px] flex-center rounded-[50%] bg-[rgba(255,216,80,1)]">
                        <span className="text-[rgba(11,11,11,0.5)]">
                          {userLevel.level + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="relative w-[54px] h-[64px] flex items-center justify-end"
                onMouseEnter={() => setShowUserDropCard(true)}
                onMouseLeave={() => setShowUserDropCard(false)}
              >
                <div
                  className={cn(
                    'relative w-[34px] h-[34px] bg-[#8d8d8d] overflow-hidden rounded-full flex justify-center items-center',
                    router.pathname === '/user/profile'
                      ? 'border-[5px] border-[#ffd952] box-content'
                      : ''
                  )}
                >
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
            <SlideHighlight
              className="flex gap-[30px] h-full"
              currentIndex={tabIndex}
            >
              {unLoginTab.map((tab, index) => (
                <div
                  className={`text-sm h-full flex items-center text-white hover:font-bold tracking-[0.28px] cursor-pointer ${
                    tabIndex === index
                      ? 'font-next-book-bold text-text-default-color font-bold'
                      : 'font-next-book font-normal'
                  }`}
                  key={tab.value}
                  onClick={() => unLoginTabClick(tab.value)}
                >
                  {tab.label}
                </div>
              ))}
            </SlideHighlight>
          )}
        </div>
      </div>
      <Settings></Settings>
    </div>
  );
};

export default User;
