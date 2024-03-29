import MobGlossaryCard from '@/components/Mobile/MobGlossaryCard';
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
  }, []);
  return (
    <div className="flex flex-col gap-[2.25rem]" ref={boxRef}>
      {list.map((item) => (
        <div key={item.letter} className="relative">
          <div className="absolute left-0 top-[-2.5rem]" id={`glossary-${item.letter}`}></div>
          <div className="text-h2-mob mb-[1.5rem] border-b border-b-neutral-medium-gray pb-[.5rem] text-neutral-off-black">
            {item.letter}
          </div>
          <div className="flex flex-col gap-[1rem]">
            {item.list.map((glossary) => (
              <div key={glossary.id} className="w-full">
                <MobGlossaryCard glossary={glossary} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GlossaryList;
