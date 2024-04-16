import { errorMessage } from '@/helper/ui';
import webApi from '@/service';
import { CompletionsRes } from '@/service/webApi/helper/type';
import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';

export const useChatHistory = () => {
  const [chatHistory, setChatHistory] = useState<(CompletionsRes & { status?: 'pending' })[]>([]);
  const { run: getHistory } = useRequest(() => webApi.helperApi.getHistory(), {
    manual: true,
    onSuccess(res) {
      setChatHistory(res);
    },
    onError(err) {
      errorMessage(err);
      // setChatHistory([]);
    }
  });

  useEffect(() => {
    getHistory();
  }, []);

  return { chatHistory, setChatHistory };
};
