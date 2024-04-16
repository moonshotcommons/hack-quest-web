import { HelperParams, useGlobalStore } from '@/store/zustand/globalStore';

type HelperValueType<Key extends keyof HelperParams> = Required<HelperParams>[Key];

export const useUpdateHelperParams = () => {
  const updateHelperParamsByKey = useGlobalStore((state) => state.updateHelperParamsByKey);

  return {
    updatePageId: (pageId: HelperValueType<'pageId'>) => {
      updateHelperParamsByKey('pageId', pageId);
    },
    updateHelperType: (type: HelperValueType<'type'>) => {
      updateHelperParamsByKey('type', type);
      updateHelperParamsByKey('open', true);
    },
    updateQuizNum: (quizNum: HelperValueType<'quizNum'>) => {
      updateHelperParamsByKey('quizNum', quizNum);
    },
    updateOpenState: (open: HelperValueType<'open'>) => {
      updateHelperParamsByKey('open', open);
    },
    updateContent: (content: HelperValueType<'content'>) => {
      updateHelperParamsByKey('content', content);
    },
    updateExampleNum: (exampleNum: HelperValueType<'exampleNum'>) => {
      updateHelperParamsByKey('exampleNum', exampleNum);
    }
  };
};
