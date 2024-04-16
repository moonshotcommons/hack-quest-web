import { FC, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/helper/utils';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { useClickAway, useRequest } from 'ahooks';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUpdateHelperParams } from '@/hooks/utils/useUpdateHelperParams';

import { v4 as uuid } from 'uuid';
// import { TypeAnimation } from 'react-type-animation';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark as dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ChatRole, CompletionsInput, CompletionsRes, HelperType } from '@/service/webApi/helper/type';
import LoadingMessage from './LoadingMessage';
import ChatHeader from './ChatHeader';
import ChatFooter, { ChatFooterInstance } from './ChatFooter';
import MessageTemplate from './MessageTemplate';
import { getContentByHelperType } from './constants';
import { useChatHistory } from './hooks';
import { errorMessage } from '@/helper/ui';
import webApi from '@/service';
import ChatTips from './ChatTips';

const CURSOR_CLASS_NAME = 'custom-type-animation-cursor';

interface AIChatbotModalProps {
  pageType: 'learn' | 'other';
}

enum Role {
  HUMAN = 'human',
  ASSISTANT = 'assistant'
}

const AIChatbotModal: FC<AIChatbotModalProps> = ({ pageType }) => {
  const helperParams = useGlobalStore((state) => state.helperParams);
  const chatStatus = useGlobalStore((state) => state.chatStatus);
  const updateChatStatus = useGlobalStore((state) => state.updateChatStatus);
  const { updateHelperType } = useUpdateHelperParams();
  const { updateOpenState } = useUpdateHelperParams();
  const { chatHistory, setChatHistory } = useChatHistory();
  const ref = useRef(null);
  const historyContainerRef = useRef<HTMLDivElement>(null);
  const chatFooterRef = useRef<ChatFooterInstance>(null);
  const [pendingTypeMessage, setPendingTypeMessage] = useState<CompletionsRes | null>(null);
  const scrollToBottomSwitch = useRef(true);

  const [showTips, setShowTips] = useState(pageType === 'learn');

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
            role: ChatRole.Assistant,
            content: res.content
          }
        };
        setPendingTypeMessage(completion);
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
          role: ChatRole.Human,
          content: content
        }
      })
    );

    // if (historyContainerRef.current?.children[1]) {
    //   historyContainerRef.current.children[1].scrollTop = historyContainerRef.current.children[1].scrollHeight;
    // }

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
      triggerSubmit();
    }
  }, [helperParams.type]);

  useClickAway((event) => {
    chatStatus !== 'chatting' && close();
  }, ref);

  useEffect(() => {
    let currentIndex = 0;

    if (pendingTypeMessage && pendingTypeMessage.message.content) {
      const content = pendingTypeMessage.message.content;

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
                role: ChatRole.Assistant,
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
          updateChatStatus('leisure');
          clearInterval(interval);
          scrollToBottomSwitch.current = true;
          setPendingTypeMessage(null);
        }
      }, 10);
      return () => {
        clearInterval(interval);
        scrollToBottomSwitch.current = true;
      };
    }
  }, [pendingTypeMessage]);

  const TypeMessageNode = ({ content }: { content: string }) => {
    return (
      <>
        <ReactMarkdown
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                // @ts-ignore
                <SyntaxHighlighter
                  {...props}
                  // eslint-disable-next-line react/no-children-prop
                  children={String(children).replace(/\n$/, '')}
                  style={dark}
                  language={match[1]}
                  PreTag="div"
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            }
          }}
        >
          {content}
        </ReactMarkdown>
        {/* <TypeAnimation
          cursor={false}
          speed={{ type: 'keyStrokeDelayInMs', value: 30 }}
          className={cn(
            CURSOR_CLASS_NAME,
            'body-m inline-block max-w-[404px] rounded-[8px] bg-neutral-off-white p-3 text-neutral-black'
          )}
          sequence={[content, (el) => el?.classList.remove(CURSOR_CLASS_NAME)]}
        /> */}
      </>
    );
  };

  useEffect(() => {
    if (historyContainerRef.current?.children[1] && scrollToBottomSwitch.current) {
      historyContainerRef.current.children[1].scrollTop = historyContainerRef.current.children[1].scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    if (helperParams.open) {
      if (historyContainerRef.current?.children[1] && scrollToBottomSwitch.current) {
        historyContainerRef.current.children[1].scrollTop = historyContainerRef.current.children[1].scrollHeight;
      }
    }
  }, [helperParams.open]);

  return (
    helperParams.open && (
      <motion.div
        initial={{ opacity: 0, scale: 0, x: 100, y: 60 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 0.2 }}
        ref={ref}
        className={cn(
          'absolute -bottom-[20px] right-16 flex h-[716px] w-[480px] scale-0 cursor-default flex-col justify-between rounded-[16px] bg-neutral-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.12)]'
        )}
      >
        <ChatHeader close={close} />
        <ScrollArea
          className="scroll-wrap flex w-full flex-1"
          ref={historyContainerRef}
          onWheel={() => {
            scrollToBottomSwitch.current = false;
          }}
        >
          <div className="flex min-h-full w-full flex-col justify-between">
            <div className="scroll-wrap-child flex w-full flex-1 flex-col gap-3 pb-3">
              {chatHistory.map((item, index) => {
                console.log(item);
                return (
                  <MessageTemplate key={item.id} role={item.message.role} status={item.status}>
                    {item.status !== 'pending' && item.message.content}
                    {item.message.role === ChatRole.Assistant && item.status === 'pending' && (
                      <TypeMessageNode content={item.message.content} />
                    )}
                  </MessageTemplate>
                );
              })}
              {!!loading && <LoadingMessage />}
            </div>
            {showTips && (
              <div className="flex w-full justify-end px-3">
                <ChatTips updateTipsShow={setShowTips} />
              </div>
            )}
          </div>
        </ScrollArea>
        <ChatFooter
          ref={chatFooterRef}
          loading={loading}
          onSubmit={() => {
            scrollToBottomSwitch.current = true;
            setShowTips(false);
          }}
          getChatbotMessage={getChatbotMessage}
          updateChatHistory={setChatHistory}
          chatHistory={chatHistory}
        />
      </motion.div>
    )
  );
};

export default AIChatbotModal;
