import { ScrollArea } from '@/components/ui/scroll-area';
import { FC, MutableRefObject, useEffect } from 'react';
import LoadingMessage from '../LoadingMessage';
import MessageTemplate from '../MessageTemplate';
import { ChatRole, CompletionsRes } from '@/service/webApi/helper/type';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark as dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useGlobalStore } from '@/store/zustand/globalStore';
import ChatTips from '../ChatTips';

interface HistoryProps {
  loading: boolean;
  chatHistory: (CompletionsRes & { status?: 'pending' | 'error' })[];
  scrollToBottomSwitch: MutableRefObject<boolean>;
  showTips: boolean;
  setShowTips: (show: boolean) => void;
}

const History: FC<HistoryProps> = ({ loading, chatHistory, scrollToBottomSwitch, showTips, setShowTips }) => {
  const helperParams = useGlobalStore((state) => state.helperParams);

  useEffect(() => {
    if (helperParams.open || showTips) {
      const historyScrollView = document.querySelector('.chat-history-scroll-view');
      if (historyScrollView && scrollToBottomSwitch.current) {
        historyScrollView.scrollTop = historyScrollView.scrollHeight;
      }
    }
  }, [helperParams.open, scrollToBottomSwitch, showTips]);

  useEffect(() => {
    const historyScrollView = document.querySelector('.chat-history-scroll-view');
    if (historyScrollView && scrollToBottomSwitch.current) {
      historyScrollView.scrollTop = historyScrollView.scrollHeight;
    }
  }, [chatHistory, scrollToBottomSwitch]);

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
      </>
    );
  };

  return (
    <ScrollArea
      className="scroll-wrap flex w-full flex-1"
      scrollViewClassName="chat-history-scroll-view"
      onWheel={() => {
        scrollToBottomSwitch.current = false;
      }}
    >
      <div className="flex min-h-full w-full flex-col justify-between">
        <div className="scroll-wrap-child flex w-full flex-1 flex-col gap-3 pb-3">
          {chatHistory.map((item, index) => {
            return (
              <MessageTemplate key={item.id} role={item.message.role} status={item.status}>
                {item.message.role === ChatRole.Human && item.message.content}
                {item.message.role === ChatRole.Assistant && <TypeMessageNode content={item.message.content} />}
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
  );
};

export default History;
