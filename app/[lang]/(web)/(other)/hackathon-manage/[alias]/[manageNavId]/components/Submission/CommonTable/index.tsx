'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { SelectType } from '../../../../../constants/type';
import { cloneDeep } from 'lodash-es';
import Operation from './Operation';
import AuditTable from './AuditTable';
import InfoModal from '../../InfoModal';
import InfoContent from './InfoContent';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import { exportToExcel } from '@/helper/utils';

interface CommonTableProp {
  list: any[];
  information: SelectType[];
  loading: boolean;
}

const CommonTable: React.FC<CommonTableProp> = ({ list, information, loading }) => {
  const [checkAll, setCheckAll] = useState(false);
  const [checkItems, setCheckItems] = useState<ProjectType[]>([]);
  const [teamIds, setTeamIds] = useState<string[]>([]);
  const [curInfo, setCurInfo] = useState<ProjectType | null>(null);
  const handleCheck = (item: ProjectType) => {
    const newCheckItems = checkItems.some((v) => v.id === item.id)
      ? checkItems.filter((v) => v.id !== item.id)
      : [...checkItems, item];
    setCheckItems(newCheckItems);
    setCheckAll(newCheckItems.length === list.length && list.length > 0);
  };
  const handleCheckAll = () => {
    !checkAll ? setCheckItems(list) : setCheckItems([]);
  };

  const getInfo = (item: ProjectType) => {
    const info: Record<string, any> = {
      name: item.name,
      vote: item.vote,
      winner: item.winner ? 'Yes' : 'No',
      secotr: item.tracks.join(','),
      'prize track': item.prizeTrack,
      location: item.location,
      'pitch video': item.pitchVideo,
      'demo video': item.demoVideo
    };
    [item.detail || {}, item.addition || {}].forEach((ad) => {
      for (let key in ad) {
        if (!['id', 'fields'].includes(key)) {
          const dKey = key as keyof typeof ad;
          info[dKey] = ad[dKey];
        }
        for (let fKey in ad.fields) {
          info[ad.fields[fKey]['label']] = ad.fields[fKey]['value'];
        }
      }
    });
    for (let fKey in item.fields) {
      info[item.fields[fKey]['label']] = item.fields[fKey]['value'];
    }
    return info;
  };
  const handleDown = () => {
    if (!checkItems.length) return;
    const newCheckItems = structuredClone(checkItems);
    const submissionData: Record<string, any>[] = [];

    newCheckItems.forEach((v) => {
      submissionData.push(getInfo(v));
    });
    exportToExcel(submissionData, `submission data`);
  };

  const changeTeamIds = (id: string) => {
    const newTeamIds = teamIds.includes(id) ? teamIds.filter((v) => v !== id) : [...teamIds, id];
    setTeamIds(newTeamIds);
  };

  const showInfo = (item: any) => {
    setCurInfo(item);
  };

  useEffect(() => {
    setCheckAll(checkItems.length === list.length && list.length > 0);
  }, [checkItems, list]);

  const tableList = useMemo(() => {
    const l = list.map((v, i) => ({
      ...v,
      index: i
    }));
    const newList = cloneDeep(l);
    // teamIds.map((id) => {
    //   const index = l.findIndex((l) => l.id === id);
    //   newList.splice(index + 1, 0, ...l[index].team);
    // });
    return newList;
  }, [list, teamIds]);

  useEffect(() => {
    setCheckItems([]);
    setTeamIds([]);
  }, [list]);
  return (
    <div className="flex w-full flex-1 flex-col">
      <Operation checkIds={checkItems.map((v) => v.id)} handleDown={handleDown} />
      <AuditTable
        checkIds={checkItems.map((v) => v.id)}
        handleCheckAll={handleCheckAll}
        checkAll={checkAll}
        tableList={tableList}
        information={information}
        changeTeamIds={changeTeamIds}
        handleCheck={handleCheck}
        teamIds={teamIds}
        showInfo={showInfo}
        loading={loading}
      />
      <InfoModal
        open={!!curInfo?.id}
        curInfo={curInfo}
        renderItem={() =>
          tableList?.map((info) => <InfoContent key={info.id} info={info} onClose={() => setCurInfo(null)} />)
        }
      />
    </div>
  );
};

export default CommonTable;