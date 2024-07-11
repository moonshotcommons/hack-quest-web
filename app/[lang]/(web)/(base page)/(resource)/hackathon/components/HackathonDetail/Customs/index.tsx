import { HackathonType, HackathonInfoSectionCustomType } from '@/service/webApi/resourceStation/type';
import React from 'react';
import CustomImageName from '../CustomImageName';
import { HackathonEditModalType } from '../../../constants/type';
import CustomImageTitle from '../CustomImageTitle';

interface CustomsProp {
  hackathon: HackathonType;
}

const Customs: React.FC<CustomsProp> = ({ hackathon }) => {
  const renderCustom = (custom: HackathonInfoSectionCustomType) => {
    switch (custom.type) {
      case HackathonEditModalType.CUSTOM_TEXT:
        return null;
      case HackathonEditModalType.CUSTOM_IMAGE_NAME:
        return <CustomImageName custom={custom} />;
      case HackathonEditModalType.CUSTOM_IMAGE_TITLE:
        return <CustomImageTitle custom={custom} />;
    }
  };
  if (!hackathon.info?.sections?.customs?.length) return null;
  return hackathon.info?.sections?.customs?.map((custom) => <div key={custom.id}>{renderCustom(custom)}</div>);
};

export default Customs;
