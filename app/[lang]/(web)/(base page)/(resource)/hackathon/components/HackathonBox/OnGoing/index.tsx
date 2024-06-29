import React from 'react';
import OnGoingHackathonCard from './OnGoingHackathonCard';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import NoData from './NoData';

interface OnGoingProp {
  hackathonList: HackathonType[];
  isDashboard?: boolean;
}

const OnGoing: React.FC<OnGoingProp> = ({ hackathonList, isDashboard }) => {
  return (
    <>
      {!hackathonList.length ? (
        <NoData />
      ) : (
        <div className="">
          {hackathonList.map((hackathon) => (
            <div key={hackathon.id} className="mt-[40px]">
              <OnGoingHackathonCard hackathon={hackathon} isDashboard={isDashboard} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default OnGoing;
