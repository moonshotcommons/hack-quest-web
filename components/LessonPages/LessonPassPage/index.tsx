'use client';
import Button from '@/components/Common/Button';
import { Theme } from '@/constants/enum';
import { useGetLessonLink } from '@/hooks/useCoursesHooks/useGetLessonLink';
import DarkLessonPassLogo from '@/public/images/lesson/dark-lesson_pass_logo.png';
import LightLessonPassLogo from '@/public/images/lesson/light-lesson_pass_logo.png';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import { ThemeContext } from '@/store/context/theme';
import { AppRootState } from '@/store/redux';
import { useDebounceFn } from 'ahooks';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useContext } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
interface LessonPassPageProps {
  lesson: CourseLessonType;
  courseType: CourseType;
  isLastLesson: boolean;
}

const LessonPassPage: FC<LessonPassPageProps> = (props) => {
  const { lesson, courseType, isLastLesson } = props;
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const { getLink } = useGetLessonLink();
  const { unitsLessonsList } = useSelector((state: AppRootState) => {
    return {
      unitsLessonsList: state.course.unitsLessonsList
    };
  }, shallowEqual);

  const { run: onNextClick } = useDebounceFn(() => {
    const { courseId } = router.query;
    let nextLesson;

    let currentUnitIndex = unitsLessonsList.findIndex((unit) => {
      return unit.id === lesson.unitId;
    });
    const currentUnit = unitsLessonsList[currentUnitIndex];
    const currentLessonIndex =
      currentUnit?.pages.findIndex((page) => page.id === lesson.id) || 0;
    const isLastUnit = currentUnitIndex === (unitsLessonsList.length || 1) - 1;
    const isLastLesson =
      currentLessonIndex === (currentUnit?.pages.length || 1) - 1;

    if (isLastUnit && isLastLesson) {
      return;
    }

    if (currentLessonIndex < (currentUnit?.pages?.length || 1) - 1) {
      nextLesson = currentUnit?.pages[currentLessonIndex + 1];
    } else {
      nextLesson = unitsLessonsList[currentUnitIndex + 1].pages[0];
    }

    const link = getLink(courseType, nextLesson?.id as string);
    router.push(link);
  });

  return (
    <div className={`w-full h-full flex justify-between flex-col text-center`}>
      <div className="mt-[7.5rem]">
        <div className="font-futura-bold text-[1.5rem] leading-[110%] text-text-default-color">
          Good Job!
        </div>
        <div className="font-Sofia-Pro-Light-Az leading-[1.25rem] text-text-default-color mt-[1.25rem]">
          Your answer are all correct.
        </div>
        <div className="mt-[4rem] flex justify-center">
          {theme === Theme.Dark && (
            <Image src={DarkLessonPassLogo} alt="pass-logo" width={269}></Image>
          )}
          {theme === Theme.Light && (
            <Image
              src={LightLessonPassLogo}
              alt="pass-logo"
              width={269}
            ></Image>
          )}
        </div>
      </div>
      <div className="-mb-[1.25rem]">
        {!isLastLesson && (
          <Button
            block
            className="bg-lesson-primary-button-bg text-lesson-primary-button-text-color border border-lesson-primary-button-border-color font-next-book"
            onClick={() => {
              onNextClick();
            }}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default LessonPassPage;
