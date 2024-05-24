'use client';

import * as React from 'react';
import { BookOpenIcon } from 'lucide-react';
import Button from '@/components/Common/Button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CourseType, ProjectCourseType } from '@/service/webApi/course/type';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import Image from 'next/image';
import { getDefaultImageUrl } from './utils';
import MenuLink from '@/constants/MenuLink';
import Link from 'next/link';

export function CourseCard({ course }: { course: ProjectCourseType | ElectiveCourseType }) {
  const getCourseDetailLink = React.useCallback(() => {
    switch (course.type) {
      case CourseType.UGC:
        return `${MenuLink.PRACTICES}/${course.id}`;
      default:
        return `${MenuLink.ELECTIVES}/${course.id}`;
    }
  }, [course]);
  return (
    <Link href={getCourseDetailLink()}>
      <div className="card-hover flex flex-col overflow-hidden rounded-2xl border border-neutral-light-gray bg-neutral-white sm:flex-row sm:border-transparent">
        <div className="relative h-40 w-full flex-shrink-0 sm:h-[16.875rem] sm:w-[30rem]">
          <Image
            src={course.image || getDefaultImageUrl(course.track)}
            alt={course.title}
            fill
            className="object-cover sm:object-contain"
          />
        </div>
        <div className="flex flex-1 flex-col px-4 py-5 sm:p-6">
          {course.track && <Badge className="self-start">{course.track}</Badge>}
          <h1 className="mt-4 text-base font-bold text-neutral-off-black sm:text-lg">{course.title}</h1>
          <p className="mt-4 line-clamp-2 hidden text-sm text-neutral-medium-gray sm:block">{course.description}</p>
          <div className="mt-4 flex flex-col items-center gap-4 sm:mt-auto sm:flex-row sm:gap-6">
            <div className="flex w-full flex-1 flex-col gap-2">
              <div className="flex items-center gap-2">
                <BookOpenIcon size={20} />
                <span className="text-xs font-bold text-neutral-rich-gray">Next up</span>
                <span className="text-xs text-neutral-rich-gray">What is Solidity?</span>
              </div>
              <Progress value={Math.floor((course.progress || 0) * 100)} />
            </div>
            <Button type="primary" className="w-full uppercase sm:w-[18.375rem]">
              continue
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
