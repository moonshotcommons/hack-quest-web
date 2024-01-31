import { FC, ReactNode } from 'react';
import { FaRegImage } from 'react-icons/fa6';
import Skeleton from '../Skeleton';

interface LearningTrackCardSkeletonCardProps {
  // children: ReactNode;
}

interface LearningTrackCardSkeletonListProps {
  size?: number;
  children?: ReactNode;
  active: boolean;
}

const LearningTrackCardSkeletonCard: FC<
  LearningTrackCardSkeletonCardProps
> = () => {
  return (
    <div
      className={
        'flex h-[264px]  w-[calc((100%-24px)/2)] cursor-pointer items-center gap-[16px] overflow-hidden rounded-[24px] bg-[var(--neutral-white)] p-[32px] transition-all duration-300 hover:-translate-y-1  hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)]'
      }
    >
      <div className="flex h-full flex-1 flex-shrink-0 flex-col justify-between">
        <Skeleton className="caption-12pt h-[28px] w-[52px] rounded-[20px] "></Skeleton>
        <div>
          <Skeleton className="h-[27px] w-[300px]"></Skeleton>
          <Skeleton className="mt-[8px] h-[66px] w-[348px]"></Skeleton>
        </div>
        <div>
          <Skeleton className="h-[21px] w-[300px]"></Skeleton>
        </div>
      </div>
      <div className="relative h-[200px] w-[200px]">
        <FaRegImage size={200} color={'#bdbdbd'} />
      </div>
    </div>
  );
};

const LearningTrackCardSkeletonList: FC<LearningTrackCardSkeletonListProps> = ({
  size = 2,
  children,
  active
}) => {
  return active
    ? new Array(size).fill('').map((_, index) => {
        return (
          <LearningTrackCardSkeletonCard
            key={index}
          ></LearningTrackCardSkeletonCard>
        );
      })
    : children;
};

const LearningTrackCardSkeleton = {
  Card: LearningTrackCardSkeletonCard,
  List: LearningTrackCardSkeletonList
};

export default LearningTrackCardSkeleton;
