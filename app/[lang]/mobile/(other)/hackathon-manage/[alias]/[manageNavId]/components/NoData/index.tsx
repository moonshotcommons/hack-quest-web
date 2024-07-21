import React from 'react';

interface NoDataProp {}

const NoData: React.FC<NoDataProp> = () => {
  return <div className="body-l text-neutral-off-black">You are up to date~</div>;
};

export default NoData;
