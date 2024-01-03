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
        'h-[264px] w-[calc((100%-24px)/2)]  p-[32px] cursor-pointer rounded-[24px] bg-[var(--neutral-white)] overflow-hidden flex items-center gap-[16px] hover:-translate-y-1 transition-all duration-300  hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)]'
      }
    >
      <div className="flex-1 h-full flex flex-col flex-shrink-0 justify-between">
        <Skeleton className="caption-12pt w-[52px] h-[28px] rounded-[20px] "></Skeleton>
        <div>
          <Skeleton className="w-[300px] h-[27px]"></Skeleton>
          <Skeleton className="w-[348px] h-[66px] mt-[8px]"></Skeleton>
        </div>
        <div>
          <Skeleton className="w-[300px] h-[21px]"></Skeleton>
        </div>
      </div>
      <div className="w-[200px] h-[200px] relative">
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
