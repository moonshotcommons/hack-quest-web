import {
  CreationPageKey,
  useUgcCreationStore
} from '@/store/zustand/ugcCreationStore';

const useWorkspace = () => {
  const selectLessonId = useUgcCreationStore((state) => state.selectLessonId);
  const save = () => {
    switch (selectLessonId) {
      case CreationPageKey.Introduction:
        // 调保存introduction的接口
        break;
      default:
      // 调保存unit的接口
    }
  };
  return { save };
};
