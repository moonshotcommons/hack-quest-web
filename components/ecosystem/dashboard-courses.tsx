'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpenIcon } from 'lucide-react';
import { isMobile } from 'react-device-detect';
import { useQuery } from '@tanstack/react-query';
import Button from '@/components/Common/Button';
import webApi from '@/service';
import { PageResult } from '@/service/webApi/type';
import { CourseTrackType, CourseType, ProjectCourseType } from '@/service/webApi/course/type';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import { Progress, ProgressLabel } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CourseDetailType } from '@/service/webApi/course/type';
import { getCoverImageByTrack } from '@/helper/utils';
import { LineTabs } from './line-tabs';
import MenuLink from '@/constants/MenuLink';
import { useTranslation } from '@/i18n/client';
import { useLang } from '../Provider/Lang';
import { TransNs } from '@/i18n/config';

const coverImageMap: Record<string, { src: string; width: number; height: number }> = {
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
  return (
    <div className="h-[24.625rem] w-full animate-pulse rounded-2xl bg-neutral-white sm:h-[14.75rem] sm:bg-neutral-off-white" />
  );
}

function CourseEmpty({ label }: { label?: string }) {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col items-center gap-4 py-8">
        <h2 className="text-base font-bold text-neutral-black sm:text-lg">
          {label || 'You’re not enrolled in any course'}
        </h2>
        <Link href="/electives">
          <Button size="small" ghost className="h-8 w-[8.75rem] uppercase">
            Explore
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function CourseCard({ type, course }: { type: 'course' | 'learningTrack'; course: CourseDetailType }) {
  const href =
    type === 'course'
      ? CourseType.UGC
        ? `${MenuLink.PRACTICES}/${course.id}`
        : `${MenuLink.ELECTIVES}/${course.id}`
      : '/learning-track/' + course.id;
  return (
    <Link href={href}>
      <div className="flex flex-col overflow-hidden rounded-2xl border border-neutral-light-gray bg-neutral-white transition-all duration-300 sm:flex-row sm:hover:-translate-y-1">
        <div className="relative h-40 w-full sm:h-[14.5625rem] sm:w-[18rem]">
          {course.image ? (
            <Image src={course.image} alt={course.title} fill className="object-cover sm:rounded-l-2xl" />
          ) : isMobile ? (
            getCoverImageByTrack(course.track as any)
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
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.ECOSYSTEM);
  const [value, setValue] = React.useState('inProcess');

  const { data, isLoading } = useQuery({
    staleTime: 1000 * 5,
    queryKey: ['myCourses', value],
    queryFn: () =>
      webApi.courseApi.getCourseListBySearch<PageResult<ProjectCourseType | ElectiveCourseType>>({ status: value }),
    select: ({ data }) => {
      return data.filter((item) => {
        return item.type !== CourseType.GUIDED_PROJECT;
      });
    }
  });
  return (
    <div className="rounded-3xl p-6 sm:bg-neutral-white">
      <h1 className="font-next-book-bold text-[1.375rem] font-bold text-neutral-off-black">{t('my_courses')}</h1>
      <LineTabs
        tabs={[
          { value: 'inProcess', label: t('in_progress') },
          { value: 'completed', label: t('completed') }
        ]}
        value={value}
        onValueChange={setValue}
        className="mt-8"
      />
      <div className="mt-8 flex flex-col gap-8">
        {isLoading && <CourseSkeleton />}
        {data &&
          (data.length > 0 ? (
            data.map((item) => <CourseCard type="course" key={item.id} course={item} />)
          ) : (
            <CourseEmpty
              label={value === 'inProcess' ? 'You’re not enrolled in any course' : 'You don’t have a completed course'}
            />
          ))}
      </div>
    </div>
  );
}
