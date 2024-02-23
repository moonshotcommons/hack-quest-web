'use client';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { tagFormate } from '@/helper/formate';
import { cn, getCoursePrefixByCourseType } from '@/helper/utils';

import {
  LearningTrackDetailType,
  SectionType
} from '@/service/webApi/learningTrack/type';
import { FC } from 'react';

import SectionProvider from '../../Provider/SectionProvider';
import SectionWrap from './SectionWrap';
import LearningTrackCourseStatusButton from '../../StatusButton/LearningTrackCourseStatusButton';
import Link from 'next/link';

interface LearningTrackCatalogueItemProps {
  section: SectionType;
  index: number;
  learningTrackDetail: LearningTrackDetailType;
}

const LearningTrackCatalogueItem: FC<LearningTrackCatalogueItemProps> = (
  props
) => {
  const { section, index: sectionIndex, learningTrackDetail } = props;

  const sectionTitle = (
    <span className="body-m-bold min-fit break-all text-neutral-black">{`${section.name}`}</span>
  );

  return (
    <SectionProvider section={section} sectionIndex={sectionIndex}>
      <SectionWrap title={sectionTitle} sectionIndex={sectionIndex}>
        <ul className="mt-4 flex w-full flex-col gap-2">
          {section.courses.map((course, index: number) => {
            return (
              <li key={index} className={cn(`flex flex-col gap-4`)}>
                <div className="flex items-center justify-between gap-4 py-1">
                  {/* course type 标签 */}
                  <div className="min-w-[6.25rem]">
                    <div className="body-xs flex w-fit items-center justify-center rounded-[8px] border border-neutral-off-black px-2 py-[2px]">
                      {tagFormate(course.type)}
                    </div>
                  </div>
                  {/* 课程标题 */}
                  <div className="flex w-full flex-col gap-4">
                    <Link
                      href={`${getCoursePrefixByCourseType(course.type)}/${course.id}?${QueryIdType.LEARNING_TRACK_ID}=${learningTrackDetail.id}&${QueryIdType.MENU_COURSE_ID}=${course.id}&menu=${Menu.LEARNING_TRACK}`}
                      className="body-s inline-block flex-1 cursor-pointer text-neutral-black transition hover:opacity-70"
                    >
                      {course.name}
                    </Link>
                  </div>
                </div>
                {/* 进度条 */}
                <LearningTrackCourseStatusButton course={course} />
              </li>
            );
          })}
        </ul>
      </SectionWrap>
    </SectionProvider>
  );
};

export default LearningTrackCatalogueItem;
