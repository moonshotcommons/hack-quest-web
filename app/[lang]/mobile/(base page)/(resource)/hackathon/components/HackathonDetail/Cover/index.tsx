import { HackathonType } from '@/service/webApi/resourceStation/type';
import React from 'react';
import EditBox from '../EditBox';
import { HackathonEditModalType } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';

interface CoverProp {
  hackathon: HackathonType;
}

const Cover: React.FC<CoverProp> = ({ hackathon }) => {
  return (
    <EditBox title={'hackathonDetail.cover'} className="p-0" type={HackathonEditModalType.COVER}>
      <img src={hackathon?.info?.image} alt={hackathon.name} className="w-full" />
    </EditBox>
  );
};

export default Cover;
