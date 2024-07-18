'use client';
import React, { useEffect, useState } from 'react';
import {
  applicationInformationData,
  applicationSortData,
  applicationTabData,
  mockData,
  submissionInformationData,
  submissionTabData
} from '../../../../constants/data';
import Tab from '../Tab';
import Search from './Search';
import { InformationType } from '../../../../constants/type';
import CommonTable from './CommonTable';
import { useRequest } from 'ahooks';
import { useHackathonAuditStore } from '@/store/zustand/hackathonAuditStore';
import { useShallow } from 'zustand/react/shallow';
import Info from './Info';

interface SubmissionProp {}

const Submission: React.FC<SubmissionProp> = () => {
  const { hackathon } = useHackathonAuditStore(
    useShallow((state) => ({
      hackathon: state.hackathon
    }))
  );
  const [searchInfo, setSearchInfo] = useState({
    status: submissionTabData[0].value,
    sort: applicationSortData[0].value,
    sectors: [],
    keyword: ''
  });
  const [tableInformation, setTableInformation] = useState<InformationType[]>(
    submissionInformationData
      .filter((v) => v.disable)
      .map((v) => ({
        value: v.value,
        label: v.label
      }))
  );
  const [open, setOpen] = useState(false);

  const handleSearch = (key: 'sort' | 'keyword' | 'sectors', value: string) => {
    setSearchInfo({
      ...searchInfo,
      [key]: value
    });
  };

  const { run: refresh } = useRequest(async () => {});

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
          sectors={searchInfo.sectors}
          handleSearch={handleSearch}
          tableInformation={tableInformation.map((v) => v.value)}
          setTableInformation={(values) => {
            const newTableInformation: InformationType[] = [];
            submissionInformationData.map((v) => {
              values.includes(v.value) && newTableInformation.push(v);
            });
            setTableInformation(newTableInformation);
          }}
        />
        <CommonTable list={mockData} refresh={refresh} information={tableInformation} />
      </div>
    </div>
  );
};

export default Submission;
