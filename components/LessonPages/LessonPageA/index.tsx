import { Block } from '@/components/TempComponent/Block';
import Quest from '@/components/TempComponent/Quest';

import { CourseLessonType, CourseType } from '@/service/webApi/course/type';

import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import LessonPassPage from '../LessonPassPage';
import webApi from '@/service';
import CompleteModal from '../CompleteModal';
import { shallowEqual, useSelector } from 'react-redux';
import { AppRootState } from '@/store/redux';

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

  const [completeModalOpen, setCompleteModalOpen] = useState(false);

  const { unitsLessonsList } = useSelector((state: AppRootState) => {
    return {
      unitsLessonsList: state.course.unitsLessonsList
    };
  }, shallowEqual);

  const onPass = useCallback(async () => {
    setPass(true);
    try {
      await webApi.courseApi.completeLesson(lesson.id);
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
      if (isLastUnit && isLastLesson) {
        setCompleteModalOpen(true);
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
          lesson={lesson}
          courseType={courseType}
        ></LessonPassPage>
      );
    }
    return (
      <Quest
        courseType={courseType}
        lessonID={lesson.id}
        isLastUnit={false}
        content={quizes}
        onPass={onPass}
        darkMode={true}
        setIsProgressing={setIsProgressing}
      />
    );
  }, [pass, courseType, lesson, quizes, onPass]);

  useEffect(() => {
    if (lesson) {
      setLessonContent((lesson.content?.[0] as any).children);
      setQuizes((lesson.content?.[1] as any).children);
      setPass(false);
      webApi.courseApi.startLesson(lesson.id).catch((e) => {
        console.log('开始学习失败', e);
      });
    }
  }, [lesson]);

  return (
    <div className="w-full h-[80vh] flex justify-between gap-[4.5rem] mt-[1.25rem]">
      <div className="text-white h-full w-full px-[3rem] py-[2.5rem] rounded-[2.5rem] bg-[#101010] overflow-y-scroll notion-render-block no-scrollbar">
        {lessonContent &&
          lessonContent?.map((block: any) => (
            <Block
              block={block}
              key={block.id}
              darkMode={true}
              renderChildren={true}
            />
          ))}
      </div>
      <div className="text-[#E2E2E2] h-full bg-[#111] notion-render-block w-full py-[2.5rem] rounded-[2.5rem] overflow-y-scroll no-scrollbar">
        {RightComponent}
      </div>
      <CompleteModal
        open={completeModalOpen}
        onClose={() => setCompleteModalOpen(false)}
      ></CompleteModal>
    </div>
  );
};

export default LessonPageA;
