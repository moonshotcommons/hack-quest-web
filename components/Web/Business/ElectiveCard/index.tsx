'use client';
import Button from '@/components/Common/Button';
import { BurialPoint } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import { useJumpLeaningLesson } from '@/hooks/courses/useJumpLeaningLesson';
import Image from 'next/image';
import { FC, useCallback } from 'react';
import { QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import CardProgress from '../CardProgress';
import Logo from '@/public/images/logo/logo.svg';
import TrackTag from '@/components/Common/TrackTag';
import CompletedIcon from '@/components/Common/Icon/Completed';
import { CourseType } from '@/service/webApi/course/type';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
interface ElectiveCardProps {
  // children: ReactNode;
  course: ElectiveCourseType;
  inProgress?: boolean;
  inCompleted?: boolean;
  baseProgress?: boolean;
  onCourseClick?: (course: ElectiveCourseType) => void;
  from?: 'dashboard' | 'project';
  className?: string;
}

const ElectiveCard: FC<ElectiveCardProps> = (props) => {
  const { course, inProgress = false, from = 'elective', className = '' } = props;
  const { jumpLearningLesson, loading } = useJumpLeaningLesson();

  const getCourseDetailLink = useCallback(() => {
    switch (course.type) {
      case CourseType.UGC:
        return `${MenuLink.PRACTICES}/${course.id}`;
      default:
        return `${MenuLink.ELECTIVES}/${course.id}`;
    }
  }, [course]);

  return (
    <>
      <Link
        href={getCourseDetailLink()}
        className={cn('card-hover flex w-full flex-col rounded-[16px] bg-neutral-white', className)}
        onClick={() => {
          BurialPoint.track('home-course卡片点击', {
            courseName: course.title
          });
        }}
      >
        <div className={`relative h-0 w-full overflow-hidden rounded-t-2xl pt-[56%]`}>
          <Image src={course.image || ''} fill alt="cover" className="object-contain"></Image>
        </div>
        <div className={`relative flex h-[216px]  flex-col justify-between p-[16px]`}>
          {from === 'dashboard' && !!course.progress && course.progress >= 1 ? (
            <div className={`absolute right-[16px]  top-[16px] z-10`}>
              <CompletedIcon />
            </div>
          ) : null}
          <div className="flex flex-col gap-[16px]">
            <TrackTag track={course.track} />
            <h2 className={`body-m-bold line-clamp-2 text-neutral-off-black`}>{course.title}</h2>
            {!inProgress && <div className="body-s line-clamp-2 text-neutral-medium-gray">{course.description}</div>}
          </div>
          <div className="flex flex-col gap-[16px]">
            {inProgress ? (
              <>
                <CardProgress progress={course.progress || 0} />
                <Button
                  type="primary"
                  className="button-text-m h-[48px]  px-0 text-neutral-off-black"
                  loading={loading}
                  disabled={loading}
                  block
                  onClick={(e) => {
                    BurialPoint.track('home-course卡片resume按钮点击', {
                      courseName: course.title
                    });
                    e.stopPropagation();
                    jumpLearningLesson(course, {
                      menu: 'electives',
                      idTypes: [QueryIdType.MENU_COURSE_ID],
                      ids: [course.id]
                    });
                  }}
                >
                  CONTINUE
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="relative h-[16px] w-[16px] overflow-hidden rounded-full">
                  <Image src={course.creator?.profileImage || Logo} fill alt="creator"></Image>
                </div>
                <span className="body-xs-bold">{course.creator?.name || `Hackquest`}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
      {/* <MiniElectiveDetailModal ref={miniElectiveDetailInstance} /> */}
    </>
  );
};

export default ElectiveCard;
