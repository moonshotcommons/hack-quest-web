import { cn } from '@/helper/utils';
import Image from 'next/image';
import React from 'react';

interface CourseUserProp {
  userImg: any;
  userName: string;
  className?: string;
}

const CourseUser: React.FC<CourseUserProp> = ({
  userImg = '',
  userName,
  className
}) => {
  return (
    <div
      className={cn(
        'body-xs flex w-full items-center gap-[4px] text-neutral-rich-gray',
        className
      )}
    >
      <div className="relative h-[16px] w-[16px] flex-shrink-0 overflow-hidden rounded-full">
        <Image src={userImg} alt="userAvatar" fill className="object-cover" />
      </div>
      <div className="relative  flex-1 truncate">{userName}</div>
    </div>
  );
};

export default CourseUser;
