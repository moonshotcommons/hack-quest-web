import { cn } from '@/helper/utils';
import { ChatRole } from '@/service/webApi/helper/type';
import { FC, ReactNode } from 'react';

interface MessageTemplateProps {
  role: ChatRole;
  children: ReactNode;
}

const MessageTemplate: FC<MessageTemplateProps> = ({ role, children }) => {
  return (
    <div className={cn('flex w-full p-3', role === ChatRole.Human ? 'justify-end' : '')}>
      <span
        className={cn(
          'body-m inline-block max-w-[404px] rounded-[8px] p-3 text-neutral-black',
          role === ChatRole.Human ? 'bg-[#BC9BFF4D]' : 'bg-neutral-off-white'
        )}
      >
        {children}
      </span>
    </div>
  );
};

export default MessageTemplate;
