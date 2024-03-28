import UserDropCard from '@/components/Web/Business/UserDropCard';
import { V2_LANDING_PATH } from '@/constants/nav';
import { BurialPoint } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import IconCoin from '@/public/images/mission-center/icon_coin_new.png';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';
import Settings from './Settings';
import { unLoginTab } from './data';
import { useRedirect } from '@/hooks/router/useRedirect';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import { LoginResponse } from '@/service/webApi/user/type';
import { useMissionCenterStore } from '@/store/zustand/missionCenterStore';
import Button from '@/components/Common/Button';
import { useCustomPathname } from '@/hooks/router/useCheckPathname';
import { MenuLink } from '../Layout/BasePage/Navbar/type';
import DropDownMotion from '@/components/Common/DropDownMotion';
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
      <div className="relative  flex h-full items-center justify-end" ref={userDropCardRef as any}>
        <div className="flex h-full cursor-pointer items-center justify-end">
          {isLogin && (
            <div className="flex-row-center body-s text-neutral-off-black">
              <div className="flex-row-center h-[30px]" onClick={() => redirectToUrl(MenuLink.MISSION_CENTER)}>
                <div className="flex-row-center body-s mr-[20px] h-full justify-between gap-[10px] rounded-[20px] bg-neutral-off-white pr-[15px]">
                  <Image src={IconCoin} width={30} alt="iconCredits" />
                  <span>{userCoin.coin}</span>
                </div>
                <div className="h-full w-[170px] pl-[15px]">
                  <div className="flex-center relative h-full w-full rounded-r-[20px]  bg-neutral-off-white ">
                    <div
                      className="absolute left-[0] top-[0] h-full rounded-r-[20px] bg-yellow-light"
                      style={{
                        width: `${(userLevel.expCurrentLevel / userLevel.expNextLevel) * 100}%`
                      }}
                    ></div>
                    <div className="flex-row-center absolute h-full w-full justify-between pr-[15px] text-neutral-off-black">
                      <div className="flex-center ml-[-15px] h-[30px] w-[30px] rounded-[50%] bg-yellow-primary">
                        <div className="flex-center h-[24px] w-[24px] rounded-[50%] bg-yellow-dark ">
                          {userLevel.level}
                        </div>
                      </div>
                      <div className="flex-center flex-1 flex-shrink-0 ">{`${userLevel.expCurrentLevel}/${userLevel.expNextLevel}`}</div>
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
                    'relative flex h-[36px] w-[36px] items-center justify-center overflow-hidden rounded-full bg-[#8d8d8d]',
                    pathname === MenuLink.USER_PROFILE ? 'box-content border-[5px] border-[#ffd952]' : ''
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
                <DropDownMotion open={!!(userInfo && showUserDropCard)} className={'-right-[15px]'}>
                  <UserDropCard
                    userInfo={(userInfo as LoginResponse) || {}}
                    onClose={() => setShowUserDropCard(false)}
                  ></UserDropCard>
                </DropDownMotion>
              </div>
            </div>
          )}
          {!isLogin && (
            <div className="abc flex gap-4">
              <Button
                ghost
                className="button-text-s  border-neutral-black px-[1.0625rem] py-[7px] uppercase text-neutral-black"
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
