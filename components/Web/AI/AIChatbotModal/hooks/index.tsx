import { errorMessage } from '@/helper/ui';
import webApi from '@/service';
import { ChatRole, CompletionsRes } from '@/service/webApi/helper/type';
import { useRequest } from 'ahooks';
import { useEffect, useMemo, useState } from 'react';

import { v4 as uuid } from 'uuid';

export const useChatHistory = () => {
  const [chatHistory, setChatHistory] = useState<(CompletionsRes & { status?: 'pending' | 'error' })[]>([]);
  const { run: getHistory } = useRequest(() => webApi.helperApi.getHistory(), {
    manual: true,
    onSuccess(res) {
      setChatHistory(
        res.concat({
          id: uuid(),
          message: {
            type: ChatRole.Assistant,
            content: 'Hi 👋 What can I help you with?'
          }
        })
      );
    },
    onError(err) {
      errorMessage(err);
      // setChatHistory([]);
    }
  });

  useEffect(() => {
    getHistory();
  }, []);

  const freeCount = useMemo(() => {
    const humanMessages = chatHistory.filter((item) => item.message.type === ChatRole.Human);
    return humanMessages.length >= 5 ? 0 : 5 - humanMessages.length;
  }, [chatHistory]);

  return { chatHistory, setChatHistory, freeCount };
};
