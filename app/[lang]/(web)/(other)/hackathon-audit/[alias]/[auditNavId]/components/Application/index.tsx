'use client';
import React, { useEffect, useState } from 'react';
import {
  applicationInformationData,
  applicationSortData,
  applicationTabData,
  mockData
} from '../../../../constants/data';
import Tab from './Tab';
import Search from './Search';
import { InformationType } from '../../../../constants/type';
import CommonTable from '../CommonTable';
import { useRequest } from 'ahooks';
import InfoModal from './InfoModal';

interface ApplicationProp {}

const Application: React.FC<ApplicationProp> = () => {
  const [searchInfo, setSearchInfo] = useState({
    status: applicationTabData[0].value,
    sort: applicationSortData[0].value,
    keyword: ''
  });
  const [tableInformation, setTableInformation] = useState<InformationType[]>(
    applicationInformationData
      .filter((v) => v.disable)
      .map((v) => ({
        value: v.value,
        label: v.label
      }))
  );

  const handleSearch = (key: 'sort' | 'keyword', value: string) => {
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
          keyword={searchInfo.keyword}
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
        <CommonTable list={mockData} refresh={refresh} information={tableInformation} />
        <InfoModal />
      </div>
    </div>
  );
};

export default Application;
