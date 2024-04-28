import { cn } from '@/helper/utils';
import { ChatRole } from '@/service/webApi/helper/type';
import { FC, ReactNode } from 'react';

interface MessageTemplateProps {
  role: ChatRole;
  status?: 'pending' | 'error';
  children: ReactNode;
}

const MessageTemplate: FC<MessageTemplateProps> = ({ role, children, status = 'error' }) => {
  return (
    <div className={cn('flex w-full p-3', role === ChatRole.Human ? 'justify-end' : '')}>
      <div className="">
        <span
          className={cn(
            'body-m inline-block max-w-[90vw] rounded-[8px] p-3 text-neutral-black',
            role === ChatRole.Human ? 'bg-[#BC9BFF4D]' : 'bg-neutral-off-white'
          )}
        >
          {children}
        </span>
      </div>
    </div>
  );
};

export default MessageTemplate;
