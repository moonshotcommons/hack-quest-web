import Skeleton from '@/components/Web/Business/Skeleton';
import React from 'react';

interface ContentSkeletonProp {}

const ContentSkeleton: React.FC<ContentSkeletonProp> = () => {
  return (
    <div className="container mx-auto flex min-h-screen gap-[40px] pb-[100px] pt-[40px]">
      <div className="flex flex-1 flex-col gap-[40px]">
        <Skeleton className="h-[150px] w-full rounded-[24px]"></Skeleton>
        <Skeleton className="h-[300px] w-full rounded-[24px]"></Skeleton>
        <Skeleton className="h-[300px] w-full rounded-[24px]"></Skeleton>
        <Skeleton className="h-[300px] w-full rounded-[24px]"></Skeleton>
      </div>
      <div className="relative w-[420px] flex-shrink-0">
        <div className="sticky right-0 top-[40px] flex flex-col gap-[40px]">
          <Skeleton className="h-[180px] w-full rounded-[24px]"></Skeleton>
          <Skeleton className="h-[400px] w-full rounded-[24px]"></Skeleton>
          <Skeleton className="h-[250px] w-full rounded-[24px]"></Skeleton>
        </div>
      </div>
    </div>
  );
};

export default ContentSkeleton;
