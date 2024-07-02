import MenuLink from '@/constants/MenuLink';
import { cn } from '@/helper/utils';
import { useCustomPathname } from '@/hooks/router/useCheckPathname';
import React, { useState } from 'react';
import Image from 'next/image';
import { BurialPoint } from '@/helper/burialPoint';
import DropDownMotion from '@/components/Common/DropDownMotion';
import UserDropCard from '../../Business/UserDropCard';
import { LoginResponse } from '@/service/webApi/user/type';

interface AvatarProp {
  userInfo: Partial<LoginResponse> | null;
}

const Avatar: React.FC<AvatarProp> = ({ userInfo }) => {
  const pathname = useCustomPathname();
  const [showUserDropCard, setShowUserDropCard] = useState(false);

  return (
    <div
      className={`relative  flex h-full items-center `}
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
  );
};

export default Avatar;
