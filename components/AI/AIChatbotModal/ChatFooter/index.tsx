import Button from '@/components/Common/Button';
import { ChatRole, CompletionsInput, CompletionsRes, HelperType } from '@/service/webApi/helper/type';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { useKeyPress } from 'ahooks';
import { Dispatch, ForwardRefRenderFunction, SetStateAction, forwardRef, useState } from 'react';

import { v4 as uuid } from 'uuid';

interface ChatFooterProps {
  onSubmit: VoidFunction;
  getChatbotMessage: (input: CompletionsInput) => Promise<{ content: string }>;
  updateChatHistory: Dispatch<
    SetStateAction<
      (CompletionsRes & {
        status?: 'pending' | 'error' | undefined;
      })[]
    >
  >;
  loading: boolean;
  chatHistory: (CompletionsRes & { status?: 'pending' | 'error' })[];
}

export interface ChatFooterInstance {}

const ChatFooter: ForwardRefRenderFunction<ChatFooterInstance, ChatFooterProps> = (props, ref) => {
  const { onSubmit, getChatbotMessage, loading, chatHistory, updateChatHistory } = props;
  const [pendingMessage, setPendingMessage] = useState('');
  const helperParams = useGlobalStore((state) => state.helperParams);

  const submit = () => {
    debugger;
    if (!pendingMessage.trim()) return;
    onSubmit();
    updateChatHistory(
      chatHistory.concat({
        id: uuid(),
        message: {
          role: ChatRole.Human,
          content: pendingMessage
        }
      })
    );
    setPendingMessage('');
    getChatbotMessage({
      type: HelperType.Chat,
      content: pendingMessage,
      pageId: helperParams.pageId!,
      exampleNum: helperParams.exampleNum!,
      quizNum: helperParams.quizNum!
    });
  };

  useKeyPress('enter', submit);

  return (
    <div className="flex flex-col gap-3 pb-2">
      {/* <p className="body-xs text-center">You have 5 free trials left</p> */}
      <div className="p-3">
        <div className="flex h-[40px] items-center gap-3 rounded-full border border-neutral-light-gray px-3">
          <input
            className="body-m flex-1 bg-transparent text-neutral-medium-gray outline-none"
            placeholder="Type your questions here...."
            value={pendingMessage}
            onChange={(e) => {
              setPendingMessage(e.target.value);
            }}
            disabled={loading}
          ></input>
          <Button onClick={submit} className="p-0" disabled={loading}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.4504 11.1104L3.45042 2.11036C3.08847 1.9236 2.64942 1.97502 2.34042 2.24036C2.03269 2.50762 1.91796 2.9349 2.05042 3.32036L5.00042 12.0004L2.10042 20.6804C1.99957 20.9778 2.04431 21.3053 2.22124 21.5648C2.39816 21.8243 2.68671 21.9856 3.00042 22.0004C3.15696 21.9994 3.3111 21.9617 3.45042 21.8904L21.4504 12.8904C21.7844 12.7193 21.9945 12.3756 21.9945 12.0004C21.9945 11.6251 21.7844 11.2815 21.4504 11.1104ZM4.70996 19L6.70996 13H16.71L4.70996 19ZM4.70996 5L6.70996 11H16.76L4.70996 5Z"
                fill="#8C8C8C"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(ChatFooter);
