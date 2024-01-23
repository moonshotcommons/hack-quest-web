import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { FC } from 'react';

interface UgcCardProps {
  course: any;
}

const UgcCard: FC<UgcCardProps> = ({ course }) => {
  const { jumpLearningLesson } = useJumpLeaningLesson();

  return (
    <div
      onClick={() => {
        jumpLearningLesson(course);
      }}
    >
      <div className="w-[6.25rem] h-20 text-black bg-gray-500">
        {course.title}
      </div>
      <p>UGC卡片</p>
      <p>临时跳转链接</p>
    </div>
  );
};

export default UgcCard;
