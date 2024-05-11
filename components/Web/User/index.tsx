import { FC, Suspense, useContext } from 'react';
import Settings from './Settings';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import Button from '@/components/Common/Button';
import Intl from '../Intl';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import Notification from './Notification';
import CoinXp from './CoinXp';
import Avatar from './Avatar';
interface UserProps {}

const User: FC<UserProps> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);
  const { userInfo, setAuthType, setAuthModalOpen } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      setAuthType: state.setAuthType,
      setAuthModalOpen: state.setAuthModalOpen
    }))
  );

  return (
    <div className="relative h-full">
      <div className="relative  flex h-full items-center justify-end">
        <div className="flex h-full items-center">
          {/* {mounted && } */}
          {/* <Intl /> */}
          {!userInfo && (
            <div className="flex items-center">
              <Suspense fallback={null}>
                <Intl />
              </Suspense>
              <div className="mx-[16px] h-[34px] w-[1px] bg-neutral-light-gray"></div>
            </div>
          )}

          <div className="flex h-full cursor-pointer items-center justify-end">
            {userInfo ? (
              <div className="body-s flex h-full items-center gap-[20px] text-neutral-off-black">
                <CoinXp />
                <div className="flex h-full items-center">
                  <Suspense fallback={null}>
                    <Intl />
                  </Suspense>
                </div>
                <Notification />
                <Avatar />
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
                  {t('auth.login')}
                </Button>
                <Button
                  type="primary"
                  className="button-text-s rounded-full px-5 py-[.5rem] uppercase text-neutral-black"
                  onClick={() => {
                    setAuthType(AuthType.SIGN_UP);
                    setAuthModalOpen(true);
                  }}
                >
                  {t('auth.signUp')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Settings></Settings>
    </div>
  );
};

export default User;
