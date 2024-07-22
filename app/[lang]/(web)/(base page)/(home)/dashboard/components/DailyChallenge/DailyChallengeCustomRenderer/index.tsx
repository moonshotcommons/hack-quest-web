'use client';

import { FC } from 'react';

import QuizARenderer from './QuizRenderer/QuizARenderer';
import QuizBRenderer from './QuizRenderer/QuizBRenderer';
import QuizCRenderer from './QuizRenderer/QuizCRenderer';
import QuizRenderer from './QuizRenderer';

import {
  CustomComponent,
  CustomType,
  NotionComponent,
  QuizAType,
  QuizBType,
  QuizType
} from '@/components/ComponentRenderer/type';

interface DailyChallengeCustomRendererProps {
  parent: any;
  component: CustomComponent | NotionComponent;
  isRenderChildren?: boolean;
}

const DailyChallengeCustomRenderer: FC<DailyChallengeCustomRendererProps> = (props) => {
  const { parent, component, isRenderChildren = true } = props;
  switch (component.type.trim()) {
    // case CustomType.Reading:
    // case CustomType.Video:
    // case CustomType.Content:
    //   return <ContentRenderer component={component as CustomComponent} parent={parent as any}></ContentRenderer>;
    case CustomType.Quiz:
    case CustomType.QUIZ:
      return <QuizRenderer quiz={component as QuizType} parent={parent}></QuizRenderer>;
    case CustomType.QuizA:
      return <QuizARenderer parent={parent} quiz={component as QuizAType}></QuizARenderer>;
    case CustomType.QuizB:
      return <QuizBRenderer parent={parent} quiz={component as QuizBType}></QuizBRenderer>;
    case CustomType.QuizC:
      return <QuizCRenderer parent={parent} quiz={component as QuizBType}></QuizCRenderer>;
    default:
      console.log('不能渲染的类型', component.type.trim());
      return <div></div>;
  }
};

export default DailyChallengeCustomRenderer;
