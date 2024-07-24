'use client';
import React, { useEffect, useState } from 'react';
import { hackathonSortData, submissionInformationData, submissionTabData } from '../../../../constants/data';
import Tab from '../Tab';
import Search from './Search';
import { SelectType } from '../../../../constants/type';
import CommonTable from './CommonTable';
import { useRequest } from 'ahooks';
import { useHackathonManageStore } from '@/store/zustand/hackathonManageStore';
import { useShallow } from 'zustand/react/shallow';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import webApi from '@/service';

interface SubmissionProp {}

const Submission: React.FC<SubmissionProp> = () => {
  const { hackathon } = useHackathonManageStore(
    useShallow((state) => ({
      hackathon: state.hackathon
    }))
  );
  const [list, setList] = useState<ProjectType[]>([]);
  const [searchInfo, setSearchInfo] = useState({
    status: submissionTabData[0].value,
    sort: hackathonSortData[0].value,
    tracks: [],
    keyword: ''
  });
  const [tableInformation, setTableInformation] = useState<SelectType[]>(
    submissionInformationData
      .filter((v) => v.disable)
      .map((v) => ({
        value: v.value,
        label: v.label
      }))
  );

  const handleSearch = (key: 'sort' | 'keyword' | 'sectors', value: string) => {
    setSearchInfo({
      ...searchInfo,
      [key]: value
    });
  };

  const { run: refresh, loading } = useRequest(
    async () => {
      const res = await webApi.resourceStationApi.getProjectsList();
      return res?.data?.slice(0, 10);
    },
    {
      onSuccess(data) {
        setList(data);
      }
    }
  );

  useEffect(() => {
    refresh();
  }, [searchInfo]);

  return (
    <div className="flex h-full flex-col gap-[40px]">
      <Tab
        curTab={searchInfo.status}
        tabs={submissionTabData}
        changeTab={(tab) =>
          setSearchInfo({
            ...searchInfo,
            status: tab
          })
        }
      />
      <div className="flex flex-1 flex-col gap-[24px]">
        <Search
          sort={searchInfo.sort}
          sectors={searchInfo.tracks}
          handleSearch={handleSearch}
          tableInformation={tableInformation.map((v) => v.value)}
          setTableInformation={(values) => {
            const newTableInformation: SelectType[] = [];
            submissionInformationData.map((v) => {
              values.includes(v.value) && newTableInformation.push(v);
            });
            setTableInformation(newTableInformation);
          }}
        />
        <CommonTable list={list} refresh={refresh} information={tableInformation} loading={loading} />
      </div>
    </div>
  );
};

export default Submission;
