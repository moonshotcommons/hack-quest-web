import { FC, ReactNode } from 'react';

interface IndexProps {
  content: any;
}

const Index: FC<IndexProps> = (props) => {
  const { content } = props;
  return <div>Index</div>;
};

export default Index;
