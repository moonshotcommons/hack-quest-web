import { cn } from '@/helper/utils';
import { FC, ReactNode } from 'react';

interface CardProps {
  title: string;
  description: string;
  icon: ReactNode;
  iconClassName: string;
}

const Card: FC<CardProps> = ({ title, description, icon, iconClassName }) => {
  return (
    <div className="group relative h-[286px] w-[calc((100%-80px)/3)] overflow-hidden rounded-[1rem] bg-neutral-white [&>*]:transition-all [&>*]:duration-200">
      <div className={cn('absolute left-6 group-hover:top-16', iconClassName)}>{icon}</div>
      <div className="absolute left-1/2 top-[205px] flex h-[600px] w-[600px] -translate-x-1/2 justify-center rounded-full bg-transparent group-hover:top-0 group-hover:rounded-[16px] group-hover:bg-yellow-primary">
        <div className="h-[286px] w-[426px] p-6">
          <p className="body-xl-bold text-neutral-off-black">{title}</p>
          <p className="body-s mt-8 text-neutral-rich-gray">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
