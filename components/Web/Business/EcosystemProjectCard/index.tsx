'use client';
import { BurialPoint } from '@/helper/burialPoint';
import { useJumpLeaningLesson } from '@/hooks/courses/useJumpLeaningLesson';
import { ProjectCourseType } from '@/service/webApi/course/type';
import { FC, useContext } from 'react';
import { QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import CardProgress from '../CardProgress';
import Button from '@/components/Common/Button';
import TrackTag from '@/components/Common/TrackTag';
import CompletedIcon from '@/components/Common/Icon/Completed';
import { getCoverImageByTrack } from '@/helper/utils';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { GoCheck } from 'react-icons/go';

interface EcosystemProjectCardProps {
  course: ProjectCourseType;
  from?: 'dashboard' | 'project';
  inProgress?: boolean;
}

const EcosystemProjectCard: FC<EcosystemProjectCardProps> = (props) => {
  const { course, from = 'project', inProgress = false } = props;
  const { jumpLearningLesson, loading } = useJumpLeaningLesson();
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);

  return (
    <Link
      href={`${MenuLink.PRACTICES}/${course.id}`}
      className={
        'card-hover  flex w-full flex-col rounded-[12px] bg-neutral-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]'
      }
      onClick={() => {
        BurialPoint.track('home-practice卡片点击', { practice: course.title });
      }}
    >
      <div className="relative h-0 w-full pt-[56%]">{getCoverImageByTrack(course.track)}</div>
      <div className="relative flex h-[216px] w-full flex-col justify-between p-[16px] ">
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
                className="button-text-m h-[48px] px-0  py-[12px] text-neutral-off-black"
                block
                loading={loading}
                disabled={loading}
                onClick={(e) => {
                  BurialPoint.track('home-course卡片Continue按钮点击', {
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
            <div className="body-xs flex items-center justify-between text-neutral-rich-gray">
              <div className="flex items-center gap-[8px]">
                <GoCheck size={20} className="text-status-success-dark" />
                <span>{t('explore.bounty')}</span>
              </div>
              <div>
                <span>{123}</span> <span>{t('explore.votes')}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default EcosystemProjectCard;
