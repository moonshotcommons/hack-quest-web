import React, { ReactNode, useMemo, useState } from 'react';
import webApi from '@/service';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { errorMessage } from '@/helper/ui';
import { message } from 'antd';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import { HackathonEditContext, HackathonEditModalType, UpdateHackathonParamType } from '../../../../constants/type';
import { initEditNavs } from '../../../../constants/data';

interface EditProviderProp {
  children: ReactNode;
  refreshHackathon: VoidFunction;
  hackathon: HackathonType;
  isEdit: boolean;
}

const EditProvider: React.FC<EditProviderProp> = ({ children, refreshHackathon, hackathon, isEdit }) => {
  const { dealModalList } = useDealHackathonData();
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState<HackathonEditModalType>(HackathonEditModalType.NULL);

  const updateHackathon = ({ data, closeModal = true, cb }: UpdateHackathonParamType) => {
    setLoading(true);
    webApi.hackathonV2Api
      .updateHackathon(
        {
          id: hackathon.id,
          ...data
        },
        modalType
      )
      .then(() => {
        refreshHackathon();
        message.success('Updated successfully');
        closeModal && setModalType(HackathonEditModalType.NULL);
        cb && cb();
      })
      .catch((err) => {
        errorMessage(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const navs = useMemo(() => {
    const addList = dealModalList(hackathon)
      .filter((v) => v.added)
      .map((v) => ({
        label: `hackathonDetail.${v.type}`,
        value: v.type
      }));
    return [...initEditNavs, ...addList];
  }, [hackathon]);

  return (
    <HackathonEditContext.Provider
      value={{
        navs,
        modalType,
        setModalType,
        updateHackathon,
        refreshHackathon,
        loading,
        setLoading,
        isEdit
      }}
    >
      {children}
    </HackathonEditContext.Provider>
  );
};

export default EditProvider;
