import { errorMessage } from '@/helper/ui';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import message from 'antd/es/message';

export const useGroupAction = () => {
  const { runAsync: deleteGroup } = useRequest(
    async (code: string, callback?: () => Promise<any>) => {
      const res = await webApi.resourceStationApi.deleteTeam(code);
      await callback?.();
      return res;
    },
    {
      manual: true,
      onSuccess() {
        message.success('Delete team success！');
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const { runAsync: removeMember } = useRequest(
    async (code: string, userId: string, onSuccess?: () => Promise<any>) => {
      const res = await webApi.resourceStationApi.deleteMember(code, userId);
      await onSuccess?.();
      return res;
    },
    {
      manual: true,
      onSuccess() {
        message.success('Delete member success！');
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const { runAsync: leaveGroup } = useRequest(
    async (hackathonId: string, callback?: () => Promise<any>) => {
      const res = await webApi.resourceStationApi.leaveTeam(hackathonId);
      await callback?.();
      return res;
    },
    {
      manual: true,
      onSuccess() {
        message.success('Leave team success！');
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  return {
    deleteGroup,
    leaveGroup,
    removeMember
  };
};
