import {
  FooterButtonStatus,
  FooterButtonText
} from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/learn/constants/type';
import { CustomComponent } from '@/components/Web/Business/Renderer/type';

export const useGetQuizsCompleted = () => {
  const getFooterBtnInfo = (parent: CustomComponent) => {
    const isAllNotcompleted = parent?.children?.some(
      (v: any) => !v?.isCompleted
    );
    let footerBtnText = isAllNotcompleted
      ? FooterButtonText.SUBMIT
      : FooterButtonText.NEXT;
    let footerBtnStatus = isAllNotcompleted
      ? FooterButtonStatus.SUBMIT
      : FooterButtonStatus.NEXT;
    let footerBtnDisable = false;
    return {
      footerBtnText,
      footerBtnStatus,
      footerBtnDisable
    };
  };

  return {
    getFooterBtnInfo
  };
};
