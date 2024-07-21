'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { InformationType } from '../../../../../constants/type';
import { applicationTabData } from '../../../../../constants/data';
import { ConfirmModal } from '@/components/hackathon-org/modals/confirm-modal';
import { cloneDeep } from 'lodash-es';
import Operation from './Operation';
import AuditTable from './AuditTable';
import InfoModal from '../../InfoModal';
import InfoContent from './InfoContent';
import { ApplicationStatus, HackathonManageApplicationType } from '@/service/webApi/resourceStation/type';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import { message } from 'antd';
import { useHackathonAuditStore } from '@/store/zustand/hackathonAuditStore';
import { useShallow } from 'zustand/react/shallow';
import dayjs from '@/components/Common/Dayjs';

interface CommonTableProp {
  list: HackathonManageApplicationType[];
  information: InformationType[];
  refresh: VoidFunction;
  status: ApplicationStatus;
  loading: boolean;
}

const CommonTable: React.FC<CommonTableProp> = ({ loading, list, information, refresh, status: tabStatus }) => {
  const { hackathon } = useHackathonAuditStore(
    useShallow((state) => ({
      hackathon: state.hackathon
    }))
  );
  const [checkAll, setCheckAll] = useState(false);
  const [checkItems, setCheckItems] = useState<HackathonManageApplicationType[]>([]);
  const [status, setStatus] = useState<ApplicationStatus | null>(null);
  const [confirmTxt, setConfirmTxt] = useState('');
  const [curId, setCurId] = useState('');
  const [curInfo, setCurInfo] = useState<HackathonManageApplicationType | null>(null);
  const [teamIds, setTeamIds] = useState<string[]>([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleCheck = (item: HackathonManageApplicationType) => {
    const newCheckItems = checkItems.some((v) => v.id === item.id)
      ? checkItems.filter((v) => v.id !== item.id)
      : [...checkItems, item];
    setCheckItems(newCheckItems);
    setCheckAll(newCheckItems.length === list.length && list.length > 0);
  };
  const handleCheckAll = () => {
    !checkAll ? setCheckItems(list) : setCheckItems([]);
  };

  const handleDown = () => {};

  const handleStatus = (sta: ApplicationStatus) => {
    setStatus(sta);
    setConfirmTxt(
      `Do you want to ${applicationTabData?.find((v) => v.value === sta)?.label?.toLocaleLowerCase()} selected applications?`
    );
  };

  const handleStautusSingle = (item: any, sta: ApplicationStatus) => {
    setStatus(sta);
    setCurInfo(item);
    setConfirmTxt(
      `Do you want to ${applicationTabData?.find((v) => v.value === sta)?.label?.toLocaleLowerCase()} this ${item.name}?`
    );
  };

  const changeTeamIds = (id: string) => {
    const newTeamIds = teamIds.includes(id) ? teamIds.filter((v) => v !== id) : [...teamIds, id];
    setTeamIds(newTeamIds);
  };

  const showInfo = (item: HackathonManageApplicationType) => {
    setCurId(item.id);
    setCurInfo(item);
  };

  useEffect(() => {
    setCheckAll(checkItems.length === list.length && list.length > 0);
  }, [checkItems, list]);
  useEffect(() => {
    if (!status) {
      setCurInfo(null);
      setCurId('');
    }
  }, [status]);

  const tableList = useMemo(() => {
    const newList = cloneDeep(list).map((v, i) => ({
      ...v,
      index: i
    }));
    teamIds.map((id) => {
      const index = list.findIndex((l) => l.id === id);
      const item = list[index];
      newList.splice(index + 1, 0, ...(item?.members || []));
    });
    return newList;
  }, [list, teamIds]);

  const confirmChangeStatus = () => {
    setConfirmLoading(true);
    let data = [];
    //单个
    if (curInfo) {
      data = [
        {
          id: curInfo.id,
          type: curInfo.type as 'team' | 'member',
          joinState: status as ApplicationStatus
        }
      ];
    } else {
      data = checkItems.map((v) => ({
        id: v.id,
        type: v.type as 'team' | 'member',
        joinState: status as ApplicationStatus
      }));
    }
    webApi.resourceStationApi
      .changeHackathonApplicationStatus(data)
      .then(() => {
        message.success('Updated Success');
        setStatus(null);
        refresh();
      })
      .catch((err) => {
        errorMessage(err);
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  useEffect(() => {
    setCheckItems([]);
    setTeamIds([]);
    setCurId('');
  }, [list]);

  const isHandle = useMemo(() => {
    return hackathon?.info?.allowSubmission === false && dayjs().tz().isBefore(hackathon?.timeline?.registrationClose);
  }, [hackathon]);
  return (
    <div className="flex w-full flex-1 flex-col">
      <Operation
        checkIds={checkItems.map((v) => v.id)}
        handleDown={handleDown}
        handleStatus={handleStatus}
        tabStatus={tabStatus}
        isHandle={isHandle}
      />
      <AuditTable
        checkIds={checkItems.map((v) => v.id)}
        handleCheckAll={handleCheckAll}
        checkAll={checkAll}
        tableList={tableList}
        information={information}
        changeTeamIds={changeTeamIds}
        handleStautusSingle={handleStautusSingle}
        handleCheck={handleCheck}
        teamIds={teamIds}
        tabStatus={tabStatus}
        showInfo={showInfo}
        loading={loading}
        isHandle={isHandle}
      />
      <ConfirmModal
        open={!!status}
        isLoading={confirmLoading}
        autoClose={false}
        onClose={() => setStatus(null)}
        onConfirm={confirmChangeStatus}
      >
        {confirmTxt}
      </ConfirmModal>
      <InfoModal
        open={!!curInfo?.id && !!curId}
        curInfo={curInfo}
        renderItem={() =>
          tableList?.map((info) => (
            <InfoContent
              key={info.id}
              info={info}
              onClose={() => setCurInfo(null)}
              handleStautusSingle={handleStautusSingle}
            />
          ))
        }
      />
    </div>
  );
};

export default CommonTable;
