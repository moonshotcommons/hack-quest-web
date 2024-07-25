import React from 'react';
import Overview from './Overview';
import Videos from './Videos';
import Introduction from './Introduction';
import Team from './Team';
import Voting from './Voting';

interface ContentProp {}

const Content: React.FC<ContentProp> = ({}) => {
  return (
    <div className="body-s flex flex-col gap-[3.75rem] text-neutral-off-black">
      <Overview />
      <Voting />
      <Videos />
      <Introduction />
      <Team />
    </div>
  );
};

export default Content;
