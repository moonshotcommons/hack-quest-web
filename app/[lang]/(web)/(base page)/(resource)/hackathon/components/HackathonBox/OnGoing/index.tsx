import React from 'react';
import OnGoingHackathonCard from './OnGoingHackathonCard';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import NoData from './NoData';

interface OnGoingProp {
  hackathonList: HackathonType[];
  isOrganizer?: boolean;
  showManage?: boolean;
}

const OnGoing: React.FC<OnGoingProp> = ({ hackathonList, isOrganizer, showManage }) => {
  if (isOrganizer && !hackathonList.length) return null;
  return (
    <>
      {!hackathonList.length ? (
        <NoData />
      ) : (
        <div className="">
          {hackathonList.map((hackathon) => (
            <div key={hackathon.id} className="mt-[40px]">
              <OnGoingHackathonCard hackathon={hackathon} isOrganizer={isOrganizer} showManage={showManage} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default OnGoing;
