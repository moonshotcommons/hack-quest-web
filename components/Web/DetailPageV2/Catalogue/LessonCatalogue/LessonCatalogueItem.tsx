import { FC, Suspense } from 'react';
import LessonStatusButton from './LessonStatusButton';
import LinkWrap from './LinkWrap';
import { ElectiveCourseDetailType, PageType } from '@/service/webApi/elective/type';
import LessonProvider from '../../Provider/LessonProvider';

interface ElectiveCatalogueItemProps {
  lesson: PageType;
  // isLock?: boolean;
  index: number;
  courseDetail?: ElectiveCourseDetailType;
  loading?: boolean;
}

const ElectiveCatalogueItem: FC<ElectiveCatalogueItemProps> = (props) => {
  const { lesson, courseDetail, index } = props;

  return (
    <LessonProvider lesson={lesson} courseDetail={courseDetail!}>
      <div className="flex items-center p-4">
        <div className="flex-1">
          <Suspense fallback={<div>loading...</div>}>
            <LinkWrap lesson={lesson} courseDetail={courseDetail!}>
              <h2 className="body-l-bold text-neutral-black">{lesson.title}</h2>
              <p className="body-s mt-1 line-clamp-3  text-neutral-medium-gray">{lesson.description}</p>
            </LinkWrap>
          </Suspense>
        </div>

        <div className="flex w-[165px] max-w-[165px] justify-end">
          <LessonStatusButton courseDetail={courseDetail!} lesson={lesson} index={index} />
        </div>
      </div>
    </LessonProvider>
  );
};

export default ElectiveCatalogueItem;
