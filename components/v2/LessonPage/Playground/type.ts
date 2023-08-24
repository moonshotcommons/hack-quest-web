import { CourseLessonType } from '@/service/webApi/course/type';
import { createContext } from 'react';
import { LessonContent } from '../type';

export type LessonType = Omit<CourseLessonType, 'content'> & {
  content: LessonContent;
};
interface PlaygroundContextType {
  lesson: LessonType;
}
export const PlaygroundContext = createContext<PlaygroundContextType>({
  lesson: {} as LessonType
});
