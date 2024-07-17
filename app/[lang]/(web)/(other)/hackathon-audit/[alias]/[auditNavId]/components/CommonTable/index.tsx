'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { ApplicationStatus, InformationType } from '../../../../constants/type';
import { applicationTabData } from '../../../../constants/data';
import { ConfirmModal } from '@/components/hackathon-org/modals/confirm-modal';
import { cloneDeep } from 'lodash-es';
import Operation from './Operation';
import AuditTable from './AuditTable';

interface CommonTableProp {
  list: any[];
  information: InformationType[];
  refresh: VoidFunction;
}

const CommonTable: React.FC<CommonTableProp> = ({ list, information, refresh }) => {
  const [checkAll, setCheckAll] = useState(false);
  const [checkIds, setCheckIds] = useState<string[]>([]);
  const [status, setStatus] = useState('');
  const [confirmTxt, setConfirmTxt] = useState('');
  const [curId, setCurId] = useState('');
  const [teamIds, setTeamIds] = useState<string[]>([]);
  const handleCheck = (id: string) => {
    const newCheckIds = checkIds.includes(id) ? checkIds.filter((v) => v !== id) : [...checkIds, id];
    setCheckIds(newCheckIds);
    setCheckAll(newCheckIds.length === list.length);
  };
  const handleCheckAll = () => {
    !checkAll ? setCheckIds(list.map((v) => v.id)) : setCheckIds([]);
  };

  const handleDown = () => {};

  const handleStatus = (sta: ApplicationStatus) => {
    setStatus(sta);
    setConfirmTxt(
      `Do you want to ${applicationTabData?.find((v) => v.value === sta)?.label?.toLocaleLowerCase()} selected applications?`
    );
  };

  const handleStautusSingle = (item: any, sta: ApplicationStatus) => {
    setStatus(sta);
    setCurId(item.id);
    setConfirmTxt(
      `Do you want to ${applicationTabData?.find((v) => v.value === sta)?.label?.toLocaleLowerCase()} this ${item.name}?`
    );
  };

  const changeTeamIds = (id: string) => {
    const newTeamIds = teamIds.includes(id) ? teamIds.filter((v) => v !== id) : [...teamIds, id];
    setTeamIds(newTeamIds);
  };

  useEffect(() => {
    setCheckAll(checkIds.length === list.length);
  }, [checkIds, list]);
  useEffect(() => {
    !status && setCurId('');
  }, [status]);

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
  return (
    <div className="flex w-full flex-1 flex-col">
      <Operation checkIds={checkIds} handleDown={handleDown} handleStatus={handleStatus} />
      <AuditTable
        checkIds={checkIds}
        handleCheckAll={handleCheckAll}
        checkAll={checkAll}
        tableList={tableList}
        information={information}
        changeTeamIds={changeTeamIds}
        handleStautusSingle={handleStautusSingle}
        handleCheck={handleCheck}
        teamIds={teamIds}
      />
      <ConfirmModal open={!!status} onClose={() => setStatus('')} onConfirm={() => {}}>
        {confirmTxt}
      </ConfirmModal>
    </div>
  );
};

export default CommonTable;
