import { FC, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/helper/utils';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { useClickAway } from 'ahooks';
import { HelperType } from '.';
import Image from 'next/image';
import { ScrollArea } from '../ui/scroll-area';
interface ChatModalProps {}

enum Role {
  HUMAN = 'human',
  ASSISTANT = 'assistant'
}

const ChatModal: FC<ChatModalProps> = (props) => {
  const helperParams = useGlobalStore((state) => state.helperParams);
  const updateHelperParams = useGlobalStore((state) => state.updateHelperParams);

  const [chatHistory, setChatHistory] = useState([
    {
      id: 'messageId',
      status: '',
      message: {
        role: 'human',
        content: 'human message1'
      }
    },
    {
      id: 'messageId',
      status: '',
      message: {
        role: 'assistant',
        content: 'ai response1'
      }
    }
  ]);

  const ref = useRef(null);
  const [pendingMessage, setPendingMessage] = useState('');

  const submit = () => {
    if (!pendingMessage) return;

    setChatHistory(
      chatHistory.concat({
        id: '-1',
        status: 'pending',
        message: {
          role: 'human',
          content: pendingMessage
        }
      })
    );

    setPendingMessage('');
  };

  const close = () => {
    updateHelperParams({
      open: false,
      content: '',
      exampleNum: -1,
      pageId: '',
      quizNum: -1,
      type: HelperType.Chat
    });
  };

  useClickAway(() => {
    close();
  }, ref);

  return (
    helperParams.open && (
      <motion.div
        initial={{ opacity: 0, scale: 0, x: 100, y: 60 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        ref={ref}
        className={cn(
          'absolute -bottom-[20px] right-16 flex h-[716px] w-[480px] scale-0 cursor-default flex-col justify-between rounded-[16px] bg-neutral-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.12)]'
        )}
      >
        <div className="relative flex h-16 w-full justify-between p-4 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:scale-y-50 after:bg-neutral-light-gray">
          <div className="flex h-full items-center gap-3">
            <Image src={'/images/icons/helper_icon.svg'} width={38} height={24} alt="hackquest bot"></Image>
            <h5 className="text-h5">HQ-01</h5>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 rounded-full bg-neutral-off-white px-2 py-1">
              <span className="body-s">231</span>
              <Image src={'/images/icons/gold.svg'} alt="hackquest gold" width={24} height={24}></Image>
            </div>
            <div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 12C19 15.864 15.864 19 12 19C8.136 19 5.777 15.108 5.777 15.108M5.777 15.108H8.941M5.777 15.108V18.608M5 12C5 8.136 8.108 5 12 5C16.669 5 19 8.892 19 8.892M19 8.892V5.392M19 8.892H15.892"
                  stroke="#0B0B0B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 18L18 6M6 6L18 18"
                  stroke="#0B0B0B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <ScrollArea className="flex w-full flex-1">
          <div className="flex h-full w-full flex-col justify-end gap-3  pb-3">
            {chatHistory.map((item) => {
              return (
                <div
                  key={item.id}
                  className={cn('flex w-full p-3', item.message.role === Role.HUMAN ? 'justify-end' : '')}
                >
                  <span
                    className={cn(
                      'body-m inline-block rounded-[8px] p-3 text-neutral-black',
                      item.message.role === Role.HUMAN ? 'bg-[#BC9BFF4D]' : 'bg-neutral-off-white'
                    )}
                  >
                    {item.message.content}
                  </span>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <div className="flex flex-col gap-3 pb-2">
          <p className="body-xs text-center">You have 5 free trials left</p>
          <div className="p-3">
            <div className="flex h-[40px] items-center gap-3 rounded-full border border-neutral-light-gray px-3">
              <input
                className="body-m flex-1 bg-transparent text-neutral-medium-gray outline-none"
                placeholder="Type your questions here...."
                value={pendingMessage}
                onChange={(e) => {
                  setPendingMessage(e.target.value);
                }}
              ></input>
              <span onClick={submit}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.4504 11.1104L3.45042 2.11036C3.08847 1.9236 2.64942 1.97502 2.34042 2.24036C2.03269 2.50762 1.91796 2.9349 2.05042 3.32036L5.00042 12.0004L2.10042 20.6804C1.99957 20.9778 2.04431 21.3053 2.22124 21.5648C2.39816 21.8243 2.68671 21.9856 3.00042 22.0004C3.15696 21.9994 3.3111 21.9617 3.45042 21.8904L21.4504 12.8904C21.7844 12.7193 21.9945 12.3756 21.9945 12.0004C21.9945 11.6251 21.7844 11.2815 21.4504 11.1104ZM4.70996 19L6.70996 13H16.71L4.70996 19ZM4.70996 5L6.70996 11H16.76L4.70996 5Z"
                    fill="#8C8C8C"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    )
  );
};

export default ChatModal;
