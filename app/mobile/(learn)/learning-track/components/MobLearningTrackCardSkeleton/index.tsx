import Skeleton from '@/components/v2/Business/Skeleton';
import { FC, ReactNode } from 'react';
import { FaRegImage } from 'react-icons/fa6';

interface MobLearningTrackCardSkeletonCardProps {
  // children: ReactNode;
}

interface MobLearningTrackCardSkeletonListProps {
  size?: number;
  children?: ReactNode;
  active: boolean;
}

const MobLearningTrackCardSkeletonCard: FC<
  MobLearningTrackCardSkeletonCardProps
> = () => {
  return (
    <div
      className={
        'w-full  p-[1.25rem] flex flex-col gap-[1.25rem]  rounded-[1rem] bg-neutral-white  '
      }
    >
      <div className="flex w-full justify-between">
        <Skeleton className="w-[3.375rem] h-[1.75rem] rounded-[1.25rem] "></Skeleton>
        <div className="w-[3rem] h-[3rem] relative">
          <FaRegImage size={48} color={'#bdbdbd'} />
        </div>
      </div>
      <Skeleton className="w-[calc(100%-3rem)] h-[1.5rem] mt-[-1.8rem]"></Skeleton>
      <Skeleton className="h-[2.25rem]"></Skeleton>
      <Skeleton className="h-[1.125rem]"></Skeleton>
    </div>
  );
};

const MobLearningTrackCardSkeletonList: FC<
  MobLearningTrackCardSkeletonListProps
> = ({ size = 1, children, active }) => {
  return active
    ? new Array(size).fill('').map((_, index) => {
        return (
          <MobLearningTrackCardSkeletonCard
            key={index}
          ></MobLearningTrackCardSkeletonCard>
        );
      })
    : children;
};

const MobLearningTrackCardSkeleton = {
  Card: MobLearningTrackCardSkeletonCard,
  List: MobLearningTrackCardSkeletonList
};

export default MobLearningTrackCardSkeleton;
