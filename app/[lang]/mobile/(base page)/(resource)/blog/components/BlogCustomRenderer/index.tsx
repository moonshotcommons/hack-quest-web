import message from 'antd/es/message';
import { FC, useEffect } from 'react';

interface BlogCustomRendererProps {
  parent: any;
  component: any;
  isRenderChildren?: boolean;
}

const BlogCustomRenderer: FC<BlogCustomRendererProps> = (props) => {
  const { component } = props;
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') console.log('在blog中不受支持的渲染类型 => ', component?.type);
    else message.error(`在blog中不受支持的渲染类型 => ${component?.type}`);
  }, [component]);

  return <div></div>;
};

export default BlogCustomRenderer;
