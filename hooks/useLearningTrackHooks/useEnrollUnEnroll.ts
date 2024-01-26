import webApi from '@/service';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useRedirect } from '../useRedirect';
import { useUserStore } from '@/store/zustand/userStore';

export const useEnrollUnEnroll = (
  learningTrackDetail: LearningTrackDetailType | undefined,
  refreshCallback: VoidFunction
) => {
  const userInfo = useUserStore((state) => state.userInfo);
  const setAuthModalOpen = useUserStore((state) => state.setAuthModalOpen);
  const { redirectToUrl } = useRedirect();
  const { run: unEnroll, loading: unEnrollLoading } = useRequest(
    async () => {
      if (learningTrackDetail) {
        const res = await webApi.learningTrackApi.unenrollLearningTrack(
          learningTrackDetail?.id
        );
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
        message.warning('Please login first');
        // redirectToUrl(V2_LANDING_PATH);
        setAuthModalOpen(true);
        return;
      }
      if (learningTrackDetail) {
        await webApi.learningTrackApi.enrollLearningTrack(
          learningTrackDetail?.id
        );
        refreshCallback();
        message.success('enroll success!');
      }
    },
    {
      manual: true,
      debounceWait: 300
    }
  );
  return { enroll, enrollLoading, unEnroll, unEnrollLoading };
};
