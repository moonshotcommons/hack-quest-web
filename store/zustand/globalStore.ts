import { create } from 'zustand';
import { NavType } from '@/components/Mobile/MobLayout/constant';
import { CompletionsRes, HelperType } from '@/service/webApi/helper/type';
import { SetStateAction } from 'react';
interface TipsModalOpenStateType {
  open: boolean;
  isRedirect: boolean;
}

export interface HelperParams {
  open: boolean;
  pageId?: string;
  type: HelperType;
  content?: string;
  exampleNum?: number;
  quizNum?: number;
  showCostCoinModal: boolean;
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
  updateHelperParams: (params: HelperParams, key?: keyof HelperParams) => void;
  chatHistory: (CompletionsRes & { status?: 'pending' | 'error' })[];
  setChatHistory: (
    payload:
      | (CompletionsRes & { status?: 'pending' | 'error' })[]
      | SetStateAction<(CompletionsRes & { status?: 'pending' | 'error' })[]>
  ) => void;
  chatStatus: 'chatting' | 'leisure';
  updateChatStatus: (status: 'chatting' | 'leisure') => void;
  updateHelperParamsByKey: <Key extends keyof HelperParams, Value extends Required<HelperParams[Key]>>(
    key: Key,
    value: Value
  ) => void;
}

export const useGlobalStore = create<GlobalStateType>()((set) => ({
  tipsModalOpenState: {
    open: false,
    isRedirect: false
  },
  playgroundSelectModalOpen: false,
  chatStatus: 'leisure',
  helperParams: {
    open: false,
    pageId: '',
    type: HelperType.Chat,
    content: '',
    exampleNum: -1,
    quizNum: -1,
    showCostCoinModal: false
  },
  chatHistory: [],
  updateHelperParams: (params, key) => {
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
  updateHelperParamsByKey: (key, value) => {
    set((state) => ({ helperParams: { ...state.helperParams, [key]: value } }));
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
  },
  updateChatStatus(payload) {
    set((state) => ({ chatStatus: payload }));
  },
  setChatHistory(payload) {
    set((state) => ({ chatHistory: typeof payload === 'function' ? payload(state.chatHistory) : payload }));
  }
}));
