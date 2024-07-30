'use client';
import React, { useState } from 'react';
import { judgingInformationData, hackathonSortData, applicationTabData } from '../../../../../constants/data';
import { SelectType } from '../../../../../constants/type';
import { useHackathonManageStore } from '@/store/zustand/hackathonManageStore';
import { useShallow } from 'zustand/react/shallow';
import { HackathonManageApplicationType } from '@/service/webApi/resourceStation/type';
import Search from '../../Search';
import CommonTable from './CommonTable';

interface VotingProp {}

const Voting: React.FC<VotingProp> = () => {
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
  const [tableList, setTableList] = useState<HackathonManageApplicationType[]>([]);

  const [tableInformation, setTableInformation] = useState<SelectType[]>(
    judgingInformationData
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

  // const {
  //   refetch,
  //   isLoading,
  //   data: list = []
  // } = useQuery({
  //   enabled: !!hackathon?.id,
  //   staleTime: Infinity,
  //   queryKey: ['judging-voting', hackathon?.id],
  //   queryFn: () => webApi.resourceStationApi.getHackathonApplications(hackathon?.id as string)
  // });

  // const tabs = useMemo(() => {
  //   const pendings = list.filter((v) => v.joinState === ApplicationStatus.REVIEW)?.length;
  //   const approveds = list.filter((v) => v.joinState === ApplicationStatus.APPROVED)?.length;
  //   const decline = list.filter((v) => v.joinState === ApplicationStatus.DECLINE)?.length;
  //   const waits = list.filter((v) => v.joinState === ApplicationStatus.WAIT)?.length;
  //   const counts = [pendings, approveds, decline, waits];
  //   return applicationTabData.map((v, i) => ({
  //     ...v,
  //     count: counts[i]
  //   }));
  // }, [list]);

  // const refreshTableList = () => {
  //   const { keyword, sort, status } = searchInfo;
  //   const newList = list.filter(
  //     (v) => v.joinState === status && v.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
  //   );
  //   const sortList = arraySortByKey(newList, sort);
  //   setTableList(sortList);
  // };

  // useEffect(() => {
  //   if (hackathon?.id) {
  //     refreshTableList();
  //   }
  // }, [searchInfo, hackathon, list]);

  // useEffect(() => {
  //   if (hackathon?.id) {
  //     refetch();
  //   }
  // }, [hackathon]);

  return (
    <div className="flex flex-1 flex-col gap-[24px]">
      <Search
        sorts={hackathonSortData}
        sort={searchInfo.sort}
        handleSearch={handleSearch}
        informationData={judgingInformationData}
        tableInformation={tableInformation.map((v) => v.value)}
        setTableInformation={(values) => {
          const newTableInformation: SelectType[] = [];
          judgingInformationData.map((v) => {
            values.includes(v.value) && newTableInformation.push(v);
          });
          setTableInformation(newTableInformation);
        }}
      />
      <CommonTable
        loading={false}
        list={tableList}
        refresh={() => {}}
        information={tableInformation}
        status={searchInfo.status}
      />
    </div>
  );
};

export default Voting;
