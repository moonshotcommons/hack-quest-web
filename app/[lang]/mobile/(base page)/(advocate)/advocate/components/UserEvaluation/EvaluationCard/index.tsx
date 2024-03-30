import Image from 'next/image';
import { FC, ReactNode } from 'react';

interface EvaluationCardProps {
  content: ReactNode;
  avatar: string;
  username: string;
  className?: string;
  userDesc?: string;
}

const EvaluationCard: FC<EvaluationCardProps> = ({ content, avatar, username, className, userDesc }) => {
  return (
    <div className={`flex h-fit flex-col gap-4 rounded-[1rem] bg-white p-4 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="relative h-8 w-8 overflow-hidden rounded-full">
          <Image src={avatar} fill alt={username}></Image>
        </div>
        <span className="flex-1 font-normal">
          {!userDesc && <span className="body-xs-bold text-neutral-dark-gray">{username}</span>}
          {userDesc && (
            <span className="flex flex-col">
              <span className="body-xs-bold text-neutral-dark-gray">{username}</span>
              <span className="body-xs whitespace-pre-wrap break-words text-neutral-medium-gray">{userDesc}</span>
            </span>
          )}
        </span>
      </div>
      <div className="body-s whitespace-break-spaces break-words tracking-tight text-neutral-dark-gray">{content}</div>
    </div>
  );
};

export default EvaluationCard;
