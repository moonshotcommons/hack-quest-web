'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/hackathon/line-tabs';
import webApi from '@/service';
import { PageResult } from '@/service/webApi/type';
import { CourseType, ProjectCourseType } from '@/service/webApi/course/type';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import PracticeCard from '@/components/Web/Business/PracticeCard';
import Button from '@/components/Common/Button';
import { Badge } from '@/components/ui/badge';
import { Progress, ProgressLabel } from '@/components/ui/progress';
import { CourseDetailType } from '@/service/webApi/course/type';
import { getCoverImageByTrack } from '@/helper/utils';
import MenuLink from '@/constants/MenuLink';

function ProjectSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="h-[22.875rem] w-full animate-pulse rounded-2xl bg-neutral-off-white" />
      ))}
    </div>
  );
}

function ProjectCard({ course }: { course: CourseDetailType }) {
  const href =
    course.type === CourseType.UGC ? `${MenuLink.PRACTICES}/${course.id}` : `${MenuLink.ELECTIVES}/${course.id}`;
  return (
    <Link href={href}>
      <div className="card-hover flex flex-col rounded-2xl border border-neutral-light-gray bg-neutral-white">
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

export function ProjectEmpty() {
  const { data } = useQuery({
    queryKey: ['featuredCourses'],
    queryFn: () => webApi.courseApi.getTopCourses<ProjectCourseType>({ type: CourseType.GUIDED_PROJECT })
  });
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col items-center gap-4 py-8">
        <h2 className="text-base font-bold text-neutral-black sm:text-lg">You’re not enrolled in any project</h2>
        <Link href="/practices">
          <Button size="small" ghost className="uppercase">
            Explore projects
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-5 sm:gap-8">
        <h2 className="text-lg font-bold text-neutral-black">Explore Projects</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {data?.map((item) => <PracticeCard key={item.id} course={item} />)}
        </div>
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
    <div className="rounded-3xl bg-neutral-white p-6">
      <h1 className="font-next-book-bold text-[1.375rem] font-bold text-neutral-off-black">My Projects</h1>
      <Tabs className="mt-6 w-full" value={value} onValueChange={setValue}>
        <TabsList className="justify-start">
          <TabsTrigger value="inProcess" className="sm:text-lg">
            In progress
          </TabsTrigger>
          <TabsTrigger value="completed" className="sm:text-lg">
            Completed
          </TabsTrigger>
        </TabsList>
        <TabsContent value="inProcess">
          <div className="flex flex-col gap-8">
            {isLoading && <ProjectSkeleton />}
            {data &&
              (data.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {data.map((item) => (
                    <ProjectCard key={item.id} course={item} />
                  ))}
                </div>
              ) : (
                <ProjectEmpty />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="completed">
          <div className="flex flex-col gap-8">
            {isLoading && <ProjectSkeleton />}
            {data &&
              (data.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {data.map((item) => (
                    <ProjectCard key={item.id} course={item} />
                  ))}
                </div>
              ) : (
                <ProjectEmpty />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
