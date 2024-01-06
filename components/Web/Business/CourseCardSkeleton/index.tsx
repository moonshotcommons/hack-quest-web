import { cn } from '@/helper/utils';
import { FC, ReactNode } from 'react';
import { FaRegImage } from 'react-icons/fa6';
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('animate-pulse bg-gray-300', className)} {...props} />
  );
}

export { Skeleton };

interface CourseCardSkeletonCardProps {
  // children: ReactNode;
}

interface CourseCardSkeletonListProps {
  size?: number;
  children?: ReactNode;
  active: boolean;
}

const CourseCardSkeletonCard: FC<CourseCardSkeletonCardProps> = (props) => {
  return (
    <div className="w-[302px] h-[370px] rounded-[16px] bg-white overflow-hidden flex flex-col">
      <Skeleton className="w-full h-[150px] flex items-center justify-center">
        <FaRegImage size={80} color={'#bdbdbd'} />
      </Skeleton>
      <div className="flex flex-col justify-between h-full flex-1 py-5 px-[24px] ">
        <div className="flex-col flex-1 flex gap-y-4">
          <Skeleton className="w-[48px] h-[24px] flex items-center justify-center rounded-md"></Skeleton>
          <Skeleton className="w-1/2 h-[22px] flex items-center justify-center rounded-md"></Skeleton>
          <div className="flex flex-col gap-1">
            <Skeleton className="w-full h-[18px] flex items-center justify-center rounded-md"></Skeleton>
            <Skeleton className="w-2/3 h-[18px] flex items-center justify-center rounded-md"></Skeleton>
          </div>
        </div>
        <div className="flex justify-between">
          <Skeleton className="w-[80px] h-[15px] flex items-center justify-center rounded-md"></Skeleton>
          <Skeleton className="w-[120px] h-[15px] flex items-center justify-center rounded-md"></Skeleton>
        </div>
      </div>
    </div>
  );
};

const CourseCardSkeletonList: FC<CourseCardSkeletonListProps> = ({
  size = 4,
  children,
  active
}) => {
  return active
    ? new Array(size).fill('').map((item, index) => {
        return <CourseCardSkeletonCard key={index}></CourseCardSkeletonCard>;
      })
    : children;
};

const CourseCardSkeleton = {
  Card: CourseCardSkeletonCard,
  List: CourseCardSkeletonList
};

export default CourseCardSkeleton;
