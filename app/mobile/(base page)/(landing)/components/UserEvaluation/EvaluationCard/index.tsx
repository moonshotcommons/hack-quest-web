import Image from 'next/image';
import { FC, ReactNode } from 'react';

interface EvaluationCardProps {
  content: ReactNode;
  avatar: string;
  username: string;
  className?: string;
  userDesc?: string;
}

const EvaluationCard: FC<EvaluationCardProps> = ({
  content,
  avatar,
  username,
  className,
  userDesc
}) => {
  return (
    <div
      className={`flex h-fit flex-col gap-4 rounded-[1rem] bg-neutral-off-white p-4 ${className}`}
    >
      <div className="body-s whitespace-break-spaces break-words tracking-tight text-neutral-dark-gray">
        {content}
      </div>
      <div className="flex items-center gap-2">
        <div className="relative h-8 w-8 overflow-hidden rounded-full">
          <Image src={avatar} fill alt={username}></Image>
        </div>
        <span className="button-text-s flex-1 font-normal">
          {!userDesc && <span className="font-semibold">{username}</span>}
          {userDesc && (
            <span className="flex flex-col">
              <span className="font-semibold">{username}</span>
              <span className="whitespace-pre-wrap break-words">
                {userDesc}
              </span>
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default EvaluationCard;
