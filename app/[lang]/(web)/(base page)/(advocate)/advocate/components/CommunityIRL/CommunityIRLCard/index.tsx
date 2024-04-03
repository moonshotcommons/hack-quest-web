import Image from 'next/image';
import { FC, ReactNode } from 'react';

interface CommunityIRLCardProps {
  date: string;
  title: string;
  image: string;
  place: ReactNode;
}

const CommunityIRLCard: FC<CommunityIRLCardProps> = ({ title, date, image, place }) => {
  return (
    <div className="w-[325px]">
      <div className="relative h-[182px] w-[325px]">
        <Image src={image} alt={title} fill></Image>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <p className="body-m-bold text-neutral-black"> {title}</p>
        <div className="caption-12pt flex gap-4 text-neutral-rich-gray">
          <span className="">{date}</span>
          {place}
        </div>
      </div>
    </div>
  );
};

export default CommunityIRLCard;
