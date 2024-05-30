'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpenIcon } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useQuery } from '@tanstack/react-query';
import Button from '@/components/Common/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/hackathon/line-tabs';
import webApi from '@/service';
import { PageResult } from '@/service/webApi/type';
import { CourseTrackType, CourseType, ProjectCourseType } from '@/service/webApi/course/type';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import { ecosystemStore } from '@/store/zustand/ecosystemStore';
import { EcosystemCard } from '@/components/ecosystem/ecosystem-card copy';
import { Progress, ProgressLabel } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CourseDetailType } from '@/service/webApi/course/type';
import MenuLink from '@/constants/MenuLink';

const coverImageMap = {
  [CourseTrackType.DeFi]: {
    src: '/images/home/practices_img1.png',
    width: 239,
    height: 131
  },
  [CourseTrackType.NFT]: {
    src: '/images/home/practices_img2.png',
    width: 126,
    height: 88
  },
  [CourseTrackType.Gaming]: {
    src: '/images/home/practices_img3.png',
    width: 178,
    height: 101
  },
  [CourseTrackType.Security]: {
    src: '/images/home/practices_img4.png',
    width: 123,
    height: 111
  }
};

function CourseSkeleton() {
  return <div className="h-[14.75rem] w-full animate-pulse rounded-2xl bg-neutral-off-white" />;
}

function CourseEmpty() {
  const { ecosystems } = ecosystemStore(
    useShallow((state) => ({
      ecosystems: state.ecosystems
    }))
  );
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col items-center gap-4 py-8">
        <h2 className="text-base font-bold text-neutral-black sm:text-lg">You’re not enrolled in any course</h2>
        <Link href="/ecosystem-explore">
          <Button size="small" ghost className="uppercase">
            Explore courses
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-5 sm:gap-8">
        <h2 className="text-lg font-bold text-neutral-black">Explore Certified Learning Track</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
          {ecosystems?.map((ecosystem) => (
            <EcosystemCard
              key={ecosystem.id}
              href={`/ecosystem-explore/${ecosystem.id}`}
              ecosystem={ecosystem}
              className="border border-neutral-light-gray"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function CourseCard({ href, course }: { href: string; course: CourseDetailType }) {
  const link =
    course.type === CourseType.UGC ? `${MenuLink.PRACTICES}/${course.id}` : `${MenuLink.ELECTIVES}/${course.id}`;
  return (
    <Link href={link}>
      <div className="sm:card-hover flex flex-col overflow-hidden rounded-2xl border border-neutral-light-gray bg-neutral-white sm:flex-row">
        <div className="relative h-40 w-full sm:h-[14.5625rem] sm:w-[18rem]">
          {course.image ? (
            <Image src={course.image} alt={course.title} fill className="object-cover sm:rounded-l-2xl" />
          ) : (
            <Image
              src={coverImageMap[course.track]?.src || coverImageMap[CourseTrackType.DeFi].src}
              width={coverImageMap[course.track]?.width || coverImageMap[CourseTrackType.DeFi].width}
              height={coverImageMap[course.track]?.height || coverImageMap[CourseTrackType.DeFi].height}
              alt={course.title}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-4 px-4 py-5 sm:p-6">
          {course.track && <Badge className="self-start">{course.track}</Badge>}
          <h1 className="text-sm font-bold leading-[160%] text-neutral-off-black sm:text-base">{course.title}</h1>
          <p className="hidden text-sm text-neutral-medium-gray sm:line-clamp-2">{course.description}</p>
          <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex w-full flex-1 flex-col gap-2 sm:max-w-xs">
              {course.progress !== 1 && (
                <div className="flex items-center gap-2">
                  <BookOpenIcon size={20} />
                  <span className="text-xs font-bold leading-[160%] text-neutral-rich-gray">Next up</span>
                  <span className="text-xs leading-[160%] text-neutral-rich-gray">What is Solidity?</span>
                </div>
              )}
              <Progress value={(course.progress || 0) * 100}>
                <ProgressLabel>{Math.floor((course.progress || 0) * 100)}%</ProgressLabel>
              </Progress>
            </div>
            <Button
              ghost={course.progress === 1}
              type="primary"
              className="h-[3.1875rem] w-full uppercase sm:h-12 sm:w-[10.25rem]"
            >
              {course.progress === 1 ? 'Completed' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function DashboardCourses() {
  const [value, setValue] = React.useState('inProcess');

  const { data, isLoading } = useQuery({
    queryKey: ['myCourses', value],
    staleTime: Infinity,
    queryFn: () =>
      webApi.courseApi.getCourseListBySearch<PageResult<ProjectCourseType | ElectiveCourseType>>({ status: value }),
    select: ({ data }) => {
      return data.filter((item) => {
        return item.type !== CourseType.GUIDED_PROJECT;
      });
    }
  });
  return (
    <div className="rounded-3xl bg-neutral-white p-6">
      <h1 className="font-next-book-bold text-[1.375rem] font-bold text-neutral-off-black">My Courses</h1>
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
            {isLoading && <CourseSkeleton />}
            {data &&
              (data.length > 0 ? (
                data.map((item) => <CourseCard href={`/electives/${item.id}`} key={item.id} course={item} />)
              ) : (
                <CourseEmpty />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="completed">
          <div className="flex flex-col gap-8">
            {isLoading && <CourseSkeleton />}
            {data &&
              (data.length > 0 ? (
                data.map((item) => <CourseCard href={`/electives/${item.id}`} key={item.id} course={item} />)
              ) : (
                <CourseEmpty />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
