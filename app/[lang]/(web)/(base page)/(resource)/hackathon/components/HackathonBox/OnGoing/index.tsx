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
        <div className="">
          {hackathonList.map((hackathon) => (
            <div key={hackathon.id} className="mt-[40px]">
              <OnGoingHackathonCard hackathon={hackathon} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default OnGoing;
