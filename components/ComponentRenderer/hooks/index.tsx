import { useContext } from 'react';
import { RendererContext } from '../context';

export const useCustomComponentRenderer = () => {
  const { CustomComponentRenderer } = useContext(RendererContext);
  return CustomComponentRenderer;
};

export const useQuizBRendererContext = () => {
  const { quizBRendererContext } = useContext(RendererContext);
  return quizBRendererContext!;
};

export const useQuizARendererContext = () => {
  const { quizARendererContext } = useContext(RendererContext);
  return quizARendererContext!;
};

export const useExampleRendererContext = () => {
  const { exampleRendererContext } = useContext(RendererContext);
  return exampleRendererContext!;
};

export const useGlobalRendererContext = () => {
  const { globalContext } = useContext(RendererContext);
  return globalContext!;
};
