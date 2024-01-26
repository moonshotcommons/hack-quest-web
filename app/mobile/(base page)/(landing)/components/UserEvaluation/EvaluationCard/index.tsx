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
      className={`rounded-[1rem] p-4 flex flex-col gap-4 h-fit bg-neutral-off-white ${className}`}
    >
      <div className="body-s text-neutral-dark-gray break-words whitespace-break-spaces tracking-tight">
        {content}
      </div>
      <div className="flex gap-2 items-center">
        <div className="w-8 h-8 rounded-full overflow-hidden relative">
          <Image src={avatar} fill alt={username}></Image>
        </div>
        <span className="button-text-s flex-1 font-normal">
          {!userDesc && <span className="font-semibold">{username}</span>}
          {userDesc && (
            <span className="flex flex-col">
              <span className="font-semibold">{username}</span>
              <span className="break-words whitespace-pre-wrap">
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
