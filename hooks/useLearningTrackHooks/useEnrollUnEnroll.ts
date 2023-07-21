import webApi from '@/service';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { useRequest } from 'ahooks';
import { message } from 'antd';

export const useEnrollUnEnroll = (
  learningTrackDetail: LearningTrackDetailType | undefined,
  refreshCallback: VoidFunction
) => {
  const { run: unEnroll } = useRequest(
    async () => {
      if (learningTrackDetail) {
        const res = await webApi.LearningTrackApi.unenrollLearningTrack(
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

  const { run: enroll } = useRequest(
    async () => {
      if (learningTrackDetail) {
        await webApi.LearningTrackApi.enrollLearningTrack(
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
  return { enroll, unEnroll };
};
