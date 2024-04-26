import React from 'react';
import OnGoingHackathonCard from './OnGoingHackathonCard';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import NoData from './NoData';

interface OnGoingProp {
  hackathonList: HackathonType[];
}

const OnGoing: React.FC<OnGoingProp> = ({ hackathonList }) => {
  return (
    <>
      {!hackathonList.length ? (
        <NoData />
      ) : (
        <div className="flex flex-col gap-[1.25rem]">
          {hackathonList.map((hackathon: HackathonType) => (
            <div key={hackathon.id} className="w-full  ">
              <OnGoingHackathonCard hackathon={hackathon} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default OnGoing;
