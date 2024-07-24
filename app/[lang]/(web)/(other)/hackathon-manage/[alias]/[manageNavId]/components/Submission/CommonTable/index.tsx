'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { SelectType } from '../../../../../constants/type';
import { cloneDeep } from 'lodash-es';
import Operation from './Operation';
import AuditTable from './AuditTable';
import InfoModal from '../../InfoModal';
import InfoContent from './InfoContent';

interface CommonTableProp {
  list: any[];
  information: SelectType[];
  refresh: VoidFunction;
  loading: boolean;
}

const CommonTable: React.FC<CommonTableProp> = ({ list, information, refresh, loading }) => {
  const [checkAll, setCheckAll] = useState(false);
  const [checkIds, setCheckIds] = useState<string[]>([]);
  const [teamIds, setTeamIds] = useState<string[]>([]);
  const [curInfo, setCurInfo] = useState<any>(null);
  const handleCheck = (id: string) => {
    const newCheckIds = checkIds.includes(id) ? checkIds.filter((v) => v !== id) : [...checkIds, id];
    setCheckIds(newCheckIds);
    setCheckAll(newCheckIds.length === list.length);
  };
  const handleCheckAll = () => {
    !checkAll ? setCheckIds(list.map((v) => v.id)) : setCheckIds([]);
  };

  const handleDown = () => {};

  const changeTeamIds = (id: string) => {
    const newTeamIds = teamIds.includes(id) ? teamIds.filter((v) => v !== id) : [...teamIds, id];
    setTeamIds(newTeamIds);
  };

  const showInfo = (item: any) => {
    setCurInfo(item);
  };

  useEffect(() => {
    setCheckAll(checkIds.length === list.length);
  }, [checkIds, list]);

  const tableList = useMemo(() => {
    const l = list.map((v, i) => ({
      ...v,
      index: i,
      team: v.team?.map((t: any) => ({
        ...t,
        pId: v.id
      }))
    }));
    const newList = cloneDeep(l);
    teamIds.map((id) => {
      const index = l.findIndex((l) => l.id === id);
      newList.splice(index + 1, 0, ...l[index].team);
    });
    return newList;
  }, [list, teamIds]);

  useEffect(() => {
    setCheckIds([]);
    setTeamIds([]);
  }, [list]);
  return (
    <div className="flex w-full flex-1 flex-col">
      <Operation checkIds={checkIds} handleDown={handleDown} />
      <AuditTable
        checkIds={checkIds}
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
