'use client';
import React from 'react';
import Image from 'next/image';
import { shallowEqual, useSelector } from 'react-redux';
import { AppRootState } from '@/store/redux';
import { HiArrowLongRight } from 'react-icons/hi2';
import Link from 'next/link';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';

interface UserInfoProp {}

const UserInfo: React.FC<UserInfoProp> = () => {
  const userInfo = useSelector((state: AppRootState) => {
    return state.user.userInfo;
  }, shallowEqual);
  return (
    <div>
      <div className="p-[16px] bg-yellow-light rounded-[20px] mb-[16px]">
        <div className="flex items-center gap-[12px] mb-[24px]">
          <div className="w-[60px] h-[60px] relative">
            <Image
              src={userInfo?.avatar as string}
              alt="avatar"
              fill
              className="object-cover"
            ></Image>
          </div>
          <div className="body-m text-neutral-off-black">
            {userInfo?.nickname}
          </div>
        </div>
        <div className="flex justify-between p-[12px]">
          <div className="">
            <p className="mb-[8px] text-neutral-rich-gray text-[10px] font-light">
              Courses Completed
            </p>
            <p className="body-xl text-neutral-off-black">3</p>
          </div>
          <div className="">
            <p className="mb-[8px] text-neutral-rich-gray text-[10px] font-light">
              Certification Earned
            </p>
            <p className="body-xl text-neutral-off-black">3</p>
          </div>
        </div>
      </div>
      <Link
        className="flex text-neutral-off-black button-text-s items-center  cursor-pointer"
        href={MenuLink.USER_PROFILE}
      >
        <span className="uppercase">Profile</span>
        <HiArrowLongRight size={18}></HiArrowLongRight>
      </Link>
    </div>
  );
};

export default UserInfo;
