import { FC, ReactNode, useCallback, useEffect } from 'react';
import LessonPassLogo from '@/public/images/lesson/lesson_pass_logo.png';
import Image from 'next/image';
import Button, { ButtonProps } from '@/components/Common/Button';
import { useRouter } from 'next/router';
import { shallowEqual, useSelector } from 'react-redux';
import { AppRootState } from '@/store/redux';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import { getCourseLink } from '@/helper/utils';
import { useDebounceEffect, useDebounceFn } from 'ahooks';
interface LessonPassPageProps {
  lesson: CourseLessonType;
  courseType: CourseType;
}

const CustomButton: FC<ButtonProps> = (props) => {
  const { children } = props;
  return (
    <Button
      padding="px-[3rem] py-[1.25rem]"
      fontStyle="Inter font-normal font-next-book"
      textStyle="text-[.875rem] text-white leading-[1.25rem]"
      {...props}
    >
      {children}
    </Button>
  );
};

const LessonPassPage: FC<LessonPassPageProps> = (props) => {
  const { lesson, courseType } = props;
  const router = useRouter();

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
      router.push(`${getCourseLink(courseType)}/${lesson.courseId}/completed`);
      return;
    }

    if (currentLessonIndex < (currentUnit?.pages?.length || 1) - 1) {
      nextLesson = currentUnit?.pages[currentLessonIndex + 1];
    } else {
      nextLesson = unitsLessonsList[currentUnitIndex + 1].pages[0];
    }
    router.push(
      `${getCourseLink(courseType)}/${courseId}/learn/${nextLesson?.id}`
    );
  });

  // useEffect(() => {
  // let timer = setTimeout(() => {
  //   onNextClick();
  // }, 3000);
  // return () => clearTimeout(timer);
  // }, [onNextClick]);

  return (
    <div className={`w-full h-full flex justify-between flex-col text-center`}>
      <div className="mt-[7.5rem]">
        <div className="font-futura-bold text-[1.5rem] leading-[110%] text-white">
          Good Job!
        </div>
        <div className="font-Sofia-Pro-Light-Az leading-[1.25rem] text-white mt-[1.25rem]">
          Your answer are all correct.
        </div>
        <div className="mt-[4rem] flex justify-center">
          <Image src={LessonPassLogo} alt="pass-logo" width={269}></Image>
        </div>
      </div>
      <div className="mt-[10.33rem]">
        <CustomButton
          block
          onClick={() => {
            onNextClick();
          }}
        >
          Next
        </CustomButton>
      </div>
    </div>
  );
};

export default LessonPassPage;
