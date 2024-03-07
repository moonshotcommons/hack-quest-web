import { UGCCourseType } from '@/service/webApi/course/type';
import {
  CourseInformationType,
  useUgcCreationStore
} from '@/store/zustand/ugcCreationStore';

const useUgcInformation = () => {
  const setCourseInformation = useUgcCreationStore(
    (state) => state.setCourseInformation
  );
  const setStoreInformation = (info: UGCCourseType) => {
    const information = {
      introduction: {
        track: info.track,
        level: info.level,
        title: info.title,
        subTitle: info.subTitle,
        description: info.description,
        completed: info.completed
      },
      intendedLearners: info.intendedLearners || {},
      knowledgeGain: info.knowledgeGain || {}
    };
    setCourseInformation(information as CourseInformationType);
  };
  return {
    setStoreInformation
  };
};
export default useUgcInformation;
