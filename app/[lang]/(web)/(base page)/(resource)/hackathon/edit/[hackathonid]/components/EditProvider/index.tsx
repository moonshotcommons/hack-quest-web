import React, { ReactNode, useState } from 'react';
import { HackathonEditContext } from '../../constants/type';

interface EditProviderProp {
  children: ReactNode;
}

const EditProvider: React.FC<EditProviderProp> = ({ children }) => {
  const [navs, setNavs] = useState([
    {
      label: 'hackathonDetail.cover',
      value: 'cover'
    },
    {
      label: 'hackathonDetail.timeline',
      value: 'timeline'
    },
    {
      label: 'hackathonDetail.rewards',
      value: 'rewards'
    },
    {
      label: 'hackathonDetail.judging',
      value: 'Judging'
    },
    {
      label: 'hackathonDetail.application',
      value: 'application'
    },
    {
      label: 'hackathonDetail.submission',
      value: 'submission'
    },
    {
      label: 'hackathonDetail.links',
      value: 'links'
    }
  ]);
  return (
    <HackathonEditContext.Provider
      value={{
        navs,
        setNavs
      }}
    >
      {children}
    </HackathonEditContext.Provider>
  );
};

export default EditProvider;
