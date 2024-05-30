import message from 'antd/es/message';
import { FC, useEffect } from 'react';

interface HackathonCustomRendererProps {
  parent: any;
  component: any;
  isRenderChildren?: boolean;
}

const HackathonCustomRenderer: FC<HackathonCustomRendererProps> = (props) => {
  const { component } = props;
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') console.log('在hackathon中不受支持的渲染类型 => ', component?.type);
    else message.error(`在hackathon中不受支持的渲染类型 => ${component?.type}`);
  }, [component]);

  return <div></div>;
};

export default HackathonCustomRenderer;
