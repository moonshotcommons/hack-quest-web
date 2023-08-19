import { Block } from '@/components/TempComponent/Block';
import Quest from '@/components/TempComponent/Quest';

import {
  CourseLessonType,
  CourseType,
  LessonStyleType
} from '@/service/webApi/course/type';

import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CompleteModal from '../CompleteModal';
import webApi from '@/service';
import { shallowEqual, useSelector } from 'react-redux';
import { AppRootState } from '@/store/redux';
import { useRouter } from 'next/router';
import NotionRenderer, { Renderer } from '@/components/NotionRender';
import { CustomRenderType } from '@/components/NotionRender/type';

interface LessonPageAProps {
  lesson: CourseLessonType;
  courseType: CourseType;
}

const LessonPageA: FC<LessonPageAProps> = (props) => {
  const { lesson, courseType } = props;
  const [lessonContent, setLessonContent] = useState([]);
  const [quizes, setQuizes] = useState([]);
  const [isProgressing, setIsProgressing] = useState(false);
  const [pass, setPass] = useState<boolean>(false);
  const router = useRouter();
  const { courseId: courseName } = router.query;
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [isLastLesson, setIsLastLesson] = useState(false);
  const { unitsLessonsList } = useSelector((state: AppRootState) => {
    return {
      unitsLessonsList: state.course.unitsLessonsList
    };
  }, shallowEqual);

  const onPass = useCallback(async () => {
    setPass(true);
    try {
      let currentUnitIndex = unitsLessonsList.findIndex((unit) => {
        return unit.id === lesson.unitId;
      });
      const currentUnit = unitsLessonsList[currentUnitIndex];
      const currentLessonIndex =
        currentUnit?.pages.findIndex((page) => page.id === lesson.id) || 0;
      const isLastUnit =
        currentUnitIndex === (unitsLessonsList.length || 1) - 1;
      const isLastLesson =
        currentLessonIndex === (currentUnit?.pages.length || 1) - 1;
      if (isLastUnit && isLastLesson) setIsLastLesson(true);
      await webApi.courseApi.completeLesson(lesson.id);
      if (isLastUnit && isLastLesson) {
        setTimeout(() => {
          setCompleteModalOpen(true);
        }, 1000);
        return;
      }
    } catch (e) {
      console.log('完成状态发生错误', e);
    }
  }, [lesson, unitsLessonsList]);

  useEffect(() => {
    if (lesson) {
      setLessonContent((lesson.content?.[0] as any).children);
      setQuizes((lesson.content?.[1] as any).children);
      setPass(false);
      setIsLastLesson(false);
      webApi.courseApi.startLesson(lesson.id).catch((e) => {
        console.log('开始学习失败', e);
      });
    }
  }, [lesson]);

  const lessonContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lessonContentRef.current) {
      lessonContentRef.current.scrollTo(0, 0);
    }
  }, [lesson]);
  return (
    <div
      ref={lessonContentRef}
      className="text-text-default-color text-[.875rem] h-full"
    >
      <div className="relative mb-8">
        <NotionRenderer styleType={LessonStyleType.A}>
          {lessonContent?.map((item: any) => {
            return (
              <Renderer
                key={item.id}
                type={item.type}
                source={item}
                parent={{ ...lessonContent, isRoot: true }}
              ></Renderer>
            );
          })}
        </NotionRenderer>
      </div>
      <>
        <CompleteModal
          title={courseName as string}
          open={completeModalOpen}
          onClose={() => setCompleteModalOpen(false)}
        ></CompleteModal>
      </>
    </div>
  );
};

export default LessonPageA;
