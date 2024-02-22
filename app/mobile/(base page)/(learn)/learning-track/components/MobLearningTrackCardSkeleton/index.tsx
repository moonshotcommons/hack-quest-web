import Skeleton from '@/components/Web/Business/Skeleton';
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
        'flex  w-full flex-col gap-[1.25rem] rounded-[1rem]  bg-neutral-white p-[1.25rem]  '
      }
    >
      <div className="flex w-full justify-between">
        <Skeleton className="h-[1.75rem] w-[3.375rem] rounded-[1.25rem] "></Skeleton>
        <div className="relative h-[3rem] w-[3rem]">
          <FaRegImage size={48} color={'#bdbdbd'} />
        </div>
      </div>
      <Skeleton className="mt-[-1.8rem] h-[1.5rem] w-[calc(100%-3rem)]"></Skeleton>
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
