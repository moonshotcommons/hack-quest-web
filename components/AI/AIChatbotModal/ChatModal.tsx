import { FC, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/helper/utils';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { useClickAway, useRequest } from 'ahooks';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUpdateHelperParams } from '@/hooks/utils/useUpdateHelperParams';

// import { TypeAnimation } from 'react-type-animation';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark as dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ChatRole, HelperType } from '@/service/webApi/helper/type';
import LoadingMessage from './LoadingMessage';
import ChatHeader from './ChatHeader';
import ChatFooter, { ChatFooterInstance } from './ChatFooter';
import MessageTemplate from './MessageTemplate';
import { getContentByHelperType } from './constants';
import { useChatHistory } from './hooks';

const CURSOR_CLASS_NAME = 'custom-type-animation-cursor';

interface AIChatbotModalProps {}

enum Role {
  HUMAN = 'human',
  ASSISTANT = 'assistant'
}

const AIChatbotModal: FC<AIChatbotModalProps> = (props) => {
  const helperParams = useGlobalStore((state) => state.helperParams);
  const { updateHelperType } = useUpdateHelperParams();
  const { updateOpenState } = useUpdateHelperParams();
  const { chatHistory, setChatHistory } = useChatHistory();
  const ref = useRef(null);
  const historyContainerRef = useRef<HTMLDivElement>(null);
  const chatFooterRef = useRef<ChatFooterInstance>(null);

  const close = () => {
    updateOpenState(false);
  };

  // 模拟消息发送以后的...loading效果
  const { runAsync: waitingMessage, loading: waitingMessageLoading } = useRequest(
    () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('');
        }, Math.random() * 1000);
      });
    },
    {
      manual: true
    }
  );

  const triggerSubmit = async () => {
    const content = getContentByHelperType(helperParams.type);
    // 调用submit获取message
    await chatFooterRef.current?.getChatbotMessage({
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
    const canTriggerType = [HelperType.SummarizeContent, HelperType.ExplainExample, HelperType.ExplainQuiz];
    if (canTriggerType.includes(helperParams.type)) {
      triggerSubmit();
    }
  }, [helperParams.type]);

  useClickAway(() => {
    close();
  }, ref);

  useEffect(() => {
    if (!historyContainerRef.current?.children[1]) return;
    historyContainerRef.current.children[1].scrollTop = historyContainerRef.current.children[1].scrollHeight;
  }, [chatHistory]);

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

  console.log(chatHistory);

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
        <ScrollArea className="scroll-wrap flex w-full flex-1">
          <div className="scroll-wrap-child flex h-full w-full flex-col gap-3 pb-3" ref={historyContainerRef}>
            {chatHistory.map((item, index) => {
              return (
                <MessageTemplate key={item.id} role={item.message.role}>
                  {item.message.role !== ChatRole.Assistant && item.status !== 'pending' && item.message.content}
                  {item.message.role === ChatRole.Assistant && item.status === 'pending' && (
                    <TypeMessageNode content={item.message.content} />
                  )}
                </MessageTemplate>
              );
            })}
            {!!waitingMessageLoading && <LoadingMessage />}
          </div>
        </ScrollArea>
        <ChatFooter
          ref={chatFooterRef}
          waitingMessage={waitingMessage}
          updateChatHistory={setChatHistory}
          chatHistory={chatHistory}
        />
      </motion.div>
    )
  );
};

export default AIChatbotModal;
