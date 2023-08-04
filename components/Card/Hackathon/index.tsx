import Tag from '@/components/Common/Tag';
import { tagFormate } from '@/helper/formate';
import React from 'react';

export interface HackathonCardProps {
  name: string;
  tags: string | string[];
}

const HackathonCard: React.FC<HackathonCardProps> = (props) => {
  const { name, tags = [] } = props;

  return (
    <div
      className={`h-[17.375rem] w-[26rem] bg-[url('/images/card/Hackathon/color-bg.svg')] relative flex-shrink-0`}
    >
      <div
        className={`w-full h-full bg-course-hackathon-card-bg scale-[1.01] absolute top-0 left-0 hover:-top-[0.25rem] hover:left-1 hover:transition-all duration-700`}
      >
        <div className="px-10 pt-9">
          <h2 className="title text-course-card-title-text-color">{name}</h2>
          <div className="flex gap-4 mt-4">
            {(Array.isArray(tags) ? tags : [tags]).map((tag) => {
              return (
                <Tag
                  key={tag}
                  className="text-text-default-color border-course-tag-border-color"
                >
                  {tagFormate(tag)}
                </Tag>
              );
            })}
          </div>
          <div className="mt-12">
            <div className="flex relative justify-between mt-4 bottom-line leading-[110%]">
              <span className="text-[#676767] text-xs font-next-book-thin">
                SignUp
              </span>
              <span className="text-[#EDEDED] text-sm font-neuemachina-light">
                4/15 - 6/15
              </span>
            </div>
            <div className="flex relative justify-between mt-4 bottom-line leading-[110%]">
              <span className="text-[#676767] text-xs font-next-book">
                Event
              </span>
              <span className="text-[#EDEDED] text-sm font-neuemachina-light">
                6/15 - 7/15
              </span>
            </div>
            <div className="flex relative justify-between mt-4 bottom-line leading-[110%]">
              <span className="text-[#676767] text-xs font-next-book">
                Grant size
              </span>
              <span className="text-[#EDEDED] text-sm font-neuemachina-light">
                200K
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonCard;
