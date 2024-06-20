import React, { ReactNode, useState } from 'react';
import { HackathonEditContext, HackathonEditModalType } from '../../constants/type';

interface EditProviderProp {
  children: ReactNode;
  updateHackathon: VoidFunction;
}

const EditProvider: React.FC<EditProviderProp> = ({ children, updateHackathon }) => {
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
      value: 'judging'
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
  const [modalType, setModalType] = useState<HackathonEditModalType>(HackathonEditModalType.NULL);

  return (
    <HackathonEditContext.Provider
      value={{
        navs,
        setNavs,
        modalType,
        setModalType,
        updateHackathon
      }}
    >
      {children}
    </HackathonEditContext.Provider>
  );
};

export default EditProvider;
