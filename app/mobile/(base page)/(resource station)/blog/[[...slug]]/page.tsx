'use client';
import { useNeedPCRedirect } from '@/hooks/useNeedPCRedirect';
// import Blog from '../components';

// export const metadata: Metadata = {
//   title: 'HackQuest Blog'
// };

import { FC } from 'react';

interface BlogProps {}

const Blog: FC<BlogProps> = (props) => {
  useNeedPCRedirect();
  return <></>;
};

export default Blog;

// export default Blog;
