import ClockIcon from '@/components/Common/Icon/Clock';
import CourseIcon from '@/components/Common/Icon/Course';
import FlightSideWayIcon from '@/components/Common/Icon/FlightSideWay';
import Label from '@/components/Common/Label';
import { computeTime } from '@/helper/formate';
import { Typography } from 'antd';
import React from 'react';
export interface TeaserCardProps {
  name: string;
  description: string;
  duration: number;
  unitCount: number;
  progress: number;
}

const TeaserCard: React.FC<TeaserCardProps> = (props) => {
  const { name, description, duration, unitCount, progress } = props;

  return (
    <div
      className={`h-[16.24rem] w-[25.71875rem] bg-[url('/images/card/Teaser/color-bg.svg')] relative flex-shrink-0 bg-no-repeat`}
    >
      <div className="absolute w-16 h-16 top-0 left-0 bg-[url('/images/card/Teaser/badge-wrap.svg')] p-4 bg-no-repeat">
        <span className="absolute top-[0.63rem] left-[0.63rem]">
          <FlightSideWayIcon></FlightSideWayIcon>
        </span>
      </div>
      <div
        className={`w-full h-full bg-[url('/images/card/Teaser/bg.svg')] scale-[1.01] absolute top-0 left-0 hover:-top-1 hover:left-1 hover:transition-all duration-700`}
      >
        <div className="pl-[5.81rem] pt-[5.44rem]">
          {/* <div className="w-[2.875rem] h-1 rounded-xl bg-gradient-to-t from-[#EB3E1C] to-[#E0AD38]"></div> */}

          <Typography.Paragraph
            className="text-base font-bold text-white w-[13.25rem]"
            ellipsis={{ rows: 2 }}
          >
            {name}
          </Typography.Paragraph>

          <p className="w-44 text-[#F2F2F2] font-normal text-sm mt-6">
            <Typography.Paragraph
              className="text-[#F2F2F2] font-normal text-sm"
              ellipsis={{
                rows: 3
              }}
            >
              {description}
            </Typography.Paragraph>
          </p>
        </div>
        <span className="justify-center absolute right-[0.78rem] bottom-0 text-base text-[#676767]">
          Free teaser course
        </span>
      </div>
    </div>
  );
};

export default TeaserCard;
