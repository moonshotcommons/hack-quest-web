import NotionRenderer, { Renderer } from '@/components/NotionRender';
import { CustomRenderType } from '@/components/NotionRender/type';
import LessonPassPage from '@/components/v2/LessonPages/LessonPassPage';
import webApi from '@/service';
import {
  CourseLessonType,
  CourseType,
  LessonStyleType
} from '@/service/webApi/course/type';
import { AppRootState } from '@/store/redux';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

interface CodeProps {
  lesson: CourseLessonType;
  courseType: CourseType;
}
const Code: React.FC<CodeProps> = (props) => {
  const { lesson, courseType } = props;
  const [quizes, setQuizes] = useState([]);
  const [pass, setPass] = useState<boolean>(false);
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

  const RightComponent = useMemo(() => {
    if (pass) {
      return (
        <LessonPassPage
          isLastLesson={isLastLesson}
          lesson={lesson}
          courseType={courseType}
        ></LessonPassPage>
      );
    }
    return (
      <NotionRenderer styleType={LessonStyleType.A}>
        <Renderer
          type={CustomRenderType.Quiz}
          source={quizes}
          parent={{ ...quizes, isRoot: true, onPass, isLastLesson, lesson }}
        ></Renderer>
      </NotionRenderer>
    );
  }, [pass, courseType, lesson, quizes, onPass, isLastLesson]);
  useEffect(() => {
    if (lesson) {
      setQuizes((lesson.content?.[1] as any).children);
      setPass(false);
      setIsLastLesson(false);
      webApi.courseApi.startLesson(lesson.id).catch((e) => {
        console.log('开始学习失败', e);
      });
    }
  }, [lesson]);
  return <div className="w-full h-full overflow-auto">{RightComponent}</div>;
};

export default Code;
