import { errorMessage } from '@/helper/ui';
import { useRequest } from 'ahooks';
import { message } from 'antd';

export const useGroupAction = () => {
  const { runAsync: deleteGroup } = useRequest(
    () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('');
        }, 1000);
      });
    },
    {
      manual: true,
      onSuccess() {
        message.success('删除队伍成功！');
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );
  const { runAsync: removeMember } = useRequest(
    () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('');
        }, 1000);
      });
    },
    {
      manual: true,
      onSuccess() {
        message.success('删除成员成功！');
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );
  const { runAsync: leaveGroup } = useRequest(
    () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('');
        }, 1000);
      });
    },
    {
      manual: true,
      onSuccess() {
        message.success('离开队伍成功！');
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
