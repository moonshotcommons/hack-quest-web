import { getLessonIconData } from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/creation/constant/data';
import {
  CourseInformationType,
  UgcCreateContext
} from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/creation/constant/type';
import webApi from '@/service';
import { useUgcCreationStore } from '@/store/zustand/ugcCreationStore';
import { useContext } from 'react';
import { useShallow } from 'zustand/react/shallow';

const useUgcCreationDataHanlde = (cId?: string) => {
  const { setLoading } = useUgcCreationStore(
    useShallow((state) => ({
      setLoading: state.setLoading
    }))
  );
  const { setCourseInformation, courseId } = useContext(UgcCreateContext);
  const getCourseInfo = (id?: string) => {
    setLoading(true);
    return webApi.ugcCreateApi
      .getUgcInformationDetail(id || cId || courseId, {
        include: 'pages,units'
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const setInformation = async (id?: string) => {
    const info = await getCourseInfo(id);
    const intendedLearnersCompleted =
      info.intendedLearners?.audience?.length ||
      info.intendedLearners?.requirements?.length;
    const knowledgeGainCompleted =
      info.knowledgeGain?.description?.length ||
      info.knowledgeGain?.tags?.length;

    const information = {
      introduction: {
        track: info.track,
        level: info.level,
        title: info.title,
        subTitle: info.subTitle,
        description: info.description,
        completed: true
      },
      intendedLearners: {
        ...info.intendedLearners,
        completed: !!intendedLearnersCompleted
      },
      knowledgeGain: {
        ...info.knowledgeGain,
        completed: !!knowledgeGainCompleted
      }
    };
    setCourseInformation(information as CourseInformationType);
  };

  const getUnitList = async (id?: string) => {
    const info = await getCourseInfo(id);
    const newUnitList = info.units?.map((unit) => ({
      ...unit,
      isInput: false,
      isToggle: true,
      lessonInputValue: '',
      isDragging: false,
      pages: unit.pages?.map((lesson) => ({
        ...lesson,
        icon: getLessonIconData(15)[lesson.type],
        isInput: false,
        isDragging: false
      }))
    }));
    return newUnitList;
  };

  return {
    setInformation,
    getUnitList
  };
};
export default useUgcCreationDataHanlde;
