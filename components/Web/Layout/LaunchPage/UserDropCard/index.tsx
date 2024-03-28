import { BurialPoint } from '@/helper/burialPoint';
import { useRedirect } from '@/hooks/router/useRedirect';
import { LoginResponse } from '@/service/webApi/user/type';
import Image from 'next/image';
import Link from 'next/link';
import { useShallow } from 'zustand/react/shallow';

import { FC, useContext } from 'react';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { BiUser, BiLockAlt, BiLogInCircle } from 'react-icons/bi';
import { V2_LANDING_PATH, isNoNeedUserInfo } from '@/constants/nav';
import { useCustomPathname } from '@/hooks/router/useCheckPathname';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { LangContext } from '@/components/Provider/Lang';

import ConnectButton from './ConnectButton';
import MenuLink from '@/constants/MenuLink';
interface UserDropCardProps {
  // children: ReactNode;
  userInfo: LoginResponse;
  onClose: () => void;
}

const UserInfo: FC<Omit<UserDropCardProps, 'onClose'>> = ({ userInfo }) => {
  return (
    <div className="flex w-full flex-col items-center px-[30px]">
      <div className="relative h-[80px] w-[80px]  overflow-hidden rounded-full">
        <Image
          src={userInfo?.avatar}
          alt="avatar"
          fill
          className="object-cover"
        ></Image>
      </div>
      <div className="text-h5 mt-[10px] text-neutral-black">
        {userInfo?.nickname}
      </div>
      <div className="body-s mt-[5px] text-neutral-medium-gray">
        {userInfo?.email}
      </div>
    </div>
  );
};

const UserDropCard: FC<UserDropCardProps> = (props) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const { userInfo, onClose } = props;
  const pathname = useCustomPathname();
  const router = useRouter();
  const { setAuthType, userSignOut, setSettingsOpen } = useUserStore(
    useShallow((state) => ({
      setAuthType: state.setAuthType,
      userSignOut: state.userSignOut,
      setSettingsOpen: state.setSettingsOpen
    }))
  );
  const { redirectToUrl } = useRedirect();
  const signOut = () => {
    setAuthType(AuthType.LOGIN);
    userSignOut();
    BurialPoint.track('登出');
    // // 未登录
    if (isNoNeedUserInfo(pathname)) {
      window.location.reload();
    } else {
      redirectToUrl(V2_LANDING_PATH);
    }
  };

  return (
    <div className="relative  rounded-[10px] bg-neutral-white py-[20px] shadow-[0_0px_4px_0_rgba(0,0,0,0.25)]">
      <div className="body-s flex min-w-[220px] flex-col text-neutral-black">
        <UserInfo userInfo={userInfo}></UserInfo>
        <ConnectButton t={t} />

        <Link href={MenuLink.USER_PROFILE} className="w-full">
          <div
            className="flex w-full cursor-pointer  items-center gap-[12px] px-[30px] py-[12px] hover:bg-neutral-off-white"
            onClick={() => {
              onClose();
              BurialPoint.track('profile');
            }}
          >
            <span>
              <BiUser size={24}></BiUser>
            </span>
            <span className="">{t('profile')}</span>
          </div>
        </Link>
        <div
          className="flex w-full cursor-pointer items-center gap-[12px] px-[30px] py-[12px] hover:bg-neutral-off-white"
          onClick={() => {
            onClose();
            setSettingsOpen(true);
            BurialPoint.track('settings');
          }}
        >
          <span>
            <BiLockAlt size={24}></BiLockAlt>
          </span>
          <span className="">{t('changePassword')}</span>
        </div>
        <div
          className="flex w-full cursor-pointer items-center gap-[12px] px-[30px] py-[12px] hover:bg-neutral-off-white"
          onClick={() => {
            signOut();
            onClose();
          }}
        >
          <span>
            <BiLogInCircle size={24}></BiLogInCircle>
          </span>
          <span className="">{t('signOut')}</span>
        </div>
      </div>
    </div>
  );
};

export default UserDropCard;
