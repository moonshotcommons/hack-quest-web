import { useJumpLeaningLesson } from '@/hooks/courses/useJumpLeaningLesson';
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
      <div className="h-20 w-[6.25rem] bg-gray-500 text-neutral-black">
        {course.title}
      </div>
      <p>UGC卡片</p>
      <p>临时跳转链接</p>
    </div>
  );
};

export default UgcCard;
