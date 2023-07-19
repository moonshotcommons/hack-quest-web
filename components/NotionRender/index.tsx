import { LessonStyleType } from '@/service/webApi/course/type';
import { FC, ReactNode, createContext } from 'react';
import HeaderRenderer from './HeaderRenderer';
import { HeaderLevel } from './HeaderRenderer/type';
import SectionRenderer from './SectionRenderer';
import ImageRenderer from './ImageRenderer';
import StepRenderer from './StepRenderer';

export interface NotionRendererContextType {
  styleType: LessonStyleType;
}

export const NotionRendererContext = createContext<NotionRendererContextType>(
  {} as NotionRendererContextType
);

interface NotionRendererProps {
  source: any;
  styleType: LessonStyleType;
}

const NotionRenderer: FC<NotionRendererProps> = (props) => {
  const { source, styleType } = props;
  const type = source.type;
  return (
    <NotionRendererContext.Provider
      value={{
        styleType
      }}
    >
      <Renderer type={type} source={source[type]}></Renderer>
    </NotionRendererContext.Provider>
  );
};

interface RendererPropsType {
  type: string;
  source: any;
  isRenderChildren?: boolean;
}

export const Renderer: FC<RendererPropsType> = (props) => {
  const { type, source, isRenderChildren = true } = props;
  switch (type) {
    case 'section':
      return <SectionRenderer type={type} source={source}></SectionRenderer>;
    case 'image':
      return <ImageRenderer type={type} source={source}></ImageRenderer>;
    case 'step':
      return <StepRenderer type={type} source={source}></StepRenderer>;
    case 'quote':
      return <StepRenderer type={type} source={source}></StepRenderer>;
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
    case 'heading_4':
    case 'heading_5':
    case 'heading_6':
      return (
        <HeaderRenderer
          type={type as HeaderLevel}
          source={source}
          isRenderChildren={isRenderChildren}
        ></HeaderRenderer>
      );
  }
};

export default NotionRenderer;
