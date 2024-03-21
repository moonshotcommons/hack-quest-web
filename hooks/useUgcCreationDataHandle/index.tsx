import { getLessonIconData } from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/creation/constant/data';
import {
  CourseInformationType,
  UgcCreateContext
} from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/creation/constant/type';
import { errorMessage } from '@/helper/ui';
import webApi from '@/service';
import { useUgcCreationStore } from '@/store/zustand/ugcCreationStore';
import { useContext } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useRedirect } from '../useRedirect';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';

const useUgcCreationDataHandle = (cId?: string) => {
  const { setLoading } = useUgcCreationStore(
    useShallow((state) => ({
      setLoading: state.setLoading
    }))
  );
  const { redirectToUrl } = useRedirect();
  const { setCourseInformation, courseId, setUnits } =
    useContext(UgcCreateContext);

  const getCourseInfo = (id?: string) => {
    setLoading(true);
    return webApi.ugcCreateApi
      .getUgcInformationDetail(id || cId || courseId, {
        include: 'pages,units'
      })
      .catch((err) => {
        errorMessage(err);
        if (err.code === 404) {
          redirectToUrl(MenuLink.INSTRUCTOR);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setInformation = async (id?: string) => {
    try {
      const info = await getCourseInfo(id);
      if (!info) return;
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
    } catch (err) {
      errorMessage(err);
    }
  };

  const getUnitList = async (id?: string) => {
    try {
      const info = await getCourseInfo(id);
      if (!info) return;
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
      if (newUnitList) {
        setUnits(newUnitList);
      }
      return newUnitList;
    } catch (err) {
      errorMessage(err);
    }
  };

  return {
    setInformation,
    getUnitList
  };
};
export default useUgcCreationDataHandle;
