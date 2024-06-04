'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import webApi from '@/service';
import { PageResult } from '@/service/webApi/type';
import { CourseType, ProjectCourseType } from '@/service/webApi/course/type';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import Button from '@/components/Common/Button';
import { Badge } from '@/components/ui/badge';
import { Progress, ProgressLabel } from '@/components/ui/progress';
import { CourseDetailType } from '@/service/webApi/course/type';
import { getCoverImageByTrack } from '@/helper/utils';
import MenuLink from '@/constants/MenuLink';
import { COURSES_STATUS } from './constants';
import { LineTabs } from './line-tabs';

function ProjectSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="h-[21.5rem] w-full animate-pulse rounded-2xl bg-neutral-white sm:h-[22.875rem] sm:bg-neutral-off-white"
        />
      ))}
    </div>
  );
}

export function ProjectCard({ course }: { course: CourseDetailType }) {
  const href =
    course.type === CourseType.UGC ? `${MenuLink.PRACTICES}/${course.id}` : `${MenuLink.ELECTIVES}/${course.id}`;
  return (
    <Link href={href}>
      <div className="sm:card-hover flex flex-col rounded-2xl border border-neutral-light-gray bg-neutral-white">
        <div className="relative h-40 w-full">
          {course.image ? (
            <Image src={course.image} alt={course.title} fill className="rounded-t-2xl object-cover" />
          ) : (
            getCoverImageByTrack(course.track)
          )}
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>{course.track}</Badge>
          </div>
          <h1 className="text-base font-bold text-neutral-off-black">{course.title}</h1>
          <Progress value={(course.progress || 0) * 100}>
            <ProgressLabel>{Math.floor((course.progress || 0) * 100)}%</ProgressLabel>
          </Progress>
          <Button ghost={course.progress === 1} type="primary" className="h-12 w-full uppercase">
            {course.progress === 1 ? 'Completed' : 'Continue'}
          </Button>
        </div>
      </div>
    </Link>
  );
}

export function ProjectEmpty({ label }: { label?: string }) {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col items-center gap-4 py-8">
        <h2 className="text-base font-bold text-neutral-black sm:text-lg">
          {label || 'You’re not enrolled in any project'}
        </h2>
        <Link href="/practices">
          <Button size="small" ghost className="h-8 w-[8.75rem] uppercase">
            Explore
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function DashboardProjects() {
  const [value, setValue] = React.useState('inProcess');

  const { data, isLoading } = useQuery({
    queryKey: ['myCourses', value],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    queryFn: () =>
      webApi.courseApi.getCourseListBySearch<PageResult<ProjectCourseType | ElectiveCourseType>>({ status: value }),
    select: ({ data }) => {
      return data.filter((item) => {
        return item.type === CourseType.GUIDED_PROJECT;
      });
    }
  });

  return (
    <div className="rounded-3xl p-6 sm:bg-neutral-white">
      <h1 className="font-next-book-bold text-[1.375rem] font-bold text-neutral-off-black">My Projects</h1>
      <LineTabs tabs={COURSES_STATUS} value={value} onValueChange={setValue} className="mt-8" />
      <div className="mt-8 flex flex-col gap-8">
        {isLoading && <ProjectSkeleton />}
        {data &&
          (data.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {data.map((item) => (
                <ProjectCard key={item.id} course={item} />
              ))}
            </div>
          ) : (
            <ProjectEmpty
              label={
                value === 'inProcess' ? 'You’re not enrolled in any project' : 'You don’t have a completed project'
              }
            />
          ))}
      </div>
    </div>
  );
}
