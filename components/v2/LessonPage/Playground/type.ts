import { CourseLessonType } from '@/service/webApi/course/type';
import { createContext } from 'react';
import { LessonContent } from '../type';

export type LessonType = Omit<CourseLessonType, 'content'> & {
  content: LessonContent;
  completedQuiz: number[];
};
interface PlaygroundContextType {
  lesson: LessonType;
  onCompleted: VoidFunction;
  isPreview: boolean;
}
export const PlaygroundContext = createContext<PlaygroundContextType>({
  lesson: {} as LessonType,
  onCompleted: () => {},
  isPreview: false
});
