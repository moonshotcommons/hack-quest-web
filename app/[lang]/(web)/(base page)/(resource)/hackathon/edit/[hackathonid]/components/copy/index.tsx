import React from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';

interface IndexProp {
  hackathon: HackathonType;
}

const Index: React.FC<IndexProp> = ({ hackathon }) => {
  return (
    <EditBox title={'hackathonDetail.cover'}>
      <img src={hackathon.image} alt={hackathon.name} className="w-full" />
    </EditBox>
  );
};

export default Index;
