import UserDropCard from '@/components/Web/Business/UserDropCard';
import { V2_LANDING_PATH } from '@/constants/nav';
import { BurialPoint } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import IconCoin from '@/public/images/mission-center/icon_coin.png';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';
import Settings from './Settings';
import { unLoginTab } from './data';
import { usePathname } from 'next/navigation';
import { useRedirect } from '@/hooks/useRedirect';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import { LoginResponse } from '@/service/webApi/user/type';
import { useMissionCenterStore } from '@/store/zustand/missionCenterStore';
import Button from '@/components/Common/Button';
interface UserProps {}

const User: FC<UserProps> = () => {
  const [showUserDropCard, setShowUserDropCard] = useState(false);
  const userDropCardRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const { userInfo, authRouteType } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      authRouteType: state.authRouteType
    }))
  );

  const setAuthType = useUserStore((state) => state.setAuthType);
  const setAuthModalOpen = useUserStore((state) => state.setAuthModalOpen);
  const pathname = usePathname();
  const { redirectToUrl } = useRedirect();

  const { userLevel, userCoin } = useMissionCenterStore(
    useShallow((state) => ({
      userLevel: state.userLevel,
      userCoin: state.userCoin
    }))
  );

  // const unLoginTabClick = (value: AuthType) => {
  //   // dispatch(setUnLoginType(value));
  //   setAuthType(value);
  //   if (pathname !== V2_LANDING_PATH) {
  //     redirectToUrl(`${V2_LANDING_PATH}?type=${value}`);
  //   }
  // };
  useEffect(() => {
    if (userInfo) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [userInfo]);

  useEffect(() => {
    if (pathname === V2_LANDING_PATH) {
      setTabIndex(unLoginTab.findIndex((v) => v.value === authRouteType.type));
      return;
    }
    if (authRouteType.type === AuthType.INVITE_CODE) {
      setTabIndex(unLoginTab.findIndex((v) => v.value === AuthType.SIGN_UP));
      return;
    }
  }, [pathname, authRouteType.type]);

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
                onClick={() => redirectToUrl('/mission-center')}
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
                      <div className="w-[30px] ml-[-15px] h-[30px] flex-center rounded-[50%] bg-yellow-primary">
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
                    pathname === '/user/profile'
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
                      userInfo={(userInfo as LoginResponse) || {}}
                      onClose={() => setShowUserDropCard(false)}
                    ></UserDropCard>
                  </div>
                ) : null}
              </div>
            </div>
          )}
          {!isLogin && (
            <div className="flex gap-4">
              <Button
                type="text"
                className="px-[1.0625rem] py-2 border-transparent text-neutral-white button-text-s uppercase"
                onClick={() => {
                  setAuthType(AuthType.LOGIN);
                  setAuthModalOpen(true);
                }}
              >
                Log in
              </Button>
              <Button
                type="primary"
                className="px-5 py-[.5rem] text-neutral-black rounded-full button-text-s uppercase"
                onClick={() => {
                  setAuthType(AuthType.SIGN_UP);
                  setAuthModalOpen(true);
                }}
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>
      <Settings></Settings>
    </div>
  );
};

export default User;
