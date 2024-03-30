import { cn } from '@/helper/utils';
import { FC, ReactNode } from 'react';
import { FaRegImage } from 'react-icons/fa6';
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse bg-gray-300', className)} {...props} />;
}

export { Skeleton };

interface CourseCardSkeletonCardProps {
  // children: ReactNode;
  itemWidth: string;
}

interface CourseCardSkeletonListProps {
  size?: number;
  children?: ReactNode;
  active: boolean;
  itemWidth: string;
}

const CourseCardSkeletonCard: FC<CourseCardSkeletonCardProps> = (props) => {
  return (
    <div className={cn('flex h-[370px] flex-col overflow-hidden rounded-[16px] bg-neutral-white', props.itemWidth)}>
      <Skeleton className="flex h-[150px] w-full items-center justify-center">
        <FaRegImage size={80} color={'#bdbdbd'} />
      </Skeleton>
      <div className="flex h-full flex-1 flex-col justify-between px-[24px] py-5 ">
        <div className="flex flex-1 flex-col gap-y-4">
          <Skeleton className="flex h-[24px] w-[48px] items-center justify-center rounded-md"></Skeleton>
          <Skeleton className="flex h-[22px] w-1/2 items-center justify-center rounded-md"></Skeleton>
          <div className="flex flex-col gap-1">
            <Skeleton className="flex h-[18px] w-full items-center justify-center rounded-md"></Skeleton>
            <Skeleton className="flex h-[18px] w-2/3 items-center justify-center rounded-md"></Skeleton>
          </div>
        </div>
        <div className="flex justify-between">
          <Skeleton className="flex h-[15px] w-[80px] items-center justify-center rounded-md"></Skeleton>
          <Skeleton className="flex h-[15px] w-[120px] items-center justify-center rounded-md"></Skeleton>
        </div>
      </div>
    </div>
  );
};

const CourseCardSkeletonList: FC<CourseCardSkeletonListProps> = ({ size = 4, children, active, itemWidth }) => {
  return active
    ? new Array(size).fill('').map((item, index) => {
        return <CourseCardSkeletonCard key={index} itemWidth={itemWidth}></CourseCardSkeletonCard>;
      })
    : children;
};

const CourseCardSkeleton = {
  Card: CourseCardSkeletonCard,
  List: CourseCardSkeletonList
};

export default CourseCardSkeleton;
