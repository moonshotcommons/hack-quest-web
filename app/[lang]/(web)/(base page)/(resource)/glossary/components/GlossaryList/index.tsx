import GlossaryCard from '@/components/Web/Business/GlossaryCard';
import { BlogType } from '@/service/webApi/resourceStation/type';
import React, { useEffect, useRef } from 'react';

export interface GlossaryListType {
  letter: string;
  list: BlogType[];
}

export interface OffsetTopsType {
  letter: string;
  offsetTop: number;
}
interface GlossaryListProp {
  list: GlossaryListType[];
  setOffsetTop: (tops: OffsetTopsType[]) => void;
}

const GlossaryList: React.FC<GlossaryListProp> = ({ list, setOffsetTop }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const getOffsetTops = () => {
    const offsetTops = [];
    const childNodes = boxRef.current?.childNodes || [];
    for (let i = 0; i < childNodes?.length; i++) {
      const offsetTop = (childNodes[i] as HTMLDivElement).offsetTop || 0;
      offsetTops.push({
        letter: `${list[i].letter}`,
        offsetTop: offsetTop
      });
    }
    setOffsetTop(offsetTops);
  };
  useEffect(() => {
    getOffsetTops();
  }, [list]);
  return (
    <div className="mt-[-20px] flex flex-col" ref={boxRef}>
      {list.map((item) => (
        <div key={item.letter} className="pt-[80px]" id={`glossary-${item.letter}`}>
          <div className="text-h2 mb-[40px] border-b border-b-neutral-medium-gray pb-[16px] text-neutral-off-black">
            {item.letter}
          </div>
          <div className="flex flex-wrap gap-x-[16px] gap-y-[40px]">
            {item.list.map((glossary) => (
              <div key={glossary.id} className="w-[calc((100%-48px)/4)] ">
                <GlossaryCard glossary={glossary} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GlossaryList;
