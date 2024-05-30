import Link from 'next/link';
import Image from 'next/image';
import { BookOpenIcon } from 'lucide-react';
import Button from '@/components/Common/Button';
import { Progress, ProgressLabel } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/helper/utils';
import { CourseDetailType } from '@/service/webApi/course/type';

export function CourseCard({
  course,
  rootClassName,
  imageClassName,
  actionClassName,
  buttonClassName
}: {
  course: CourseDetailType;
  rootClassName?: string;
  imageClassName?: string;
  actionClassName?: string;
  buttonClassName?: string;
}) {
  return (
    <Link href={`/practices/${course.id}`}>
      <div
        className={cn(
          'card-hover flex flex-col overflow-hidden rounded-2xl bg-neutral-white sm:flex-row',
          rootClassName
        )}
      >
        <div className={cn('relative h-40 w-full flex-shrink-0 sm:h-[16.875rem] sm:w-[30rem]', imageClassName)}>
          <Image src={course.image || ''} alt={course.title} fill className="object-cover sm:rounded-l-2xl" />
        </div>
        <div className="flex flex-1 flex-col px-4 py-5 sm:p-6">
          {course.track && <Badge className="self-start">{course.track}</Badge>}
          <h1 className="mt-4 text-sm font-bold leading-[160%] text-neutral-off-black sm:text-base">{course.title}</h1>
          <p className="mt-4 line-clamp-2 text-sm text-neutral-medium-gray">{course.description}</p>
          <div className={cn('mt-4 flex flex-col items-center gap-4 sm:mt-auto sm:flex-row sm:gap-6', actionClassName)}>
            <div className="flex w-full flex-1 flex-col gap-2">
              {course.progress !== 1 && (
                <div className="flex items-center gap-2">
                  <BookOpenIcon size={20} />
                  <span className="text-xs font-bold text-neutral-rich-gray">Next up</span>
                  <span className="text-xs text-neutral-rich-gray">What is Solidity?</span>
                </div>
              )}
              <Progress value={(course.progress || 0) * 100}>
                <ProgressLabel>{Math.floor((course.progress || 0) * 100)}%</ProgressLabel>
              </Progress>
            </div>
            <Button
              ghost={course.progress === 1}
              type="primary"
              className={cn('w-full uppercase sm:w-[18.375rem]', buttonClassName)}
            >
              {course.progress === 1 ? 'Completed' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
