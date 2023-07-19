import { FC, ReactNode } from 'react';
import { Renderer } from '..';

interface SectionRendererProps {
  type: string;
  source: any;
}

const SectionRenderer: FC<SectionRendererProps> = (props) => {
  const { source } = props;
  const type = source.type;
  const imageSource = source.children[0];
  const contentSource = source.children[1];
  return (
    <div className="flex flex-col">
      {/* 渲染header */}
      <Renderer type={type} source={source} isRenderChildren={false}></Renderer>
      <div className="flex gap-[3.4375rem]">
        <div className="w-[34%]">
          {/* <Renderer type={contentSource.type} source={contentSource}></Renderer> */}
          {contentSource.children.map((content: any, index: number) => {
            return (
              <Renderer
                key={index}
                type={
                  content.type === 'numbered_list_item' ? 'step' : content.type
                }
                source={content}
              ></Renderer>
            );
          })}
        </div>
        <div className="flex-1">
          <Renderer type={imageSource.type} source={imageSource}></Renderer>
        </div>
      </div>
    </div>
  );
};

export default SectionRenderer;
