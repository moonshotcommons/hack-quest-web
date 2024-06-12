import React from 'react';
import EditBox from '../EditBox';

interface InfoProp {}

const Info: React.FC<InfoProp> = () => {
  return (
    <div className="sticky left-0 top-[70px]">
      <EditBox title={'hackathonDetail.info'}>sfsdsdfsdfsd</EditBox>
    </div>
  );
};

export default Info;
