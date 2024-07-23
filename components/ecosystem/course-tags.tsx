import AltIcon from '@/components/Common/Icon/AltIcon';
import CourseIcon from '@/components/Common/Icon/Course';
import { CourseType } from '@/service/webApi/course/type';

export function CourseTag({
  language,
  count = 0,
  type = CourseType.LEARNING_TRACK
}: {
  language?: string;
  count?: number;
  type?: CourseType;
}) {
  return (
    <div className="flex items-center gap-5 text-xs text-neutral-rich-gray">
      <div className="flex items-center gap-2">
        <AltIcon />
        <span>{language}</span>
      </div>
      <div className="flex items-center gap-2">
        <CourseIcon />
        <span>
          {count}
          {count > 1
            ? type === CourseType.LEARNING_TRACK
              ? ' Courses'
              : ' Lessons'
            : type === CourseType.LEARNING_TRACK
              ? ' Course'
              : ' Lesson'}
        </span>
      </div>
    </div>
  );
}
