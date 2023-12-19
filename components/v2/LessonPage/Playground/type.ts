import { LessonContent } from '@/components/v2/Business/Renderer/type';
import { CourseLessonType } from '@/service/webApi/course/type';
import { createContext } from 'react';

export type LessonType = Omit<CourseLessonType, 'content'> & {
  content: LessonContent;
  completedQuiz: number[];
};
interface PlaygroundContextType {
  lesson: LessonType;
  onCompleted: VoidFunction;
  isPreview: boolean;
  isPlayground: boolean;
}
export const PlaygroundContext = createContext<PlaygroundContextType>({
  lesson: {} as LessonType,
  onCompleted: () => {},
  isPreview: false,
  isPlayground: false
});
