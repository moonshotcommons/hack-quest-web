import { errorMessage } from '@/helper/ui';
import webApi from '@/service';
import { ChatRole } from '@/service/webApi/helper/type';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { useRequest } from 'ahooks';
import { useEffect, useMemo } from 'react';

import { v4 as uuid } from 'uuid';

export const useChatHistory = () => {
  const setChatHistory = useGlobalStore((state) => state.setChatHistory);
  const chatHistory = useGlobalStore((state) => state.chatHistory);

  const {
    run: getHistory,
    refresh,
    refreshAsync
  } = useRequest(() => webApi.helperApi.getHistory(), {
    manual: true,
    onSuccess(res) {
      if (!chatHistory.length) {
        setChatHistory(
          res.concat({
            id: uuid(),
            message: {
              type: ChatRole.Assistant,
              content: 'Hi 👋 What can I help you with?'
            }
          })
        );
      }
    },
    onError(err) {
      errorMessage(err);
      // setChatHistory([]);
    }
  });

  useEffect(() => {
    if (!chatHistory.length) getHistory();
  }, [chatHistory, getHistory]);

  const freeCount = useMemo(() => {
    const humanMessages = chatHistory.filter((item) => item.message.type === ChatRole.Human);
    return humanMessages.length >= 5 ? 0 : 5 - humanMessages.length;
  }, [chatHistory]);

  return { chatHistory, setChatHistory, freeCount, refreshCatHistory: refresh, refreshCatHistoryAsync: refreshAsync };
};
