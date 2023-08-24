import { LessonStyleType } from '@/service/webApi/course/type';
import { FC, ReactNode, createContext } from 'react';
import HeaderRenderer from './HeaderRenderer';
import { HeaderLevel } from './HeaderRenderer/type';
import SectionRenderer from './SectionRenderer';
import ImageRenderer from './ImageRenderer';
import StepRenderer from './StepRenderer';
import QuoteRenderer from './QuoteRenderer';
import CodeRenderer from './CodeRenderer';
import ToggleRenderer from './ToggleRenderer';
import { CustomRenderType, NotionRenderType } from './type';
import ParagraphRenderer from './ParagraphRenderer';
import NumberListItemRenderer from './NumberListItemRenderer';
import BulletedListItemRenderer from './BulletedListItem';
import VideoRenderer from './VideoRenderer';
import DescriptionRenderer from './DescriptionRenderer';
import QuizRenderer from './QuizRenderer';
import CalloutRenderer from './CalloutRenderer';

export interface NotionRendererContextType {
  styleType: LessonStyleType;
}

export const NotionRendererContext = createContext<NotionRendererContextType>(
  {} as NotionRendererContextType
);

interface NotionRendererProps {
  // source: any;
  styleType: LessonStyleType;
  children: ReactNode;
}

const NotionRenderer: FC<NotionRendererProps> = (props) => {
  const { styleType, children } = props;

  return (
    <NotionRendererContext.Provider
      value={{
        styleType
      }}
    >
      {children}
    </NotionRendererContext.Provider>
  );
};

interface RendererPropsType {
  type: string;
  source: any;
  isRenderChildren?: boolean;
  index?: number;
  parent: any;
}

export const Renderer: FC<RendererPropsType> = (props) => {
  const { type, source, isRenderChildren = true, index, parent } = props;
  switch (type) {
    case CustomRenderType.SECTION:
      return (
        <SectionRenderer
          type={type}
          source={source}
          parent={parent}
        ></SectionRenderer>
      );

    case CustomRenderType.DESCRIPTION:
      return (
        <DescriptionRenderer
          type={type}
          source={source}
          parent={parent}
        ></DescriptionRenderer>
      );

    case CustomRenderType.STEP:
      return (
        <StepRenderer
          type={type}
          source={source}
          parent={parent}
        ></StepRenderer>
      );
    case CustomRenderType.Quiz:
      return (
        <QuizRenderer
          type={type}
          source={source}
          parent={parent}
        ></QuizRenderer>
      );

    case NotionRenderType.PARAGRAPH:
      return (
        <ParagraphRenderer
          type={type}
          source={source}
          parent={parent}
        ></ParagraphRenderer>
      );

    case NotionRenderType.NUMBERED_LIST_ITEM:
      return (
        <NumberListItemRenderer
          type={type}
          source={source}
          parent={parent}
        ></NumberListItemRenderer>
      );
    case NotionRenderType.BULLETED_LIST_ITEM:
      return (
        <BulletedListItemRenderer
          type={type}
          source={source}
          parent={parent}
        ></BulletedListItemRenderer>
      );

    case NotionRenderType.IMAGE:
      return (
        <ImageRenderer
          type={type}
          source={source}
          parent={parent}
        ></ImageRenderer>
      );

    case NotionRenderType.VIDEO:
      return (
        <VideoRenderer
          type={type}
          source={source}
          parent={parent}
        ></VideoRenderer>
      );

    case NotionRenderType.QUOTE:
      return (
        <QuoteRenderer
          type={type}
          source={source}
          parent={parent}
        ></QuoteRenderer>
      );
    case NotionRenderType.CALLOUT:
      return (
        <CalloutRenderer
          type={type}
          source={source}
          parent={parent}
        ></CalloutRenderer>
      );

    case NotionRenderType.TOGGLE:
      return (
        <ToggleRenderer
          type={type}
          source={source}
          parent={parent}
        ></ToggleRenderer>
      );

    case NotionRenderType.CODE:
      return (
        <CodeRenderer
          type={type}
          source={source}
          parent={parent}
        ></CodeRenderer>
      );

    case NotionRenderType.H1:
    case NotionRenderType.H2:
    case NotionRenderType.H3:
      return (
        <HeaderRenderer
          type={type}
          source={source}
          isRenderChildren={isRenderChildren}
          parent={parent}
        ></HeaderRenderer>
      );
  }
};

export default NotionRenderer;
