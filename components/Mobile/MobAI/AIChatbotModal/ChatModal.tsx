import { FC, useEffect, useRef, useState } from 'react';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { useRequest } from 'ahooks';
import { useUpdateHelperParams } from '@/hooks/utils/useUpdateHelperParams';
import { v4 as uuid } from 'uuid';
import { ChatRole, CompletionsInput, CompletionsRes, HelperType } from '@/service/webApi/helper/type';
import ChatHeader from './ChatHeader';
import ChatFooter, { ChatFooterInstance } from './ChatFooter';
import { getContentByHelperType } from './constants';
import { errorMessage } from '@/helper/ui';
import webApi from '@/service';
import Modal from '@/components/Common/Modal';
import useGetHeight from '@/hooks/dom/useGetHeight';
import History from './History';
import CostCoinModal, { CostCoinModalRef } from './CostCoinModal';
import { useChatHistory } from '@/hooks/system/useChatHistory';
import { useGetMissionData } from '@/hooks/mission/useGetMissionData';

interface AIChatbotModalProps {
  pageType: 'learn' | 'other';
}

const AIChatbotModal: FC<AIChatbotModalProps> = ({ pageType }) => {
  const helperParams = useGlobalStore((state) => state.helperParams);
  const chatStatus = useGlobalStore((state) => state.chatStatus);
  const updateChatStatus = useGlobalStore((state) => state.updateChatStatus);
  const { updateHelperType } = useUpdateHelperParams();
  const { updateOpenState } = useUpdateHelperParams();
  const { chatHistory, setChatHistory, freeCount } = useChatHistory();
  const [pendingTypeMessage, setPendingTypeMessage] = useState<CompletionsRes | null>(null);

  const { updateUserCoin } = useGetMissionData();

  const chatFooterRef = useRef<ChatFooterInstance>(null);
  const scrollToBottomSwitch = useRef(true);
  const { pageHeight } = useGetHeight();

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
    scrollToBottomSwitch.current = true;
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
    if (helperParams.type !== HelperType.Chat) {
      triggerSubmit();
    }
  }, [helperParams.type]);

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
    <Modal open={helperParams.open} onClose={() => {}} markBg="black" block zIndex={1200}>
      <div
        className="max-w-screen flex w-screen flex-col justify-between overflow-hidden bg-neutral-white"
        style={{
          height: pageHeight
        }}
      >
        <ChatHeader close={close} />
        <History chatHistory={chatHistory} scrollToBottomSwitch={scrollToBottomSwitch} loading={loading} />
        <ChatFooter
          ref={chatFooterRef}
          loading={loading}
          onSubmit={() => {
            scrollToBottomSwitch.current = true;
          }}
          getChatbotMessage={getChatbotMessage}
          updateChatHistory={setChatHistory}
          chatHistory={chatHistory}
          freeCount={freeCount}
          costCoinModalRef={costCoinModalRef}
        />
        <CostCoinModal ref={costCoinModalRef} />
      </div>
    </Modal>
  );
};

export default AIChatbotModal;
