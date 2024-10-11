'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { applicationInformationData, hackathonSortData, applicationTabData } from '../../../../constants/data';
import Tab from '../Tab';
import { SelectType } from '../../../../constants/type';
import CommonTable from './CommonTable';
import { useRequest } from 'ahooks';
import { useHackathonManageStore } from '@/store/zustand/hackathonManageStore';
import { useShallow } from 'zustand/react/shallow';
import {
  ApplicationStatus,
  HackathonManageApplicationMemberType,
  HackathonManageApplicationType
} from '@/service/webApi/resourceStation/type';
import webApi from '@/service';
import { arraySortByKey } from '@/helper/utils';
import Search, { SearchParams } from '../Search';

interface ApplicationProp {}

const Application: React.FC<ApplicationProp> = () => {
  const { hackathon } = useHackathonManageStore(
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

  const [tableInformation, setTableInformation] = useState<SelectType[]>(
    applicationInformationData
      .filter((v) => v.disable)
      .map((v) => ({
        value: v.value,
        label: v.label
      }))
  );

  const handleSearch = (key: SearchParams, value: string) => {
    setSearchInfo({
      ...searchInfo,
      [key]: value
    });
  };

  const { run: refetch, loading: isLoading } = useRequest(
    async () => {
      const res = await webApi.resourceStationApi.getHackathonApplications(hackathon?.id as string);
      return res;
    },
    {
      manual: true,
      onSuccess(data) {
        const newData = data.map((v) => ({
          ...v,
          teamName: v.name,
          name: v.type === 'team' ? v.name : `${v.info?.About?.firstName} ${v.info?.About?.lastName}`,
          bio: v.type === 'team' ? v.bio : `${v.info?.About?.bio}`,
          location: v.type === 'team' ? v.location || '' : `${v.info?.About?.location || ''}`,
          university: v.type === 'team' ? v.university || '' : `${v.info?.About?.university || ''}`,
          members: v.members?.map((m: HackathonManageApplicationMemberType) => ({
            ...m,
            name: `${m.info?.About?.firstName} ${m.info?.About?.lastName}`,
            teamName: v.name,
            bio: `${m.info?.About?.bio}`,
            pId: v.id,
            location: `${m.info?.About?.location || ''}`,
            university: `${m.info?.About?.university || ''}`
          }))
        }));
        setList(newData);
      }
    }
  );

  useEffect(() => {
    if (hackathon?.id) {
      refetch();
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
      (v) =>
        (v.joinState === status || hackathon?.info?.allowSubmission) &&
        v.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
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
          sorts={hackathonSortData}
          sort={searchInfo.sort}
          handleSearch={handleSearch}
          informationData={applicationInformationData}
          tableInformation={tableInformation.map((v) => v.value)}
          setTableInformation={(values) => {
            const newTableInformation: SelectType[] = [];
            applicationInformationData.map((v) => {
              values.includes(v.value) && newTableInformation.push(v);
            });
            setTableInformation(newTableInformation);
          }}
        />
        <CommonTable
          tabs={tabs}
          loading={isLoading}
          list={tableList}
          refresh={refetch}
          information={tableInformation}
          status={searchInfo.status}
        />
      </div>
    </div>
  );
};

export default Application;
