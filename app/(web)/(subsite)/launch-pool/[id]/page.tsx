import React from 'react';
import Nav from './components/Nav';
import Content from './components/Content';

interface LaunchDetailProp {}

const LaunchDetail: React.FC<LaunchDetailProp> = () => {
  return (
    <div className="container mx-auto flex h-full gap-[20px] py-[40px]">
      <Nav />
      <Content />
    </div>
  );
};

export default LaunchDetail;
