// ./pages/article/[articleId].tsx
import type { NextPage } from 'next';

interface IProps {
  id: number;
}

const Syntax: NextPage<IProps> = ({ id }) => {
  return (
    <div>
      <h1 className="text-white">hackathon{id}</h1>
    </div>
  );
};

Syntax.getInitialProps = (context) => {
  const { id } = context.query;
  return {
    id: Number(id)
  };
};

export default Syntax;
