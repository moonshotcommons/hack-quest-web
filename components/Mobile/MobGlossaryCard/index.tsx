import { BlogType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import TrackTag from '@/components/Common/TrackTag';
import { BsArrowRightShort } from 'react-icons/bs';
import MenuLink from '@/constants/MenuLink';

interface GlossaryCardProp {
  glossary: BlogType;
}

const GlossaryCard: React.FC<GlossaryCardProp> = ({ glossary }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [islineClamp2, setIslineClamp2] = useState(true);

  useEffect(() => {
    const titleHeight = titleRef.current?.offsetHeight || 0;
    setIslineClamp2(titleHeight > 30);
  }, []);
  return (
    <Link href={`${MenuLink.GLOSSARY}/${glossary.alias}`}>
      <div className="card-hover flex h-[9.625rem] flex-col justify-between rounded-[16px] bg-neutral-white p-[.75rem] shadow-[0_0_8px_0_rgba(0,0,0,0.12)]">
        <div>
          <div className="mb-[.25rem] flex gap-[.5rem] overflow-hidden">
            {glossary.categories.map((v, i) => (
              <TrackTag key={i} track={v} />
            ))}
          </div>
          <h2 ref={titleRef} className="body-l-bold line-clamp-2 text-neutral-off-black">
            {glossary.title}
          </h2>
          <div className={`body-xs mt-[.125rem] text-neutral-rich-gray ${islineClamp2 ? 'truncate' : 'line-clamp-3'}`}>
            {glossary.description}
          </div>
        </div>
        <div className="body-s flex items-center gap-[.375rem] text-neutral-black">
          <span>Read More</span>
          <BsArrowRightShort size={20} />
        </div>
      </div>
    </Link>
  );
};

export default GlossaryCard;
