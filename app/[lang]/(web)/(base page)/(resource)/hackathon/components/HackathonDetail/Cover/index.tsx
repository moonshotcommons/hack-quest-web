import { HackathonType } from '@/service/webApi/resourceStation/type';
import React, { useContext } from 'react';
import EditBox from '../EditBox';
import { HackathonEditContext, HackathonEditModalType } from '../../../constants/type';

interface CoverProp {
  hackathon: HackathonType;
  imageLoad?: VoidFunction;
}

const Cover: React.FC<CoverProp> = ({ hackathon, imageLoad }) => {
  const { isEdit } = useContext(HackathonEditContext);
  return (
    <EditBox className="p-0" title={isEdit ? 'hackathonDetail.cover' : ''} type={HackathonEditModalType.COVER}>
      <img
        src={hackathon?.info?.image}
        alt={hackathon.name}
        className="w-full"
        onLoad={() => {
          imageLoad?.();
        }}
      />
    </EditBox>
  );
};

export default Cover;
