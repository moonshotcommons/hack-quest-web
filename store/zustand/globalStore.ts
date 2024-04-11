import { create } from 'zustand';
import { NavType } from '@/components/Mobile/MobLayout/constant';
interface TipsModalOpenStateType {
  open: boolean;
  isRedirect: boolean;
}

export enum HelperType {
  Chat = 'Chat',
  SummarizeContent = 'SummarizeContent',
  ExpandContent = 'ExpandContent',
  RelatedContent = 'RelatedContent',
  ExplainExample = 'ExplainExample',
  ExplainQuiz = 'ExplainQuiz'
}

export interface HelperParams {
  open: boolean;
  pageId?: string;
  type: HelperType;
  content?: string;
  exampleNum?: number;
  quizNum?: number;
}

export interface GlobalStateType {
  tipsModalOpenState: TipsModalOpenStateType;
  playgroundSelectModalOpen: boolean;
  setTipsModalOpenState: (open: TipsModalOpenStateType | boolean) => void;
  setPlaygroundSelectModalOpen: (open: boolean) => void;
  mobileNavModalToggleOpenHandle: {
    toggleOpen: () => void;
    isOpen: boolean;
    setNavType: (payload: NavType) => void;
    setModuleProps: (payload: object) => void;
  };
  setMobileNavModalToggleOpenHandle: (payload: {
    toggleOpen: () => void;
    isOpen: boolean;
    setNavType: (payload: NavType) => void;
    setModuleProps: (payload: object) => void;
  }) => void;
  helperParams: HelperParams;
  updateHelperParams: (params: HelperParams) => void;
}

export const useGlobalStore = create<GlobalStateType>()((set) => ({
  tipsModalOpenState: {
    open: false,
    isRedirect: false
  },
  playgroundSelectModalOpen: false,
  helperParams: {
    open: false,
    pageId: '',
    type: HelperType.Chat,
    content: '',
    exampleNum: -1,
    quizNum: -1
  },
  updateHelperParams: (params: HelperParams) => {
    switch (params.type) {
      case HelperType.Chat:
        break;
      case HelperType.SummarizeContent:
        params.content = '';
        break;
      case HelperType.ExpandContent:
        params.content = '';
        break;
      case HelperType.RelatedContent:
        params.content = '';
        break;
      case HelperType.ExplainExample:
        params.content = '';
        break;
      case HelperType.ExplainQuiz:
        params.content = '';
        break;
    }

    set((state) => ({ helperParams: params }));
  },
  mobileNavModalToggleOpenHandle: {
    isOpen: false,
    setNavType() {},
    setModuleProps() {},
    toggleOpen() {}
  },
  setTipsModalOpenState(payload) {
    set((state) => {
      if (typeof payload === 'boolean') {
        return {
          tipsModalOpenState: {
            open: payload,
            isRedirect: false
          }
        };
      }
      return {
        tipsModalOpenState: {
          open: payload.open,
          isRedirect: payload.isRedirect
        }
      };
    });
  },
  setPlaygroundSelectModalOpen(payload) {
    set((state) => ({ playgroundSelectModalOpen: payload }));
  },
  setMobileNavModalToggleOpenHandle(payload) {
    set((state) => ({ mobileNavModalToggleOpenHandle: payload }));
  }
}));
