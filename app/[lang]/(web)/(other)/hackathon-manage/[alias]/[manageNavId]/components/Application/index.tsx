'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { applicationInformationData, hackathonSortData, applicationTabData } from '../../../../constants/data';
import Tab from '../Tab';
import Search from './Search';
import { InformationType } from '../../../../constants/type';
import CommonTable from './CommonTable';
import { useRequest } from 'ahooks';
import { useHackathonAuditStore } from '@/store/zustand/hackathonAuditStore';
import { useShallow } from 'zustand/react/shallow';
import {
  ApplicationStatus,
  HackathonManageApplicationMemberType,
  HackathonManageApplicationType
} from '@/service/webApi/resourceStation/type';
import webApi from '@/service';
import { arraySortByKey } from '@/helper/utils';

interface ApplicationProp {}

const Application: React.FC<ApplicationProp> = () => {
  const { hackathon } = useHackathonAuditStore(
    useShallow((state) => ({
      hackathon: state.hackathon
    }))
  );
  const [searchInfo, setSearchInfo] = useState({
    status: applicationTabData[0].value,
    sort: hackathonSortData[0].value,
    keyword: ''
  });
  const [list, setList] = useState<HackathonManageApplicationType[]>([]);
  const [tableList, setTableList] = useState<HackathonManageApplicationType[]>([]);

  const [tableInformation, setTableInformation] = useState<InformationType[]>(
    applicationInformationData
      .filter((v) => v.disable)
      .map((v) => ({
        value: v.value,
        label: v.label
      }))
  );
  const [open, setOpen] = useState(false);

  const handleSearch = (key: 'sort' | 'keyword', value: string) => {
    setSearchInfo({
      ...searchInfo,
      [key]: value
    });
  };

  const { run: refresh, loading } = useRequest(
    async () => {
      const res = await webApi.resourceStationApi.getHackathonApplications(hackathon?.id as string);
      return res;
    },
    {
      manual: true,
      onSuccess(data) {
        const newData = data.map((v) => ({
          ...v,
          name: v.type === 'team' ? v.name : `${v.info?.About?.firstName} ${v.info?.About?.lastName}`,
          bio: v.type === 'team' ? v.bio : `${v.info?.About?.bio}`,
          members: v.members?.map((m: HackathonManageApplicationMemberType) => ({
            ...m,
            name: `${m.info?.About?.firstName} ${m.info?.About?.lastName}`,
            bio: `${m.info?.About?.bio}`,
            pId: v.id
          }))
        }));
        setList(newData);
      }
    }
  );

  useEffect(() => {
    if (hackathon?.id) {
      refresh();
    }
  }, [hackathon]);

  const tabs = useMemo(() => {
    const pendings = list.filter((v) => v.joinState === ApplicationStatus.REVIEW)?.length;
    const approveds = list.filter((v) => v.joinState === ApplicationStatus.APPROVED)?.length;
    const decline = list.filter((v) => v.joinState === ApplicationStatus.DECLINE)?.length;
    const waits = list.filter((v) => v.joinState === ApplicationStatus.WAIT)?.length;
    const counts = [pendings, approveds, decline, waits];
    return applicationTabData.map((v, i) => ({
      ...v,
      count: counts[i]
    }));
  }, [list]);

  const refreshTableList = () => {
    const { keyword, sort, status } = searchInfo;
    const newList = list.filter(
      (v) => v.joinState === status && v.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
    );
    const sortList = arraySortByKey(newList, sort);
    setTableList(sortList);
  };

  useEffect(() => {
    if (hackathon?.id) {
      refreshTableList();
    }
  }, [searchInfo, hackathon, list]);

  return (
    <div className="flex h-full flex-col gap-[40px]">
      {hackathon?.info?.allowSubmission === false && (
        <Tab
          curTab={searchInfo.status}
          tabs={tabs}
          changeTab={(tab) =>
            setSearchInfo({
              ...searchInfo,
              status: tab
            })
          }
        />
      )}
      <div className="flex flex-1 flex-col gap-[24px]">
        <Search
          sort={searchInfo.sort}
          handleSearch={handleSearch}
          tableInformation={tableInformation.map((v) => v.value)}
          setTableInformation={(values) => {
            const newTableInformation: InformationType[] = [];
            applicationInformationData.map((v) => {
              values.includes(v.value) && newTableInformation.push(v);
            });
            setTableInformation(newTableInformation);
          }}
        />
        <CommonTable
          loading={loading}
          list={tableList}
          refresh={refresh}
          information={tableInformation}
          status={searchInfo.status}
        />
      </div>
    </div>
  );
};

export default Application;
