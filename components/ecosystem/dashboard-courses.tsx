'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckIcon } from 'lucide-react';
import { isMobile } from 'react-device-detect';
import { useQuery } from '@tanstack/react-query';
import Button from '@/components/Common/Button';
import webApi from '@/service';
import { CourseTrackType, CourseType } from '@/service/webApi/course/type';
import { Progress, ProgressLabel } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CourseDetailType } from '@/service/webApi/course/type';
import { cn, getCoverImageByTrack } from '@/helper/utils';
import { LineTabs } from './line-tabs';
import MenuLink from '@/constants/MenuLink';
import { useTranslation } from '@/i18n/client';
import { useLang } from '../Provider/Lang';
import { TransNs } from '@/i18n/config';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { useJumpLeaningLesson } from '@/hooks/courses/useJumpLeaningLesson';
import { Menu, QueryIdType } from '../Web/Business/Breadcrumb/type';
import { CourseTag } from './course-tags';

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

function CourseEmpty({ label, href = '/electives' }: { label: string; href?: string }) {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.ECOSYSTEM);
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col items-center gap-4 py-8">
        <h2 className="text-base font-bold text-neutral-black sm:text-lg">{label}</h2>
        <Link href={href}>
          <Button size="small" ghost className="h-8 w-[8.75rem] uppercase">
            {t('explore')}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function CourseCard({
  type,
  course,
  showDescription = true
}: {
  type: 'course' | 'learningTrack';
  course: CourseDetailType;
  showDescription?: boolean;
}) {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.ECOSYSTEM);

  console.log('course', course);

  const href =
    type === 'course'
      ? CourseType.UGC
        ? `${MenuLink.PRACTICES}/${course.id}`
        : `${MenuLink.ELECTIVES}/${course.id}`
      : '/learning-track/' + course.id;
  return (
    <Link href={href}>
      <div className="flex flex-col overflow-hidden rounded-2xl border border-neutral-light-gray bg-neutral-white transition-all duration-300 sm:flex-row sm:hover:-translate-y-1">
        <div
          className={cn('relative h-40 w-full overflow-hidden sm:h-[14.5625rem] sm:w-[18rem]', {
            'sm:h-[170px]': !showDescription
          })}
        >
          {course.image ? (
            <Image src={course.image} alt={course.title} fill className="object-cover" />
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
        <div className="flex flex-1 flex-col gap-4 px-4 py-5 sm:p-5">
          {course.track && <Badge className="self-start">{course.track}</Badge>}
          <h1 className="text-sm font-bold leading-[160%] text-neutral-off-black sm:text-base">{course.title}</h1>
          {showDescription && (
            <p className="hidden text-sm text-neutral-medium-gray sm:line-clamp-2">{course.description}</p>
          )}
          <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex w-full flex-1 flex-col gap-2 sm:max-w-xs">
              <CourseTag
                language={course.language}
                count={course?.courseCount || course?.totalPages}
                type={course.type}
              />
              <Progress value={(course.progress || 0) * 100}>
                <ProgressLabel>{Math.floor((course.progress || 0) * 100)}%</ProgressLabel>
              </Progress>
            </div>
            <Button
              ghost={course.progress === 1}
              type="primary"
              className="h-[3.1875rem] w-full uppercase sm:h-12 sm:w-[10.25rem]"
            >
              {course.progress === 1 ? t('completed') : t('continue')}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

function LearningTrack({ item }: { item: LearningTrackDetailType }) {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.ECOSYSTEM);

  const { jumpLearningLesson, loading } = useJumpLeaningLesson();

  const isCompleted = item?.progress === 1;

  const onClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      e.preventDefault();
      const section = item?.sections?.find((v) => (v?.progress || 0) < 1);
      if (section) {
        const course = section?.courses?.find((v) => (v?.progress || 0) < 1);
        if (course)
          jumpLearningLesson(course, {
            menu: Menu.LEARNING_TRACK,
            idTypes: [QueryIdType.LEARNING_TRACK_ID, QueryIdType.MENU_COURSE_ID, QueryIdType.DOCUMENTATION_ID],
            ids: [item.id, course.id, course.documentationId!]
          });
      }
    },
    [item.id, item?.sections, jumpLearningLesson]
  );

  return (
    <Link href={`${MenuLink.LEARNING_TRACK}/${item.id}`}>
      <div className="sm:card-hover relative flex flex-col gap-2 rounded-2xl border border-neutral-light-gray bg-neutral-white sm:h-[203px] sm:flex-row">
        <div className="relative h-40 w-full overflow-hidden sm:h-full sm:w-[288px]">
          <Image
            src={item?.image}
            alt={item?.name}
            fill
            className="rounded-t-2xl object-cover sm:rounded-l-2xl sm:rounded-tr-none"
          />
        </div>
        {isCompleted && (
          <span className="absolute right-4 top-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-status-success">
            <CheckIcon size={18} className="text-neutral-white" />
          </span>
        )}
        <div className="flex flex-1 flex-col gap-4 px-4 py-5">
          {item?.track && <Badge className="self-start">{item.track}</Badge>}
          <h1 className="body-m-bold line-clamp-1 text-neutral-off-black">{item?.name}</h1>
          {isCompleted && <p className="body-s line-clamp-2 text-neutral-medium-gray">{item?.description}</p>}
          <CourseTag language={item.language} count={item?.courseCount} />
          {!isCompleted && (
            <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:gap-0">
              <Progress value={(item?.progress || 0) * 100} className="sm:max-w-xs">
                <ProgressLabel>{Math.floor((item?.progress || 0) * 100)}%</ProgressLabel>
              </Progress>
              <Button
                type="primary"
                loading={loading}
                onClick={onClick}
                data-prevent-nprogress={true}
                className="h-[3.1875rem] w-full uppercase sm:h-12 sm:w-[10.25rem]"
              >
                {t('continue')}
              </Button>
            </div>
          )}
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
    queryKey: ['learningTracks', value],
    queryFn: () => webApi.learningTrackApi.getLearningTracks({ status: value })
  });

  return (
    <div className="rounded-3xl p-6 sm:bg-neutral-white">
      <h1 className="font-next-book-bold text-[1.375rem] font-bold text-neutral-off-black">{t('learning_tracks')}</h1>
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
            data.map((item) => <LearningTrack key={item.id} item={item} />)
          ) : (
            <CourseEmpty
              href="/learning-track"
              label={
                value === 'inProcess'
                  ? t('enrolled_empty', { name: t('learning_track') })
                  : t('completed_empty', { name: t('learning_track') })
              }
            />
          ))}
      </div>
    </div>
  );
}
