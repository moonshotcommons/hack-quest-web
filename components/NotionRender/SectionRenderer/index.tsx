import { FC, ReactNode } from 'react';
import { Renderer } from '..';

interface SectionRendererProps {
  type: string;
  source: any;
  parent: any;
}

const SectionRenderer: FC<SectionRendererProps> = (props) => {
  const { source, parent } = props;
  const type = source.type;
  const imageSource = source.children[0];
  const contentSource = source.children[1];
  return (
    <div className="flex flex-col pb-8">
      {/* 渲染header */}
      <Renderer
        type={type}
        source={source}
        isRenderChildren={false}
        parent={parent}
      ></Renderer>
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
                parent={contentSource}
              ></Renderer>
            );
          })}
        </div>
        <div className="flex-1 relative">
          <Renderer
            type={imageSource.type}
            source={imageSource}
            parent={parent}
          ></Renderer>
        </div>
      </div>
    </div>
  );
};

export default SectionRenderer;
