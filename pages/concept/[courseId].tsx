// ./pages/article/[articleId].tsx
import type { NextPage } from 'next';

interface IProps {
  courseId: string;
}

const Syntax: NextPage<IProps> = ({ courseId }) => {
  return (
    <div>
      <h1 className="text-white">concept{courseId}</h1>
    </div>
  );
};

Syntax.getInitialProps = (context) => {
  const { courseId } = context.query;
  return {
    courseId: courseId as string
  };
};

export default Syntax;
