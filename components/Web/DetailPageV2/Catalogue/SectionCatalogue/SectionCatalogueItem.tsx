'use client';
import { tagFormate } from '@/helper/formate';
import { cn, getCoursePrefixByCourseType } from '@/helper/utils';

import { LearningTrackDetailType, SectionType } from '@/service/webApi/learningTrack/type';
import { FC } from 'react';

import SectionProvider from '../../Provider/SectionProvider';
import SectionWrap from './SectionWrap';
import LearningTrackCourseStatusButton from './LearningTrackCourseStatusButton';
import Link from 'next/link';
import { CourseType } from '@/service/webApi/course/type';
import { ViewButton } from '@/components/Web/Documentation/view-button';

interface LearningTrackCatalogueItemProps {
  section: SectionType;
  index: number;
  learningTrackDetail: LearningTrackDetailType;
}

const LearningTrackCatalogueItem: FC<LearningTrackCatalogueItemProps> = (props) => {
  const { section, index: sectionIndex, learningTrackDetail } = props;

  const sectionTitle = <div className="body-l-bold text-neutral-black">{`${section.name}`}</div>;

  return (
    <SectionProvider section={section} sectionIndex={sectionIndex}>
      <SectionWrap title={sectionTitle} sectionIndex={sectionIndex}>
        <ul className="mt-4 flex w-full flex-col gap-2 p-4">
          {section.courses.map((course, index: number) => {
            return (
              <li key={index} className={cn(`flex h-[36px] items-center justify-between`)}>
                <div className="min-w-[6.25rem]">
                  <div className="body-xs flex w-fit items-center justify-center rounded-[8px] border border-neutral-off-black px-2 py-[2px]">
                    {tagFormate(course.type !== CourseType.UGC ? course.type : CourseType.CONCEPT)}
                  </div>
                </div>
                <div className="ml-[10%] flex w-[36%] flex-1 items-center gap-2">
                  <Link
                    href={`${getCoursePrefixByCourseType(course.type)}/${course.id}?learningTrackId=${learningTrackDetail.id}&documentationId=${course.documentationId}`}
                    className="body-s cursor-pointer text-neutral-black transition hover:opacity-70"
                  >
                    {course.title}
                  </Link>
                  <ViewButton showText={false} iconClassName="w-4 h-4" id={course.documentationId} placement="center" />
                </div>
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
