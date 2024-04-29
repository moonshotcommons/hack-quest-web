import { FC, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuid } from 'uuid';

// 状态

import { useGlobalStore } from '@/store/zustand/globalStore';
import { useClickAway, useRequest } from 'ahooks';
import { useUpdateHelperParams } from '@/hooks/utils/useUpdateHelperParams';

// 工具方法和类型
import { cn } from '@/helper/utils';
import { getContentByHelperType } from './constants';
import { ChatRole, CompletionsInput, CompletionsRes, HelperType } from '@/service/webApi/helper/type';
import { errorMessage } from '@/helper/ui';
import webApi from '@/service';

// 组件
import History from './History';
import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import CostCoinModal, { CostCoinModalRef } from './CostCoinModal';
import { useGetMissionData } from '@/hooks/mission/useGetMissionData';
import { useChatHistory } from '@/hooks/system/useChatHistory';

interface AIChatbotModalProps {
  pageType: 'learn' | 'other';
}

const AIChatbotModal: FC<AIChatbotModalProps> = ({ pageType }) => {
  const helperParams = useGlobalStore((state) => state.helperParams);
  const chatStatus = useGlobalStore((state) => state.chatStatus);
  const updateChatStatus = useGlobalStore((state) => state.updateChatStatus);
  const { updateHelperType, updateOpenState } = useUpdateHelperParams();
  const { chatHistory, setChatHistory, freeCount } = useChatHistory();
  const [pendingTypeMessage, setPendingTypeMessage] = useState<CompletionsRes | null>(null);

  const { updateUserCoin } = useGetMissionData();

  const [showTips, setShowTips] = useState(pageType === 'learn');

  const scrollToBottomSwitch = useRef(true);
  const containerElementRef = useRef(null);

  const costCoinModalRef = useRef<CostCoinModalRef>(null);

  // 获取chatbot返回的消息
  const { runAsync: getChatbotMessage, loading } = useRequest(
    async (input: CompletionsInput) => {
      updateChatStatus('chatting');
      const res = await webApi.helperApi.completions(input);
      return res;
    },
    {
      manual: true,
      onSuccess(res) {
        const completion = {
          id: uuid(),
          message: {
            type: ChatRole.Assistant,
            content: res.content
          }
        };
        setPendingTypeMessage(completion);
        updateUserCoin();
      },
      onError(err) {
        errorMessage(err);
        setChatHistory((prevHistory) => {
          const target = prevHistory.pop();
          return !target ? prevHistory : prevHistory.concat({ ...target, status: 'error' });
        });
      }
    }
  );

  const close = () => {
    updateOpenState(false);
    updateChatStatus('leisure');
    setTimeout(() => {
      pageType === 'learn' && setShowTips(true);
    }, 300);
  };

  const triggerSubmit = async () => {
    const content = getContentByHelperType(helperParams.type);

    setChatHistory(
      chatHistory.concat({
        id: uuid(),
        message: {
          type: ChatRole.Human,
          content: content
        }
      })
    );

    // 调用submit获取message
    await getChatbotMessage({
      type: helperParams.type,
      content,
      pageId: helperParams.pageId!,
      exampleNum: helperParams.exampleNum!,
      quizNum: helperParams.quizNum!
    });

    updateHelperType(HelperType.Chat);
  };

  useEffect(() => {
    // 可以从外部触发的类型
    if (helperParams.type !== HelperType.Chat) {
      setShowTips(false);
      triggerSubmit();
    }
  }, [helperParams.type]);

  const clickAwayDeps = document.getElementById('cost-coin-modal')
    ? [containerElementRef, document.getElementById('cost-coin-modal')]
    : containerElementRef;

  useClickAway((event) => {
    console.log(event);
    chatStatus !== 'chatting' && close();
  }, clickAwayDeps);

  useEffect(() => {
    let currentIndex = 0;
    const content = pendingTypeMessage?.message.content;
    if (pendingTypeMessage && content) {
      const interval = setInterval(() => {
        if (currentIndex < content.length - 1) {
          setChatHistory((prevHistory) => {
            if (currentIndex === 0) {
              return prevHistory.concat({
                ...pendingTypeMessage,
                status: 'pending',
                message: { ...pendingTypeMessage.message, content: content[currentIndex] }
              });
            }
            const pendingChat = prevHistory.pop();

            if (pendingChat) {
              const connectChat = {
                type: ChatRole.Assistant,
                content: pendingChat.message.content + content[currentIndex]
              };
              return prevHistory.concat({
                ...pendingChat,
                status: currentIndex < content.length - 1 ? 'pending' : undefined,
                message: connectChat
              });
            }

            return prevHistory;
          });

          currentIndex++;
        } else {
          currentIndex = 0;
          updateChatStatus('leisure');
          clearInterval(interval);
          scrollToBottomSwitch.current = true;
          setPendingTypeMessage(null);
        }
      }, 10);
      return () => {
        if (chatStatus === 'chatting' && content && currentIndex < content.length - 1) {
          setChatHistory((prevHistory) => {
            const pendingChat = prevHistory.pop();
            if (pendingChat) {
              const connectChat = {
                type: ChatRole.Assistant,
                content: content
              };
              return prevHistory.concat({
                ...pendingChat,
                status: undefined,
                message: connectChat
              });
            }
            return prevHistory;
          });
          updateChatStatus('leisure');
        }
        currentIndex = 0;
        setPendingTypeMessage(null);
        clearInterval(interval);
        scrollToBottomSwitch.current = true;
      };
    }
  }, [pendingTypeMessage, chatStatus]);

  return (
    helperParams.open && (
      <motion.div
        initial={{ opacity: 0, scale: 0, x: 100, y: 60 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 0.2 }}
        ref={containerElementRef}
        className={cn(
          'relative flex h-[716px] w-[480px] scale-0 cursor-default flex-col justify-between rounded-[16px] bg-neutral-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.12)]'
        )}
      >
        <ChatHeader close={close} />
        <History
          chatHistory={chatHistory}
          scrollToBottomSwitch={scrollToBottomSwitch}
          loading={loading}
          showTips={showTips}
          setShowTips={setShowTips}
        />
        <ChatFooter
          loading={loading}
          onSubmit={() => {
            scrollToBottomSwitch.current = true;
            setShowTips(false);
          }}
          freeCount={freeCount}
          getChatbotMessage={getChatbotMessage}
          updateChatHistory={setChatHistory}
          chatHistory={chatHistory}
          costCoinModalRef={costCoinModalRef}
        />

        <CostCoinModal ref={costCoinModalRef} />
      </motion.div>
    )
  );
};

export default AIChatbotModal;
