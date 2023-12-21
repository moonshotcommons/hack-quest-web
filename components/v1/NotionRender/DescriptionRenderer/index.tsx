import { FC } from 'react';
import { Renderer } from '..';
import { Typography } from 'antd';

interface DescriptionRendererProps {
  type: string;
  source: any;
  parent: any;
}

const DescriptionRenderer: FC<DescriptionRendererProps> = (props) => {
  const { source } = props;
  return (
    <Typography.Paragraph
      ellipsis={{
        rows: 6,
        expandable: true,
        symbol: (
          <span className="text-renderer-description-more-text-color font-next-book text-[1rem] leading-[120%]">{`</View More>`}</span>
        )
      }}
      className="font-next-book text-[#676767] text-[1rem] leading-[120%] "
    >
      {source.map((item: any, index: number) => {
        return (
          <Renderer
            type={item.type}
            source={item}
            key={index}
            parent={source}
          ></Renderer>
        );
      })}
    </Typography.Paragraph>
  );
};

export default DescriptionRenderer;
