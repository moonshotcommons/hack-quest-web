import { LessonStyleType } from '@/service/webApi/course/type';
import { FC, ReactNode } from 'react';

interface IndexProps {
  content: any;
  type: LessonStyleType;
}

// header 1 2 3 4 5 6
// section

const Index: FC<IndexProps> = (props) => {
  const { content } = props;
  return <div className="text-white">Index</div>;
};

export default Index;
