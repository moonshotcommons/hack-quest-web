import {
  CustomType,
  NotionType,
  QuizAType
} from '@/components/v2/LessonPage/type';
import { FC, ReactNode } from 'react';

interface QuizARendererProps {
  parent: CustomType | NotionType;
  quiz: QuizAType;
}

const QuizARenderer: FC<QuizARendererProps> = (props) => {
  return <div>QuizARenderer</div>;
};

export default QuizARenderer;
