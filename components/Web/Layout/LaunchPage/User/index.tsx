import { BurialPoint } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import Image from 'next/image';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import { LoginResponse } from '@/service/webApi/user/type';
import Button from '@/components/Common/Button';
import { useCustomPathname } from '@/hooks/router/useCheckPathname';
import DropDownMotion from '@/components/Common/DropDownMotion';
import { MenuLink } from '../../BasePage/Navbar/type';
import Settings from '@/components/Web/User/Settings';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import UserDropCard from '../UserDropCard';
interface UserProps {}

const User: FC<UserProps> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const [showUserDropCard, setShowUserDropCard] = useState(false);
  const userDropCardRef = useRef();
  const [isLogin, setIsLogin] = useState(false);

  const { userInfo } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      authRouteType: state.authRouteType
    }))
  );

  const setAuthType = useUserStore((state) => state.setAuthType);
  const setAuthModalOpen = useUserStore((state) => state.setAuthModalOpen);
  const pathname = useCustomPathname();

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
        className="relative  flex h-full items-center justify-end"
        ref={userDropCardRef as any}
      >
        <div className="flex h-full cursor-pointer items-center justify-end">
          {isLogin ? (
            <div className="flex-row-center body-s text-neutral-off-black">
              <div
                className="relative flex h-[64px] w-[54px] items-center justify-end"
                onMouseEnter={() => setShowUserDropCard(true)}
                onMouseLeave={() => setShowUserDropCard(false)}
              >
                <div
                  className={cn(
                    'relative flex h-[36px] w-[36px] items-center justify-center overflow-hidden rounded-full bg-[#8d8d8d]',
                    pathname === MenuLink.USER_PROFILE
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
                <DropDownMotion
                  open={!!(userInfo && showUserDropCard)}
                  className={'-right-[15px]'}
                >
                  <UserDropCard
                    userInfo={(userInfo as LoginResponse) || {}}
                    onClose={() => setShowUserDropCard(false)}
                  ></UserDropCard>
                </DropDownMotion>
              </div>
            </div>
          ) : (
            <div className="abc flex gap-4">
              <Button
                ghost
                className="button-text-s  border-neutral-black px-[1.0625rem] py-[7px] uppercase text-neutral-black"
                onClick={() => {
                  setAuthType(AuthType.LOGIN);
                  setAuthModalOpen(true);
                }}
              >
                {t('logIn')}
              </Button>
              <Button
                type="primary"
                className="button-text-s rounded-full px-5 py-[.5rem] uppercase text-neutral-black"
                onClick={() => {
                  setAuthType(AuthType.SIGN_UP);
                  setAuthModalOpen(true);
                }}
              >
                {t('signUp')}
              </Button>
            </div>
          )}
        </div>
      </div>
      <Settings />
    </div>
  );
};

export default User;
