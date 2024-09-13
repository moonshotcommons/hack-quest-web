'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { AuditTabType, SelectType } from '../../../../../constants/type';
import { applicationTabData } from '../../../../../constants/data';
import { ConfirmModal } from '@/components/hackathon-org/modals/confirm-modal';
import { cloneDeep } from 'lodash-es';
import Operation from './Operation';
import AuditTable from './AuditTable';
import InfoModal from '../../InfoModal';
import InfoContent from './InfoContent';
import {
  ApplicationStatus,
  HackathonManageApplicationType,
  HackathonType
} from '@/service/webApi/resourceStation/type';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import { message } from 'antd';
import { useHackathonManageStore } from '@/store/zustand/hackathonManageStore';
import { useShallow } from 'zustand/react/shallow';
import { exportToCsv, exportToXlsx } from '@/helper/utils';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import DownloadModal from '@/components/hackathon/download-modal';

interface CommonTableProp {
  list: HackathonManageApplicationType[];
  information: SelectType[];
  refresh: VoidFunction;
  status: ApplicationStatus;
  loading: boolean;
  tabs: AuditTabType[];
}

const CommonTable: React.FC<CommonTableProp> = ({ tabs, loading, list, information, refresh, status: tabStatus }) => {
  const { hackathon } = useHackathonManageStore(
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
  const { getInfo, getStepIndex } = useDealHackathonData();
  const [infoList, setInfoList] = useState<HackathonManageApplicationType[]>([]);
  const [downloadOpen, setDownloadOpen] = useState(false);
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

  const handleDownload = (type: 'csv' | 'xlsx') => {
    const applicationData: Record<string, any>[] = [];
    checkItems.forEach((v) => {
      if (v.type === 'team') {
        v.members?.forEach((m) => {
          applicationData.push(getInfo(hackathon as unknown as HackathonType, m));
        });
      } else {
        applicationData.push(getInfo(hackathon as unknown as HackathonType, v));
      }
    });
    const tabName = tabs.find((v) => v.value === tabStatus)?.label;
    if (type === 'csv') {
      exportToCsv(applicationData, `${hackathon.name}-${tabName}-application`);
    } else {
      exportToXlsx(applicationData, `${hackathon.name}-${tabName}-application`);
    }
    setDownloadOpen(false);
  };

  const handleDown = () => {
    if (!checkItems.length) return;
    setDownloadOpen(true);
  };

  const handleStatus = (sta: ApplicationStatus) => {
    if (!checkItems.length) return;
    setStatus(sta);
    setConfirmTxt(
      `Do you want to ${applicationTabData?.find((v) => v.value === sta)?.label?.toLocaleLowerCase()} selected applications?`
    );
  };

  const handleStatusSingle = (item: any, sta: ApplicationStatus) => {
    console.info(item, sta);
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
    const l = list.map((v, i) => ({
      ...v,
      index: i
    }));
    const newList = cloneDeep(l);
    teamIds.map((id) => {
      const index = newList.findIndex((l) => l.id === id);
      const item = newList[index];
      newList.splice(index + 1, 0, ...(item?.members || []));
    });
    setInfoList(newList.filter((v) => !v.pId));
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
      .changeHackathonApplicationStatus(hackathon?.id, data)
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
    setCurInfo(null);
  }, [list]);

  const disableHandleButton = useMemo(() => {
    return getStepIndex(hackathon as unknown as HackathonType) > 0;
  }, [hackathon, getStepIndex]);
  const showHandleButton = useMemo(() => {
    return hackathon?.info?.allowSubmission === false;
  }, [hackathon]);
  return (
    <div className="flex w-full flex-1 flex-col">
      <Operation
        checkIds={checkItems.map((v) => v.id)}
        handleDown={handleDown}
        handleStatus={handleStatus}
        tabStatus={tabStatus}
        isHandle={showHandleButton && !disableHandleButton}
      />
      <AuditTable
        checkIds={checkItems.map((v) => v.id)}
        handleCheckAll={handleCheckAll}
        checkAll={checkAll}
        tableList={tableList}
        information={information}
        changeTeamIds={changeTeamIds}
        handleStatusSingle={handleStatusSingle}
        handleCheck={handleCheck}
        teamIds={teamIds}
        tabStatus={tabStatus}
        showInfo={showInfo}
        loading={loading}
        isHandle={showHandleButton && !disableHandleButton}
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
          infoList?.map((info) => (
            <InfoContent
              key={info.id}
              info={info}
              disableHandleButton={disableHandleButton}
              showHandleButton={showHandleButton}
              onClose={() => {
                setCurInfo(null);
                setCurId('');
              }}
              handleStatusSingle={handleStatusSingle}
            />
          ))
        }
      />
      <DownloadModal open={downloadOpen} onClose={() => setDownloadOpen(false)} handleDownload={handleDownload} />
    </div>
  );
};

export default CommonTable;
