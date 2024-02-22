import UserDropCard from '@/components/Web/Business/UserDropCard';
import { V2_LANDING_PATH } from '@/constants/nav';
import { BurialPoint } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import IconCoin from '@/public/images/mission-center/icon_coin.png';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';
import Settings from './Settings';
import { unLoginTab } from './data';
import { useRedirect } from '@/hooks/useRedirect';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import { LoginResponse } from '@/service/webApi/user/type';
import { useMissionCenterStore } from '@/store/zustand/missionCenterStore';
import Button from '@/components/Common/Button';
import { useCustomPathname } from '@/hooks/useCheckPathname';
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
  const pathname = useCustomPathname();
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
        className="relative  flex h-full items-center justify-end"
        ref={userDropCardRef as any}
      >
        <div className="flex h-full cursor-pointer items-center justify-end">
          {isLogin && (
            <div className="flex-row-center">
              <div
                className="flex-row-center h-[30px] text-neutral-white"
                onClick={() => redirectToUrl('/mission-center')}
              >
                <div className="flex-row-center mr-[20px] h-full w-[115px] justify-between rounded-[20px] bg-neutral-rich-gray pr-[15px]">
                  <Image src={IconCoin} width={30} alt="iconCredits" />
                  <span>{userCoin.coin}</span>
                </div>
                <div className="h-full w-[170px] px-[15px]">
                  <div className="flex-center relative h-full w-full bg-neutral-medium-gray  ">
                    <div
                      className="absolute left-[0] top-[0] h-full rounded-r-[20px] bg-neutral-rich-gray"
                      style={{
                        width: `${
                          (userLevel.expCurrentLevel / userLevel.expNextLevel) *
                          100
                        }%`
                      }}
                    ></div>
                    <div className="flex-row-center absolute h-full w-full justify-between text-neutral-black">
                      <div className="flex-center ml-[-15px] h-[30px] w-[30px] rounded-[50%] bg-yellow-primary">
                        <div className="flex-center h-[24px] w-[24px] rounded-[50%] bg-[#E7A600] ">
                          {userLevel.level}
                        </div>
                      </div>
                      <div className="flex-center flex-1 flex-shrink-0 text-neutral-white">
                        {`${userLevel.expCurrentLevel}/${userLevel.expNextLevel}`}
                      </div>
                      <div className="flex-center  mr-[-15px] h-[30px] w-[30px] rounded-[50%] bg-[rgba(255,216,80,1)]">
                        <span className="text-[rgba(11,11,11,0.5)]">
                          {userLevel.level + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="relative flex h-[64px] w-[54px] items-center justify-end"
                onMouseEnter={() => setShowUserDropCard(true)}
                onMouseLeave={() => setShowUserDropCard(false)}
              >
                <div
                  className={cn(
                    'relative flex h-[34px] w-[34px] items-center justify-center overflow-hidden rounded-full bg-[#8d8d8d]',
                    pathname === '/user/profile'
                      ? 'box-content border-[5px] border-[#ffd952]'
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
                  <div className="absolute -right-[15px] top-[37px] z-[999] pt-[20px]">
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
            <div className="abc flex gap-4">
              <Button
                type="text"
                className="button-text-s border-transparent px-[1.0625rem] py-2 uppercase text-neutral-white"
                onClick={() => {
                  setAuthType(AuthType.LOGIN);
                  setAuthModalOpen(true);
                }}
              >
                Log in
              </Button>
              <Button
                type="primary"
                className="button-text-s rounded-full px-5 py-[.5rem] uppercase text-neutral-black"
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
