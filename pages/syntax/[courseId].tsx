// ./pages/article/[articleId].tsx
import type { NextPage } from 'next';

interface IProps {
  courseId: number;
}

const Syntax: NextPage<IProps> = ({ courseId }) => {
  return (
    <div>
      <h1 className="text-white">课程{courseId}</h1>
    </div>
  );
};

Syntax.getInitialProps = (context) => {
  const { courseId } = context.query;
  return {
    courseId: Number(courseId)
  };
};

export default Syntax;
