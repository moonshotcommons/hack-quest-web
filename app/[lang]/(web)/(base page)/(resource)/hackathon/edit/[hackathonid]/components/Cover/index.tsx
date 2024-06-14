import { HackathonType } from '@/service/webApi/resourceStation/type';
import React from 'react';
import EditBox from '../EditBox';

interface CoverProp {
  hackathon: HackathonType;
}

const Cover: React.FC<CoverProp> = ({ hackathon }) => {
  return (
    <EditBox title={'hackathonDetail.cover'} className="p-0">
      <img src={hackathon.image} alt={hackathon.name} className="w-full" />
    </EditBox>
  );
};

export default Cover;
