import { FC } from 'react';
import { LessonReadingData, lessonTypeData } from '../UgcSidebar/constant';

interface LessonContainerProps {
  lesson: LessonReadingData;
}

const LessonContainer: FC<LessonContainerProps> = (props) => {
  const { lesson } = props;
  return (
    <div className="w-full h-full overflow-auto flex flex-col items-center">
      <h2 className="text-h2">{lesson.name}</h2>
      <div className="flex gap-[.625rem] mt-[.625rem] items-center">
        <span>{lessonTypeData[lesson.type].icon}</span>
        <span className="caption-16pt">
          {lessonTypeData[lesson.type].label}
        </span>
      </div>
    </div>
  );
};

export default LessonContainer;
