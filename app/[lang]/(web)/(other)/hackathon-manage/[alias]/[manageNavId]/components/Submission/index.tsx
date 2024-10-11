'use client';
import React, { useEffect, useState } from 'react';
import { hackathonSortData, submissionInformationData } from '../../../../constants/data';
import Tab from '../Tab';
import { AuditTabType, SelectType } from '../../../../constants/type';
import CommonTable from './CommonTable';
import { useRequest } from 'ahooks';
import { useHackathonManageStore } from '@/store/zustand/hackathonManageStore';
import { useShallow } from 'zustand/react/shallow';
import { SubmissionStatusType } from '@/service/webApi/resourceStation/type';
import webApi from '@/service';
import Search from '../Search';
import { useQueries } from '@tanstack/react-query';
import { MultiSelectOption } from '../../../../components/MultiSelect';

interface SubmissionProp {}

const Submission: React.FC<SubmissionProp> = () => {
  const { hackathon } = useHackathonManageStore(
    useShallow((state) => ({
      hackathon: state.hackathon
    }))
  );
  const [searchInfo, setSearchInfo] = useState({
    prizeTrack: '',
    sort: hackathonSortData[0].value,
    track: [],
    keyword: '',
    invalid: false
  });
  const [tableInformation, setTableInformation] = useState<SelectType[]>(
    submissionInformationData
      .filter((v) => v.disable)
      .map((v) => ({
        value: v.value,
        label: v.label
      }))
  );

  const handleSearch = (key: keyof typeof searchInfo, value: string) => {
    setSearchInfo({
      ...searchInfo,
      [key]: value
    });
  };

  const [{ data: tabData = [] }, { data: tracks = [] }] = useQueries({
    queries: [
      {
        enabled: !!hackathon?.id,
        queryKey: ['prizeTracks', hackathon?.id],
        queryFn: () => webApi.resourceStationApi.getHackathonSubmissionStatus(hackathon.id),
        select: (data: SubmissionStatusType[]) => {
          const newData: AuditTabType[] = data.map((v) => ({
            label: v.name,
            value: v.name,
            count: v.projectCount
          }));
          return newData;
        }
      },
      {
        queryKey: ['tracks'],
        queryFn: () => webApi.resourceStationApi.getProjectTracksDict(),
        select: (data: string[]) => {
          const newData: MultiSelectOption[] = data.map((v) => ({
            label: v,
            value: v
          }));
          return newData;
        }
      }
    ]
  });

  const {
    run: refetch,
    data: list = [],
    loading
  } = useRequest(
    () =>
      webApi.resourceStationApi.getHackathonSubmissionProjects(hackathon.id, {
        ...searchInfo,
        track: searchInfo.track.join(',')
      }),
    {
      manual: true
    }
  );

  useEffect(() => {
    if (searchInfo.prizeTrack) refetch();
  }, [searchInfo]);
  useEffect(() => {
    if (tabData.length) {
      handleSearch('prizeTrack', tabData[0].value);
    }
  }, [tabData]);
  return (
    <div className="flex h-full flex-col gap-[40px]">
      <Tab curTab={searchInfo.prizeTrack} tabs={tabData} changeTab={(tab) => handleSearch('prizeTrack', tab)} />
      <div className="flex flex-1 flex-col gap-[24px]">
        <Search
          sorts={hackathonSortData}
          sort={searchInfo.sort}
          sectors={[
            {
              name: 'Sector',
              options: tracks,
              value: searchInfo.track,
              key: 'track',
              type: 'checkbox'
            }
          ]}
          handleSearch={handleSearch}
          informationData={submissionInformationData}
          tableInformation={tableInformation.map((v) => v.value)}
          setTableInformation={(values) => {
            const newTableInformation: SelectType[] = [];
            submissionInformationData.map((v) => {
              values.includes(v.value) && newTableInformation.push(v);
            });
            setTableInformation(newTableInformation);
          }}
          searchType={'submission'}
        />
        <CommonTable
          list={list}
          prizeTrack={searchInfo.prizeTrack}
          tabs={tabData}
          information={tableInformation}
          loading={loading}
          refresh={refetch}
        />
      </div>
    </div>
  );
};

export default Submission;
