import React from 'react';
import PastHackathonCard from './PastHackathonCard';

function Past() {
  return (
    <div className="flex w-full justify-between flex-wrap gap-y-[22px]">
      {new Array(6).fill('').map((item, index) => {
        return (
          <div key={index} className="w-[calc(33.33%-22px)]">
            <PastHackathonCard></PastHackathonCard>
          </div>
        );
      })}
    </div>
  );
}

export default Past;
