import webApi from '@/service';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useRedirect } from '../router/useRedirect';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { isMobile } from 'react-device-detect';
import { NavType } from '@/components/Mobile/MobLayout/constant';
import { errorMessage } from '@/helper/ui';
import { useGlobalStore } from '@/store/zustand/globalStore';

export const useEnrollUnEnroll = (
  learningTrackDetail: LearningTrackDetailType | undefined,
  refreshCallback: VoidFunction
) => {
  const userInfo = useUserStore((state) => state.userInfo);
  const setAuthModalOpen = useUserStore((state) => state.setAuthModalOpen);
  const setAuthType = useUserStore((state) => state.setAuthType);
  const mobileNavModalToggleOpenHandle = useGlobalStore((state) => state.mobileNavModalToggleOpenHandle);
  const { redirectToUrl } = useRedirect();
  const { run: unEnroll, loading: unEnrollLoading } = useRequest(
    async () => {
      if (learningTrackDetail) {
        const res = await webApi.learningTrackApi.unenrollLearningTrack(learningTrackDetail?.id);
        return res;
      }
    },
    {
      manual: true,
      debounceWait: 300,
      onSuccess() {
        refreshCallback();
        message.success('Cancel enrollment success!');
      },
      onError(e: any) {
        message.error(e.msg);
      }
    }
  );

  const { run: enroll, loading: enrollLoading } = useRequest(
    async () => {
      if (!userInfo) {
        // redirectToUrl(V2_LANDING_PATH);
        setAuthType(AuthType.LOGIN);
        if (!isMobile) {
          setAuthModalOpen(true);
        } else {
          mobileNavModalToggleOpenHandle.setNavType(NavType.AUTH);
          mobileNavModalToggleOpenHandle.toggleOpen();
        }
        throw new Error('Please login first');
      }
      if (learningTrackDetail) {
        await webApi.learningTrackApi.enrollLearningTrack(learningTrackDetail?.id);
      }
    },
    {
      manual: true,
      debounceWait: 300,
      onSuccess() {
        refreshCallback();
        message.success('enroll success!');
      },
      onError(e: any) {
        errorMessage(e);
      }
    }
  );
  return { enroll, enrollLoading, unEnroll, unEnrollLoading };
};
